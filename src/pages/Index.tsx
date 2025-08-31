import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BetalMascot from '@/components/BetalMascot';
import StoryPlayer from '@/components/StoryPlayer';
import ThemeSelector from '@/components/ThemeSelector';
import QuestionModal from '@/components/QuestionModal';
import { toast } from 'sonner';

const Index = () => {
  const [gameState, setGameState] = useState<'sleeping' | 'awake' | 'story' | 'question'>('sleeping');
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [betalMood, setBetalMood] = useState<'calm' | 'angry'>('calm');
  const [coins, setCoins] = useState<number>(0);
  const [dontKnowCount, setDontKnowCount] = useState<number>(0);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  const buildQuestionForTheme = (theme: string) => {
    if (theme === 'wisdom') {
      return {
        question: "What best reflects the story's wisdom?",
        options: [
          'Quick wealth matters most',
          'Words can reveal truth and justice',
          'Might makes right',
          'Silence is always the answer'
        ],
        correctAnswer: 1,
        moral: 'True wisdom turns deceit into truth and upholds justice.'
      };
    }
    if (theme === 'courage') {
      return {
        question: 'What did the story teach about courage?',
        options: [
          'Fear always wins',
          'Bold action weakens fear',
          'Strength is only physical',
          'Silence solves danger'
        ],
        correctAnswer: 1,
        moral: 'Courage grows when we act despite fear.'
      };
    }
    if (theme === 'kindness') {
      return {
        question: 'What is the heart of kindness in the tale?',
        options: [
          'Keeping everything for oneself',
          'Sharing even when you have little',
          'Waiting for rewards first',
          'Helping only the powerful'
        ],
        correctAnswer: 1,
        moral: 'Kindness shared multiplies and nourishes many.'
      };
    }
    if (theme === 'justice') {
      return {
        question: 'How was justice revealed?',
        options: [
          'By harsh punishment',
          'Through compassion revealing the truth',
          'By ignoring feelings',
          'By chance alone'
        ],
        correctAnswer: 1,
        moral: 'True justice is guided by compassion and truth.'
      };
    }
    // default generic
    return {
      question: 'What is the key lesson of this story?',
      options: ['Kindness', 'Wisdom', 'Courage', 'Justice'],
      correctAnswer: 0,
      moral: 'Goodness brings lasting rewards.'
    };
  };

  // Restore session state
  useEffect(() => {
    try {
      const storedCoins = sessionStorage.getItem('betal:coins');
      const storedDontKnow = sessionStorage.getItem('betal:dontKnowCount');
      const storedCooldown = sessionStorage.getItem('betal:cooldownUntil');
      if (storedCoins) setCoins(parseInt(storedCoins, 10) || 0);
      if (storedDontKnow) setDontKnowCount(parseInt(storedDontKnow, 10) || 0);
      if (storedCooldown) {
        const ts = parseInt(storedCooldown, 10) || 0;
        if (ts > Date.now()) setCooldownUntil(ts);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  // Persist session state
  useEffect(() => {
    try { sessionStorage.setItem('betal:coins', String(coins)); } catch {}
  }, [coins]);
  useEffect(() => {
    try { sessionStorage.setItem('betal:dontKnowCount', String(dontKnowCount)); } catch {}
  }, [dontKnowCount]);
  useEffect(() => {
    try {
      if (cooldownUntil) {
        sessionStorage.setItem('betal:cooldownUntil', String(cooldownUntil));
      } else {
        sessionStorage.removeItem('betal:cooldownUntil');
      }
    } catch {}
  }, [cooldownUntil]);

  // Cooldown ticker
  useEffect(() => {
    if (!cooldownUntil) return;
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldownRemaining(remaining);
      if (remaining <= 0) {
        setCooldownUntil(null);
        clearInterval(id);
      }
    }, 250);
    return () => clearInterval(id);
  }, [cooldownUntil]);
  
  const handleWakeBetal = () => {
    if (gameState === 'sleeping') {
      setGameState('awake');
      toast.success("Betal awakens! Choose a theme for your story...");
    }
  };

const handleThemeSelect = async (theme: string) => {
  if (cooldownUntil && Date.now() < cooldownUntil) {
    toast.error('You are under Betal\'s curse. Please wait for the cooldown.');
    return;
  }
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
    setCurrentTheme(theme);

    // attach themed Q/A if not present in generated data
    const qa = buildQuestionForTheme(theme);
    setSelectedStory({ ...chosen, ...qa });

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

  // Handle answer outcome from QuestionModal
  const handleAnswerQuestion = (result: { outcome: 'correct' | 'incorrect' | 'dont_know'; selectedIndex?: number }) => {
    if (result.outcome === 'correct') {
      setCoins(prev => prev + 1);
      setBetalMood('angry');
      toast.success('Correct! You earned a coin.');
    } else if (result.outcome === 'incorrect') {
      setBetalMood('calm');
      toast.error('Incorrect. Betal curses you for 30 seconds.');
      setCooldownUntil(Date.now() + 30_000);
    } else {
      // dont_know
      setBetalMood('calm');
      setDontKnowCount(prev => {
        const next = prev + 1;
        if (next >= 3) {
          toast.error("You've reached the 'I don't know' limit. Betal curses you!");
        } else {
          toast.message("You admitted you don't know.");
        }
        return next;
      });
      setCooldownUntil(Date.now() + 30_000);
    }

    setTimeout(() => {
      setGameState('sleeping');
      setBetalMood('calm');
      setSelectedStory(null);
    }, 3000);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-center bg-cover bg-fixed"
      style={{ backgroundImage: "url('/dark_forest.svg')" }}
    >
      {/* Foreground darkening overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
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
            <div className="mb-4 text-purple-200">
              Coins: <span className="font-bold text-purple-100">{coins}</span>
              {cooldownUntil && Date.now() < cooldownUntil && (
                <span className="ml-4 text-red-300">Curse active: {cooldownRemaining}s</span>
              )}
            </div>
            <ThemeSelector onThemeSelect={handleThemeSelect} disabled={Boolean(cooldownUntil && Date.now() < cooldownUntil)} cooldownRemaining={cooldownRemaining} />
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
            dontKnowUsed={dontKnowCount}
            dontKnowLimit={3}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
