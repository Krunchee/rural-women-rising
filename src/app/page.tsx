import Hero from '@/components/sections/Hero';
import Community from '@/components/sections/Community';
import { prisma } from '@/lib/prisma';
import StoryCard from '@/components/StoryCard';

async function getFeaturedStories() {
  try {
    const featuredStories = await prisma.story.findMany({
      where: { featured: true },
      take: 3,
    });
    return featuredStories;
  } catch (error) {
    console.warn('Failed to fetch featured stories during build:', error);
    // Return empty array if database is not available during build
    return [];
  }
}

export default async function Home() {
  const featuredStories = await getFeaturedStories();

  return (
    <>
      <Hero />
      <Community />

      {/* Featured Stories */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Real Stories, Real Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredStories.length > 0 ? (
              featuredStories.map(story => (
                <StoryCard
                  key={story.id}
                  title={story.title}
                  author={story.author}
                  location={story.location}
                  excerpt={story.content.substring(0, 150) + '...'}
                  image={story.image || undefined}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600">Featured stories will appear here once the database is connected.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
