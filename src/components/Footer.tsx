import Link from 'next/link';
import Logo from './Logo';

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
