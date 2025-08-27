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
    subtitles: Array<{ start: number; end: number; text: string }>;
  };
  onStoryEnd: () => void;
}

const StoryPlayer = ({ story, onStoryEnd }: StoryPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const t = video.currentTime;
      setCurrentTime(t);
      const subtitle = story.subtitles.find(sub => t >= sub.start && t <= sub.end);
      setCurrentSubtitle(subtitle?.text || '');
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onStoryEnd();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [story, onStoryEnd]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  const videoSrc = `/generated_content/videos/${story.id}_video.mp4`;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-black/50 border-purple-400/30 p-6">
      <div className="space-y-6">
        {/* Story Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white font-serif mb-2">
            {story.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Video Display */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            controls={false}
            playsInline
          />
        </div>
        
        {/* Subtitles - Moved outside video container */}
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
            <span className="text-sm">Male Voice • Indian Accent</span>
          </div>
        </div>

        {/* Progress Bar */}
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

        {/* Story Text Preview */}
        <div className="bg-black/30 rounded-lg p-4 border border-purple-400/20 mt-4">
          <p className="text-purple-100 text-sm leading-relaxed font-serif">
            {story.content.substring(0, 200)}...
          </p>
        </div>
      </div>

      {/* Video element handles audio; no separate audio tag needed */}
    </Card>
  );
};

export default StoryPlayer;