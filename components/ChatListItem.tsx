'use client';

import { Pin, BellOff } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Room } from '@/types/chat';

interface ChatListItemProps {
  room: Room;
  isActive: boolean;
  onSelect: () => void;
}

export default function ChatListItem({
  room,
  isActive,
  onSelect,
}: ChatListItemProps) {
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

  return (
    <button
      onClick={onSelect}
      className={`w-full px-3 py-3 rounded-lg flex items-start gap-3 transition-colors ${
        isActive ? 'bg-secondary' : 'hover:bg-secondary/50'
      }`}
    >
      {/* Avatar with Online Indicator */}
      <div className="flex-shrink-0 relative">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        {otherParticipant?.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-background" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="text-sm font-medium text-foreground truncate">
            {otherParticipant?.name}
          </h3>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {lastMessage ? getTimeString(new Date(lastMessage.timestamp)) : ''}
          </span>
        </div>

        {lastMessage && (
          <p className="text-xs text-muted-foreground truncate">
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

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute left-0 w-1 h-10 bg-accent rounded-r" />
      )}
    </button>
  );
}
