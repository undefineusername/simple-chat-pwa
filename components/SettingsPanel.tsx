'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSettings, type Theme, type AccentColor, type TextSize } from '@/contexts/SettingsContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const THEMES: { id: Theme; label: string; preview: string }[] = [
  { id: 'oled-black', label: 'OLED Black', preview: '#000000' },
  { id: 'deep-navy', label: 'Deep Navy', preview: '#0a1128' },
  { id: 'carbon-grey', label: 'Carbon Grey', preview: '#1a1a1a' },
];

const ACCENT_COLORS: { id: AccentColor; label: string; color: string }[] = [
  { id: 'neon-green', label: 'Neon Green', color: '#CCFF00' },
  { id: 'electric-blue', label: 'Electric Blue', color: '#00D9FF' },
  { id: 'vivid-pink', label: 'Vivid Pink', color: '#FF006E' },
];

const TEXT_SIZES: { id: TextSize; label: string; scale: number }[] = [
  { id: 'small', label: 'Small', scale: 0.9 },
  { id: 'medium', label: 'Medium', scale: 1 },
  { id: 'large', label: 'Large', scale: 1.1 },
];

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme, accentColor, textSize, stealthMode, setTheme, setAccentColor, setTextSize, setStealthMode } = useSettings();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed md:absolute md:right-0 md:top-full md:mt-2 inset-y-0 right-0 w-full md:w-80 bg-secondary border-l md:border md:border-border overflow-y-auto z-50 md:rounded-lg"
          >
            {/* Header */}
            <div className="sticky top-0 px-4 py-4 border-b border-border flex items-center justify-between bg-secondary/95 backdrop-blur-sm">
              <h3 className="font-semibold text-foreground">Settings</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Theme
                </label>
                <div className="space-y-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        theme === t.id
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded border border-foreground/30"
                        style={{ backgroundColor: t.preview }}
                      />
                      <span className="text-sm">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Accent Color
                </label>
                <div className="space-y-2">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setAccentColor(color.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        accentColor === color.id
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 border-foreground/30"
                        style={{ backgroundColor: color.color }}
                      />
                      <span className="text-sm">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Size */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Text Size
                </label>
                <div className="space-y-2">
                  {TEXT_SIZES.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setTextSize(size.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        textSize === size.id
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      <span
                        className="text-xs font-bold leading-none"
                        style={{ fontSize: `${10 * size.scale}px` }}
                      >
                        A
                      </span>
                      <span className="text-sm">{size.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stealth Mode Toggle */}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => setStealthMode(!stealthMode)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
                    stealthMode
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  <span className="text-sm font-medium">Stealth Mode</span>
                  <div
                    className={`w-6 h-3.5 rounded-full transition-colors ${
                      stealthMode ? 'bg-accent-foreground/30' : 'bg-muted-foreground/30'
                    }`}
                  >
                    <motion.div
                      animate={{ x: stealthMode ? 12 : 0 }}
                      className="w-3 h-3 rounded-full bg-current mt-0.5 ml-0.5"
                    />
                  </div>
                </button>
                <p className="text-xs text-muted-foreground mt-2 px-1">
                  Minimizes read receipts and presence indicators
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
