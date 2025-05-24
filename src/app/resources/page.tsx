'use client';
import { useState } from 'react';
import ResourceCard from '@/components/ResourceCard';
import Button from '@/components/Button';
import { Search, Filter, Download, FileText, Folder } from 'lucide-react';

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample resources data - in a real app, this would come from the database
  const resources = [
    {
      id: '1',
      title: 'Rural Leadership Toolkit',
      description: 'Comprehensive guide covering essential leadership skills specifically designed for rural women, including communication strategies, team building, and community engagement.',
      category: 'toolkit',
      fileUrl: '/resources/leadership-toolkit.pdf',
      createdAt: '2024-01-15T10:00:00Z',
      downloadCount: 234
    },
    {
      id: '2',
      title: 'Financial Planning for Rural Women',
      description: 'Step-by-step guide to financial planning, budgeting, and investment strategies tailored for rural lifestyles and income patterns.',
      category: 'guide',
      fileUrl: '/resources/financial-planning.pdf',
      createdAt: '2024-01-12T08:30:00Z',
      downloadCount: 189
    },
    {
      id: '3',
      title: 'Business Plan Template',
      description: 'Ready-to-use business plan template specifically designed for rural enterprises, including market analysis frameworks and financial projections.',
      category: 'template',
      fileUrl: '/resources/business-plan-template.docx',
      createdAt: '2024-01-10T14:20:00Z',
      downloadCount: 156
    },
    {
      id: '4',
      title: 'Digital Marketing for Rural Businesses',
      description: 'Learn how to effectively market your rural business online, including social media strategies, website optimization, and online advertising.',
      category: 'guide',
      createdAt: '2024-01-08T11:45:00Z',
      downloadCount: 142
    },
    {
      id: '5',
      title: 'Networking Event Planning Kit',
      description: 'Everything you need to organize successful networking events in your rural community, including checklists, templates, and promotional materials.',
      category: 'toolkit',
      fileUrl: '/resources/networking-kit.zip',
      createdAt: '2024-01-05T16:30:00Z',
      downloadCount: 98
    },
    {
      id: '6',
      title: 'Rural Mental Health Resources',
      description: 'Comprehensive guide addressing mental health challenges specific to rural communities, with local resources and support networks.',
      category: 'guide',
      createdAt: '2024-01-03T09:15:00Z',
      downloadCount: 89
    }
  ];

  const categories = [
    { value: 'all', label: 'All Resources', icon: Folder },
    { value: 'toolkit', label: 'Toolkits', icon: FileText },
    { value: 'guide', label: 'Guides', icon: FileText },
    { value: 'template', label: 'Templates', icon: Download }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
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
              Resources
            </h1>
            <p className="text-xl text-primary-dark/80 max-w-3xl mx-auto">
              Access our comprehensive library of tools, guides, and templates designed specifically
              for rural women to support your personal and professional development.
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
                  placeholder="Search resources by title or description..."
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

      {/* Category Overview */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {categories.slice(1).map(category => {
              const IconComponent = category.icon;
              const count = resources.filter(r => r.category === category.value).length;
              return (
                <div
                  key={category.value}
                  className={`bg-white rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedCategory === category.value ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-3">
                        <IconComponent className="w-5 h-5 text-primary-dark" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-dark">{category.label}</h3>
                        <p className="text-sm text-primary-dark/60">{count} resources</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map(resource => (
                <ResourceCard
                  key={resource.id}
                  title={resource.title}
                  description={resource.description}
                  category={resource.category}
                  fileUrl={resource.fileUrl}
                  createdAt={resource.createdAt}
                  downloadCount={resource.downloadCount}
                  onClick={() => console.log('Download resource:', resource.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-primary-dark/60 mb-6">
                No resources found matching your search criteria.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Request Resource CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Something Specific?</h2>
          <p className="text-xl mb-8 opacity-90">
            Can&#39;t find the resource you&#39;re looking for? Let us know what would be helpful for your journey.
          </p>
          <Button variant="secondary" size="lg">Request a Resource</Button>
        </div>
      </section>
    </div>
  );
}
