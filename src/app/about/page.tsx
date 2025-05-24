import Button from '@/components/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="absolute inset-0 sun-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-dark mb-6">
              About Rural Women Rising
            </h1>
            <p className="text-xl text-primary-dark/80 max-w-3xl mx-auto">
              We are a lifeline, a meeting place, and a megaphone for women in rural and regional areas.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary-dark mb-6">Our Mission</h2>
              <p className="text-lg leading-relaxed mb-6">
                Rural Women Rising exists to amplify the voices and leadership of women in rural and regional areas.
                We believe that every woman deserves to own her place, her power, and her future.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Through real-world coaching, inclusive events, digital toolkits, and storytelling,
                we create connections that matter and provide the support rural women need to thrive.
              </p>
              <Button size="lg">Join Our Community</Button>
            </div>
            <div className="relative h-96 bg-primary/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary/50">Mission Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-dark mb-4">Our Values</h2>
            <p className="text-lg text-primary-dark/80">
              These core values guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Visionary',
                description: 'We see beyond current limitations and work toward a future where rural women lead with confidence.'
              },
              {
                title: 'Collaborative',
                description: 'We believe in the power of connection and work together to create meaningful change.'
              },
              {
                title: 'Empowering',
                description: 'We provide tools, resources, and support that help women discover and use their power.'
              },
              {
                title: 'Grounded',
                description: 'We stay connected to the real experiences and needs of rural women in our communities.'
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-dark">{value.title[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3">{value.title}</h3>
                <p className="text-primary-dark/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 bg-primary/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary/50">Founder Image</span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-primary-dark mb-6">Our Story</h2>
              <p className="text-lg leading-relaxed mb-6">
                Rural Women Rising was born from the recognition that women in rural and regional areas
                face unique challenges and deserve dedicated support and advocacy.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Founded by women who understand the rural experience firsthand, we&apos;ve built a community
                that celebrates the strength, resilience, and leadership potential of rural women.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we continue to grow our network of support, creating opportunities for connection,
                learning, and leadership development across rural Australia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Rise With Us?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of rural women who are making a difference
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" size="lg">Get Involved</Button>
            <Button variant="outline-white" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
