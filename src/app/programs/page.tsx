import Button from '@/components/Button';
import { Calendar, Users, Target, Heart } from 'lucide-react';

export default function ProgramsPage() {
  const programs = [
    {
      title: 'Leadership Coaching',
      description: 'One-on-one coaching sessions designed to help rural women develop their leadership skills and confidence.',
      icon: Target,
      features: ['Personal development planning', 'Goal setting and accountability', 'Leadership skill building', 'Confidence coaching'],
      duration: '3-6 months',
      format: 'Individual sessions'
    },
    {
      title: 'Community Workshops',
      description: 'Interactive workshops covering essential skills for personal and professional development.',
      icon: Users,
      features: ['Communication skills', 'Financial literacy', 'Digital skills', 'Networking strategies'],
      duration: 'Half or full day',
      format: 'Group workshops'
    },
    {
      title: 'Mentorship Program',
      description: 'Connect with experienced rural women leaders who can guide and support your journey.',
      icon: Heart,
      features: ['Matched mentoring pairs', 'Regular check-ins', 'Goal-oriented support', 'Network building'],
      duration: '6-12 months',
      format: 'Mentor-mentee pairs'
    },
    {
      title: 'Networking Events',
      description: 'Regular events designed to bring rural women together for connection and collaboration.',
      icon: Calendar,
      features: ['Monthly meetups', 'Industry-specific events', 'Social connections', 'Professional networking'],
      duration: 'Ongoing',
      format: 'Group events'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <section className="relative py-20 bg-white">
        <div className="absolute inset-0 sun-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-dark mb-6">
              Our Programs
            </h1>
            <p className="text-xl text-primary-dark/80 max-w-3xl mx-auto">
              Comprehensive support designed specifically for rural women to develop leadership skills,
              build connections, and create lasting impact in their communities.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-primary-dark" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-dark">{program.title}</h3>
                  </div>

                  <p className="text-primary-dark/80 mb-6">{program.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-primary-dark mb-3">What&#39;s Included:</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-primary-dark/70">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center mb-6 text-sm text-primary-dark/60">
                    <span><strong>Duration:</strong> {program.duration}</span>
                    <span><strong>Format:</strong> {program.format}</span>
                  </div>

                  <Button className="w-full">Learn More</Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-dark mb-4">How It Works</h2>
            <p className="text-lg text-primary-dark/80">
              Getting started with our programs is simple and straightforward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect',
                description: 'Reach out to us through our contact form or attend one of our events to learn more about our programs.'
              },
              {
                step: '02',
                title: 'Match',
                description: 'We\'ll work with you to identify the best program fit based on your goals and current situation.'
              },
              {
                step: '03',
                title: 'Grow',
                description: 'Begin your journey with dedicated support, resources, and a community of like-minded women.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-4">{step.title}</h3>
                <p className="text-primary-dark/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step toward developing your leadership potential
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="secondary" size="lg">Apply Now</Button>
            <Button variant="outline-white" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}