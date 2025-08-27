#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { glob } from 'glob';
import sharp from 'sharp';

ffmpeg.setFfmpegPath(ffmpegPath);

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.replace(/^--/, '');
      const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
      out[key] = val;
    }
  }
  return out;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function listImages(dir) {
  const patterns = ['*.png', '*.jpg', '*.jpeg', '*.webp', '*.bmp'];
  const files = patterns.flatMap(pattern => glob.sync(path.join(dir, pattern))).sort();
  return files;
}

async function generateFramesForImage(imagePath, framesDir, { duration, width, height, fps = 24 }) {
  const frames = Math.round(duration * fps);
  ensureDir(framesDir);
  const input = sharp(imagePath).ensureAlpha();
  const meta = await input.metadata();
  const inW = meta.width;
  const inH = meta.height;
  if (!inW || !inH) throw new Error('Invalid image dimensions');

  // Compute letterbox scale first
  const scale = Math.min(width / inW, height / inH);
  const baseW = Math.round(inW * scale);
  const baseH = Math.round(inH * scale);

  // Pre-render the letterboxed base
  const baseBuffer = await input
    .resize(baseW, baseH, { fit: 'cover' })
    .toBuffer();

  const background = { r: 0, g: 0, b: 0, alpha: 1 };

  for (let n = 0; n < frames; n++) {
    const t = n / Math.max(frames - 1, 1);
    const zoom = 1.0 + 0.12 * t; // 1.00 -> 1.12
    // subtle pan path
    const panX = (Math.sin(t * Math.PI * 2) * 0.06); // -6% to +6% of extra width
    const panY = (Math.cos(t * Math.PI) * 0.04); // -4% to +4% of extra height

    const zoomW = Math.round(width * zoom);
    const zoomH = Math.round(height * zoom);

    // Create canvas and composite base centered, then resize canvas up and crop back to target with pan offset
    const canvas = sharp({ create: { width, height, channels: 4, background } });
    const left = Math.floor((width - baseW) / 2);
    const top = Math.floor((height - baseH) / 2);
    const composed = await canvas
      .composite([{ input: baseBuffer, left, top }])
      .png()
      .toBuffer();

    // Resize for zoom
    const zoomed = sharp(composed).resize(zoomW, zoomH, { fit: 'fill' });
    const extraW = Math.max(0, zoomW - width);
    const extraH = Math.max(0, zoomH - height);
    const offsetX = Math.round(extraW * (0.5 + panX));
    const offsetY = Math.round(extraH * (0.5 + panY));
    const cropLeft = Math.max(0, Math.min(extraW, offsetX));
    const cropTop = Math.max(0, Math.min(extraH, offsetY));

    const framePath = path.join(framesDir, `frame_${String(n + 1).padStart(4, '0')}.png`);
    // Extract center crop with pan
    await zoomed.extract({ left: cropLeft, top: cropTop, width, height }).png().toFile(framePath);
  }
}

async function makeClipForImage(imagePath, outPath, { duration, width, height, fps = 24, workDir }) {
  const framesDir = path.join(workDir, `.frames_${path.parse(imagePath).name}`);
  await generateFramesForImage(imagePath, framesDir, { duration, width, height, fps });

  // Encode frames to H264
  const pattern = path.join(framesDir, 'frame_%04d.png');
  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(pattern)
      .inputOptions(['-framerate', String(fps)])
      .outputOptions(['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart'])
      .on('end', resolve)
      .on('error', reject)
      .save(outPath);
  });

  // Cleanup frames to save space
  try { fs.rmSync(framesDir, { recursive: true, force: true }); } catch {}
}

async function concatSimple(clips, outPath, { audio = null, workDir }) {
  // Use concat demuxer for stable stitch, then optionally mux audio
  const listPath = path.join(workDir, 'concat_list.txt');
  const listContent = clips.map(c => `file '${c.replace(/'/g, "'\\''")}'`).join('\n');
  fs.writeFileSync(listPath, listContent, 'utf8');

  const tempVideo = path.join(workDir, 'final_noaudio.mp4');

  // Step 1: concat
  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(listPath)
      .inputOptions(['-f', 'concat', '-safe', '0'])
      .outputOptions(['-c:v', 'libx264', '-pix_fmt', 'yuv420p'])
      .on('end', resolve)
      .on('error', reject)
      .save(tempVideo);
  });

  if (!audio) {
    fs.copyFileSync(tempVideo, outPath);
    return outPath;
  }

  // Step 2: mux audio, cut to shortest
  await new Promise((resolve, reject) => {
    ffmpeg()
      .addInput(tempVideo)
      .addInput(audio)
      .outputOptions(['-c:v', 'copy', '-c:a', 'aac', '-shortest'])
      .on('end', resolve)
      .on('error', reject)
      .save(outPath);
  });
  return outPath;
}

async function main() {
  const args = parseArgs();
  const inputDir = path.resolve(args.input_dir || 'generated_content/images');
  const outDir = path.resolve(args.out_dir || 'generated_content/videos');
  const audio = args.audio ? path.resolve(args.audio) : null;
  const resolution = (args.resolution || '1280x720').split('x').map(n => parseInt(n, 10));
  const width = resolution[0];
  const height = resolution[1];
  const clipSeconds = parseFloat(args.clip_seconds || '4.0');
  const transitionSeconds = parseFloat(args.transition_seconds || '0.6');

  ensureDir(outDir);
  const clipsDir = path.join(outDir, 'clips');
  ensureDir(clipsDir);

  const images = listImages(inputDir);
  if (images.length === 0) {
    console.error(`No images found in ${inputDir}`);
    process.exit(1);
  }

  const clipPaths = [];
  for (const img of images) {
    const name = path.parse(img).name;
    const out = path.join(clipsDir, `${name}.mp4`);
    // eslint-disable-next-line no-await-in-loop
    await makeClipForImage(img, out, { duration: clipSeconds, width, height, fps: 24, workDir: outDir });
    clipPaths.push(out);
  }

  const finalOut = path.join(outDir, args.video_name || 'story_video.mp4');
  await concatSimple(clipPaths, finalOut, { audio, workDir: outDir });
  console.log(`Done: ${finalOut}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

