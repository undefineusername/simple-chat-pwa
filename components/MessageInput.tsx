'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Plus } from 'lucide-react';

interface MessageInputProps {
  onSend: (text: string) => void;
  autoFocus?: boolean;
}

export default function MessageInput({ onSend, autoFocus = false }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(
        textareaRef.current.scrollHeight,
        24 * 4 // Max 4 lines (approximately)
      );
      textareaRef.current.style.height = `${newHeight}px`;
      setRows(Math.min(Math.ceil(value.split('\n').length), 4));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter, but allow Shift+Enter for new lines
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
      setRows(1);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="flex-shrink-0 bg-background border-t border-border px-3 py-3 safe-area-inset-bottom">
      <div className="flex items-end gap-2">
        <button
          className="flex-shrink-0 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Add attachment"
        >
          <Plus className="w-6 h-6" />
        </button>

        <div className="flex-1 relative bg-muted rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-accent transition-all">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            rows={rows}
            className="w-full bg-transparent text-foreground placeholder-muted-foreground outline-none resize-none text-base leading-relaxed"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="flex-shrink-0 p-2 rounded-full bg-accent hover:bg-accent/90 disabled:opacity-30 disabled:cursor-not-allowed text-accent-foreground transition-all"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
