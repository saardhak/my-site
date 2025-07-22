import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home');
      if (hero && navRef.current) {
        const heroRect = hero.getBoundingClientRect();
        // If the bottom of the hero is <= 0, nav should be sticky
        setIsSticky(heroRect.bottom <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Placeholder to prevent layout shift when sticky */}
      {isSticky && <div style={{ height: navHeight }} />}
      <nav
        ref={navRef}
        className={`w-full z-40 bg-white/90 apple-blur border-b border-gray-100 transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0' : 'relative'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={scrollToTop}
              className="text-2xl font-extralight text-apple-text hover:text-primary transition-all duration-300 button-hover"
            >
              Saardhak
            </button>
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { label: 'About', id: 'about' },
                { label: 'Experience', id: 'experience' },
                { label: 'Veina', id: 'veina' },
                { label: 'Projects', id: 'projects' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="nav-button text-apple-gray hover:text-apple-text font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-apple-text button-hover"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3 mt-4">
                {[
                  { label: 'About', id: 'about' },
                  { label: 'Experience', id: 'experience' },
                  { label: 'Veina', id: 'veina' },
                  { label: 'Projects', id: 'projects' },
                  { label: 'Contact', id: 'contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left nav-button text-apple-gray hover:text-apple-text font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
