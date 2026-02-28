'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'oled-black' | 'deep-navy' | 'carbon-grey';
export type AccentColor = 'neon-green' | 'electric-blue' | 'vivid-pink';
export type TextSize = 'small' | 'medium' | 'large';
export type OnlineStatus = 'online' | 'idle' | 'dnd' | 'invisible';

interface UserProfile {
  displayName: string;
  username: string;
  statusMessage: string;
  avatarEmoji: string;
  onlineStatus: OnlineStatus;
}

interface SettingsContextType {
  theme: Theme;
  accentColor: AccentColor;
  textSize: TextSize;
  stealthMode: boolean;
  profile: UserProfile;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
  setTextSize: (size: TextSize) => void;
  setStealthMode: (enabled: boolean) => void;
  setProfile: (profile: Partial<UserProfile>) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('oled-black');
  const [accentColor, setAccentColor] = useState<AccentColor>('neon-green');
  const [textSize, setTextSize] = useState<TextSize>('medium');
  const [stealthMode, setStealthMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [profile, setProfileState] = useState<UserProfile>({
    displayName: 'User',
    username: '@user',
    statusMessage: 'Available',
    avatarEmoji: 'U',
    onlineStatus: 'online',
  });

  const setProfile = (updates: Partial<UserProfile>) => {
    setProfileState((prev) => ({ ...prev, ...updates }));
  };

  const value: SettingsContextType = {
    theme,
    accentColor,
    textSize,
    stealthMode,
    profile,
    notificationsEnabled,
    soundEnabled,
    setTheme,
    setAccentColor,
    setTextSize,
    setStealthMode,
    setProfile,
    setNotificationsEnabled,
    setSoundEnabled,
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
