'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';
import ChatLayout from './ChatLayout';
import ChatListView from './ChatListView';
import type { Room } from '@/types/chat';

interface AppContainerProps {
  rooms: Room[];
}

export default function AppContainer({ rooms }: AppContainerProps) {
  const [activeRoomId, setActiveRoomId] = useState<string>(rooms[0]?.id || '');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  return (
    <div className="h-screen w-full bg-background flex overflow-hidden">
      {/* Desktop: Split View */}
      {!isMobile && (
        <>
          {/* Chat List - Left Sidebar */}
          <div className="w-80 border-r border-border flex flex-col">
            <ChatListView
              rooms={rooms}
              activeRoomId={activeRoomId}
              onSelectRoom={setActiveRoomId}
            />
          </div>

          {/* Active Chat - Right Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeRoom && <ChatLayout room={activeRoom} />}
          </div>
        </>
      )}

      {/* Mobile: Toggle Between List and Chat */}
      {isMobile && (
        <>
          {!activeRoomId ? (
            <div className="w-full">
              <ChatListView
                rooms={rooms}
                activeRoomId={activeRoomId}
                onSelectRoom={setActiveRoomId}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col">
              {activeRoom && (
                <ChatLayout
                  room={activeRoom}
                  onBack={() => setActiveRoomId('')}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
