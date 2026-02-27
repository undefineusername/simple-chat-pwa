'use client';

import { motion } from 'framer-motion';
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
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ backgroundColor: 'rgba(204, 255, 0, 0.05)' }}
      whileTap={{ scale: 0.98 }}
      className={`w-full px-3 py-3 rounded-lg flex items-start gap-3 transition-colors ${
        isActive ? 'bg-secondary' : 'hover:bg-secondary/50'
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
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
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 w-1 h-10 bg-accent rounded-r"
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}
