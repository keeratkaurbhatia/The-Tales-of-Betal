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
      question: 'How did the monkey escape the crocodile?',
      options: [
        'He swam faster than the crocodile',
        'He tricked the crocodile saying his heart was on the tree',
        'He fought the crocodile in the river',
        'A fisherman saved him'
      ],
      correctAnswer: 1,
      moral: 'Sharp thinking and wit can triumph over brute strength.'
    },
    'courage-1': {
      question: "How did the potter's son save the granary?",
      options: [
        'By calling the city guards',
        'By running away for help',
        'By carrying water through smoke until the fire died out',
        'By praying until it rained'
      ],
      correctAnswer: 2,
      moral: 'Even the smallest hands can achieve great deeds when fear is faced.'
    },
    'kindness-1': {
      question: 'What happened after the sage fed the hungry crow?',
      options: [
        'The crow stole his food',
        'Nothing changed',
        'The crow brought a hidden treasure in gratitude',
        'The sage became angry'
      ],
      correctAnswer: 2,
      moral: 'Small acts of kindness can bring unexpected blessings.'
    },
    'justice-1': {
      question: 'How did the washerman prove his innocence?',
      options: [
        'By shouting the loudest',
        'By leaving the village',
        'By a weighing test that exposed the rich man\'s lie',
        'By paying a fine'
      ],
      correctAnswer: 2,
      moral: 'Fairness and wit expose injustice and uphold truth.'
    },
    'wisdom-2': {
      question: 'Why did the tortoise fall during the flight?',
      options: [
        'The birds dropped him on purpose',
        'He talked too much and lost his grip',
        'A storm struck',
        'He fell asleep'
      ],
      correctAnswer: 1,
      moral: 'Wisdom is knowing when to speak and when to be silent.'
    },
    'courage-2': {
      question: 'What did the tiger cub do when he saw the hunter?',
      options: [
        'He hid behind a rock',
        'He boldly confronted the hunter and freed the trapped animals',
        'He waited for his mother',
        'He ran back to the village'
      ],
      correctAnswer: 1,
      moral: 'Courage comes in all sizes; small actions can make a big difference.'
    },
    'kindness-2': {
      question: 'What did the traveler give back to the banyan tree\'s kindness?',
      options: [
        'Gold coins',
        'Stories and laughter that enriched its spirit',
        'Water from the river',
        'A carved statue'
      ],
      correctAnswer: 1,
      moral: 'Kindness is a two-way gift that enriches giver and receiver.'
    },
    'justice-2': {
      question: 'Why did the river spirit reward the woodcutter?',
      options: [
        'He jumped into the river',
        'He claimed only his own axe and stayed honest',
        'He took the golden axe',
        'He prayed loudly'
      ],
      correctAnswer: 1,
      moral: 'Fairness and honesty are always recognized.'
    },
    'wisdom-3': {
      question: 'What did Birbal\'s circle mean?',
      options: [
        'A symbol of the sun',
        'A sign of victory',
        'Life comes full circle and truth returns to itself',
        'Silence means defeat'
      ],
      correctAnswer: 2,
      moral: 'Sometimes silence and symbols speak more wisely than long speeches.'
    },
    'courage-3': {
      question: 'How did the girl scare the dacoits away?',
      options: [
        'She set a trap',
        'She hid quietly',
        'She lit torches and beat a drum to make the village seem awake',
        'She ran to the city guards'
      ],
      correctAnswer: 2,
      moral: 'Resourceful courage can protect many.'
    },
    'kindness-3': {
      question: 'What did the old woman offer the traveler-king?',
      options: [
        'A bag of gold',
        'Half of her only roti',
        'A horse and cart',
        'Jewels from her chest'
      ],
      correctAnswer: 1,
      moral: 'The true treasure is a kind heart.'
    },
    'justice-3': {
      question: 'How was the real thief exposed?',
      options: [
        'He confessed on his own',
        'His bamboo stick was shorter in the morning',
        'He fled the village',
        'He failed a riddle'
      ],
      correctAnswer: 1,
      moral: 'Truth reveals itself; justice clears the innocent.'
    },
    'wisdom-4': {
      question: 'How did Tenali Raman stop the Brahmin\'s greed?',
      options: [
        'By bribing him',
        'By threatening punishment',
        'By cleverly exposing his falsehood with a disguise',
        'By ignoring him'
      ],
      correctAnswer: 2,
      moral: 'Wisdom exposes falsehood with cleverness.'
    },
    'courage-4': {
      question: 'What made Abhimanyu\'s act especially courageous?',
      options: [
        'He had the strongest armor',
        'He entered the Chakravyuha knowing he might not exit and fought bravely',
        'He had a secret weapon',
        'He hid until help arrived'
      ],
      correctAnswer: 1,
      moral: 'Fearless duty and sacrifice are the heart of courage.'
    },
    'kindness-4': {
      question: 'What did King Shibi offer to save the dove?',
      options: [
        'Gold and jewels',
        'His own flesh equal to the dove\'s weight',
        'A cage for the hawk',
        'A feast for the hawk'
      ],
      correctAnswer: 1,
      moral: 'Selfless compassion is the highest kindness.'
    },
    'justice-4': {
      question: 'What revived the Pandavas according to the tale?',
      options: [
        'A powerful herb',
        'A secret ritual',
        'Yudhishthira\'s unwavering truth and just answers',
        'A hidden army'
      ],
      correctAnswer: 2,
      moral: 'Justice flows from righteousness and truth.'
    },
    'wisdom-5': {
      question: 'What lesson did Chanakya draw from a single hair in his meal?',
      options: [
        'It was unimportant',
        'He should eat faster',
        'Small negligence today can cause great downfall tomorrow',
        'He must fire the cook'
      ],
      correctAnswer: 2,
      moral: 'Wisdom lies in attention to the smallest details.'
    },
    'courage-5': {
      question: 'How did Nachiketa show courage before Yama?',
      options: [
        'He fought with weapons',
        'He ran away and hid',
        'He fearlessly asked deep questions about life and the soul',
        'He refused to speak'
      ],
      correctAnswer: 2,
      moral: 'There is courage in fearlessly seeking eternal truth.'
    },
    'kindness-5': {
      question: 'What did King Rantideva do despite poverty?',
      options: [
        'He hoarded food and water',
        'He shared every last morsel with guests',
        'He closed his doors to strangers',
        'He left the kingdom'
      ],
      correctAnswer: 1,
      moral: 'Desiring the welfare of all is the essence of kindness.'
    },
    'justice-5': {
      question: 'How did King Harishchandra uphold justice?',
      options: [
        'By bending rules for his family',
        'By abandoning his duties',
        'By demanding the cremation fee even from his own queen',
        'By hiding the truth'
      ],
      correctAnswer: 2,
      moral: 'Unwavering commitment to truth and justice restores all things.'
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
