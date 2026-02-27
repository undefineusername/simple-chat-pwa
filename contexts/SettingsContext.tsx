'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'oled-black' | 'deep-navy' | 'carbon-grey';
export type AccentColor = 'neon-green' | 'electric-blue' | 'vivid-pink';
export type TextSize = 'small' | 'medium' | 'large';

interface SettingsContextType {
  theme: Theme;
  accentColor: AccentColor;
  textSize: TextSize;
  stealthMode: boolean;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
  setTextSize: (size: TextSize) => void;
  setStealthMode: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('oled-black');
  const [accentColor, setAccentColor] = useState<AccentColor>('neon-green');
  const [textSize, setTextSize] = useState<TextSize>('medium');
  const [stealthMode, setStealthMode] = useState(false);

  const value: SettingsContextType = {
    theme,
    accentColor,
    textSize,
    stealthMode,
    setTheme,
    setAccentColor,
    setTextSize,
    setStealthMode,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
