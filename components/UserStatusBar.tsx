'use client';

import { useState } from 'react';
import { Mic, MicOff, Headphones, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSettings } from '@/contexts/SettingsContext';

const STATUS_COLORS: Record<string, string> = {
  online: '#22c55e',
  idle: '#eab308',
  dnd: '#ef4444',
  invisible: '#6b7280',
};

interface UserStatusBarProps {
  onOpenSettings: () => void;
}

export default function UserStatusBar({ onOpenSettings }: UserStatusBarProps) {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const { profile } = useSettings();

  return (
    <div className="flex-shrink-0 bg-card border-t border-border px-3 py-2">
      <div className="flex items-center gap-2">
        {/* Avatar with status */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-[10px]">
              {profile.avatarEmoji}
            </AvatarFallback>
          </Avatar>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card"
            style={{ backgroundColor: STATUS_COLORS[profile.onlineStatus] || '#22c55e' }}
          />
        </div>

        {/* Name & Status */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate leading-tight">
            {profile.displayName}
          </p>
          <p className="text-[10px] text-accent truncate leading-tight">
            {profile.statusMessage || 'No status'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            onClick={() => setIsMicMuted(!isMicMuted)}
            className={`p-1.5 rounded transition-colors ${
              isMicMuted
                ? 'bg-destructive/20 text-destructive'
                : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
            }`}
            aria-label={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMicMuted ? (
              <MicOff className="w-3.5 h-3.5" />
            ) : (
              <Mic className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={() => setIsDeafened(!isDeafened)}
            className={`p-1.5 rounded transition-colors ${
              isDeafened
                ? 'bg-destructive/20 text-destructive'
                : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
            }`}
            aria-label={isDeafened ? 'Undeafen' : 'Deafen'}
          >
            <Headphones className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="User settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
