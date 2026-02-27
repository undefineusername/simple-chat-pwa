'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Check as CheckDouble } from 'lucide-react';
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
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === 'current-user';
        const timestamp = message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp);
        
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: index * 0.05,
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex flex-col gap-1 max-w-xs">
              <MessageBubble
                text={message.text}
                sender={isCurrentUser ? 'user' : 'other'}
                timestamp={formatTime(timestamp)}
              />
              {isCurrentUser && (
                <div className="flex items-center justify-end gap-1 px-3 text-xs text-muted-foreground">
                  {message.status === 'delivered' ? (
                    <>
                      <CheckDouble className="w-3 h-3 text-accent" />
                      <span>Delivered</span>
                    </>
                  ) : message.status === 'sent' ? (
                    <>
                      <Check className="w-3 h-3 opacity-50" />
                      <span>Sent</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3 h-3 opacity-30" />
                      <span>Sending...</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}
