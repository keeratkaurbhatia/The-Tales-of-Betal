import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BetalMascot from '@/components/BetalMascot';
import StoryPlayer from '@/components/StoryPlayer';
import ThemeSelector from '@/components/ThemeSelector';
import QuestionModal from '@/components/QuestionModal';
import { stories } from '@/data/stories';
import { toast } from 'sonner';

const Index = () => {
  const [gameState, setGameState] = useState<'sleeping' | 'awake' | 'story' | 'question'>('sleeping');
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [betalMood, setBetalMood] = useState<'calm' | 'angry'>('calm');
  
  const handleWakeBetal = () => {
    if (gameState === 'sleeping') {
      setGameState('awake');
      toast.success("Betal awakens! Choose a theme for your story...");
    }
  };

const handleThemeSelect = async (theme: string) => {
  try {
    const res = await fetch('/generated_content/all_stories_data.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch metadata (${res.status})`);
    const all: any[] = await res.json();
    const themeStories = all.filter(s => s.theme === theme || (s.tags && s.tags.includes(theme)));

    if (!themeStories.length) {
      toast.error(`No stories in that theme yet.`);
      console.warn('No themeStories for', theme);
      return;
    }

    const idx = Math.floor(Math.random() * themeStories.length);
    const chosen = themeStories[idx];

    // option A: pass full metadata so StoryPlayer uses it immediately
    setSelectedStory(chosen);

    // option B (lighter): pass only { id } and let StoryPlayer fetch canonical data itself:
    // setSelectedStory({ id: chosen.id });

    setGameState('story');
    
  } catch (err) {
    console.error('handleThemeSelect error', err);
    toast.error('Could not load stories — try again.');
  }
};

  const handleStoryEnd = () => {
    setGameState('question');
  };

  const handleAnswerQuestion = (answered: boolean) => {
    setBetalMood(answered ? 'angry' : 'calm');
    setTimeout(() => {
      setGameState('sleeping');
      setBetalMood('calm');
      setSelectedStory(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
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
          />
        )}
      </div>
    </div>
  );
};

export default Index;
