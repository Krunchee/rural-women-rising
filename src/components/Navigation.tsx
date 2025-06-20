'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';
import Button from './Button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Stories', href: '/stories' },
    { label: 'Resources', href: '/resources' },
    { label: 'Events', href: '/events' },
    { label: 'Connect', href: '/connect' }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.nav
        className="bg-neutral-light/95 backdrop-blur-sm sticky top-0 z-50 border-b border-primary/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <Logo />
            </Link>

            <motion.div
              className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="font-medium hover:text-primary transition-colors relative group"
                  >
                    {item.label}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary" size="sm">Join Us</Button>
              </motion.div>
            </motion.div>

            <motion.button
              className="md:hidden p-2 relative z-[10000]"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu - Full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden mobile-menu-overlay z-[9999] bg-neutral-light/98 backdrop-blur-md"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Menu content - Full height with proper centering */}
            <div className="flex flex-col items-center justify-center h-full w-full px-8 py-20" style={{ minHeight: '100vh' }}>
              <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <Link
                      href={item.href}
                      className="block text-3xl font-semibold text-primary-dark hover:text-primary transition-colors duration-300 text-center py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="mt-12 w-full flex justify-center"
                  variants={itemVariants}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-12 py-4 text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Us
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
