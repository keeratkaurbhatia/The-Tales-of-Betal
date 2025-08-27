#!/usr/bin/env python3
import argparse
import os
import sys
import math
import shutil
from typing import List, Tuple, Optional

import numpy as np
from PIL import Image

import moviepy.editor as mpy


def parse_resolution(res_str: str) -> Tuple[int, int]:
    if "x" not in res_str:
        raise ValueError("Resolution must be in the form WIDTHxHEIGHT, e.g., 1280x720")
    w_str, h_str = res_str.lower().split("x")
    return int(w_str), int(h_str)


def list_images(input_dir: str) -> List[str]:
    exts = {".png", ".jpg", ".jpeg", ".webp", ".bmp"}
    images = [
        os.path.join(input_dir, f)
        for f in sorted(os.listdir(input_dir))
        if os.path.splitext(f)[1].lower() in exts
    ]
    return images


def load_image_as_rgb(image_path: str) -> np.ndarray:
    image = Image.open(image_path).convert("RGB")
    return np.array(image)


def letterbox_image(image_rgb: np.ndarray, target_w: int, target_h: int, bg_color=(0, 0, 0)) -> np.ndarray:
    h, w, _ = image_rgb.shape
    scale = min(target_w / w, target_h / h)
    new_w = int(w * scale)
    new_h = int(h * scale)
    resized = np.array(Image.fromarray(image_rgb).resize((new_w, new_h), Image.LANCZOS))
    canvas = np.zeros((target_h, target_w, 3), dtype=np.uint8)
    canvas[:, :] = bg_color
    top = (target_h - new_h) // 2
    left = (target_w - new_w) // 2
    canvas[top:top + new_h, left:left + new_w] = resized
    return canvas


