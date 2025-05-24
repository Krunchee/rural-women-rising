'use client';
import StoryCard from '@/components/StoryCard';
import EventCard from '@/components/EventCard';
import ResourceCard from '@/components/ResourceCard';
import DynamicContent from '@/components/sections/DynamicContent';

export default function TestComponentsPage() {
  // Sample data for testing
  const sampleStory = {
    title: "Finding My Voice in Rural Leadership",
    author: "Sarah Mitchell",
    location: "Broken Hill, NSW",
    excerpt: "When I first moved to Broken Hill, I felt isolated and unsure of my place in the community. Through Rural Women Rising's mentorship program, I discovered not only my voice but also my passion for advocating for rural women's rights...",
    image: "/api/placeholder/400/300",
    createdAt: "2024-01-15T10:00:00Z",
    featured: true
  };

  const sampleEvent = {
    title: "Women in Agriculture Leadership Workshop",
    description: "Join us for an intensive workshop focused on developing leadership skills specifically for women in agricultural communities. Learn practical strategies for effective communication, team building, and advocacy.",
    date: "2024-02-15T14:00:00Z",
    location: "Wagga Wagga Community Centre",
    type: "workshop",
    capacity: 25,
    registeredCount: 18
  };

  const sampleResource = {
    title: "Rural Women's Business Planning Toolkit",
    description: "A comprehensive guide to starting and growing your business in rural areas. Includes templates, checklists, and real-world case studies from successful rural women entrepreneurs.",
    category: "toolkit",
    fileUrl: "/resources/business-planning-toolkit.pdf",
    createdAt: "2024-01-10T09:00:00Z",
    downloadCount: 247
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-primary-dark">
            Dynamic Content Components Test
          </h1>
          <p className="text-primary-dark/70 mt-2">
            Testing all dynamic content components with sample data
          </p>
        </div>
      </div>

      {/* Individual Component Tests */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Story Card Test */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-dark mb-6">Story Card</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StoryCard
              title={sampleStory.title}
              author={sampleStory.author}
              location={sampleStory.location}
              excerpt={sampleStory.excerpt}
              image={sampleStory.image}
              createdAt={sampleStory.createdAt}
              featured={sampleStory.featured}
              onClick={() => console.log('Story clicked')}
            />
            <StoryCard
              title="Building Community Connections"
              author="Emma Thompson"
              location="Orange, NSW"
              excerpt="Rural life can be challenging, but it's also filled with incredible opportunities for connection and growth. Here's how I built lasting relationships in my community..."
              createdAt="2024-01-12T08:30:00Z"
              featured={false}
              onClick={() => console.log('Story clicked')}
            />
          </div>
        </section>

        {/* Event Card Test */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-dark mb-6">Event Card</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <EventCard
              title={sampleEvent.title}
              description={sampleEvent.description}
              date={sampleEvent.date}
              location={sampleEvent.location}
              type={sampleEvent.type}
              capacity={sampleEvent.capacity}
              registeredCount={sampleEvent.registeredCount}
              onClick={() => console.log('Event clicked')}
            />
            <EventCard
              title="Rural Women's Networking Evening"
              description="Connect with like-minded women in your area. Share experiences, build relationships, and discover new opportunities for collaboration and support."
              date="2024-02-20T18:00:00Z"
              location="Dubbo RSL Club"
              type="networking"
              capacity={40}
              registeredCount={40}
              onClick={() => console.log('Event clicked')}
            />
          </div>
        </section>

        {/* Resource Card Test */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-dark mb-6">Resource Card</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceCard
              title={sampleResource.title}
              description={sampleResource.description}
              category={sampleResource.category}
              fileUrl={sampleResource.fileUrl}
              createdAt={sampleResource.createdAt}
              downloadCount={sampleResource.downloadCount}
              onClick={() => console.log('Resource clicked')}
            />
            <ResourceCard
              title="Grant Application Template"
              description="Step-by-step template for applying for rural development grants. Includes examples and tips from successful applicants."
              category="template"
              fileUrl="/resources/grant-template.docx"
              createdAt="2024-01-08T11:15:00Z"
              downloadCount={156}
              onClick={() => console.log('Resource clicked')}
            />
            <ResourceCard
              title="Rural Mental Health Guide"
              description="Comprehensive guide addressing mental health challenges specific to rural communities, with local resources and support networks."
              category="guide"
              createdAt="2024-01-05T14:20:00Z"
              downloadCount={89}
              onClick={() => console.log('Resource clicked')}
            />
          </div>
        </section>
      </div>

      {/* Full Dynamic Content Section */}
      <DynamicContent />
    </div>
  );
}
