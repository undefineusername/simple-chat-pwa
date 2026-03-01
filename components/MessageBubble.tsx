'use client';

import { Check, CheckCheck } from 'lucide-react';

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
      className={`relative px-4 py-2.5 rounded-3xl max-w-xs ${isUser
        ? 'bg-accent text-accent-foreground'
        : 'bg-muted text-foreground'
        }`}
    >
      <p className="text-base leading-relaxed break-words">{text}</p>
      <div className={`text-xs mt-0.5 flex items-center gap-1 justify-end ${isUser ? 'text-accent-foreground/70' : 'text-muted-foreground'
        }`}>
        {isUser && status === 'read' && (
          <CheckCheck className="w-3 h-3" />
        )}
        {isUser && status !== 'read' && (
          <Check className="w-3 h-3" />
        )}
        <span>{timestamp}</span>
      </div>
    </div>
  );
}
