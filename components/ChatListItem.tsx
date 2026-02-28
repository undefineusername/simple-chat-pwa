'use client';

import { useState, useRef } from 'react';
import { Pin, BellOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Room } from '@/types/chat';

interface ChatListItemProps {
  room: Room;
  isActive: boolean;
  onSelect: () => void;
  onTogglePin?: (roomId: string, isPinned: boolean) => void;
  onToggleMute?: (roomId: string, isMuted: boolean) => void;
}

export default function ChatListItem({
  room,
  isActive,
  onSelect,
  onTogglePin,
  onToggleMute,
}: ChatListItemProps) {
  const otherParticipant = room.participants[0];
  const lastMessage = room.messages[room.messages.length - 1];
  const initials = otherParticipant?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  
  const [showContextMenu, setShowContextMenu] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const itemRef = useRef<HTMLDivElement>(null);

  const handlePinToggle = () => {
    onTogglePin?.(room.id, !room.isPinned);
    setShowContextMenu(false);
  };

  const handleMuteToggle = () => {
    onToggleMute?.(room.id, !room.isMuted);
    setShowContextMenu(false);
  };

  const handleLongPress = () => {
    setShowContextMenu(true);
  };

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(handleLongPress, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

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
    <DropdownMenu open={showContextMenu} onOpenChange={setShowContextMenu}>
      <DropdownMenuTrigger asChild>
        <button
          ref={itemRef}
          onClick={onSelect}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onContextMenu={handleContextMenu}
          className={`w-full px-3 py-3 rounded-lg flex items-start gap-3 transition-colors ${
            isActive ? 'bg-secondary' : 'hover:bg-secondary/50'
          }`}
        >
      {/* Avatar with Online Indicator */}
      <div className="flex-shrink-0 relative">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarImage src={otherParticipant?.avatar} />
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

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute left-0 top-0 w-1 h-full bg-accent rounded-r" />
      )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={handlePinToggle}>
          <Pin className="w-4 h-4 mr-2" />
          <span>{room.isPinned ? 'Unpin' : 'Pin'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMuteToggle}>
          <BellOff className="w-4 h-4 mr-2" />
          <span>{room.isMuted ? 'Unmute' : 'Mute'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
