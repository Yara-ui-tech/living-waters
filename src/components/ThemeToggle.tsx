import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggle({ isDarkMode, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
        isDarkMode 
          ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' 
          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
      }`}
      aria-label="Toggle visual theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDarkMode ? (
          <Sun id="icon-sun" className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100" />
        ) : (
          <Moon id="icon-moon" className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100" />
        )}
      </div>
    </button>
  );
}
