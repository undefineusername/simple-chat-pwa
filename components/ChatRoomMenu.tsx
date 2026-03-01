'use client';

import { useState } from 'react';
import { LogOut, Ban, X, AlertCircle } from 'lucide-react';

interface ChatRoomMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onLeaveChat: () => void;
  onBlockUser: () => void;
}

export default function ChatRoomMenu({
  isOpen,
  onClose,
  userName,
  onLeaveChat,
  onBlockUser,
}: ChatRoomMenuProps) {
  const [showConfirm, setShowConfirm] = useState<'leave' | 'block' | null>(null);

  if (!isOpen) return null;

  const handleLeave = () => {
    onLeaveChat();
    onClose();
  };

  const handleBlock = () => {
    onBlockUser();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-xs bg-background border border-border rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Chat Options</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!showConfirm ? (
          <div className="p-3 space-y-1">
            <button
              onClick={() => setShowConfirm('leave')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/30 transition-colors text-foreground"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Leave Chat</span>
            </button>

            <button
              onClick={() => setShowConfirm('block')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 transition-colors text-destructive"
            >
              <Ban className="w-5 h-5" />
              <span className="text-sm font-medium">Block {userName}</span>
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Confirmation message */}
            <div className="flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  {showConfirm === 'leave'
                    ? 'Leave this chat?'
                    : `Block ${userName}?`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {showConfirm === 'leave'
                    ? 'You will no longer see this conversation.'
                    : `You won't see messages or notifications from ${userName}.`}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 px-3 py-2 rounded-lg bg-muted text-foreground font-medium text-sm hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showConfirm === 'leave' ? handleLeave : handleBlock}
                className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  showConfirm === 'leave'
                    ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                    : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                }`}
              >
                {showConfirm === 'leave' ? 'Leave' : 'Block'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
