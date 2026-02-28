export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string | Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  replyTo?: string; // ID of the message being replied to
  isDeleted?: boolean;
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface Room {
  id: string;
  participants: Participant[];
  messages: Message[];
  createdAt: Date;
  lastMessageAt?: Date;
  isPinned?: boolean;
  isMuted?: boolean;
  isBlocked?: boolean;
}
