'use client';
import { motion } from 'framer-motion';
import Button from './Button';
import { Calendar, MapPin, User } from 'lucide-react';

interface StoryCardProps {
  title: string;
  author: string;
  location: string;
  excerpt: string;
  image?: string;
  createdAt?: string;
  featured?: boolean;
  onClick?: () => void;
}

export default function StoryCard({
  title,
  author,
  location,
  excerpt,
  image,
  createdAt,
  featured = false,
  onClick
}: StoryCardProps) {
  const cardVariants = {
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



  return (
    <motion.div
      className={`bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer group ${
        featured ? 'ring-2 ring-secondary' : ''
      }`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
      style={{
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }}
    >
      {image ? (
        <motion.div className="h-48 bg-primary/10 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
          whileHover={{
            background: "linear-gradient(to bottom right, rgba(180, 113, 26, 0.15), rgba(247, 167, 64, 0.15))",
            transition: { duration: 0.3 }
          }}
        >
          <motion.div
            className="text-primary/30 text-6xl font-bold"
            style={{ color: "rgba(180, 113, 26, 0.3)" }} // Set initial color explicitly
            whileHover={{
              scale: 1.1,
              color: "rgba(180, 113, 26, 0.5)",
              transition: { duration: 0.3 }
            }}
          >
            {title.charAt(0).toUpperCase()}
          </motion.div>
        </motion.div>
      )}

      <div className="p-6">
        {featured && (
          <div className="inline-block bg-secondary text-primary-dark text-xs font-bold px-2 py-1 rounded-full mb-3">
            FEATURED STORY
          </div>
        )}

        <h3 className="text-xl font-bold mb-3 text-primary-dark group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-primary/70 mb-3">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        {createdAt && (
          <div className="flex items-center gap-1 text-xs text-primary/50 mb-3">
            <Calendar className="w-3 h-3" />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        )}

        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
          {excerpt}
        </p>

        <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white">
          Read Full Story
        </Button>
      </div>
    </motion.div>
  );
}
