import { Card } from '@/components/ui/card';
import { Coins, Clock, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameStatsProps {
  coins: number;
  isCursed: boolean;
  curseTimeRemaining: number;
  dontKnowCount: number;
  maxDontKnow: number;
  dontKnowLocked: boolean;
}

const GameStats = ({ 
  coins, 
  isCursed, 
  curseTimeRemaining, 
  dontKnowCount, 
  maxDontKnow, 
  dontKnowLocked 
}: GameStatsProps) => {
  const formatTime = (ms: number) => {
    const seconds = Math.ceil(ms / 1000);
    return `${seconds}s`;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="bg-black/80 border-purple-400/50 p-4 backdrop-blur-sm">
        <div className="space-y-3">
          {/* Coins */}
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{coins}</span>
            <span className="text-purple-200 text-sm">Wisdom Coins</span>
          </div>

          {/* Curse Status */}
          {isCursed && (
            <div className="flex items-center space-x-2 animate-pulse">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-bold">{formatTime(curseTimeRemaining)}</span>
              <span className="text-red-200 text-sm">Cursed</span>
            </div>
          )}

          {/* Don't Know Counter */}
          <div className="flex items-center space-x-2">
            <HelpCircle className={cn(
              "w-5 h-5",
              dontKnowLocked ? "text-red-400" : "text-blue-400"
            )} />
            <span className={cn(
              "font-bold",
              dontKnowLocked ? "text-red-400" : "text-blue-400"
            )}>
              {dontKnowCount}/{maxDontKnow}
            </span>
            <span className={cn(
              "text-sm",
              dontKnowLocked ? "text-red-200" : "text-purple-200"
            )}>
              {dontKnowLocked ? "Locked" : "Don't Know"}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameStats;