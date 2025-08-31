import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BetalMascot from '@/components/BetalMascot';
import StoryPlayer from '@/components/StoryPlayer';
import ThemeSelector from '@/components/ThemeSelector';
import QuestionModal from '@/components/QuestionModal';
import { stories } from '@/data/stories';
import { toast } from 'sonner';
import GameStats from '@/components/GameStats';

const Index = () => {
  const [gameState, setGameState] = useState<'sleeping' | 'awake' | 'story' | 'question'>('sleeping');
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [betalMood, setBetalMood] = useState<'calm' | 'angry'>('calm');

  // Game meta: coins, curses, and don't know limit
  const [coins, setCoins] = useState<number>(0);
  const [isCursed, setIsCursed] = useState<boolean>(false);
  const [curseEndsAt, setCurseEndsAt] = useState<number | null>(null);
  const [dontKnowCount, setDontKnowCount] = useState<number>(0);
  const maxDontKnow = 3;
  
  const handleWakeBetal = () => {
    if (gameState === 'sleeping') {
      setGameState('awake');
      toast.success("Betal awakens! Choose a theme for your story...");
    }
  };

  const handleThemeSelect = (theme: string) => {
    if (isCursed && curseEndsAt && Date.now() < curseEndsAt) {
      const remaining = Math.ceil((curseEndsAt - Date.now()) / 1000);
      toast.error(`You are cursed. Wait ${remaining}s before choosing another tale.`);
      return;
    }
    const themeStories = stories.filter(story => story.theme === theme);
    const randomStory = themeStories[Math.floor(Math.random() * themeStories.length)];
    setSelectedStory(randomStory);
    setGameState('story');
  };

  const handleStoryEnd = () => {
    setGameState('question');
  };

  const handleAnswerQuestion = (correct: boolean, usedDontKnow: boolean) => {
    if (usedDontKnow) {
      setDontKnowCount((c) => Math.min(maxDontKnow, c + 1));
      setBetalMood('calm');
    } else if (correct) {
      setCoins((c) => c + 1);
      setBetalMood('calm');
    } else {
      // Apply 30s curse on incorrect answer
      const durationMs = 30_000;
      const endsAt = Date.now() + durationMs;
      setIsCursed(true);
      setCurseEndsAt(endsAt);
      setBetalMood('angry');
    }

    setTimeout(() => {
      setGameState('sleeping');
      setBetalMood('calm');
      setSelectedStory(null);
    }, 3000);
  };

  // Clear curse state once it expires
  useEffect(() => {
    if (!isCursed || !curseEndsAt) return;
    const interval = setInterval(() => {
      if (Date.now() >= curseEndsAt) {
        setIsCursed(false);
        setCurseEndsAt(null);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isCursed, curseEndsAt]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
        <GameStats 
          coins={coins}
          isCursed={isCursed}
          curseTimeRemaining={Math.max(0, (curseEndsAt ?? Date.now()) - Date.now())}
          dontKnowCount={dontKnowCount}
          maxDontKnow={maxDontKnow}
          dontKnowLocked={dontKnowCount >= maxDontKnow}
        />

        {gameState === 'sleeping' && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-white mb-4 font-serif">
                The Tales of Betal
              </h1>
              <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                Tap on the ancient spirit Betal to awaken him and listen to mystical stories from the past
              </p>
            </div>
            
            <div 
              className="cursor-pointer transform transition-transform hover:scale-105"
              onClick={handleWakeBetal}
            >
              <BetalMascot state="sleeping" mood={betalMood} />
            </div>
            
            <p className="text-sm text-purple-300 animate-pulse">
              Tap on Betal to wake him up
            </p>
          </div>
        )}

        {gameState === 'awake' && (
          <div className="text-center space-y-8">
            <BetalMascot state="awake" mood={betalMood} />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white font-serif">
                Choose Your Story Theme
              </h2>
              <p className="text-purple-200">
                What kind of tale would you like to hear tonight?
              </p>
            </div>
            <ThemeSelector onThemeSelect={handleThemeSelect} />
          </div>
        )}

        {gameState === 'story' && selectedStory && (
          <div className="w-full max-w-4xl">
            <StoryPlayer 
              story={selectedStory} 
              onStoryEnd={handleStoryEnd}
            />
          </div>
        )}

        {gameState === 'question' && selectedStory && (
          <QuestionModal
            story={selectedStory}
            betalMood={betalMood}
            onAnswer={handleAnswerQuestion}
            dontKnowLocked={dontKnowCount >= maxDontKnow}
            dontKnowCount={dontKnowCount}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
