'use client';

import { useState, useRef } from 'react';
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
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const bubbleRef = useRef<HTMLDivElement>(null);

  const handleLongPress = () => {
    if (!isDeleted) {
      setShowMenu(true);
    }
  };

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(handleLongPress, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isDeleted) {
      setContextMenu({ x: e.clientX, y: e.clientY });
      setShowMenu(true);
    }
  };

  return (
    <div
      ref={bubbleRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onContextMenu={handleContextMenu}
      className={`relative px-4 py-3 rounded-2xl select-none ${
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

      {/* Context Menu */}
      {!isDeleted && (
        <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
          <DropdownMenuTrigger asChild>
            <div />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-32"
            style={contextMenu ? { position: 'fixed', left: contextMenu.x, top: contextMenu.y } : undefined}
          >
            <DropdownMenuItem onClick={() => { onReply?.(id); setShowMenu(false); }}>
              <Reply className="w-4 h-4 mr-2" />
              <span>Reply</span>
            </DropdownMenuItem>
            {isUser && (
              <DropdownMenuItem
                onClick={() => { onDelete?.(id); setShowMenu(false); }}
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
