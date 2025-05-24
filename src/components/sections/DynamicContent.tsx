'use client';
import { useState } from 'react';
import ContentGrid from '../ContentGrid';
import StoryCard from '../StoryCard';
import EventCard from '../EventCard';
import ResourceCard from '../ResourceCard';
import Button from '../Button';
import { useStories } from '@/hooks/useStories';
import { useEvents } from '@/hooks/useEvents';
import { useResources } from '@/hooks/useResources';

type ContentType = 'stories' | 'events' | 'resources';

export default function DynamicContent() {
  const [activeTab, setActiveTab] = useState<ContentType>('stories');
  
  const { stories, loading: storiesLoading } = useStories({ featured: true, limit: 6 });
  const { events, loading: eventsLoading } = useEvents({ upcoming: true, limit: 6 });
  const { resources, loading: resourcesLoading } = useResources({ limit: 6 });

  const tabs = [
    { id: 'stories' as ContentType, label: 'Featured Stories', count: stories.length },
    { id: 'events' as ContentType, label: 'Upcoming Events', count: events.length },
    { id: 'resources' as ContentType, label: 'Latest Resources', count: resources.length },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'stories':
        return (
          <ContentGrid
            loading={storiesLoading}
            loadingCount={6}
            columns={3}
          >
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                title={story.title}
                author={story.author}
                location={story.location}
                excerpt={story.content.substring(0, 150) + '...'}
                image={story.image}
                createdAt={story.createdAt}
                featured={story.featured}
                onClick={() => console.log('Navigate to story:', story.id)}
              />
            ))}
          </ContentGrid>
        );
      
      case 'events':
        return (
          <ContentGrid
            loading={eventsLoading}
            loadingCount={6}
            columns={2}
          >
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                type={event.type}
                capacity={event.capacity}
                onClick={() => console.log('Navigate to event:', event.id)}
              />
            ))}
          </ContentGrid>
        );
      
      case 'resources':
        return (
          <ContentGrid
            loading={resourcesLoading}
            loadingCount={6}
            columns={3}
          >
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                category={resource.category}
                fileUrl={resource.fileUrl}
                createdAt={resource.createdAt}
                onClick={() => console.log('Navigate to resource:', resource.id)}
              />
            ))}
          </ContentGrid>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">
            Discover Our Community
          </h2>
          <p className="text-xl text-primary-dark/80 max-w-3xl mx-auto">
            Explore inspiring stories, join upcoming events, and access valuable resources 
            designed to empower rural women.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-primary hover:bg-primary/5'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => console.log(`Navigate to all ${activeTab}`)}
          >
            View All {tabs.find(tab => tab.id === activeTab)?.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
