'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Show loading skeleton during hydration
    return (
      <div
        className={`p-3 rounded-xl shadow-lg backdrop-blur-md border bg-gray-200 dark:bg-gray-800 animate-pulse ${className}`}>
        <div className="w-5 h-5" />
      </div>
    );
  }

  const handleToggle = () => {
    console.log(
      'Current theme:',
      theme,
      'System theme:',
      systemTheme,
      'Resolved theme:',
      resolvedTheme
    );

    if (theme === 'light') {
      console.log('Switching to dark mode');
      setTheme('dark');
    } else if (theme === 'dark') {
      console.log('Switching to system mode');
      setTheme('system');
    } else {
      console.log('Switching to light mode');
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-5 h-5" />;
    }
    return resolvedTheme === 'dark' ? (
      <Sun className="w-5 h-5" />
    ) : (
      <Moon className="w-5 h-5" />
    );
  };

  const getTooltip = () => {
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to system mode';
    return 'Switch to light mode';
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`
        relative p-3 rounded-xl shadow-lg backdrop-blur-md border transition-all duration-300
        overflow-hidden group cursor-pointer
        ${
          resolvedTheme === 'dark'
            ? 'bg-gray-900/90 border-gray-700/50 text-yellow-400 hover:text-yellow-300 hover:bg-gray-800/90'
            : 'bg-white/90 border-gray-200/50 text-gray-700 hover:text-gray-900 hover:bg-gray-50/90'
        }
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={getTooltip()}>
      {/* Background gradient animation */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          resolvedTheme === 'dark'
            ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10'
            : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
        }`}
        initial={false}
      />

      {/* Icon container */}
      <div className="relative z-10 w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{
              opacity: 0,
              rotate:
                theme === 'system' ? 0 : resolvedTheme === 'dark' ? -90 : 90,
              scale: 0.8,
            }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{
              opacity: 0,
              rotate:
                theme === 'system' ? 0 : resolvedTheme === 'dark' ? 90 : -90,
              scale: 0.8,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            {getIcon()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Theme indicator dots */}
      <div className="absolute -bottom-1 -right-1 flex space-x-0.5">
        <div
          className={`w-1 h-1 rounded-full transition-colors duration-300 ${
            theme === 'light' ? 'bg-yellow-400' : 'bg-gray-400 dark:bg-gray-600'
          }`}
        />
        <div
          className={`w-1 h-1 rounded-full transition-colors duration-300 ${
            theme === 'dark' ? 'bg-blue-400' : 'bg-gray-400 dark:bg-gray-600'
          }`}
        />
        <div
          className={`w-1 h-1 rounded-full transition-colors duration-300 ${
            theme === 'system'
              ? 'bg-purple-400'
              : 'bg-gray-400 dark:bg-gray-600'
          }`}
        />
      </div>

      {/* Debug info - remove in production */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {theme} ({resolvedTheme})
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
      </div>
    </motion.button>
  );
}
