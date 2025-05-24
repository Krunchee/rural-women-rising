'use client';
import { useState } from 'react';
import Button from '@/components/Button';
import { Mail, Phone, MapPin, MessageCircle, Users, Calendar } from 'lucide-react';

export default function ConnectPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    interest: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a message and we\'ll get back to you within 24 hours.',
      contact: 'hello@ruralwomenrising.com.au',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team during business hours.',
      contact: '+61 2 1234 5678',
      action: 'Call Now'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our office is located in the heart of rural NSW.',
      contact: 'PO Box 666, Gol Gol, NSW 2738',
      action: 'Get Directions'
    }
  ];

  const connectionOptions = [
    {
      icon: Users,
      title: 'Join Our Community',
      description: 'Become part of our growing network of rural women leaders.',
      action: 'Join Now'
    },
    {
      icon: Calendar,
      title: 'Attend an Event',
      description: 'Connect with like-minded women at our workshops and networking events.',
      action: 'View Events'
    },
    {
      icon: MessageCircle,
      title: 'Start a Conversation',
      description: 'Reach out to discuss how we can support your journey.',
      action: 'Contact Us'
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
              Connect With Us
            </h1>
            <p className="text-xl text-primary-dark/80 max-w-3xl mx-auto">
              Ready to join our community of rural women who are making a difference?
              We&#39;re here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Connection Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-dark mb-4">Ways to Connect</h2>
            <p className="text-lg text-primary-dark/80">
              Choose the way that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {connectionOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-primary-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark mb-4">{option.title}</h3>
                  <p className="text-primary-dark/70 mb-6">{option.description}</p>
                  <Button className="w-full">{option.action}</Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6">Send Us a Message</h2>
              <p className="text-primary-dark/70 mb-8">
                Have a question or want to learn more about our programs? Fill out the form below and we&#39;ll get back to you soon.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-primary-dark mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Dubbo, NSW"
                      className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-primary-dark mb-2">
                      I&#39;m interested in
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select an option</option>
                      <option value="coaching">Leadership Coaching</option>
                      <option value="workshops">Workshops</option>
                      <option value="mentorship">Mentorship Program</option>
                      <option value="networking">Networking Events</option>
                      <option value="general">General Information</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-dark mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about how we can help you..."
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  ></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6">Get in Touch</h2>
              <p className="text-primary-dark/70 mb-8">
                We&#39;re here to support you on your journey. Reach out to us using any of the methods below.
              </p>

              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary-dark" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-dark mb-2">{method.title}</h3>
                        <p className="text-primary-dark/70 mb-2">{method.description}</p>
                        <p className="font-medium text-primary">{method.contact}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 p-6 bg-neutral-light rounded-lg">
                <h3 className="font-bold text-primary-dark mb-3">Office Hours</h3>
                <div className="space-y-2 text-primary-dark/70">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for updates on events, resources, and inspiring stories from our community.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-primary-dark focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
