'use client';
import Button from './Button';
import { MapPin, Users, Clock } from 'lucide-react';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  capacity?: number;
  registeredCount?: number;
  onClick?: () => void;
}

export default function EventCard({
  title,
  description,
  date,
  location,
  type,
  capacity,
  registeredCount = 0,
  onClick
}: EventCardProps) {
  const eventDate = new Date(date);
  const isUpcoming = eventDate > new Date();
  const isSoldOut = Boolean(capacity && registeredCount >= capacity);

  const getTypeColor = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'workshop':
        return 'bg-primary text-white';
      case 'coaching':
        return 'bg-secondary text-primary-dark';
      case 'networking':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date: Date) => {
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const formattedDate = formatDate(eventDate);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Date Display */}
          <div className="flex-shrink-0 text-center">
            <div className="bg-primary text-white rounded-lg p-3 min-w-[60px]">
              <div className="text-xs font-semibold">{formattedDate.month}</div>
              <div className="text-xl font-bold">{formattedDate.day}</div>
            </div>
          </div>

          <div className="flex-1">
            {/* Event Type Badge */}
            <div className={`inline-block text-xs font-bold px-2 py-1 rounded-full mb-2 ${getTypeColor(type)}`}>
              {type.toUpperCase()}
            </div>

            <h3 className="text-xl font-bold mb-2 text-primary-dark group-hover:text-primary transition-colors">
              {title}
            </h3>

            <div className="flex items-center gap-1 text-sm text-primary/70 mb-2">
              <Clock className="w-4 h-4" />
              <span>{formattedDate.time}</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-primary/70 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Capacity Info */}
        {capacity && (
          <div className="flex items-center gap-2 text-sm text-primary/70 mb-4">
            <Users className="w-4 h-4" />
            <span>
              {registeredCount} / {capacity} registered
            </span>
            {isSoldOut && (
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full ml-2">
                SOLD OUT
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {isUpcoming ? (
            <>
              <Button
                variant={isSoldOut ? "outline" : "primary"}
                size="sm"
                className="flex-1"
                disabled={isSoldOut}
              >
                {isSoldOut ? 'Join Waitlist' : 'Register Now'}
              </Button>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
