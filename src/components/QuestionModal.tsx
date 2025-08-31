import { useState } from 'react';
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
  onAnswer: (result: { outcome: 'correct' | 'incorrect' | 'dont_know'; selectedIndex?: number }) => void;
  dontKnowUsed?: number;
  dontKnowLimit?: number;
}

const QuestionModal = ({ story, betalMood, onAnswer, dontKnowUsed = 0, dontKnowLimit = 3 }: QuestionModalProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showMoral, setShowMoral] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowMoral(true);
    const isCorrect = answerIndex === story.correctAnswer;
    onAnswer({ outcome: isCorrect ? 'correct' : 'incorrect', selectedIndex: answerIndex });
  };

  const handleDontKnow = () => {
    setShowMoral(true);
    onAnswer({ outcome: 'dont_know' });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-purple-400/50 p-8 max-w-2xl w-full">
        <div className="text-center space-y-6">
          
          {/* Betal Mascot */}
          <BetalMascot state="awake" mood={betalMood} />
          
          {!showMoral ? (
            <>
              {/* Question */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white font-serif">
                  Betal's Question
                </h3>
                <p className="text-lg text-purple-200 leading-relaxed">
                  {story.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {story.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    variant="outline"
                    className="w-full p-4 text-left bg-black/30 border-purple-400/30 hover:border-purple-400 hover:bg-purple-900/30 text-white transition-all duration-300"
                  >
                    <span className="font-semibold mr-3 text-purple-400">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Button>
                ))}
              </div>

              {/* Don't Know Button */}
              <div className="pt-4 border-t border-purple-400/30">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-purple-300">
                    I don't know uses left: {Math.max(0, (dontKnowLimit ?? 3) - (dontKnowUsed ?? 0))}
                  </div>
                  <Button
                    onClick={handleDontKnow}
                    variant="ghost"
                    disabled={(dontKnowUsed ?? 0) >= (dontKnowLimit ?? 3)}
                    className="text-purple-300 hover:text-white hover:bg-purple-800/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    I don't know the answer
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Moral/Result */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white font-serif">
                    {betalMood === 'angry' ? 'Betal Departs' : 'Wisdom from Betal'}
                  </h3>
                  
                  {selectedAnswer !== null && (
                    <div className="p-4 bg-black/40 rounded-lg border border-purple-400/30">
                      <p className="text-purple-200 mb-2">
                        <span className="font-semibold">Your Answer:</span> {story.options[selectedAnswer]}
                      </p>
                      <p className="text-sm text-purple-300">
                        <span className="font-semibold">Correct Answer:</span> {story.options[story.correctAnswer]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Moral */}
                <div className="p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-400/50">
                  <h4 className="text-lg font-semibold text-purple-200 mb-3 font-serif">
                    The Moral of the Tale:
                  </h4>
                  <p className="text-white leading-relaxed font-serif italic">
                    "{story.moral}"
                  </p>
                </div>

                {/* Status Message */}
                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-purple-200 font-serif">
                    {betalMood === 'angry' 
                      ? 'Since you answered, Betal flies away in anger, as is his nature...' 
                      : 'Betal is pleased with your honesty and shares his wisdom before returning to slumber...'
                    }
                  </p>
                </div>

                <p className="text-sm text-purple-400 animate-pulse">
                  Betal will return to sleep shortly...
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