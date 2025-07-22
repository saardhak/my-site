import { useState, useEffect } from 'react';
import TypingAnimation from './typing-animation';

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (window.innerHeight * 0.8);
      setIsScrolled(scrollProgress > 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [miniStyle, setMiniStyle] = useState({});

  // useEffect(() => {
  //   const btn = document.querySelector('.nav-home-btn'); // give your button a class
  //   if (btn) {
  //     const rect = btn.getBoundingClientRect();
  //     setMiniStyle({
  //       position: 'fixed',
  //       top: `${rect.top}px`,
  //       left: `${rect.left}px`,
  //       transform: 'scale(0.3)',
  //       transformOrigin: 'top left',
  //       transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
  //       zIndex: 60
  //     });
  //   }
  // }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h1 
          className={`hero-name-shrink text-7xl md:text-9xl font-bold tracking-tight mb-8 leading-tight text-apple-text ${
            isScrolled ? 'hero-name-mini' : ''
          }`}
        >
          Saardhak
        </h1>

        {/* <h1
          className={`hero-name-shrink ${isScrolled ? 'hero-name-mini' : ''}`}
          style={isScrolled ? miniStyle : {}}
        >
          Saardhak
        </h1> */}
        
        <div className={`text-2xl md:text-4xl font-light text-apple-gray transition-opacity duration-1000 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}>
          <TypingAnimation 
            words={['Designer', 'Ideator', 'Entrepreneur', 'Innovator', 'Engineer']}
            typingSpeed={120}
            deletingSpeed={80}
            pauseTime={1500}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
