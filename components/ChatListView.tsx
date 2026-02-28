'use client';

import { useState, useMemo } from 'react';
import ChatListItem from './ChatListItem';
import ChatListSearch from './ChatListSearch';
import SettingsPanel from './SettingsPanel';
import UserStatusBar from './UserStatusBar';
import type { Room } from '@/types/chat';

interface ChatListViewProps {
  rooms: Room[];
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
  onTogglePin: (roomId: string) => void;
  onToggleMute: (roomId: string) => void;
}

export default function ChatListView({
  rooms,
  activeRoomId,
  onSelectRoom,
  onTogglePin,
  onToggleMute,
}: ChatListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filteredRooms = useMemo(() => {
    let result = rooms;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((room) =>
        room.participants[0]?.name.toLowerCase().includes(query)
      );
    }
    // Sort: pinned first, then by lastMessageAt descending
    return [...result].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
      return bTime - aTime;
    });
  }, [rooms, searchQuery]);

  return (
    <div className="h-full w-full flex flex-col bg-background relative">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Simple_Chat</h1>
      </div>

      {/* Settings Panel */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Search */}
      <div className="px-4 py-2 border-b border-border">
        <ChatListSearch onSearch={setSearchQuery} />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-1 px-2 py-2">
          {filteredRooms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">
                {searchQuery ? 'No chats found' : 'No chats yet'}
              </p>
            </div>
          ) : (
            filteredRooms.map((room) => (
              <ChatListItem
                key={room.id}
                room={room}
                isActive={activeRoomId === room.id}
                onSelect={() => onSelectRoom(room.id)}
                onTogglePin={() => onTogglePin(room.id)}
                onToggleMute={() => onToggleMute(room.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* User Status Bar - Discord style bottom bar */}
      <UserStatusBar onOpenSettings={() => setIsSettingsOpen(true)} />
    </div>
  );
}
