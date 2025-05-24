'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo({ variant = 'default' }: { variant?: 'default' | 'icon' | 'white' }) {
  // Determine the appropriate styling based on variant
  const logoClasses = variant === 'white'
    ? 'brightness-0 invert' // Makes the logo white for dark backgrounds
    : '';

  // Navigation height is h-20 (80px), so we constrain the logo to fit comfortably within it
  // Using h-12 (48px) to leave some padding space
  const logoHeight = 48;

  return (
    <motion.div
      className="flex items-center"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        hover: { duration: 0.3 }
      }}
    >
      <Image
        src="/Rural Women Rising_iconlogo_1.png"
        alt="Rural Women Rising"
        width={logoHeight}
        height={logoHeight}
        className={`h-12 w-auto ${logoClasses}`}
        priority
      />
    </motion.div>
  );
}
