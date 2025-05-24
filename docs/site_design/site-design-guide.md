# Rural Women Rising Website Development Guide

## Project Overview
Build a modern Next.js website for Rural Women Rising that embodies their mission to amplify voices and leadership of women in rural and regional areas. The website should be visionary, collaborative, empowering, and grounded.

## Pre-Development Setup

### [X] 1. Initialize Project Structure
```bash
npx create-next-app@latest rural-women-rising --typescript --tailwind --app
cd rural-women-rising
npm install @prisma/client prisma sqlite3
npm install lucide-react framer-motion
npm install @radix-ui/react-dialog @radix-ui/react-navigation-menu
```

### [X] 2. Setup Database
```bash
npx prisma init --datasource-provider sqlite
```

Update `prisma/schema.prisma`:
```prisma
model Story {
  id          String   @id @default(cuid())
  title       String
  content     String
  author      String
  location    String
  image       String?
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Event {
  id          String   @id @default(cuid())
  title       String
  description String
  date        DateTime
  location    String
  type        String   // workshop, coaching, networking
  capacity    Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Resource {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String   // toolkit, guide, template
  fileUrl     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Run: `npx prisma db push`

## Design System Implementation

### [X] 3. Create Theme Configuration
Create `src/lib/theme.ts`:
```typescript
export const theme = {
  colors: {
    primary: {
      DEFAULT: '#B4711A', // RGB(180, 113, 26)
      dark: '#333B2C',    // RGB(51, 56, 44)
    },
    secondary: {
      DEFAULT: '#F7A740', // RGB(247, 167, 64)
    },
    neutral: {
      light: '#EEE9E3',   // RGB(238, 233, 227)
      dark: '#333B2C',
    }
  },
  fonts: {
    primary: 'Mont, Aftersick, -apple-system, sans-serif',
  }
}
```

### [X] 4. Global Styles
Update `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');

:root {
  --primary: 180 113 26;
  --primary-dark: 51 56 44;
  --secondary: 247 167 64;
  --neutral-light: 238 233 227;
}

body {
  font-family: 'Montserrat', -apple-system, sans-serif;
  background-color: rgb(var(--neutral-light));
  color: rgb(var(--primary-dark));
}

.sun-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23B4711A' stroke-width='1'%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3Cpath d='M30 0v20M30 40v20M0 30h20M40 30h20M8.79 8.79l14.14 14.14M37.07 37.07l14.14 14.14M8.79 51.21l14.14-14.14M37.07 22.93l14.14-14.14'/%3E%3C/g%3E%3C/svg%3E");
}
```

## Component Architecture

### [x] 5. Create Base Components

#### [x] 5.1 Logo Component
Create `src/components/Logo.tsx`:
```typescript
export default function Logo({ variant = 'default' }: { variant?: 'default' | 'icon' | 'white' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M50 45 L30 70 M50 45 L70 70 M35 60 L65 60" stroke="currentColor" strokeWidth="2" fill="none"/>
          {/* Radiating lines */}
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="45"
              x2={50 + Math.cos((i * 30) * Math.PI / 180) * 25}
              y2={45 + Math.sin((i * 30) * Math.PI / 180) * 25}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>
      {variant !== 'icon' && (
        <div>
          <h1 className="text-2xl font-bold leading-tight">Rural Women</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-xs uppercase tracking-wider">Rooted in Community</span>
            <span className="font-bold text-lg">Rising</span>
            <span className="text-xs uppercase tracking-wider">Rising in Power</span>
          </div>
        </div>
      )}
    </div>
  );
}
```

#### [x] 5.2 Button Component
Create `src/components/Button.tsx`:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-primary-dark hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`font-semibold rounded-full transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### [x] 6. Layout Components

#### [x] 6.1 Navigation
Create `src/components/Navigation.tsx`:
```typescript
'use client';
import Link from 'next/link';
import Logo from './Logo';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Stories', href: '/stories' },
    { label: 'Resources', href: '/resources' },
    { label: 'Events', href: '/events' },
    { label: 'Connect', href: '/connect' }
  ];

  return (
    <nav className="bg-neutral-light/95 backdrop-blur-sm sticky top-0 z-50 border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="primary" size="sm">Join Us</Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 hover:bg-primary/5"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
```

#### [x] 6.2 Footer
Create `src/components/Footer.tsx`:
```typescript
export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo variant="white" />
            <p className="mt-4 text-neutral-light/80">
              Amplifying the voices and leadership of women in rural and regional areas.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-neutral-light/80">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/programs">Programs</Link></li>
              <li><Link href="/stories">Success Stories</Link></li>
              <li><Link href="/resources">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-neutral-light/80">
              <li>hello@ruralwomenrising.com.au</li>
              <li>PO Box 666, Gol Gol, NSW 2738</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-neutral-light/60">
          © 2025 Rural Women Rising. All rights reserved. |
          @THEITIRERISCOLLECTIVE | THEITINERISCOLLECTIVE.COM
        </div>
      </div>
    </footer>
  );
}
```

### [x] 7. Page Components

