'use client';

import { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatRoomMenu from './ChatRoomMenu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Room } from '@/types/chat';

interface ChatLayoutProps {
  room: Room;
  onBack?: () => void;
  onLeaveChat?: (roomId: string) => void;
  onBlockUser?: (userId: string) => void;
}

export default function ChatLayout({ room, onBack, onLeaveChat, onBlockUser }: ChatLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showMenu, setShowMenu] = useState(false);
  const otherParticipant = room.participants[0];

  const handleSendMessage = (text: string) => {
    console.log('[v0] Sending message:', text);
  };

  const handleLeaveChat = () => {
    if (onLeaveChat) {
      onLeaveChat(room.id);
    }
    if (onBack) {
      onBack();
    }
  };

  const handleBlockUser = () => {
    if (onBlockUser && otherParticipant) {
      onBlockUser(otherParticipant.id);
    }
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground overflow-hidden">
      {/* Header - Simple and clean */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-3 justify-between bg-background">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {isMobile && onBack && (
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <Avatar className="h-10 w-10 border border-border flex-shrink-0">
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-sm">
              {otherParticipant?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-foreground truncate">
              {otherParticipant?.name}
            </h2>
            <p className="text-xs text-muted-foreground">
              {otherParticipant?.isOnline ? 'Active' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Info button */}
        <button
          onClick={() => setShowMenu(true)}
          className="p-1.5 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
          aria-label="Chat options"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Room Menu */}
      <ChatRoomMenu
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        userName={otherParticipant?.name || 'User'}
        onLeaveChat={handleLeaveChat}
        onBlockUser={handleBlockUser}
      />

      {/* Messages */}
      <MessageList messages={room.messages} />

      {/* Input */}
      <MessageInput onSend={handleSendMessage} autoFocus={isMobile} />
    </div>
  );
}
