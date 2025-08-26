import { cn } from '@/lib/utils';

interface BetalMascotProps {
  state: 'sleeping' | 'awake' | 'flying';
  mood: 'calm' | 'angry';
}

const BetalMascot = ({ state, mood }: BetalMascotProps) => {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "relative w-40 h-40 transition-all duration-1000",
          state === 'flying' && "animate-bounce",
          state === 'sleeping' && "animate-pulse"
        )}
      >
        {/* Betal's Body */}
        <div className={cn(
          "w-32 h-40 mx-auto rounded-t-full relative transition-all duration-500",
          mood === 'angry' ? "bg-gradient-to-b from-red-400 to-red-600" : "bg-gradient-to-b from-gray-300 to-gray-500"
        )}>
          
          {/* Eyes */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {state === 'sleeping' ? (
              <>
                <div className="w-4 h-1 bg-black rounded-full"></div>
                <div className="w-4 h-1 bg-black rounded-full"></div>
              </>
            ) : (
              <>
                <div className={cn(
                  "w-4 h-4 rounded-full",
                  mood === 'angry' ? "bg-red-500" : "bg-yellow-400"
                )}>
                  <div className="w-2 h-2 bg-black rounded-full ml-1 mt-1"></div>
                </div>
                <div className={cn(
                  "w-4 h-4 rounded-full",
                  mood === 'angry' ? "bg-red-500" : "bg-yellow-400"
                )}>
                  <div className="w-2 h-2 bg-black rounded-full ml-1 mt-1"></div>
                </div>
              </>
            )}
          </div>

          {/* Nose */}
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gray-600 rounded-full"></div>

          {/* Mouth */}
          {state !== 'sleeping' && (
            <div className={cn(
              "absolute top-18 left-1/2 transform -translate-x-1/2 w-6 h-3 rounded-full",
              mood === 'angry' ? "bg-red-700" : "bg-gray-700"
            )}></div>
          )}

          {/* Ancient Markings */}
          <div className="absolute top-6 left-2 w-1 h-4 bg-yellow-300 rounded-full opacity-60"></div>
          <div className="absolute top-6 right-2 w-1 h-4 bg-yellow-300 rounded-full opacity-60"></div>
          
          {/* Mystical Aura */}
          {state !== 'sleeping' && (
            <div className={cn(
              "absolute inset-0 rounded-t-full blur-sm",
              mood === 'angry' ? "bg-red-400/20" : "bg-purple-400/20"
            )}></div>
          )}
        </div>

        {/* Floating Effect for Awake State */}
        {state === 'awake' && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-purple-400/30 rounded-full blur-md animate-pulse"></div>
        )}
      </div>

      {/* Betal's Speech/Status */}
      {state === 'awake' && (
        <div className="mt-4 p-3 bg-black/50 rounded-lg border border-purple-400/50">
          <p className="text-purple-200 text-sm font-serif">
            {mood === 'angry' ? '"You have answered! Now I shall depart..."' : '"Choose wisely, mortal..."'}
          </p>
          <div className="text-xs text-purple-400 mt-1">
            🎭 Betal speaks with a wise male voice
          </div>
        </div>
      )}

      {state === 'flying' && (
        <div className="mt-4 p-3 bg-black/50 rounded-lg border border-red-400/50">
          <p className="text-red-200 text-sm font-serif animate-pulse">
            {mood === 'angry' ? '"Until we meet again!"' : '"Remember this wisdom..."'}
          </p>
        </div>
      )}
    </div>
  );
};

export default BetalMascot;