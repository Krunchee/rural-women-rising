'use client';
import { useState } from 'react';
import StoryCard from '@/components/StoryCard';
import Button from '@/components/Button';
import { Search, Filter } from 'lucide-react';

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample stories data - in a real app, this would come from the database
  const stories = [
    {
      id: '1',
      title: 'Finding My Voice in Rural Leadership',
      author: 'Sarah Mitchell',
      location: 'Broken Hill, NSW',
      excerpt: 'When I first moved to Broken Hill, I felt isolated and unsure of my place in the community. Through Rural Women Rising\'s mentorship program, I discovered not only my voice but also my passion for advocating for rural women\'s rights...',
      image: '/api/placeholder/400/300',
      createdAt: '2024-01-15T10:00:00Z',
      featured: true,
      category: 'leadership'
    },
    {
      id: '2',
      title: 'Building Community Connections',
      author: 'Emma Thompson',
      location: 'Orange, NSW',
      excerpt: 'Rural life can be challenging, but it\'s also filled with incredible opportunities for connection and growth. Here\'s how I built lasting relationships in my community...',
      createdAt: '2024-01-12T08:30:00Z',
      featured: false,
      category: 'community'
    },
    {
      id: '3',
      title: 'From Farm to Boardroom',
      author: 'Lisa Chen',
      location: 'Wagga Wagga, NSW',
      excerpt: 'My journey from managing our family farm to serving on corporate boards taught me that rural women bring unique perspectives and valuable skills to leadership roles...',
      createdAt: '2024-01-10T14:20:00Z',
      featured: true,
      category: 'business'
    },
    {
      id: '4',
      title: 'Overcoming Isolation Through Digital Connection',
      author: 'Maria Rodriguez',
      location: 'Charleville, QLD',
      excerpt: 'Living in remote Queensland, I often felt disconnected from opportunities and support. Learning to leverage digital tools changed everything for my personal and professional growth...',
      createdAt: '2024-01-08T11:45:00Z',
      featured: false,
      category: 'technology'
    },
    {
      id: '5',
      title: 'Mentoring the Next Generation',
      author: 'Jennifer Walsh',
      location: 'Dubbo, NSW',
      excerpt: 'After years of building my career in rural healthcare, I realized the importance of mentoring young women entering our field. Here\'s how I became a mentor and what I\'ve learned...',
      createdAt: '2024-01-05T16:30:00Z',
      featured: false,
      category: 'mentorship'
    },
    {
      id: '6',
      title: 'Starting a Social Enterprise in Rural Australia',
      author: 'Rebecca Taylor',
      location: 'Armidale, NSW',
      excerpt: 'Combining my passion for social impact with business acumen, I launched a social enterprise that addresses food security in rural communities. The journey has been challenging but incredibly rewarding...',
      createdAt: '2024-01-03T09:15:00Z',
      featured: true,
      category: 'business'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Stories' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'community', label: 'Community' },
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'mentorship', label: 'Mentorship' }
  ];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="absolute inset-0 sun-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-dark mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-primary-dark/80 max-w-3xl mx-auto">
              Real stories from rural women who are making a difference in their communities and beyond.
              Be inspired by their journeys and discover what&#39;s possible.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-dark/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stories by title, author, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-dark/40 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredStories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map(story => (
                <StoryCard
                  key={story.id}
                  title={story.title}
                  author={story.author}
                  location={story.location}
                  excerpt={story.excerpt}
                  image={story.image}
                  createdAt={story.createdAt}
                  featured={story.featured}
                  onClick={() => console.log('Navigate to story:', story.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-primary-dark/60 mb-6">
                No stories found matching your search criteria.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Share Your Story</h2>
          <p className="text-xl mb-8 opacity-90">
            Have a story that could inspire other rural women? We&#39;d love to hear from you.
          </p>
          <Button variant="secondary" size="lg">Submit Your Story</Button>
        </div>
      </section>
    </div>
  );
}
