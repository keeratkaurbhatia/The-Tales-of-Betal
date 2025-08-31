import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ThemeSelectorProps {
  onThemeSelect: (theme: string) => void;
  disabled?: boolean;
  cooldownRemaining?: number;
}

const themes = [
  {
    id: 'wisdom',
    title: 'Tales of Wisdom',
    description: 'Stories that teach valuable life lessons',
    icon: '📚',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'courage',
    title: 'Tales of Courage',
    description: 'Adventures of brave hearts and bold spirits',
    icon: '⚔️',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'kindness',
    title: 'Tales of Kindness',
    description: 'Stories of compassion and good deeds',
    icon: '💝',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 'justice',
    title: 'Tales of Justice',
    description: 'Stories where truth and fairness prevail',
    icon: '⚖️',
    color: 'from-green-500 to-teal-600'
  }
];

const ThemeSelector = ({ onThemeSelect, disabled = false, cooldownRemaining = 0 }: ThemeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {themes.map((theme) => (
        <Card
          key={theme.id}
          className={`group relative ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} bg-black/30 border-purple-400/30 ${disabled ? '' : 'hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:bg-black/40'}`}
          onClick={() => !disabled && onThemeSelect(theme.id)}
        >
          <div className="p-6 text-center space-y-4">
            <div className={`text-6xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {theme.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-white font-serif group-hover:text-purple-200 transition-colors">
              {theme.title}
            </h3>
            
            <p className="text-purple-200/80 text-sm">
              {theme.description}
            </p>
            
            <div className={`w-full h-1 bg-gradient-to-r ${theme.color} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`}></div>
          </div>
          {disabled && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
              <div className="px-4 py-2 bg-black/70 border border-red-400/50 rounded-full text-red-200 text-sm">
                Cooldown: {cooldownRemaining}s
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ThemeSelector;