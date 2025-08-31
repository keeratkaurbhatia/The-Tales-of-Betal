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
          "relative w-48 h-48 transition-all duration-1000",
          state === 'flying' && "animate-bounce",
          state === 'sleeping' && "animate-pulse"
        )}
      >
        {/* Betal's Body - More Indian/Ancient Look */}
        <div className={cn(
          "w-40 h-48 mx-auto rounded-t-full relative transition-all duration-500 border-2",
          mood === 'angry' ? "bg-gradient-to-b from-red-500 to-red-700 border-red-400" : "bg-gradient-to-b from-amber-600 to-amber-800 border-yellow-500"
        )}>
          
          {/* Traditional Tilaka (Forehead Mark) */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-6 bg-red-600 rounded-full"></div>
            <div className="w-3 h-1 bg-red-600 rounded-full mt-1"></div>
          </div>

          {/* Eyes */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {state === 'sleeping' ? (
              <>
                <div className="w-5 h-1 bg-black rounded-full"></div>
                <div className="w-5 h-1 bg-black rounded-full"></div>
              </>
            ) : (
              <>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 border-black",
                  mood === 'angry' ? "bg-red-400" : "bg-white"
                )}>
                  <div className="w-3 h-3 bg-black rounded-full ml-1 mt-1"></div>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 border-black",
                  mood === 'angry' ? "bg-red-400" : "bg-white"
                )}>
                  <div className="w-3 h-3 bg-black rounded-full ml-1 mt-1"></div>
                </div>
              </>
            )}
          </div>

          {/* Traditional Indian Nose */}
          <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-amber-900 rounded-full border border-yellow-600"></div>

          {/* Mustache */}
          {state !== 'sleeping' && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black rounded-full"></div>
          )}

          {/* Mouth */}
          {state !== 'sleeping' && (
            <div className={cn(
              "absolute top-22 left-1/2 transform -translate-x-1/2 w-6 h-3 rounded-full",
              mood === 'angry' ? "bg-red-800" : "bg-amber-900"
            )}></div>
          )}

          {/* Traditional Jewelry/Ornaments */}
          <div className="absolute top-8 left-3 w-2 h-2 bg-gold rounded-full border border-yellow-400"></div>
          <div className="absolute top-8 right-3 w-2 h-2 bg-gold rounded-full border border-yellow-400"></div>
          
          {/* Sacred Thread (Janeu) */}
          <div className="absolute top-16 left-4 w-0.5 h-16 bg-white/80 rounded-full transform rotate-12"></div>
          
          {/* Ancient Markings/Tattoos */}
          <div className="absolute top-10 left-2 w-1 h-6 bg-red-600 rounded-full opacity-70"></div>
          <div className="absolute top-10 right-2 w-1 h-6 bg-red-600 rounded-full opacity-70"></div>
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-red-600 rounded-full opacity-60"></div>
          
          {/* Mystical Aura */}
          {state !== 'sleeping' && (
            <div className={cn(
              "absolute inset-0 rounded-t-full blur-sm animate-pulse",
              mood === 'angry' ? "bg-red-400/30" : "bg-orange-400/30"
            )}></div>
          )}

          {/* Traditional Crown/Headpiece */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-lg border-2 border-yellow-400">
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Floating Effect for Awake State */}
        {state === 'awake' && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-orange-400/40 rounded-full blur-md animate-pulse"></div>
        )}

        {/* Flying Trail Effect */}
        {state === 'flying' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-red-400 rounded-full animate-ping animation-delay-200 ml-4"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping animation-delay-400 ml-8"></div>
          </div>
        )}
      </div>

      {/* Betal's Speech/Status */}
      {state === 'awake' && (
        <div className="mt-6 p-4 bg-black/60 rounded-lg border-2 border-orange-400/50 backdrop-blur-sm">
          <p className="text-orange-200 text-sm font-serif leading-relaxed">
            {mood === 'angry' ? '"You have answered! Now I shall depart as is my eternal curse..."' : '"Choose wisely, mortal... for wisdom comes to those who seek it..."'}
          </p>
          <div className="text-xs text-orange-400 mt-2 flex items-center justify-center space-x-2">
            <span>🎭</span>
            <span>Betal speaks with ancient wisdom</span>
            <span>🕉️</span>
          </div>
        </div>
      )}

      {state === 'flying' && (
        <div className="mt-6 p-4 bg-black/60 rounded-lg border-2 border-red-400/50 backdrop-blur-sm">
          <p className="text-red-200 text-sm font-serif animate-pulse leading-relaxed">
            {mood === 'angry' ? '"Until we meet again in another tale!"' : '"Remember this wisdom, dear seeker..."'}
          </p>
          <div className="text-xs text-red-400 mt-2 text-center">
            ✨ The ancient spirit departs ✨
          </div>
        </div>
      )}
    </div>
  );
};

export default BetalMascot;