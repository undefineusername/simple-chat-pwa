'use client';

import { useState, useRef, useCallback } from 'react';
import { Pin, BellOff, Bell, Trash2, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Room } from '@/types/chat';

interface ChatListItemProps {
  room: Room;
  isActive: boolean;
  onSelect: () => void;
  onTogglePin: () => void;
  onToggleMute: () => void;
}

export default function ChatListItem({
  room,
  isActive,
  onSelect,
  onTogglePin,
  onToggleMute,
}: ChatListItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const otherParticipant = room.participants[0];
  const lastMessage = room.messages[room.messages.length - 1];
  const initials = otherParticipant?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const formatPreview = (text: string) => {
    return text.length > 45 ? text.substring(0, 45) + '...' : text;
  };

  const getTimeString = (date: Date) => {
    const now = new Date();
    const isToday =
      date.getUTCDate() === now.getUTCDate() &&
      date.getUTCMonth() === now.getUTCMonth() &&
      date.getUTCFullYear() === now.getUTCFullYear();

    if (isToday) {
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${month}/${day}`;
  };

  const handleTouchStart = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      setShowMenu(true);
    }, 500);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(true);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => { if (!showMenu) onSelect(); }}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={`w-full px-2 py-2 rounded-2xl flex items-center gap-3 transition-colors ${
          isActive ? 'bg-secondary' : 'hover:bg-muted/20'
        }`}
      >
        {/* Avatar with Online Indicator */}
        <div className="flex-shrink-0 relative">
          <Avatar className="h-14 w-14 border-2 border-border flex-shrink-0">
            <AvatarFallback className="bg-accent text-accent-foreground font-bold text-base">
              {initials}
            </AvatarFallback>
          </Avatar>
          {otherParticipant?.isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <h3 className="text-base font-semibold text-foreground truncate">
              {otherParticipant?.name}
            </h3>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {lastMessage ? getTimeString(new Date(lastMessage.timestamp)) : ''}
            </span>
          </div>

          {lastMessage && (
            <p className="text-sm text-muted-foreground truncate leading-snug">
              {formatPreview(lastMessage.text)}
            </p>
          )}
        </div>

        {/* Pinned and Muted Icons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {room.isPinned && (
            <Pin className="w-4 h-4 text-accent" />
          )}
          {room.isMuted && (
            <BellOff className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Context Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          {/* Menu */}
          <div className="absolute right-0 top-full z-50 mt-1 bg-white border border-border rounded-2xl shadow-md overflow-hidden min-w-48">
            <button
              onClick={(e) => { e.stopPropagation(); onTogglePin(); setShowMenu(false); }}
              className="w-full px-4 py-3 text-sm text-foreground hover:bg-muted/30 flex items-center gap-3 transition-colors"
            >
              <Pin className="w-4 h-4" />
              {room.isPinned ? 'Unpin chat' : 'Pin chat'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleMute(); setShowMenu(false); }}
              className="w-full px-4 py-3 text-sm text-foreground hover:bg-muted/30 flex items-center gap-3 transition-colors"
            >
              {room.isMuted ? (
                <>
                  <Bell className="w-4 h-4" />
                  Enable notifications
                </>
              ) : (
                <>
                  <BellOff className="w-4 h-4" />
                  Mute notifications
                </>
              )}
            </button>
            <div className="border-t border-border" />
            <button
              onClick={() => setShowMenu(false)}
              className="w-full px-4 py-3 text-sm text-muted-foreground hover:bg-muted/30 flex items-center gap-3 transition-colors"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}
