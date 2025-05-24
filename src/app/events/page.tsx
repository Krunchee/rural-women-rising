'use client';
import { useState } from 'react';
import EventCard from '@/components/EventCard';
import Button from '@/components/Button';
import { Search, Filter, Calendar } from 'lucide-react';

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('upcoming');

  // Sample events data - in a real app, this would come from the database
  const events = [
    {
      id: '1',
      title: 'Rural Women Leadership Summit',
      description: 'Join us for a full-day summit featuring keynote speakers, workshops, and networking opportunities focused on developing leadership skills for rural women.',
      date: '2024-02-15T09:00:00Z',
      location: 'Dubbo RSL Club, Dubbo NSW',
      type: 'workshop',
      capacity: 150,
      registeredCount: 89
    },
    {
      id: '2',
      title: 'Monthly Coffee & Connect',
      description: 'Casual monthly meetup for rural women to connect, share experiences, and support each other over coffee and conversation.',
      date: '2024-02-08T10:00:00Z',
      location: 'Central Café, Orange NSW',
      type: 'networking',
      capacity: 25,
      registeredCount: 18
    },
    {
      id: '3',
      title: 'Digital Skills Workshop',
      description: 'Learn essential digital skills for modern rural businesses, including social media marketing, online presence, and digital communication tools.',
      date: '2024-02-22T13:00:00Z',
      location: 'Wagga Wagga Library, Wagga Wagga NSW',
      type: 'workshop',
      capacity: 30,
      registeredCount: 22
    },
    {
      id: '4',
      title: 'One-on-One Coaching Session',
      description: 'Personal coaching session focused on leadership development, goal setting, and overcoming challenges specific to rural women.',
      date: '2024-02-12T14:00:00Z',
      location: 'Online via Zoom',
      type: 'coaching',
      capacity: 1,
      registeredCount: 1
    },
    {
      id: '5',
      title: 'Rural Business Networking Evening',
      description: 'Evening networking event for rural women entrepreneurs and business owners to connect, collaborate, and share opportunities.',
      date: '2024-03-05T18:00:00Z',
      location: 'Broken Hill Civic Centre, Broken Hill NSW',
      type: 'networking',
      capacity: 80,
      registeredCount: 34
    },
    {
      id: '6',
      title: 'Financial Planning Workshop',
      description: 'Comprehensive workshop covering personal and business financial planning strategies specifically designed for rural women.',
      date: '2024-03-12T10:00:00Z',
      location: 'Armidale Community Centre, Armidale NSW',
      type: 'workshop',
      capacity: 40,
      registeredCount: 15
    }
  ];

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'networking', label: 'Networking' },
    { value: 'coaching', label: 'Coaching' }
  ];

  const timeframes = [
    { value: 'upcoming', label: 'Upcoming Events' },
    { value: 'past', label: 'Past Events' },
    { value: 'all', label: 'All Events' }
  ];

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();

    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;

    let matchesTimeframe = true;
    if (selectedTimeframe === 'upcoming') {
      matchesTimeframe = eventDate >= now;
    } else if (selectedTimeframe === 'past') {
      matchesTimeframe = eventDate < now;
    }

    return matchesSearch && matchesType && matchesTimeframe;
  });

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="absolute inset-0 sun-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-dark mb-6">
              Events
            </h1>
            <p className="text-xl text-primary-dark/80 max-w-3xl mx-auto">
              Join us for workshops, networking events, and coaching sessions designed to support
              rural women in their personal and professional development journey.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-dark/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events by title, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Event Type Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-dark/40 w-5 h-5" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeframe Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-dark/40 w-5 h-5" />
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  {timeframes.map(timeframe => (
                    <option key={timeframe.value} value={timeframe.value}>
                      {timeframe.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Type Overview */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {eventTypes.slice(1).map(type => {
              const count = events.filter(e => e.type === type.value).length;
              return (
                <div
                  key={type.value}
                  className={`bg-white rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedType === type.value ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedType(type.value)}
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-primary-dark text-lg mb-2">{type.label}</h3>
                    <p className="text-sm text-primary-dark/60">{count} events</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  location={event.location}
                  type={event.type}
                  capacity={event.capacity}
                  registeredCount={event.registeredCount}
                  onClick={() => console.log('Register for event:', event.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-primary-dark/60 mb-6">
                No events found matching your search criteria.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedType('all'); setSelectedTimeframe('upcoming'); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Host Event CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Host an Event?</h2>
          <p className="text-xl mb-8 opacity-90">
            Have an idea for an event that would benefit rural women in your community? We&#39;d love to help make it happen.
          </p>
          <Button variant="secondary" size="lg">Propose an Event</Button>
        </div>
      </section>
    </div>
  );
}
