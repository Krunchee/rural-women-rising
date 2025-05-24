'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../Button';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <motion.div
        className="absolute inset-0 sun-pattern opacity-5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Visible Logo */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
            <Image
              src="/Rural Women Rising_fulllogo_1.png"
              alt="Rural Women Rising - A lifeline, a meeting place, and a megaphone for women in rural and regional areas"
              width={1200}
              height={800}
              className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-auto"
              priority
              sizes="(max-width: 768px) 512px, (max-width: 1024px) 672px, (max-width: 1280px) 896px, 1152px"
            />
          </motion.div>

          {/* SEO Content - Hidden but accessible to search engines and screen readers */}
          <div className="sr-only">
            <h1>RURAL WOMEN RISING</h1>
            <h2>A lifeline, a meeting place, and a megaphone for women in rural and regional areas.</h2>
            <p>
              Through real-world coaching, inclusive events, digital toolkits, and storytelling,
              we empower women to own their place, their power, and their future.
            </p>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button size="lg">Join Our Community</Button>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button variant="outline" size="lg">Learn More</Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
