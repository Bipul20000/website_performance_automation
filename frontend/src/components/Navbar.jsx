import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Motorcycles', path: '/products?category=motorcycle' },
  { name: 'Scooters', path: '/products?category=scooter' },
  { name: 'Electric', path: '/products?category=electric' },
  { name: 'Dealers', path: '/dealers' },
  { name: 'News', path: '/news' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.search;
    }
    const [pathname, search] = path.split('?');
    if (search) {
      return location.pathname === pathname && location.search === `?${search}`;
    }
    return location.pathname === pathname;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-dark border-b border-primary/30 transition-shadow duration-300 ${
        scrolled ? 'shadow-lg backdrop-blur-sm bg-dark/95' : ''
      }`}
    >
      <div className="flex items-center justify-between h-16 lg:h-18 px-4 lg:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-primary font-bold text-2xl tracking-tight shrink-0">
          MotoVerse
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.path) ? 'text-primary' : 'text-white hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <button className="text-white hover:text-primary transition-colors p-1.5" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          {/* User Icon */}
          <button className="text-white hover:text-primary transition-colors p-1.5 hidden sm:block" aria-label="User account">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>

          {/* Mobile Hamburger / Close */}
          <button
            className="lg:hidden text-white hover:text-primary transition-colors p-1.5"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-dark border-t border-dark-light ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-4 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`py-3 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive(link.path)
                  ? 'text-primary bg-primary/10'
                  : 'text-white hover:text-primary hover:bg-dark-light'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
