'use client';

import { useMemo } from 'react';
import AppContainer from '@/components/AppContainer';
import type { Room } from '@/types/chat';

// Use fixed timestamps to avoid hydration mismatch from Date.now()
const BASE_TIME = new Date('2026-02-28T12:00:00Z').getTime();

export default function Home() {
  const sampleRooms: Room[] = useMemo<Room[]>(() => [
    {
      id: 'room-1',
      participants: [
        {
          id: 'user-1',
          name: 'Alex Johnson',
          avatar: undefined,
          isOnline: true,
        },
      ],
      messages: [
        {
          id: 'msg-1',
          senderId: 'user-1',
          text: 'Hey! How are you doing?',
          timestamp: new Date(BASE_TIME - 600000),
          status: 'read',
        },
        {
          id: 'msg-2',
          senderId: 'current-user',
          text: 'I\'m doing great! Just finished a project.',
          timestamp: new Date(BASE_TIME - 300000),
          status: 'read',
        },
        {
          id: 'msg-3',
          senderId: 'user-1',
          text: 'That sounds awesome! Tell me more about it.',
          timestamp: new Date(BASE_TIME - 100000),
          status: 'read',
        },
        {
          id: 'msg-4',
          senderId: 'current-user',
          text: 'It\'s a new chat application with end-to-end encryption.',
          timestamp: new Date(BASE_TIME - 30000),
          status: 'delivered',
        },
      ],
      createdAt: new Date(BASE_TIME - 86400000),
      lastMessageAt: new Date(BASE_TIME - 30000),
      isPinned: true,
      isMuted: false,
    },
    {
      id: 'room-2',
      participants: [
        {
          id: 'user-2',
          name: 'Sarah Davis',
          avatar: undefined,
          isOnline: false,
        },
      ],
      messages: [
        {
          id: 'msg-5',
          senderId: 'user-2',
          text: 'Are we still on for coffee tomorrow?',
          timestamp: new Date(BASE_TIME - 3600000),
          status: 'read',
        },
        {
          id: 'msg-6',
          senderId: 'current-user',
          text: 'Yes! 10 AM at the usual place?',
          timestamp: new Date(BASE_TIME - 1800000),
          status: 'delivered',
        },
      ],
      createdAt: new Date(BASE_TIME - 172800000),
      lastMessageAt: new Date(BASE_TIME - 1800000),
      isPinned: false,
      isMuted: false,
    },
    {
      id: 'room-3',
      participants: [
        {
          id: 'user-3',
          name: 'Michael Chen',
          avatar: undefined,
          isOnline: true,
        },
      ],
      messages: [
        {
          id: 'msg-7',
          senderId: 'user-3',
          text: 'Did you see the latest design updates?',
          timestamp: new Date(BASE_TIME - 7200000),
          status: 'read',
        },
        {
          id: 'msg-8',
          senderId: 'current-user',
          text: 'Not yet, I\'ll check them out later today',
          timestamp: new Date(BASE_TIME - 3600000),
          status: 'sent',
        },
      ],
      createdAt: new Date(BASE_TIME - 259200000),
      lastMessageAt: new Date(BASE_TIME - 3600000),
      isPinned: false,
      isMuted: true,
    },
    {
      id: 'room-4',
      participants: [
        {
          id: 'user-4',
          name: 'Emma Wilson',
          avatar: undefined,
          isOnline: true,
        },
      ],
      messages: [
        {
          id: 'msg-9',
          senderId: 'current-user',
          text: 'Just checking in! How\'s everything going?',
          timestamp: new Date(BASE_TIME - 86400000),
          status: 'read',
        },
        {
          id: 'msg-10',
          senderId: 'user-4',
          text: 'All good! Busy week but making progress',
          timestamp: new Date(BASE_TIME - 64800000),
          status: 'read',
        },
      ],
      createdAt: new Date(BASE_TIME - 345600000),
      lastMessageAt: new Date(BASE_TIME - 64800000),
      isPinned: false,
      isMuted: false,
    },
  ], []);

  return <AppContainer rooms={sampleRooms} />;
}
