'use client';

import { useState, useMemo } from 'react';
import { Settings } from 'lucide-react';
import ChatListItem from './ChatListItem';
import ChatListSearch from './ChatListSearch';
import SettingsPanel from './SettingsPanel';
import type { Room } from '@/types/chat';

interface ChatListViewProps {
  rooms: Room[];
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
}

export default function ChatListView({
  rooms,
  activeRoomId,
  onSelectRoom,
}: ChatListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filteredRooms = useMemo(() => {
    if (!searchQuery) return rooms;
    const query = searchQuery.toLowerCase();
    return rooms.filter((room) =>
      room.participants[0]?.name.toLowerCase().includes(query)
    );
  }, [rooms, searchQuery]);

  return (
    <div className="h-full w-full flex flex-col bg-background relative">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">Simple_Chat</h1>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="p-1.5 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5 text-foreground" />
        </button>
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
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
