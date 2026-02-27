'use client';

import { motion } from 'framer-motion';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

export default function MessageBubble({
  text,
  sender,
  timestamp,
}: MessageBubbleProps) {
  const isUser = sender === 'user';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className={`group relative px-4 py-3 rounded-2xl transition-colors ${
        isUser
          ? 'bg-accent text-accent-foreground rounded-br-none'
          : 'bg-secondary text-foreground rounded-bl-none'
      }`}
    >
      <p className="text-base leading-relaxed break-words">{text}</p>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`text-xs mt-1 ${
          isUser ? 'text-accent-foreground/60' : 'text-muted-foreground'
        }`}
      >
        {timestamp}
      </motion.div>
    </motion.div>
  );
}
