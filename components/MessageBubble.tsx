'use client';

import { useState } from 'react';
import { Check, CheckCheck, Trash2, Reply } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MessageBubbleProps {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  isDeleted?: boolean;
  onDelete?: (messageId: string) => void;
  onReply?: (messageId: string) => void;
}

export default function MessageBubble({
  id,
  text,
  sender,
  timestamp,
  status = 'delivered',
  isDeleted = false,
  onDelete,
  onReply,
}: MessageBubbleProps) {
  const isUser = sender === 'user';
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`group relative px-4 py-3 rounded-2xl ${
        isUser
          ? 'bg-accent text-accent-foreground rounded-br-none'
          : 'bg-secondary text-foreground rounded-bl-none'
      } ${isDeleted ? 'opacity-50' : ''}`}
    >
      {isDeleted ? (
        <p className="text-base leading-relaxed break-words italic opacity-70">
          This message was deleted
        </p>
      ) : (
        <>
          <p className="text-base leading-relaxed break-words">{text}</p>
          <div
            className={`text-xs mt-1 flex items-center gap-1 ${
              isUser
                ? 'text-accent-foreground/60'
                : 'text-muted-foreground'
            }`}
          >
            {isUser && (
              <>
                {status === 'read' ? (
                  <CheckCheck className="w-3 h-3 text-accent-foreground/80" />
                ) : (
                  <Check className="w-3 h-3 text-accent-foreground/80" />
                )}
              </>
            )}
            <span>{timestamp}</span>
          </div>
        </>
      )}

      {/* Message Actions */}
      {!isDeleted && (
        <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
          <DropdownMenuTrigger asChild>
            <button
              className="absolute -right-10 top-0 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-secondary"
              aria-label="Message actions"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.5 1.5H9.5V3.5H10.5V1.5ZM10.5 8.5H9.5V10.5H10.5V8.5ZM10.5 15.5H9.5V17.5H10.5V15.5Z" />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onReply?.(id)}>
              <Reply className="w-4 h-4 mr-2" />
              <span>Reply</span>
            </DropdownMenuItem>
            {isUser && (
              <DropdownMenuItem
                onClick={() => onDelete?.(id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