#### [x] 7.1 Hero Section
Create `src/components/sections/Hero.tsx`:
```typescript
export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0 sun-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-dark mb-6">
            RURAL WOMEN RISING IS A LIFELINE, A MEETING PLACE, AND A MEGAPHONE FOR WOMEN IN RURAL AND REGIONAL AREAS.
          </h1>
          <p className="text-xl mb-8 text-primary-dark/80">
            Through real-world coaching, inclusive events, digital toolkits, and storytelling,
            we empower women to own their place, their power, and their future.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Join Our Community</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

#### [x] 7.2 Community Section
Create `src/components/sections/Community.tsx`:
```typescript
export default function Community() {
  const values = ['Visionary', 'Collaborative', 'Empowering', 'Grounded'];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold mb-4">COMMUNITY</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {values.map((value, i) => (
              <span key={i} className="text-lg font-semibold text-primary">
                {value}{i < values.length - 1 && '.'}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg leading-relaxed">
              A calm but bold tone that speaks directly to women who value authenticity,
              honesty, and action. Clear, thoughtful language that invites conversation
              rather than selling a product.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Casual yet purposeful, like advice from a wise friend. Focuses on fostering
              safety and belonging while celebrating diversity in rural women's experiences.
            </p>
          </div>
          <div className="relative h-96 bg-primary/10 rounded-lg overflow-hidden">
            {/* Placeholder for community image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary/50">Community Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### [X] 8. Database Integration

#### [X] 8.1 Prisma Client
Create `src/lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

#### [X] 8.2 API Routes
Create `src/app/api/stories/route.ts`:
```typescript
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const story = await prisma.story.create({ data });
    return NextResponse.json(story);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 });
  }
}
```

### [X] 9. Dynamic Content Components ✅ COMPLETED

#### [X] 9.1 Story Card
Create `src/components/StoryCard.tsx`:
```typescript
import Button from './Button';
import { Calendar, MapPin, User } from 'lucide-react';

interface StoryCardProps {
  title: string;
  author: string;
  location: string;
  excerpt: string;
  image?: string;
  createdAt?: string;
  featured?: boolean;
  onClick?: () => void;
}

export default function StoryCard({
  title, author, location, excerpt, image, createdAt, featured = false, onClick
}: StoryCardProps) {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
      featured ? 'ring-2 ring-secondary' : ''
    }`} onClick={onClick}>
      {/* Enhanced card with hover effects, featured badge, and better styling */}
    </div>
  );
}
```

#### [X] 9.2 Event Card
Create `src/components/EventCard.tsx`:
```typescript
import Button from './Button';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

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

export default function EventCard({ title, description, date, location, type, capacity, registeredCount = 0, onClick }: EventCardProps) {
  // Enhanced event card with date display, capacity tracking, and type badges
}
```

#### [X] 9.3 Resource Card
Create `src/components/ResourceCard.tsx`:
```typescript
import Button from './Button';
import { Download, FileText, Folder, ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  fileUrl?: string;
  createdAt?: string;
  downloadCount?: number;
  onClick?: () => void;
}

export default function ResourceCard({ title, description, category, fileUrl, createdAt, downloadCount = 0, onClick }: ResourceCardProps) {
  // Resource card with category icons, download functionality, and preview options
}
```

#### [X] 9.4 Content Grid
Create `src/components/ContentGrid.tsx`:
```typescript
'use client';
import { ReactNode } from 'react';
import LoadingCard from './LoadingCard';

interface ContentGridProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  loading?: boolean;
  loadingCount?: number;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ContentGrid({ title, subtitle, children, loading = false, loadingCount = 6, columns = 3, gap = 'lg', className = '' }: ContentGridProps) {
  // Reusable grid component with responsive columns and loading states
}
```

#### [X] 9.5 Loading Card
Create `src/components/LoadingCard.tsx`:
```typescript
export default function LoadingCard() {
  // Skeleton loading card with pulse animation
}
```

#### [X] 9.6 Custom Hooks
Create data fetching hooks:
- `src/hooks/useStories.ts` - Hook for fetching stories with filtering
- `src/hooks/useEvents.ts` - Hook for fetching events with filtering
- `src/hooks/useResources.ts` - Hook for fetching resources with filtering

#### [X] 9.7 Dynamic Content Section
Create `src/components/sections/DynamicContent.tsx`:
```typescript
'use client';
import { useState } from 'react';
import ContentGrid from '../ContentGrid';
import StoryCard from '../StoryCard';
import EventCard from '../EventCard';
import ResourceCard from '../ResourceCard';

export default function DynamicContent() {
  // Tabbed interface showcasing all dynamic content types
}
```

#### [X] 9.8 Enhanced API Routes
Updated API routes to support query parameters:
- `/api/stories` - Supports `featured`, `limit` parameters
- `/api/events` - Supports `upcoming`, `type`, `limit` parameters
- `/api/resources` - Supports `category`, `limit` parameters

#### [X] 9.9 Test Page
Created `src/app/test-components/page.tsx`:
- Comprehensive testing page for all dynamic content components
- Sample data demonstrations
- Individual component showcases
- Full integrated DynamicContent section
- Visit `/test-components` to see all components in action

### [X] 10. Main Pages ✅ COMPLETED

#### [X] 10.1 Home Page
Updated `src/app/page.tsx`:
```typescript
import Hero from '@/components/sections/Hero';
import Community from '@/components/sections/Community';
import { prisma } from '@/lib/prisma';
import StoryCard from '@/components/StoryCard';

