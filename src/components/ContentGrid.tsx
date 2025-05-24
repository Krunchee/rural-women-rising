'use client';
import { ReactNode, Children } from 'react';
import { motion } from 'framer-motion';
import LoadingCard from './LoadingCard';

interface ContentGridProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  loading?: boolean;
  loadingCount?: number;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ContentGrid({
  title,
  subtitle,
  children,
  loading = false,
  loadingCount = 6,
  columns = 3,
  gap = 'lg',
  className = ''
}: ContentGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getGapSize = () => {
    switch (gap) {
      case 'sm':
        return 'gap-4';
      case 'md':
        return 'gap-6';
      case 'lg':
        return 'gap-8';
      default:
        return 'gap-8';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      className={`py-20 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            variants={titleVariants}
          >
            {title && (
              <motion.h2
                className="text-4xl font-bold text-primary-dark mb-4"
                variants={titleVariants}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                className="text-xl text-primary-dark/80 max-w-3xl mx-auto"
                variants={titleVariants}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        <motion.div
          className={`grid ${getGridCols()} ${getGapSize()}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {loading ? (
            // Show loading cards with staggered animation
            Array.from({ length: loadingCount }).map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <LoadingCard />
              </motion.div>
            ))
          ) : (
            // Wrap children in motion divs for staggered animation
            Children.map(children, (child, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                {child}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
