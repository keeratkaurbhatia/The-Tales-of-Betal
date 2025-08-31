import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import BetalMascot from '@/components/BetalMascot';
import StoryPlayer from '@/components/StoryPlayer';
import ThemeSelector from '@/components/ThemeSelector';
import QuestionModal from '@/components/QuestionModal';
import GameStats from '@/components/GameStats';
import { stories } from '@/data/stories';
import { useGameState } from '@/hooks/useGameState';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Index = () => {
  const [gameState, setGameState] = useState<'sleeping' | 'awake' | 'story' | 'question'>('sleeping');
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [betalMood, setBetalMood] = useState<'calm' | 'angry'>('calm');
  const [curseTimer, setCurseTimer] = useState<number>(0);
  
  const {
    coins,
    isCursed,
    curseTimeRemaining,
    dontKnowCount,
    dontKnowLocked,
    maxDontKnow,
    addCoin,
    applyCurse,
    useDontKnow,
    resetGame,
  } = useGameState();

  // Update curse timer for display
  useEffect(() => {
    if (isCursed) {
      const interval = setInterval(() => {
        setCurseTimer(curseTimeRemaining);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isCursed, curseTimeRemaining]);
  
  const handleWakeBetal = () => {
    if (gameState === 'sleeping') {
      if (isCursed) {
        toast.error(`Betal is still angry! Wait ${Math.ceil(curseTimeRemaining / 1000)} more seconds...`);
        return;
      }
      setGameState('awake');
      toast.success("🎭 Betal awakens from his ancient slumber! Choose a theme for your tale...");
    }
  };

  const handleThemeSelect = (theme: string) => {
    if (isCursed) {
      toast.error("You are cursed! Betal will not tell stories while you are under his curse!");
      return;
    }

    const themeStories = stories.filter(story => story.theme === theme);
    const randomStory = themeStories[Math.floor(Math.random() * themeStories.length)];
    setSelectedStory(randomStory);
    setGameState('story');
    
    const themeNames = {
      wisdom: 'Wisdom',
      courage: 'Courage', 
      kindness: 'Kindness',
      justice: 'Justice'
    };
    toast.success(`🎭 Betal will tell you a tale of ${themeNames[theme as keyof typeof themeNames]}...`);
  };

  const handleStoryEnd = () => {
    setGameState('question');
  };

  const handleAnswerQuestion = (correct: boolean, usedDontKnowOption: boolean) => {
    if (correct) {
      addCoin();
      setBetalMood('calm');
      toast.success("🪙 Correct! You earned a Wisdom Coin!");
    } else if (usedDontKnowOption) {
      useDontKnow();
      setBetalMood('calm');
      if (dontKnowCount + 1 >= maxDontKnow) {
        toast.warning("🔒 You have used all your mercy! Betal will no longer accept 'I don't know'!");
      } else {
        toast.info(`🙏 Betal appreciates your honesty. ${maxDontKnow - (dontKnowCount + 1)} mercies remaining.`);
      }
    } else {
      applyCurse();
      setBetalMood('angry');
      toast.error("⚡ Wrong answer! You are cursed for 30 seconds!");
    }

    setTimeout(() => {
      setGameState('sleeping');
      setBetalMood('calm');
      setSelectedStory(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Mystical Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      
      {/* Game Stats */}
      <GameStats
        coins={coins}
        isCursed={isCursed}
        curseTimeRemaining={curseTimeRemaining}
        dontKnowCount={dontKnowCount}
        maxDontKnow={maxDontKnow}
        dontKnowLocked={dontKnowLocked}
      />

      {/* Reset Button (for testing) */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={resetGame}
          variant="outline"
          size="sm"
          className="bg-black/50 border-purple-400/50 text-purple-200 hover:bg-purple-900/50"
        >
          🔄 Reset Game
        </Button>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
        {gameState === 'sleeping' && (
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold text-white mb-4 font-serif">
                🎭 The Tales of Betal 🎭
              </h1>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
                Tap on the ancient spirit Betal to awaken him and listen to mystical stories from the past. 
                Answer his riddles correctly to earn Wisdom Coins!
              </p>
              
              {isCursed && (
                <div className="p-4 bg-red-900/50 border-2 border-red-400/50 rounded-lg max-w-md mx-auto animate-pulse">
                  <p className="text-red-200 font-bold">⚡ CURSED ⚡</p>
                  <p className="text-red-300 text-sm">
                    Betal is angry! Wait {Math.ceil(curseTimeRemaining / 1000)} seconds...
                  </p>
                </div>
              )}
            </div>
            
            <div 
              className={cn(
                "cursor-pointer transform transition-all duration-300",
                isCursed 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 hover:drop-shadow-2xl"
              )}
              onClick={handleWakeBetal}
            >
              <BetalMascot state="sleeping" mood={betalMood} />
            </div>
            
            <p className={cn(
              "text-sm animate-pulse",
              isCursed ? "text-red-300" : "text-purple-300"
            )}>
              {isCursed ? "⚡ Betal is cursed and cannot be awakened ⚡" : "✨ Tap on Betal to wake the ancient storyteller ✨"}
            </p>

            {/* Game Instructions */}
            <div className="mt-8 p-6 bg-black/40 rounded-lg border border-purple-400/30 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-orange-200 mb-3 font-serif">🎮 Game Rules</h3>
              <div className="text-sm text-purple-200 space-y-2 text-left">
                <p>🪙 <strong>Correct Answer:</strong> Earn 1 Wisdom Coin</p>
                <p>⚡ <strong>Wrong Answer:</strong> Get cursed for 30 seconds</p>
                <p>🙏 <strong>"I don't know":</strong> Limited to 3 uses only</p>
                <p>🎭 <strong>Stories:</strong> 5 tales per theme, randomly selected</p>
              </div>
            </div>
          </div>
        )}

        {gameState === 'awake' && (
          <div className="text-center space-y-8">
            <BetalMascot state="awake" mood={betalMood} />
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white font-serif">
                🕉️ Choose Your Sacred Theme 🕉️
              </h2>
              <p className="text-purple-200 text-lg max-w-2xl mx-auto">
                What manner of ancient wisdom would you hear tonight, seeker?
              </p>
            </div>
            <ThemeSelector onThemeSelect={handleThemeSelect} />
          </div>
        )}

        {gameState === 'story' && selectedStory && (
          <div className="w-full max-w-5xl">
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
            dontKnowLocked={dontKnowLocked}
          />
        )}
      </div>
    </div>
  );
};

export default Index;