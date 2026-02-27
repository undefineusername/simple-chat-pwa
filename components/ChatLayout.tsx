'use client';

import { ArrowLeft } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';
import EncryptionBanner from './EncryptionBanner';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import type { Room, Message } from '@/types/chat';

interface ChatLayoutProps {
  room: Room;
  onBack?: () => void;
}

export default function ChatLayout({ room, onBack }: ChatLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const otherParticipant = room.participants[0];

  const handleSendMessage = (text: string) => {
    // This will be connected to actual message sending logic
    console.log('[v0] Sending message:', text);
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-3">
        {isMobile && onBack && (
          <button
            onClick={onBack}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-foreground truncate">
            {otherParticipant?.name}
          </h2>
          <p className="text-xs text-muted-foreground">Active now</p>
        </div>
      </div>

      {/* Encryption Banner */}
      <EncryptionBanner />

      {/* Messages */}
      <MessageList messages={room.messages} />

      {/* Input */}
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}
