'use client';

import { useState } from 'react';
import { X, ChevronRight, Bell, BellOff, Volume2, VolumeOff, Eye, EyeOff, Circle } from 'lucide-react';
import { useSettings, type Theme, type AccentColor, type TextSize, type OnlineStatus } from '@/contexts/SettingsContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'main' | 'profile' | 'appearance' | 'notifications';

const THEMES: { id: Theme; label: string; preview: string }[] = [
  { id: 'oled-black', label: 'Light', preview: '#ffffff' },
  { id: 'deep-navy', label: 'Navy', preview: '#0a1128' },
  { id: 'carbon-grey', label: 'Grey', preview: '#1a1a1a' },
];

const ACCENT_COLORS: { id: AccentColor; label: string; color: string }[] = [
  { id: 'neon-green', label: 'Purple', color: '#7c3aed' },
  { id: 'electric-blue', label: 'Blue', color: '#3b82f6' },
  { id: 'vivid-pink', label: 'Pink', color: '#ec4899' },
];

const TEXT_SIZES: { id: TextSize; label: string }[] = [
  { id: 'small', label: 'S' },
  { id: 'medium', label: 'M' },
  { id: 'large', label: 'L' },
];

const ONLINE_STATUSES: { id: OnlineStatus; label: string; color: string }[] = [
  { id: 'online', label: 'Online', color: '#22c55e' },
  { id: 'idle', label: 'Idle', color: '#eab308' },
  { id: 'dnd', label: 'Do Not Disturb', color: '#ef4444' },
  { id: 'invisible', label: 'Invisible', color: '#6b7280' },
];

