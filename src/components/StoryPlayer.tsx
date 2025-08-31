// components/StoryPlayer.tsx
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, Volume2 } from 'lucide-react';

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

interface StoryPropIn {
  id: string;
  title?: string;
  content?: string;
  images?: string[];
  audioUrl?: string;
  videoUrl?: string;
  subtitles?: Subtitle[];
}

interface StoryPlayerProps {
  story: StoryPropIn;
  onStoryEnd: () => void;
}

const normalizeUrl = (raw?: string | null) => {
  if (!raw) return null;
  // 1) convert backslashes to forward slashes
  let u = raw.replace(/\\+/g, '/');
  // 2) collapse multiple slashes
  u = u.replace(/\/+/g, '/');
  // 3) find first occurrence of "/generated_content" and slice from there
  const idx = u.indexOf('/generated_content');
  if (idx !== -1) {
    u = u.slice(idx);
  }
  // 4) ensure leading slash
  if (!u.startsWith('/')) u = '/' + u;
  return u;
};


const StoryPlayer = ({ story: inputStory, onStoryEnd }: StoryPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storyData, setStoryData] = useState<StoryPropIn | null>(null);
  const mediaRef = useRef<HTMLMediaElement | null>(null);

  // load generated metadata from public folder and pick matching id
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    setStoryData(null);

    const fetchMeta = async () => {
      try {
        const res = await fetch('/generated_content/all_stories_data.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
        const arr: StoryPropIn[] = await res.json();
        const found = arr.find(item => item.id === inputStory.id);
        if (!found) {
          // If not found, try using the provided inputStory directly
          if (mounted) {
            setStoryData({
              ...inputStory,
              subtitles: inputStory.subtitles ?? [],
            });
            setLoading(false);
          }
          return;
        }
        // normalize paths
        const normalized = {
          ...found,
          audioUrl: normalizeUrl(found.audioUrl) ?? normalizeUrl(found.videoUrl) ?? found.audioUrl ?? null,
          videoUrl: normalizeUrl(found.videoUrl) ?? null,
          images: found.images?.map(i => normalizeUrl(i) || i) ?? [],
          subtitles: found.subtitles ?? [],
        } as StoryPropIn;
        if (mounted) {
          setStoryData(normalized);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('StoryPlayer fetch error:', err);
        // fallback to inputStory if available
        if (mounted) {
          setError('Failed to load story metadata; using provided story if available.');
          setStoryData({
            ...inputStory,
            subtitles: inputStory.subtitles ?? [],
          });
          setLoading(false);
        }
      }
    };

    fetchMeta();
    return () => {
      mounted = false;
    };
  }, [inputStory]);

  // attach media event listeners (works for <video> or <audio>)
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const handleTimeUpdate = () => {
      const t = media.currentTime || 0;
      setCurrentTime(t);
      const subs = storyData?.subtitles ?? [];
      const subtitle = subs.find(sub => t >= sub.start && t <= sub.end);
      setCurrentSubtitle(subtitle?.text || '');
    };

    const handleLoadedMetadata = () => {
      setDuration(media.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onStoryEnd();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('loadedmetadata', handleLoadedMetadata);
    media.addEventListener('ended', handleEnded);
    media.addEventListener('play', handlePlay);
    media.addEventListener('pause', handlePause);

    return () => {
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('loadedmetadata', handleLoadedMetadata);
      media.removeEventListener('ended', handleEnded);
      media.removeEventListener('play', handlePlay);
      media.removeEventListener('pause', handlePause);
    };
  }, [storyData, onStoryEnd]);

  // when new storyData arrives, reset playback state
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentSubtitle('');
    setDuration(0);
    if (mediaRef.current) {
      // reload media element
      try {
        mediaRef.current.load?.();
      } catch (e) {
        // ignore
      }
    }
  }, [storyData]);

  const togglePlay = async () => {
    const media = mediaRef.current;
    if (!media) return;
    if (media.paused) {
      try {
        // play returns a promise
        await media.play();
      } catch (e) {
        console.warn('play prevented', e);
      }
    } else {
      media.pause();
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || Number.isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // decide which media source to render (video preferred)
  const mediaSrc = storyData?.videoUrl || storyData?.audioUrl || null;
  const isVideo = Boolean(storyData?.videoUrl);

  return (
    <Card className="bg-black/50 border-purple-400/30 p-6">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white font-serif mb-2">
            {storyData?.title ?? inputStory.title ?? 'Untitled'}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Media display */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
          {loading && <div className="text-purple-200">Loading media...</div>}

          {!loading && !mediaSrc && (
            <div className="text-center text-purple-200 p-6">
              <p>No media available for this story.</p>
            </div>
          )}

          {!loading && mediaSrc && isVideo && (
            <video
              ref={el => (mediaRef.current = el)}
              src={mediaSrc}
              className="w-full h-full object-cover"
              playsInline
              preload="metadata"
              controls={false}
            />
          )}

          {!loading && mediaSrc && !isVideo && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              {/* show first image if present as poster */}
              {storyData?.images?.[0] ? (
                <img
                  src={storyData.images[0]}
                  alt="story poster"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center">
                  <span className="text-purple-100">Audio Story</span>
                </div>
              )}
              <audio
                ref={el => (mediaRef.current = el)}
                src={mediaSrc}
                preload="metadata"
              />
            </div>
          )}
        </div>

        {/* Subtitles */}
        {currentSubtitle && (
          <div className="mt-4">
            <div className="bg-black/80 rounded-lg p-4 border border-purple-400/50">
              <p className="text-white text-center font-medium leading-relaxed">
                {currentSubtitle}
              </p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6">
          <Button
            onClick={togglePlay}
            size="lg"
            disabled={!mediaSrc || loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Play Story
              </>
            )}
          </Button>

          <div className="flex items-center space-x-2 text-purple-200">
            <Volume2 className="w-5 h-5" />
            <span className="text-sm">Indian Accent</span>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-purple-300">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Short text */}
        <div className="bg-black/30 rounded-lg p-4 border border-purple-400/20 mt-4">
          <p className="text-purple-100 text-sm leading-relaxed font-serif">
            {storyData?.content ? (storyData.content.length > 200 ? `${storyData.content.substring(0, 200)}...` : storyData.content) : (inputStory.content ?? '')}
          </p>
        </div>

        {error && <div className="text-sm text-red-300">{error}</div>}
      </div>
    </Card>
  );
};

export default StoryPlayer;
