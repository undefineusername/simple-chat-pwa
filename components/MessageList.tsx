'use client';

import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import type { Message } from '@/types/chat';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === 'current-user';
        const timestamp = message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp);
        
        return (
          <div
            key={message.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex flex-col gap-1 max-w-xs">
              <MessageBubble
                text={message.text}
                sender={isCurrentUser ? 'user' : 'other'}
                timestamp={formatTime(timestamp)}
                status={message.status}
              />
            </div>
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}
