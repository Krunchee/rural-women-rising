'use client';
import { motion } from 'framer-motion';

export default function LoadingCard() {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const pulseVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const SkeletonBox = ({ className }: { className: string }) => (
    <motion.div
      className={`bg-gray-200 relative overflow-hidden ${className}`}
      variants={pulseVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />
    </motion.div>
  );

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image placeholder */}
      <SkeletonBox className="h-48" />

      <div className="p-6">
        {/* Badge placeholder */}
        <SkeletonBox className="h-4 rounded-full w-20 mb-3" />

        {/* Title placeholder */}
        <SkeletonBox className="h-6 rounded w-3/4 mb-3" />

        {/* Meta info placeholders */}
        <div className="flex gap-4 mb-3">
          <SkeletonBox className="h-4 rounded w-24" />
          <SkeletonBox className="h-4 rounded w-20" />
        </div>

        {/* Date placeholder */}
        <SkeletonBox className="h-3 rounded w-16 mb-3" />

        {/* Description placeholders */}
        <div className="space-y-2 mb-4">
          <SkeletonBox className="h-4 rounded w-full" />
          <SkeletonBox className="h-4 rounded w-5/6" />
          <SkeletonBox className="h-4 rounded w-4/6" />
        </div>

        {/* Button placeholder */}
        <SkeletonBox className="h-10 rounded-full w-full" />
      </div>
    </motion.div>
  );
}