const AVATAR_OPTIONS = ['U', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 relative ${
        enabled ? 'bg-accent' : 'bg-muted'
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-foreground absolute top-0.5 transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const {
    theme, accentColor, textSize, stealthMode, profile,
    notificationsEnabled, soundEnabled,
    setTheme, setAccentColor, setTextSize, setStealthMode, setProfile,
    setNotificationsEnabled, setSoundEnabled,
  } = useSettings();

  const [tab, setTab] = useState<SettingsTab>('main');
  const [editingName, setEditingName] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [nameInput, setNameInput] = useState(profile.displayName);
  const [statusInput, setStatusInput] = useState(profile.statusMessage);

  if (!isOpen) return null;

  const handleClose = () => {
    setTab('main');
    onClose();
  };

  const saveDisplayName = () => {
    if (nameInput.trim()) {
      setProfile({ displayName: nameInput.trim() });
    }
    setEditingName(false);
  };

  const saveStatusMessage = () => {
    setProfile({ statusMessage: statusInput.trim() });
    setEditingStatus(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Panel */}
      <div className="relative w-full md:w-full md:max-w-sm md:max-h-[90vh] md:rounded-3xl bg-background border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 px-5 py-4 border-b border-border flex items-center gap-3 bg-background">
          {tab !== 'main' && (
            <button
              onClick={() => setTab('main')}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors text-foreground"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          )}
          <h3 className="text-lg font-bold text-foreground flex-1">
            {tab === 'main' && 'Settings'}
            {tab === 'profile' && 'Profile'}
            {tab === 'appearance' && 'Appearance'}
            {tab === 'notifications' && 'Notifications'}
          </h3>
          <button onClick={handleClose} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* Main Menu */}
          {tab === 'main' && (
            <div className="p-4 space-y-2">
              {/* Profile Preview Card */}
              <div className="p-4 bg-muted rounded-2xl mb-4 flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-14 w-14 border-2 border-accent">
                    <AvatarFallback className="bg-accent text-accent-foreground font-bold">
                      {profile.avatarEmoji}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background"
                    style={{ backgroundColor: ONLINE_STATUSES.find(s => s.id === profile.onlineStatus)?.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-foreground truncate">{profile.displayName}</p>
                  <p className="text-sm text-muted-foreground truncate">{profile.statusMessage || 'No status'}</p>
                </div>
              </div>

              {/* Navigation Items */}
              <button
                onClick={() => setTab('profile')}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-muted transition-colors text-foreground"
              >
                <span className="font-medium">Profile</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => setTab('appearance')}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-muted transition-colors text-foreground"
              >
                <span className="font-medium">Appearance</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => setTab('notifications')}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-muted transition-colors text-foreground"
              >
                <span className="font-medium">Notifications</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Quick Toggles */}
              <div className="pt-2 mt-3 border-t border-border space-y-2">
                <div className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    {stealthMode ? <EyeOff className="w-5 h-5 text-muted-foreground" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
                    <span className="font-medium text-foreground">Stealth Mode</span>
                  </div>
                  <ToggleSwitch enabled={stealthMode} onToggle={() => setStealthMode(!stealthMode)} />
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {tab === 'profile' && (
            <div className="p-5 space-y-5">
              {/* Avatar Picker */}
              <div>
                <label className="block font-bold text-muted-foreground mb-3 uppercase tracking-wide text-sm">Avatar</label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-accent flex-shrink-0">
                    <AvatarFallback className="bg-accent text-accent-foreground font-bold text-2xl">
                      {profile.avatarEmoji}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid grid-cols-4 gap-2">
                    {AVATAR_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setProfile({ avatarEmoji: opt })}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                          profile.avatarEmoji === opt
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/70'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block font-bold text-muted-foreground mb-2.5 uppercase tracking-wide text-sm">Name</label>
                {editingName ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveDisplayName()}
                      maxLength={24}
                      className="flex-1 bg-muted border border-border rounded-xl px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-accent"
                      autoFocus
                    />
                    <button onClick={saveDisplayName} className="px-4 py-2.5 bg-accent text-accent-foreground rounded-xl font-medium">
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setNameInput(profile.displayName); setEditingName(true); }}
                    className="w-full text-left bg-muted rounded-xl px-4 py-2.5 text-foreground hover:bg-muted/70 transition-colors"
                  >
                    {profile.displayName}
                  </button>
                )}
              </div>

              {/* Status Message */}
              <div>
                <label className="block font-bold text-muted-foreground mb-2.5 uppercase tracking-wide text-sm">Status</label>
                {editingStatus ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={statusInput}
                      onChange={(e) => setStatusInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveStatusMessage()}
                      maxLength={48}
                      placeholder="What are you up to?"
                      className="flex-1 bg-muted border border-border rounded-xl px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-accent"
                      autoFocus
                    />
                    <button onClick={saveStatusMessage} className="px-4 py-2.5 bg-accent text-accent-foreground rounded-xl font-medium">
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setStatusInput(profile.statusMessage); setEditingStatus(true); }}
                    className="w-full text-left bg-muted rounded-xl px-4 py-2.5 text-foreground hover:bg-muted/70 transition-colors"
                  >
                    {profile.statusMessage || 'Set a status...'}
                  </button>
                )}
              </div>

              {/* Online Status */}
              <div>
                <label className="block font-bold text-muted-foreground mb-2.5 uppercase tracking-wide text-sm">Status</label>
                <div className="space-y-1">
                  {ONLINE_STATUSES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setProfile({ onlineStatus: s.id })}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        profile.onlineStatus === s.id
                          ? 'bg-muted'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <Circle className="w-3 h-3 fill-current flex-shrink-0" style={{ color: s.color }} />
                      <span className="text-foreground font-medium flex-1">{s.label}</span>
                      {profile.onlineStatus === s.id && (
                        <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {tab === 'appearance' && (
            <div className="p-5 space-y-6">
              {/* Theme */}
              <div>
                <label className="block font-bold text-muted-foreground mb-3 uppercase tracking-wide text-sm">Theme</label>
                <div className="space-y-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        theme === t.id ? 'bg-muted' : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="w-5 h-5 rounded border-2 border-border flex-shrink-0" style={{ backgroundColor: t.preview }} />
                      <span className="text-foreground font-medium flex-1">{t.label}</span>
                      {theme === t.id && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block font-bold text-muted-foreground mb-3 uppercase tracking-wide text-sm">Accent Color</label>
                <div className="grid grid-cols-3 gap-3">
                  {ACCENT_COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setAccentColor(c.id)}
                      className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-colors ${
                        accentColor === c.id ? 'bg-muted' : 'hover:bg-muted/50'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-3 ${accentColor === c.id ? 'border-foreground' : 'border-transparent'}`}
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-xs font-medium text-muted-foreground">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Size */}
              <div>
                <label className="block font-bold text-muted-foreground mb-3 uppercase tracking-wide text-sm">Text Size</label>
                <div className="flex gap-2">
                  {TEXT_SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setTextSize(s.id)}
                      className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                        textSize === s.id
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-foreground hover:bg-muted/70'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {tab === 'notifications' && (
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  {notificationsEnabled ? <Bell className="w-5 h-5 text-accent" /> : <BellOff className="w-5 h-5 text-muted-foreground" />}
                  <div>
                    <p className="font-medium text-foreground">Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive push notifications</p>
                  </div>
                </div>
                <ToggleSwitch enabled={notificationsEnabled} onToggle={() => setNotificationsEnabled(!notificationsEnabled)} />
              </div>

              <div className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  {soundEnabled ? <Volume2 className="w-5 h-5 text-accent" /> : <VolumeOff className="w-5 h-5 text-muted-foreground" />}
                  <div>
                    <p className="font-medium text-foreground">Sounds</p>
                    <p className="text-xs text-muted-foreground">Play message sounds</p>
                  </div>
                </div>
                <ToggleSwitch enabled={soundEnabled} onToggle={() => setSoundEnabled(!soundEnabled)} />
              </div>

              <div className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  {stealthMode ? <EyeOff className="w-5 h-5 text-accent" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
                  <div>
                    <p className="font-medium text-foreground">Stealth Mode</p>
                    <p className="text-xs text-muted-foreground">Hide read receipts & presence</p>
                  </div>
                </div>
                <ToggleSwitch enabled={stealthMode} onToggle={() => setStealthMode(!stealthMode)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
