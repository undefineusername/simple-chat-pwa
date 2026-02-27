'use client';

import { Check, Check2 } from 'lucide-react';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export default function MessageBubble({
  text,
  sender,
  timestamp,
  status = 'delivered',
}: MessageBubbleProps) {
  const isUser = sender === 'user';

  return (
    <div
      className={`relative px-4 py-3 rounded-2xl ${
        isUser
          ? 'bg-accent text-accent-foreground rounded-br-none'
          : 'bg-secondary text-foreground rounded-bl-none'
      }`}
    >
      <p className="text-base leading-relaxed break-words">{text}</p>
      <div className={`text-xs mt-1 flex items-center gap-1 ${
        isUser ? 'text-accent-foreground/60' : 'text-muted-foreground'
      }`}>
        {isUser && (
          <>
            {status === 'read' ? (
              <Check2 className="w-3 h-3 text-accent-foreground/80" />
            ) : (
              <Check className="w-3 h-3 text-accent-foreground/80" />
            )}
          </>
        )}
        <span>{timestamp}</span>
      </div>
    </div>
  );
}
