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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Simulate audio playback for demo (replace with actual audio)
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          
          // Change images every 5 seconds
          const imageIndex = Math.floor(newTime / 5) % story.images.length;
          setCurrentImageIndex(imageIndex);
          
          // Update subtitles
          const subtitle = story.subtitles.find(sub => 
            newTime >= sub.start && newTime <= sub.end
          );
          setCurrentSubtitle(subtitle?.text || '');
          
          // End story after 30 seconds (demo)
          if (newTime >= 30) {
            setIsPlaying(false);
            onStoryEnd();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, story, onStoryEnd]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
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

        {/* Video/Image Display */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <img 
            src={story.images[currentImageIndex]} 
            alt={`Scene ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-1000 transform hover:scale-105"
          />
          
          {/* Parallax Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Mystical Particles Effect */}
          <div className="absolute inset-0 bg-[url('/particles.png')] opacity-20 animate-pulse"></div>
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
              style={{ width: `${(currentTime / 30) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-purple-300">
            <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
            <span>0:30</span>
          </div>
        </div>

        {/* Story Text Preview */}
        <div className="bg-black/30 rounded-lg p-4 border border-purple-400/20 mt-4">
          <p className="text-purple-100 text-sm leading-relaxed font-serif">
            {story.content.substring(0, 200)}...
          </p>
        </div>
      </div>

      <audio ref={audioRef} src={story.audioUrl} />
    </Card>
  );
};

export default StoryPlayer;