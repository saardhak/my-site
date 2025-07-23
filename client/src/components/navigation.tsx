import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import TypingAnimation from './typing-animation';
import { heroScrollState } from './hero';

const LEFT_NAV = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
];
const RIGHT_NAV = [
  { label: 'Veina', id: 'veina' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

// Track if hero text is pinned (cut off or fully hidden)
let heroPinned = false;
export function setHeroPinned(val: boolean) { heroPinned = val; }

// Shared subtitle context
export const SubtitleContext = createContext<{ currentText: string; cursor: boolean }>({ currentText: '', cursor: true });

const Navigation = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { currentText, cursor } = useContext(SubtitleContext);

  // Frame-accurate nav bar visibility logic
  useEffect(() => {
    let running = true;
    function checkNav() {
      // Hide nav bar if hero text is bigger than nav bar text size
      if (heroScrollState.fontSize > 28) {
        setShowNav(false);
        setIsFixed(false);
      } else {
        setShowNav(heroPinned || heroScrollState.snapped);
        setIsFixed(heroScrollState.snapped);
      }
      if (running) requestAnimationFrame(checkNav);
    }
    checkNav();
    return () => { running = false; };
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

  // Nav bar is always full size, just appears at the right time
  let navStyle: React.CSSProperties = {
    position: isFixed ? 'fixed' : 'absolute',
    left: 0,
    right: 0,
    margin: '0 auto',
    bottom: isFixed ? 'auto' : 0,
    top: isFixed ? 0 : 'auto',
    zIndex: 50,
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    background: document.body.classList.contains('dark') ? 'rgba(23,23,23,0.96)' : 'rgba(255,255,255,0.9)',
    boxShadow: isFixed ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
    opacity: showNav ? 1 : 0,
    pointerEvents: showNav ? 'auto' : 'none',
  };

  // Prevent nav bar from going above bottom of hero
  if (!isFixed) {
    const hero = document.getElementById('home');
    if (hero) {
      const heroRect = hero.getBoundingClientRect();
      const navHeightPx = navRef.current?.offsetHeight || 0;
      // Distance from bottom of hero to bottom of viewport
      const heroBottomToViewport = window.innerHeight - heroRect.bottom;
      // If nav bar would go above hero, pin it to hero's bottom
      if (heroBottomToViewport < navHeightPx) {
        navStyle.bottom = `${heroBottomToViewport}px`;
      } else {
        navStyle.bottom = 0;
      }
    }
  }

  if (!showNav) return null;

  return (
    <>
      <nav
        ref={navRef}
        style={navStyle}
        className={`w-full max-w-6xl mx-auto px-6 py-4 apple-blur border-b border-gray-100 dark:border-gray-700 transition-all duration-300`}
      >
        <div className="flex items-center justify-center w-full">
          {/* Left nav */}
          <div className="flex space-x-8 flex-1 justify-end">
            {LEFT_NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-button text-apple-gray dark:text-gray-300 hover:text-apple-text dark:hover:text-white font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Center Saardhak and subtitle */}
          <div className="flex flex-col items-center flex-shrink-0 mx-8 select-none">
            <span
              className="font-bold text-apple-text dark:text-white text-lg md:text-2xl"
              style={{ transition: 'font-size 0.2s' }}
            >
              Saardhak
            </span>
            <span
              className="font-light text-apple-gray dark:text-gray-300 text-xs md:text-base mt-0.5"
              style={{ transition: 'font-size 0.2s', minHeight: '1.5em', display: 'inline-block' }}
            >
              {/* Synchronized subtitle */}
              <span className="relative">
                {currentText}
                {cursor && <span className="animate-pulse">|</span>}
              </span>
            </span>
          </div>
          {/* Right nav */}
          <div className="flex space-x-8 flex-1 justify-start">
            {RIGHT_NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-button text-apple-gray dark:text-gray-300 hover:text-apple-text dark:hover:text-white font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile Menu Button */}
        <div className="flex md:hidden justify-end items-center">
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
              {[...LEFT_NAV, ...RIGHT_NAV].map((item) => (
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
      </nav>
    </>
  );
};

export default Navigation;