def make_ken_burns_clip(
    base_image_rgb: np.ndarray,
    duration: float,
    fps: int,
    target_size: Tuple[int, int],
    zoom_start: float = 1.05,
    zoom_end: float = 1.18,
    pan_start: Tuple[float, float] = (0.0, 0.0),
    pan_end: Tuple[float, float] = (0.0, 0.0),
):
    target_w, target_h = target_size
    framed = letterbox_image(base_image_rgb, target_w, target_h)

    # Precompute a larger working canvas to allow zoom without losing edges
    pad_factor = max(zoom_end, 1.25)
    work_w = int(target_w * pad_factor)
    work_h = int(target_h * pad_factor)

    framed_large = np.array(Image.fromarray(framed).resize((work_w, work_h), Image.LANCZOS))
    cx = work_w // 2
    cy = work_h // 2

    def make_frame(t: float) -> np.ndarray:
        # t in [0, duration]
        alpha = t / max(duration, 1e-6)
        z = zoom_start + (zoom_end - zoom_start) * alpha
        pan_x = pan_start[0] + (pan_end[0] - pan_start[0]) * alpha
        pan_y = pan_start[1] + (pan_end[1] - pan_start[1]) * alpha

        # Effective viewport size within the large canvas
        view_w = int(target_w / z)
        view_h = int(target_h / z)

        # Pan is expressed as fraction of remaining margin relative to center
        max_offset_x = (work_w - view_w) // 2
        max_offset_y = (work_h - view_h) // 2
        off_x = int(pan_x * max_offset_x)
        off_y = int(pan_y * max_offset_y)

        x1 = max(0, cx - view_w // 2 + off_x)
        y1 = max(0, cy - view_h // 2 + off_y)
        x2 = min(work_w, x1 + view_w)
        y2 = min(work_h, y1 + view_h)

        crop = framed_large[y1:y2, x1:x2]
        if crop.shape[0] <= 0 or crop.shape[1] <= 0:
            return np.zeros((target_h, target_w, 3), dtype=np.uint8)

        frame = np.array(Image.fromarray(crop).resize((target_w, target_h), Image.LANCZOS))
        return frame

    return mpy.VideoClip(make_frame=make_frame, duration=duration).set_fps(fps)


def try_depth_map_opencv(image_rgb: np.ndarray) -> Optional[np.ndarray]:
    """
    Try to compute a MiDaS depth map using OpenCV DNN with a small ONNX model.
    Returns a depth map normalized to [0,1] or None on failure.
    """
    try:
        import cv2  # noqa: F401
    except Exception:
        return None

    try:
        import cv2

        model_dir = os.path.join(os.path.expanduser("~"), ".cache", "midas")
        os.makedirs(model_dir, exist_ok=True)
        model_path = os.path.join(model_dir, "midas_v2_1_small.onnx")
        if not os.path.exists(model_path):
            # Download small MiDaS model
            import urllib.request
            url = "https://github.com/isl-org/MiDaS/releases/download/v2_1_small/midas_v2_1_small.onnx"
            urllib.request.urlretrieve(url, model_path)

        net = cv2.dnn.readNet(model_path)
        # Prefer CUDA if available
        try:
            net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
            net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA_FP16)
        except Exception:
            pass

        input_blob = cv2.dnn.blobFromImage(image_rgb, 1/255.0, (256, 256), mean=(0.485, 0.456, 0.406), swapRB=True, crop=False)
        net.setInput(input_blob)
        depth_map = net.forward()[0, 0]
        depth_map = cv2.resize(depth_map, (image_rgb.shape[1], image_rgb.shape[0]))
        # Normalize to [0,1]
        depth_min = depth_map.min()
        depth_max = depth_map.max()
        if depth_max - depth_min > 1e-6:
            depth_map = (depth_map - depth_min) / (depth_max - depth_min)
        else:
            depth_map = np.zeros_like(depth_map)
        return depth_map
    except Exception:
        return None


def make_parallax_clip(
    base_image_rgb: np.ndarray,
    duration: float,
    fps: int,
    target_size: Tuple[int, int],
    max_translation_px: float = 20.0,
):
    target_w, target_h = target_size
    framed = letterbox_image(base_image_rgb, target_w, target_h)

    depth = try_depth_map_opencv(framed)
    if depth is None:
        # Fallback to Ken Burns if depth not available
        return make_ken_burns_clip(
            framed,
            duration,
            fps,
            target_size,
            zoom_start=1.06,
            zoom_end=1.15,
            pan_start=(-0.2, 0.0),
            pan_end=(0.2, 0.05),
        )

    def make_frame(t: float) -> np.ndarray:
        # camera moves slightly from left-top to right-bottom over time
        alpha = t / max(duration, 1e-6)
        tx = (alpha - 0.5) * 2.0 * max_translation_px  # in [-max, max]
        ty = (alpha - 0.5) * 1.5 * max_translation_px

        # nearer pixels (smaller depth) move more; invert depth for parallax
        parallax_strength = (1.0 - depth)
        flow_x = parallax_strength * tx
        flow_y = parallax_strength * ty

        yy, xx = np.meshgrid(np.arange(target_h), np.arange(target_w), indexing="ij")
        map_x = (xx + flow_x).astype(np.float32)
        map_y = (yy + flow_y).astype(np.float32)

        try:
            import cv2
            warped = cv2.remap(framed, map_x, map_y, interpolation=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
        except Exception:
            # If OpenCV remap is not available, fallback to PIL-based nearest remap (slower, coarser)
            coords_x = np.clip(map_x, 0, target_w - 1).astype(np.int32)
            coords_y = np.clip(map_y, 0, target_h - 1).astype(np.int32)
            warped = framed[coords_y, coords_x]

        return warped

    return mpy.VideoClip(make_frame=make_frame, duration=duration).set_fps(fps)


def try_svd_clip(
    image_path: str,
    duration: float,
    fps: int,
    target_size: Tuple[int, int],
) -> Optional[mpy.VideoClip]:
    """
    Attempt to generate a short clip using Stable Video Diffusion (SVD).
    Requires a compatible diffusers version and a CUDA GPU. Returns None on failure.
    """
    try:
        import torch
        from diffusers import StableVideoDiffusionPipeline
    except Exception:
        return None

    try:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        if device != "cuda":
            return None

        pipe = StableVideoDiffusionPipeline.from_pretrained(
            "stabilityai/stable-video-diffusion-img2vid-xt",
            torch_dtype=torch.float16,
            variant="fp16",
        )
        pipe = pipe.to(device)
        pipe.enable_model_cpu_offload()

        # num_frames based on duration and fps, but SVD typically outputs ~14 frames per sample
        num_frames = max(8, min(32, int(duration * fps)))

        image = Image.open(image_path).convert("RGB")
        result = pipe(
            image, num_frames=num_frames, decode_chunk_size=4, motion_bucket_id=127, noise_aug_strength=0.1
        )
        frames = result.frames[0]  # List[PIL.Image]

        # Resize frames to target size with letterbox
        target_w, target_h = target_size
        processed_frames = []
        for fr in frames:
            fr_np = np.array(fr.convert("RGB"))
            processed_frames.append(letterbox_image(fr_np, target_w, target_h))

        clip = mpy.ImageSequenceClip(processed_frames, fps=fps)
        # If needed, loop or trim to match duration
        if clip.duration < duration:
            loops = math.ceil(duration / clip.duration)
            clip = mpy.concatenate_videoclips([clip] * loops).set_duration(duration)
        elif clip.duration > duration:
            clip = clip.subclip(0, duration)
        return clip
    except Exception:
        return None


def build_clips(
    image_paths: List[str],
    method: str,
    clip_duration: float,
    fps: int,
    target_size: Tuple[int, int],
) -> List[mpy.VideoClip]:
    clips: List[mpy.VideoClip] = []
    for idx, img_path in enumerate(image_paths):
        base = load_image_as_rgb(img_path)
        if method == "svd":
            svd_clip = try_svd_clip(img_path, duration=clip_duration, fps=fps, target_size=target_size)
            if svd_clip is not None:
                clips.append(svd_clip)
                continue
            # Fall through to parallax if SVD not available
            method_fallback = "parallax"
        else:
            method_fallback = method

        if method_fallback == "parallax":
            clip = make_parallax_clip(base, duration=clip_duration, fps=fps, target_size=target_size)
        else:
            # kenburns
            # alternate directions for variety
            dir_cycle = [(-0.2, 0.0, 0.2, 0.05), (0.2, 0.0, -0.2, -0.05), (0.0, -0.2, 0.0, 0.2)]
            d = dir_cycle[idx % len(dir_cycle)]
            clip = make_ken_burns_clip(
                base,
                duration=clip_duration,
                fps=fps,
                target_size=target_size,
                zoom_start=1.05,
                zoom_end=1.18,
                pan_start=(d[0], d[1]),
                pan_end=(d[2], d[3]),
            )
        clips.append(clip)
    return clips


def main():
    parser = argparse.ArgumentParser(description="Animate a set of images into a stitched video with effects.")
    parser.add_argument("--input_dir", required=True, help="Directory containing input images")
    parser.add_argument("--out_dir", required=True, help="Directory to write outputs (clips + final video)")
    parser.add_argument("--audio", default=None, help="Optional narration audio to align duration and mix")
    parser.add_argument("--method", choices=["kenburns", "parallax", "svd"], default="kenburns", help="Animation method")
    parser.add_argument("--fps", type=int, default=24, help="Frames per second for output")
    parser.add_argument("--clip_seconds", type=float, default=4.0, help="Per-image clip duration if no audio alignment")
    parser.add_argument("--resolution", default="1280x720", help="Output resolution WxH, e.g., 1280x720")
    parser.add_argument("--transition_seconds", type=float, default=0.5, help="Crossfade duration between clips")
    parser.add_argument("--video_name", default="story_video.mp4", help="Name of the final video file")
    parser.add_argument("--export_clips", action="store_true", help="Export individual clips for each image")

    args = parser.parse_args()

    input_dir = os.path.abspath(args.input_dir)
    out_dir = os.path.abspath(args.out_dir)
    os.makedirs(out_dir, exist_ok=True)
    clips_dir = os.path.join(out_dir, "clips")
    if args.export_clips:
        os.makedirs(clips_dir, exist_ok=True)

    images = list_images(input_dir)
    if not images:
        print(f"No images found in {input_dir}", file=sys.stderr)
        sys.exit(1)

    target_w, target_h = parse_resolution(args.resolution)
    fps = max(1, args.fps)

    audio_clip = None
    audio_duration = None
    if args.audio and os.path.exists(args.audio):
        try:
            audio_clip = mpy.AudioFileClip(args.audio)
            audio_duration = audio_clip.duration
        except Exception as e:
            print(f"Warning: failed to load audio '{args.audio}': {e}", file=sys.stderr)
            audio_clip = None
            audio_duration = None

    # Determine per-clip duration
    if audio_duration is not None:
        total_transitions = max(0, len(images) - 1) * args.transition_seconds
        usable = max(0.5, audio_duration - total_transitions)
        clip_seconds = max(1.0, usable / len(images))
    else:
        clip_seconds = args.clip_seconds

    # Build animated clips
    print(f"Building clips with method={args.method}, clip_seconds={clip_seconds:.2f} ...")
    animated_clips = build_clips(
        images,
        method=args.method,
        clip_duration=clip_seconds,
        fps=fps,
        target_size=(target_w, target_h),
    )

    # Optionally export individual clips
    if args.export_clips:
        for idx, clip in enumerate(animated_clips):
            name = os.path.splitext(os.path.basename(images[idx]))[0]
            clip_path = os.path.join(clips_dir, f"{name}.mp4")
            clip.write_videofile(clip_path, fps=fps, codec="libx264", audio=False, verbose=False, logger=None)

    # Apply crossfades and stitch
    print("Stitching clips with crossfades ...")
    transition = max(0.0, args.transition_seconds)
    stitched = None
    for i, cl in enumerate(animated_clips):
        if i == 0:
            stitched = cl
        else:
            stitched = mpy.concatenate_videoclips(
                [stitched, cl.set_start(max(0, stitched.duration - transition)).crossfadein(transition)],
                method="compose",
            )

    assert stitched is not None

    # Mix audio if provided
    if audio_clip is not None:
        # Fit durations: trim or pad last video duration slightly to audio
        final_duration = max(stitched.duration, audio_clip.duration)
        stitched = stitched.set_duration(final_duration)
        audio = audio_clip.set_duration(final_duration)
        stitched = stitched.set_audio(audio)

    # Export final video
    out_path = os.path.join(out_dir, args.video_name)
    print(f"Writing final video to {out_path} ...")
    stitched.write_videofile(
        out_path,
        fps=fps,
        codec="libx264",
        audio_codec="aac" if audio_clip is not None else None,
        verbose=False,
        logger=None,
    )

    print("Done.")


if __name__ == "__main__":
    main()

