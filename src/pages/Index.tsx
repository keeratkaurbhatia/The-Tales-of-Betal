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

  // Per-story quiz data
const quizById: Record<string, { question: string; options: string[]; correctAnswer: number; moral: string }> = {
  'wisdom-1': {
    question: 'Which insight best explains how the monkey survived?',
    options: [
      'Luck favored him',
      'He outwitted brute force with presence of mind',
      'He was physically stronger',
      'He trusted the crocodile fully'
    ],
    correctAnswer: 1,
    moral: 'Wit reframes danger; presence of mind defeats brute force.'
  },
  'courage-1': {
    question: 'What transformed risk into rescue for the potter’s son?',
    options: [
      'The absence of fear',
      'Steady action despite fear',
      'Orders from elders',
      'Superior strength alone'
    ],
    correctAnswer: 1,
    moral: 'Courage is disciplined action, not the absence of fear.'
  },
  'kindness-1': {
    question: 'What does the crow’s return suggest about giving?',
    options: [
      'Kindness drains the giver',
      'Kindness often returns transformed',
      'Only grand gifts matter',
      'Gifts must be repaid at once'
    ],
    correctAnswer: 1,
    moral: 'Small kindnesses compound in unexpected ways.'
  },
  'justice-1': {
    question: 'How did truth surface in the washerman’s case?',
    options: [
      'By harsh punishment first',
      'By leaving it to fate',
      'By a clear test that made lies heavy',
      'By the loudest voice winning'
    ],
    correctAnswer: 2,
    moral: 'Fair tests illuminate truth; justice needs clarity, not noise.'
  },
  'wisdom-2': {
    question: 'When does wisdom most often speak?',
    options: [
      'Through constant talk',
      'In timely restraint',
      'By pleasing everyone',
      'By clever jokes alone'
    ],
    correctAnswer: 1,
    moral: 'Knowing when not to speak is itself wisdom.'
  },
  'courage-2': {
    question: 'What defines courage in the tiger cub’s act?',
    options: [
      'Being the biggest',
      'Freeing others despite danger',
      'Shouting the loudest',
      'Waiting for help'
    ],
    correctAnswer: 1,
    moral: 'Courage serves others at a cost to oneself.'
  },
  'kindness-2': {
    question: 'What did the traveler give back to the banyan tree’s kindness?',
    options: [
      'Gold and silver',
      'Stories and presence that nourished the giver',
      'Silence and departure',
      'A carved token'
    ],
    correctAnswer: 1,
    moral: 'Shared presence can be a gift as real as fruit and shade.'
  },
  'justice-2': {
    question: 'Why was the woodcutter rewarded?',
    options: [
      'He wanted the golden axe',
      'He chose truth over gain',
      'He guessed correctly',
      'He was simply lucky'
    ],
    correctAnswer: 1,
    moral: 'Justice honors the choice of truth over profit.'
  },
  'wisdom-3': {
    question: 'Birbal’s circle points to which understanding?',
    options: [
      'Power obeys power',
      'Truth returns to itself',
      'Silence is weakness',
      'Lengthy speech persuades most'
    ],
    correctAnswer: 1,
    moral: 'Symbols and silence can say what speeches cannot.'
  },
  'courage-3': {
    question: 'What turned fear into retreat for the dacoits?',
    options: [
      'Secret weapons',
      'Light and signal that summoned imagined strength',
      'Bargaining with thieves',
      'Quiet waiting'
    ],
    correctAnswer: 1,
    moral: 'Perception can be redirected by one brave signal.'
  },
  'kindness-3': {
    question: 'Why is half a roti “enough” here?',
    options: [
      'Because hunger was small',
      'Because intention multiplies small gifts',
      'Because kings need little',
      'Because wealth follows rank'
    ],
    correctAnswer: 1,
    moral: 'A small gift, given fully, becomes abundance.'
  },
  'justice-3': {
    question: 'What truly exposed the thief?',
    options: [
      'Magic from the judge',
      'A conscience fearing a simple test',
      'Pure accident',
      'Forceful interrogation'
    ],
    correctAnswer: 1,
    moral: 'Justice can invite truth by letting guilt reveal itself.'
  },
  'wisdom-4': {
    question: 'How did Tenali Raman’s wisdom work?',
    options: [
      'By force and threats',
      'By mirroring greed to reveal it',
      'By ignoring the problem',
      'By rewarding greed'
    ],
    correctAnswer: 1,
    moral: 'Clever mirrors make folly unmistakable.'
  },
  'courage-4': {
    question: 'What makes Abhimanyu’s act profound?',
    options: [
      'Certain victory was guaranteed',
      'Stepping into the unknown for a larger duty',
      'Superior weapons decided it',
      'A promised rescue'
    ],
    correctAnswer: 1,
    moral: 'Courage is duty embraced without guarantees.'
  },
  'kindness-4': {
    question: 'What does Shibi teach about protection?',
    options: [
      'Protect only the strong',
      'Offer words, not sacrifice',
      'Shield the vulnerable even at personal cost',
      'Avoid taking sides'
    ],
    correctAnswer: 2,
    moral: 'Compassion becomes real when it costs us something.'
  },
  'justice-4': {
    question: 'What revives justice in this tale?',
    options: [
      'Elegant rhetoric',
      'Unbending truthfulness under trial',
      'Random chance',
      'Favoritism from power'
    ],
    correctAnswer: 1,
    moral: 'Justice breathes through steadfast truth.'
  },
  'wisdom-5': {
    question: 'What is Chanakya’s warning in a single hair?',
    options: [
      'Details are trivial',
      'A small lapse can seed collapse',
      'Outcomes are random',
      'Blame preserves order'
    ],
    correctAnswer: 1,
    moral: 'Guard the small; empires fall through hairline cracks.'
  },
  'courage-5': {
    question: 'Where does Nachiketa’s courage live?',
    options: [
      'In battle rage',
      'In inquiry before death itself',
      'In denial of fear',
      'In flattery of power'
    ],
    correctAnswer: 1,
    moral: 'To seek truth at the edge of mortality is courage.'
  },
  'kindness-5': {
    question: 'What did Rantideva desire most?',
    options: [
      'Personal comfort',
      'The well‑being of all beings',
      'Reputation and praise',
      'Exact repayment'
    ],
    correctAnswer: 1,
    moral: 'A heart for all turns poverty into plenty.'
  },
  'justice-5': {
    question: 'What sustains Harishchandra’s justice?',
    options: [
      'Convenience',
      'Uncompromising truth even in loss',
      'Popularity',
      'Force and fear'
    ],
    correctAnswer: 1,
    moral: 'Justice held at personal cost restores what is lost.'
  }
};

const buildQuestionForStory = (id: string, theme: string) => {
  return quizById[id] ?? buildQuestionForTheme(theme);
};
  
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
    const qa = buildQuestionForStory(chosen.id, theme);
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
    <div className="min-h-screen relative overflow-hidden bg-center bg-cover bg-fixed"
    style={{backgroundImage: "url('/dark_forest.jpeg')"}}>

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
