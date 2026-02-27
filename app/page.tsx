'use client';

import { useState } from 'react';
import ChatLayout from '@/components/ChatLayout';
import EncryptionBanner from '@/components/EncryptionBanner';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  sent: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you doing?',
      sender: 'other',
      timestamp: new Date(Date.now() - 60000),
      sent: true,
    },
    {
      id: '2',
      text: 'I\'m doing great! Just finished a project.',
      sender: 'user',
      timestamp: new Date(Date.now() - 30000),
      sent: true,
    },
    {
      id: '3',
      text: 'That sounds awesome!',
      sender: 'other',
      timestamp: new Date(Date.now() - 10000),
      sent: true,
    },
  ]);

  const handleSendMessage = (text: string) => {
    const optimisticMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      sent: false,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    // Simulate message send with a delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === optimisticMessage.id ? { ...msg, sent: true } : msg
        )
      );
    }, 500);
  };

  return (
    <ChatLayout>
      <EncryptionBanner />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </ChatLayout>
  );
}
