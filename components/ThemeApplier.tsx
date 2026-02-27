'use client';

import { useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

export default function ThemeApplier() {
  const { theme, accentColor, textSize } = useSettings();

  useEffect(() => {
    // Apply theme to document element
    const root = document.documentElement;
    
    // Set theme data attribute
    if (theme !== 'oled-black') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
    
    // Set accent color data attribute
    if (accentColor !== 'neon-green') {
      root.setAttribute('data-accent', accentColor);
    } else {
      root.removeAttribute('data-accent');
    }
    
    // Set text size data attribute
    if (textSize !== 'medium') {
      root.setAttribute('data-text-size', textSize);
    } else {
      root.removeAttribute('data-text-size');
    }
  }, [theme, accentColor, textSize]);

  return null;
}
