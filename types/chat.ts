export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string | Date;
  status: 'sending' | 'sent' | 'delivered';
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
}

export interface Room {
  id: string;
  participants: Participant[];
  messages: Message[];
  createdAt: Date;
  lastMessageAt?: Date;
}
