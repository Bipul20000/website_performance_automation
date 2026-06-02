import { useState } from 'react';
import { Link } from 'react-router-dom';

const productLinks = [
  { name: 'Motorcycles', path: '/products?category=motorcycle' },
  { name: 'Scooters', path: '/products?category=scooter' },
  { name: 'Electric Vehicles', path: '/products?category=electric' },
  { name: 'Premia Range', path: '/products?category=premia' },
  { name: 'Compare Bikes', path: '/compare' },
];

const quickLinks = [
  { name: 'Find a Dealer', path: '/dealers' },
  { name: 'Book a Test Ride', path: '/test-ride' },
  { name: 'Service Centers', path: '/service-centers' },
  { name: 'Download Brochure', path: '/brochure' },
  { name: 'EMI Calculator', path: '/emi-calculator' },
];

const bottomLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Use', path: '/terms' },
  { name: 'Sitemap', path: '/sitemap' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail('');
    }
  };

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-primary text-2xl font-bold mb-4">MotoVerse</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's leading two-wheeler manufacturer. From commuters to premium cruisers, from
              scooters to electric vehicles — we power your journey.
            </p>
          </div>

          {/* Column 2 - Products */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
              Products
            </h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">
              Connect With Us
            </h4>
            <p className="text-gray-400 text-sm mb-2">1800-266-0018</p>
            <p className="text-gray-400 text-sm mb-4">support@motoverse.in</p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {/* Twitter/X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-light hover:bg-primary flex items-center justify-center transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-light hover:bg-primary flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-light hover:bg-primary flex items-center justify-center transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-light hover:bg-primary flex items-center justify-center transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-dark-light">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">Subscribe to our newsletter</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-dark-light border border-dark-lighter text-white px-4 py-2 rounded-l-lg w-64 focus:outline-none focus:border-primary placeholder-gray-500 text-sm"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-r-lg font-medium transition-colors duration-200 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-dark-light flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-sm">© 2026 MotoVerse. All rights reserved.</p>
          <div className="flex items-center gap-1 text-sm">
            {bottomLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                {index > 0 && <span className="text-gray-600 mx-1">|</span>}
                <Link
                  to={link.path}
                  className="text-gray-500 hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
