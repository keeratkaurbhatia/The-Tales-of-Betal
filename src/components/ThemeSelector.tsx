import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ThemeSelectorProps {
  onThemeSelect: (theme: string) => void;
}

const themes = [
  {
    id: 'wisdom',
    title: 'Tales of Wisdom',
    description: 'Ancient stories that illuminate the path to enlightenment',
    icon: '📚',
    color: 'from-blue-500 to-indigo-600',
    accent: 'border-blue-400/50 hover:border-blue-400'
  },
  {
    id: 'courage',
    title: 'Tales of Courage',
    description: 'Legends of brave souls who faced their greatest fears',
    icon: '⚔️',
    color: 'from-orange-500 to-red-600',
    accent: 'border-orange-400/50 hover:border-orange-400'
  },
  {
    id: 'kindness',
    title: 'Tales of Kindness',
    description: 'Sacred stories of compassion that heal the world',
    icon: '💝',
    color: 'from-pink-500 to-purple-600',
    accent: 'border-pink-400/50 hover:border-pink-400'
  },
  {
    id: 'justice',
    title: 'Tales of Justice',
    description: 'Timeless stories where dharma and truth prevail',
    icon: '⚖️',
    color: 'from-green-500 to-teal-600',
    accent: 'border-green-400/50 hover:border-green-400'
  }
];

const ThemeSelector = ({ onThemeSelect }: ThemeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {themes.map((theme) => (
        <Card
          key={theme.id}
          className={`group cursor-pointer bg-black/40 border-2 ${theme.accent} transition-all duration-500 hover:scale-105 hover:bg-black/60 backdrop-blur-sm`}
          onClick={() => onThemeSelect(theme.id)}
        >
          <div className="p-8 text-center space-y-6">
            <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">
              {theme.icon}
            </div>
            
            <h3 className="text-3xl font-bold text-white font-serif group-hover:text-orange-200 transition-colors duration-300">
              {theme.title}
            </h3>
            
            <p className="text-purple-200/90 text-base leading-relaxed">
              {theme.description}
            </p>
            
            <div className={`w-full h-2 bg-gradient-to-r ${theme.color} rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 shadow-lg`}></div>
            
            <div className="text-sm text-orange-300 font-serif">
              ✨ 5 mystical tales await ✨
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ThemeSelector;