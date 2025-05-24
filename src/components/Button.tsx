'use client';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: '',
    secondary: '',
    outline: 'border-2 border-primary',
    'outline-white': 'border-2 border-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  const hoverVariants = {
    primary: {
      backgroundColor: 'rgb(51, 56, 44)', // primary-dark
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    secondary: {
      backgroundColor: 'rgba(247, 167, 64, 0.9)', // secondary/90
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    outline: {
      backgroundColor: 'rgb(180, 113, 26)', // primary
      color: 'white',
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    'outline-white': {
      backgroundColor: 'white',
      color: 'rgb(180, 113, 26)', // primary
      scale: 1.05,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }
  };

  const tapVariants = {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  };

  // Set explicit initial styles for proper animation
  const getInitialStyle = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: 'rgb(180, 113, 26)', color: 'white' };
      case 'secondary':
        return { backgroundColor: 'rgb(247, 167, 64)', color: 'rgb(51, 56, 44)' };
      case 'outline':
        return { backgroundColor: 'transparent', color: 'rgb(180, 113, 26)' };
      case 'outline-white':
        return { backgroundColor: 'transparent', color: 'white' };
      default:
        return {};
    }
  };

  return (
    <motion.button
      className={`font-semibold rounded-full transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      style={getInitialStyle()}
      whileHover={hoverVariants[variant]}
      whileTap={tapVariants}
      transition={{
        duration: 0.2,
        ease: "easeOut"
      }}
      {...props}
    >
      <motion.span
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
