'use client';

import { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import type { Message } from '@/types/chat';

interface MessageListProps {
  messages: Message[];
  onMessageDelete?: (messageId: string) => void;
  onMessageReply?: (messageId: string) => void;
}

export default function MessageList({
  messages,
  onMessageDelete,
  onMessageReply,
}: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [deletedMessages, setDeletedMessages] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [messages]);

  const formatTime = (date: Date) => {
    // Use UTC offset to ensure consistent formatting across server and client
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const displayHours = date.getHours() % 12 || 12;
    return `${String(displayHours).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const handleDeleteMessage = (messageId: string) => {
    setDeletedMessages((prev) => new Set(prev).add(messageId));
    onMessageDelete?.(messageId);
  };

  const handleReplyMessage = (messageId: string) => {
    setReplyingTo(messageId);
    onMessageReply?.(messageId);
  };

  const getReplyingToMessage = (messageId: string) => {
    return messages.find((m) => m.id === messageId);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === 'current-user';
        const timestamp =
          message.timestamp instanceof Date
            ? message.timestamp
            : new Date(message.timestamp);
        const isDeleted = deletedMessages.has(message.id);
        const replyingToMsg =
          message.replyTo && getReplyingToMessage(message.replyTo);

        return (
          <div
            key={message.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex flex-col gap-2 max-w-xs w-full">
              {/* Reply Preview */}
              {replyingToMsg && !isDeleted && (
                <div
                  className={`text-xs px-3 py-2 rounded-lg border-l-2 ${
                    isCurrentUser
                      ? 'bg-accent/20 border-accent text-accent-foreground/70'
                      : 'bg-secondary/50 border-muted-foreground text-muted-foreground'
                  }`}
                >
                  <p className="font-semibold text-xs mb-1">
                    {replyingToMsg.senderId === 'current-user'
                      ? 'You'
                      : 'Other'}
                  </p>
                  <p className="truncate">
                    {replyingToMsg.isDeleted
                      ? 'This message was deleted'
                      : replyingToMsg.text}
                  </p>
                </div>
              )}

              {/* Message Bubble */}
              <div className="relative">
                <MessageBubble
                  id={message.id}
                  text={message.text}
                  sender={isCurrentUser ? 'user' : 'other'}
                  timestamp={formatTime(timestamp)}
                  status={message.status}
                  isDeleted={isDeleted}
                  onDelete={handleDeleteMessage}
                  onReply={handleReplyMessage}
                />
              </div>
            </div>
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}
