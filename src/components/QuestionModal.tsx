import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import BetalMascot from './BetalMascot';

interface QuestionModalProps {
  story: {
    id: string;
    title: string;
    question: string;
    options: string[];
    correctAnswer: number;
    moral: string;
  };
  betalMood: 'calm' | 'angry';
  onAnswer: (correct: boolean, usedDontKnow: boolean) => void;
  dontKnowLocked: boolean;
}

const QuestionModal = ({ story, betalMood, onAnswer, dontKnowLocked }: QuestionModalProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showMoral, setShowMoral] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [usedDontKnow, setUsedDontKnow] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const correct = answerIndex === story.correctAnswer;
    setSelectedAnswer(answerIndex);
    setWasCorrect(correct);
    setShowMoral(true);
    onAnswer(correct, false);
  };

  const handleDontKnow = () => {
    if (dontKnowLocked) return;
    setUsedDontKnow(true);
    setShowMoral(true);
    onAnswer(false, true);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <Card className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 border-purple-400/50 p-8 max-w-3xl w-full backdrop-blur-sm">
        <div className="text-center space-y-6">
          
          {/* Betal Mascot */}
          <BetalMascot state="awake" mood={betalMood} />
          
          {!showMoral ? (
            <>
              {/* Question */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white font-serif">
                  Betal's Riddle
                </h3>
                <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
                <p className="text-lg text-purple-200 leading-relaxed max-w-2xl mx-auto">
                  {story.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 max-w-2xl mx-auto">
                {story.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    variant="outline"
                    className="w-full p-4 text-left bg-black/40 border-purple-400/40 hover:border-orange-400 hover:bg-orange-900/30 text-white transition-all duration-300 min-h-[60px] justify-start"
                  >
                    <span className="font-bold mr-4 text-orange-400 text-lg">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-left">{option}</span>
                  </Button>
                ))}
              </div>

              {/* Don't Know Button */}
              <div className="pt-6 border-t border-purple-400/30">
                <Button
                  onClick={handleDontKnow}
                  disabled={dontKnowLocked}
                  variant="ghost"
                  className={cn(
                    "transition-all duration-300",
                    dontKnowLocked 
                      ? "text-red-400 hover:text-red-400 cursor-not-allowed opacity-50" 
                      : "text-purple-300 hover:text-white hover:bg-purple-800/30"
                  )}
                >
                  {dontKnowLocked ? "🔒 No more mercy from Betal" : "🙏 I seek Betal's wisdom"}
                </Button>
                {!dontKnowLocked && (
                  <p className="text-xs text-purple-400 mt-2">
                    (Can be used {3 - dontKnowCount} more times)
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Result */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white font-serif">
                    {betalMood === 'angry' ? '👹 Betal\'s Departure' : '🕉️ Ancient Wisdom'}
                  </h3>
                  <div className={cn(
                    "w-32 h-1 mx-auto rounded-full",
                    betalMood === 'angry' ? "bg-gradient-to-r from-red-400 to-orange-400" : "bg-gradient-to-r from-orange-400 to-yellow-400"
                  )}></div>
                  
                  {/* Answer Result */}
                  {selectedAnswer !== null && (
                    <div className={cn(
                      "p-4 rounded-lg border-2 max-w-2xl mx-auto",
                      wasCorrect 
                        ? "bg-green-900/40 border-green-400/50" 
                        : "bg-red-900/40 border-red-400/50"
                    )}>
                      <div className="space-y-2">
                        <p className="text-purple-200">
                          <span className="font-semibold">Your Answer:</span> {story.options[selectedAnswer]}
                        </p>
                        <p className="text-sm text-purple-300">
                          <span className="font-semibold">Correct Answer:</span> {story.options[story.correctAnswer]}
                        </p>
                        <div className={cn(
                          "text-center font-bold text-lg",
                          wasCorrect ? "text-green-400" : "text-red-400"
                        )}>
                          {wasCorrect ? "🪙 +1 Wisdom Coin!" : "⚡ Curse Applied!"}
                        </div>
                      </div>
                    </div>
                  )}

                  {usedDontKnow && (
                    <div className="p-4 bg-blue-900/40 border-2 border-blue-400/50 rounded-lg max-w-2xl mx-auto">
                      <p className="text-blue-200 text-center">
                        🙏 <span className="font-semibold">You sought wisdom humbly</span>
                      </p>
                      <p className="text-sm text-blue-300 mt-2 text-center">
                        Betal appreciates your honesty, but this mercy has limits...
                      </p>
                    </div>
                  )}
                </div>

                {/* Moral */}
                <div className="p-6 bg-gradient-to-r from-purple-900/60 to-pink-900/60 rounded-lg border-2 border-purple-400/50 max-w-2xl mx-auto">
                  <h4 className="text-xl font-semibold text-orange-200 mb-4 font-serif text-center">
                    📿 The Sacred Teaching 📿
                  </h4>
                  <p className="text-white leading-relaxed font-serif italic text-center">
                    "{story.moral}"
                  </p>
                </div>

                {/* Status Message */}
                <div className="p-4 bg-black/40 rounded-lg border border-purple-400/30 max-w-2xl mx-auto">
                  <p className="text-purple-200 font-serif text-center leading-relaxed">
                    {betalMood === 'angry' 
                      ? '🌪️ Since you answered, Betal flies away in anger, as is his eternal nature. You are cursed for 30 seconds and cannot hear new tales...' 
                      : '🧘‍♂️ Betal is pleased with your humility and shares his ancient wisdom before returning to his mystical slumber...'
                    }
                  </p>
                </div>

                <p className="text-sm text-purple-400 animate-pulse">
                  ✨ The ancient spirit will return to sleep shortly... ✨
                </p>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuestionModal;