import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative p-2 rounded-full border border-white/10 dark:border-white/10 bg-slate-900/60 dark:bg-slate-900/60 text-slate-200 hover:text-white hover:border-cyan-400/40 transition-all duration-300 shadow-md',
        className
      )}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun size={17} className="text-amber-400 hover:rotate-45 transition-transform" />
      ) : (
        <Moon size={17} className="text-cyan-400 hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