export default async function Home() {
  const featuredStories = await prisma.story.findMany({
    where: { featured: true },
    take: 3,
  });

  return (
    <>
      <Hero />
      <Community />

      {/* Featured Stories */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Real Stories, Real Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredStories.map(story => (
              <StoryCard
                key={story.id}
                title={story.title}
                author={story.author}
                location={story.location}
                excerpt={story.content.substring(0, 150) + '...'}
                image={story.image || undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

#### [X] 10.2 Root Layout
Updated `src/app/layout.tsx`:
```typescript
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Rural Women Rising - Empowering Rural Women',
  description: 'A lifeline, meeting place, and megaphone for women in rural and regional areas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### [X] 11. Additional Pages Structure ✅ COMPLETED

Created all page files:
- [X] `src/app/about/page.tsx` - Complete about page with mission, values, and story sections
- [X] `src/app/programs/page.tsx` - Programs overview with detailed program cards and how-it-works section
- [X] `src/app/stories/page.tsx` - Stories listing with search and filter functionality
- [X] `src/app/resources/page.tsx` - Resources library with categorization and search
- [X] `src/app/events/page.tsx` - Events listing with filtering by type and timeframe
- [X] `src/app/connect/page.tsx` - Contact page with form and multiple connection options

### [X] 12. Animation & Interactivity ✅ COMPLETED

Enhanced all components with Framer Motion animations:

#### [X] 12.1 Hero Section Animations
- Staggered text entrance animations
- Background pattern fade-in
- Button hover effects with scale and shadow

#### [X] 12.2 Navigation Animations
- Smooth slide-down entrance
- Animated mobile menu with staggered items
- Icon transitions (Menu ↔ X)
- Underline hover effects for nav links
- Logo hover scaling

#### [X] 12.3 Card Animations
- **StoryCard**: Hover lift effect, image zoom, enhanced shadows
- **LoadingCard**: Shimmer effect with gradient sweep
- **ContentGrid**: Staggered entrance animations for all cards

#### [X] 12.4 Logo Animations
- SVG path drawing animation on load
- Continuous sun ray rotation (20s cycle)
- Hover scaling and color transitions

#### [X] 12.5 Button Enhancements
- Scale effects on hover/tap
- Dynamic color transitions
- Enhanced shadow effects

#### [X] 12.6 Community Section
- Scroll-triggered animations
- Interactive value tags with hover effects
- Animated background gradients

#### [X] 12.7 Page Transitions
- Created `PageTransition` component for smooth page changes
- Fade and slide animations

#### [X] 12.8 Scroll Animations
- `whileInView` animations for sections
- Viewport-based triggering with margins
- Staggered children animations

All animations use:
- Smooth easing curves (`easeOut`, `easeInOut`)
- Appropriate durations (0.2s - 1.5s)
- Reduced motion considerations
- Performance-optimized transforms

### [ ] 13. Responsive Design Checklist

Ensure all components are responsive:
- [ ] Navigation collapses on mobile
- [ ] Grid layouts stack on small screens
- [ ] Typography scales appropriately
- [ ] Images are optimized and responsive
- [ ] Touch targets are at least 44x44px

### [ ] 14. SEO & Performance

- [ ] Add meta tags to all pages
- [ ] Implement Open Graph tags
- [ ] Use Next.js Image component for optimization
- [ ] Enable static generation where possible
- [ ] Add sitemap.xml
- [ ] Implement proper heading hierarchy

### [ ] 15. Testing & Launch

- [ ] Test all database operations
- [ ] Verify responsive design on multiple devices
- [ ] Check color contrast for accessibility
- [ ] Test all interactive elements
- [ ] Validate forms and error states
- [ ] Performance audit with Lighthouse
- [ ] Cross-browser testing

## Final Checklist

- [ ] Brand colors implemented correctly
- [ ] Typography matches style guide
- [ ] Logo variations working
- [ ] Mission statement prominently displayed
- [ ] Community values visible
- [ ] Pattern elements used subtly
- [ ] Tone of voice reflected in copy
- [ ] Database seeded with sample content
- [ ] All pages created and linked
- [ ] Mobile-first responsive design
- [ ] Animations enhance user experience
- [ ] Accessibility standards met

## Notes for AI Agent

1. Always use the brand colors defined in the theme
2. Maintain the warm, empowering tone throughout
3. Focus on community and connection in design decisions
4. Use the sun/radiating pattern subtly as decorative elements
5. Ensure all text has proper contrast against backgrounds
6. Keep components modular and reusable
7. Follow Next.js 14 App Router best practices
8. Use TypeScript for type safety
9. Implement proper error boundaries
10. Add loading states for dynamic content

This guide provides a complete roadmap for building the Rural Women Rising website. Follow each section sequentially, checking off tasks as completed.