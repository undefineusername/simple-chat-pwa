'use client';

import { useState } from 'react';
import { ArrowLeft, Phone, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMediaQuery } from '@/hooks/use-mobile';
import EncryptionBanner from './EncryptionBanner';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import type { Room } from '@/types/chat';

interface ChatLayoutProps {
  room: Room;
  onBack?: () => void;
  onBlockUser?: (userId: string) => void;
  onDeleteChat?: (roomId: string) => void;
}

export default function ChatLayout({
  room,
  onBack,
  onBlockUser,
  onDeleteChat,
}: ChatLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const otherParticipant = room.participants[0];
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);

  const handleSendMessage = (text: string) => {
    console.log('[v0] Sending message:', text);
  };

  const handleDeleteChat = () => {
    onDeleteChat?.(room.id);
    setIsDeleteDialogOpen(false);
  };

  const handleBlockUser = () => {
    onBlockUser?.(otherParticipant?.id || '');
    setIsBlockDialogOpen(false);
  };

  const initials = otherParticipant?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex flex-col h-full bg-background text-foreground overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {isMobile && onBack && (
            <button
              onClick={onBack}
              className="p-1 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          )}

          {/* Avatar with Profile Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 border border-border flex-shrink-0">
              <AvatarImage src={otherParticipant?.avatar} />
              <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-foreground truncate">
                {otherParticipant?.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {otherParticipant?.isOnline ? 'Active now' : 'Offline'}
              </p>
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Start call"
          >
            <Phone className="w-5 h-5 text-foreground" />
          </button>

          {/* More Options Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                aria-label="More options"
              >
                <MoreVertical className="w-5 h-5 text-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => setIsBlockDialogOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                Block User
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                Delete Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Encryption Banner */}
      <EncryptionBanner />

      {/* Messages */}
      <MessageList messages={room.messages} />

      {/* Input */}
      <MessageInput onSend={handleSendMessage} />

      {/* Delete Chat Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Chat</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this chat? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteChat}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Block User Dialog */}
      <AlertDialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Block User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to block {otherParticipant?.name}? You won't
            receive messages from this user anymore.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBlockUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Block
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
