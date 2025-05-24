'use client';
import { motion } from 'framer-motion';

export default function Community() {
  const values = ['Visionary', 'Collaborative', 'Empowering', 'Grounded'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
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

  const valueVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.h2
            className="text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            COMMUNITY
          </motion.h2>
          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            variants={containerVariants}
          >
            {values.map((value, i) => (
              <motion.span
                key={i}
                className="text-lg font-semibold text-primary cursor-default"
                style={{ color: "rgb(180, 113, 26)" }} // Set initial color explicitly
                variants={valueVariants}
                whileHover={{
                  scale: 1.1,
                  color: "rgb(247, 167, 64)",
                  transition: { duration: 0.2 }
                }}
              >
                {value}{i < values.length - 1 && '.'}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.p
              className="text-lg leading-relaxed"
              variants={itemVariants}
            >
              A calm but bold tone that speaks directly to women who value authenticity,
              honesty, and action. Clear, thoughtful language that invites conversation
              rather than selling a product.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed mt-4"
              variants={itemVariants}
            >
              Casual yet purposeful, like advice from a wise friend. Focuses on fostering
              safety and belonging while celebrating diversity in rural women&#39;s experiences.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative h-96 bg-primary/10 rounded-lg overflow-hidden"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Placeholder for community image with animated background */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0.5 }}
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(180, 113, 26, 0.1), rgba(247, 167, 64, 0.1))",
                  "linear-gradient(45deg, rgba(247, 167, 64, 0.1), rgba(180, 113, 26, 0.1))",
                  "linear-gradient(45deg, rgba(180, 113, 26, 0.1), rgba(247, 167, 64, 0.1))"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.span
                className="text-primary/50 text-xl font-medium"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Community Image
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
