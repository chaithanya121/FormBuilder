
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch';
  className?: string;
}

export function ThemeToggle({ variant = 'icon', className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (variant === 'switch') {
    return (
      <div className={cn("flex items-center gap-2 rounded-md", className)}>
        <Sun className="h-4 w-4 text-gray-500" />
        <Switch 
          checked={theme === 'dark'} 
          onCheckedChange={toggleTheme}
        />
        <Moon className="h-4 w-4 text-gray-500" />
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("relative h-9 w-9 rounded-full", className)}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotate: theme === 'light' ? 0 : 180,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {theme === 'light' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </motion.div>
    </Button>
  );
}
