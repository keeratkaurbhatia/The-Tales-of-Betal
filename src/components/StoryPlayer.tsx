import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, Volume2 } from 'lucide-react';

interface StoryPlayerProps {
  story: {
    id: string;
    title: string;
    content: string;
    images: string[];
    audioUrl: string;
    videoUrl?: string;
    subtitles: Array<{ start: number; end: number; text: string }>;
  };
  onStoryEnd: () => void;
}

const StoryPlayer = ({ story, onStoryEnd }: StoryPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [useVideo, setUseVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Check if video exists, fallback to audio + images
    const checkVideoExists = async () => {
      if (story.videoUrl) {
        try {
          const response = await fetch(story.videoUrl, { method: 'HEAD' });
          setUseVideo(response.ok);
        } catch {
          setUseVideo(false);
        }
      } else {
        setUseVideo(false);
      }
    };
    
    checkVideoExists();
  }, [story.videoUrl]);

  useEffect(() => {
    const mediaElement = useVideo ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    const handleTimeUpdate = () => {
      const t = mediaElement.currentTime;
      setCurrentTime(t);
      const subtitle = story.subtitles.find(sub => t >= sub.start && t <= sub.end);
      setCurrentSubtitle(subtitle?.text || '');
    };

    const handleLoadedMetadata = () => {
      setDuration(mediaElement.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onStoryEnd();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    mediaElement.addEventListener('timeupdate', handleTimeUpdate);
    mediaElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    mediaElement.addEventListener('ended', handleEnded);
    mediaElement.addEventListener('play', handlePlay);
    mediaElement.addEventListener('pause', handlePause);

    return () => {
      mediaElement.removeEventListener('timeupdate', handleTimeUpdate);
      mediaElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      mediaElement.removeEventListener('ended', handleEnded);
      mediaElement.removeEventListener('play', handlePlay);
      mediaElement.removeEventListener('pause', handlePause);
    };
  }, [story, onStoryEnd, useVideo]);

  const togglePlay = () => {
    const mediaElement = useVideo ? videoRef.current : audioRef.current;
    if (!mediaElement) return;
    if (mediaElement.paused) {
      void mediaElement.play();
    } else {
      mediaElement.pause();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-black/60 border-purple-400/40 p-6 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Story Title */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white font-serif mb-3">
            {story.title}
          </h2>
          <div className="w-40 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
          <p className="text-orange-200 mt-2 text-sm">
            🎭 An Ancient Tale from Betal 🎭
          </p>
        </div>

        {/* Media Display */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video border-2 border-purple-400/30">
          {useVideo && story.videoUrl ? (
            <video
              ref={videoRef}
              src={story.videoUrl}
              className="w-full h-full object-cover"
              controls={false}
              playsInline
            />
          ) : (
            <div className="relative w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
              {/* Fallback: Show story images as slideshow */}
              <div className="absolute inset-0">
                {story.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Scene ${index + 1}`}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                      Math.floor(currentTime / 5) % story.images.length === index ? "opacity-100" : "opacity-0"
                    )}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4">🎭</div>
                <p className="text-white text-lg font-serif">Audio Story Mode</p>
              </div>
              <audio
                ref={audioRef}
                src={story.audioUrl}
                className="hidden"
              />
            </div>
          )}
        </div>
        
        {/* Subtitles */}
        {currentSubtitle && (
          <div className="mt-4">
            <div className="bg-black/80 rounded-lg p-4 border-2 border-orange-400/50 backdrop-blur-sm">
              <p className="text-white text-center font-medium leading-relaxed text-lg">
                {currentSubtitle}
              </p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center space-x-8">
          <Button
            onClick={togglePlay}
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-lg"
          >
            {isPlaying ? (
              <>
                <Pause className="w-6 h-6 mr-3" />
                Pause Tale
              </>
            ) : (
              <>
                <Play className="w-6 h-6 mr-3" />
                Begin Tale
              </>
            )}
          </Button>
          
          <div className="flex items-center space-x-3 text-orange-200">
            <Volume2 className="w-6 h-6" />
            <div className="text-center">
              <div className="text-sm font-semibold">Ancient Voice</div>
              <div className="text-xs text-orange-300">Indian Accent</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="w-full bg-gray-800 rounded-full h-3 border border-purple-400/30">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-400 h-3 rounded-full transition-all duration-300 shadow-lg"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-purple-300">
            <span>{formatTime(currentTime)}</span>
            <span className="text-orange-300">🎭 Betal's Tale</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Story Text Preview */}
        <div className="bg-black/40 rounded-lg p-4 border border-purple-400/20 mt-4">
          <p className="text-purple-100 text-sm leading-relaxed font-serif text-center">
            {story.content.substring(0, 200)}...
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StoryPlayer;