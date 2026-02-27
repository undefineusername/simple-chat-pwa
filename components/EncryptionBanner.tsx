'use client';

import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EncryptionBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center justify-center gap-2"
    >
      <Shield className="w-4 h-4 text-accent" />
      <span className="text-sm font-medium text-foreground">
        End-to-End Encrypted
      </span>
    </motion.div>
  );
}
