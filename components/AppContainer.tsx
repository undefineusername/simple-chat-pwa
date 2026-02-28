'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';
import ChatLayout from './ChatLayout';
import ChatListView from './ChatListView';
import type { Room } from '@/types/chat';

interface AppContainerProps {
  rooms: Room[];
}

export default function AppContainer({ rooms: initialRooms }: AppContainerProps) {
  const [activeRoomId, setActiveRoomId] = useState<string>(
    initialRooms[0]?.id || ''
  );
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  const handleBlockUser = (userId: string) => {
    // Mark the room as blocked and update the chat list
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.participants[0]?.id === userId
          ? { ...room, isBlocked: true }
          : room
      )
    );
    console.log('[v0] User blocked:', userId);
  };

  const handleDeleteChat = (roomId: string) => {
    // Remove the room from the list
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    
    // If the deleted room was active, switch to the first available room
    if (activeRoomId === roomId) {
      const remainingRooms = rooms.filter((room) => room.id !== roomId);
      setActiveRoomId(remainingRooms[0]?.id || '');
    }
    
    console.log('[v0] Chat deleted:', roomId);
  };

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
            {activeRoom && (
              <ChatLayout
                room={activeRoom}
                onBlockUser={handleBlockUser}
                onDeleteChat={handleDeleteChat}
              />
            )}
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
                  onBlockUser={handleBlockUser}
                  onDeleteChat={handleDeleteChat}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
