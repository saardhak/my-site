import Navigation from '@/components/navigation';
import Hero, { FlipContext } from '@/components/hero';
import About from '@/components/about';
import Experience from '@/components/experience';
import VeinaProject from '@/components/veina-project';
import PastProjects from '@/components/past-projects';
import Contact from '@/components/contact';
import React, { useState } from 'react';

export { FlipContext };

const Home = ({ onFlipChange }: { onFlipChange?: (flipped: boolean) => void }) => {
  const [flipped, setFlipped] = useState(false);
  const handleFlipChange = (f: boolean) => {
    setFlipped(f);
    if (onFlipChange) onFlipChange(f);
  };
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-neutral-900 dark:text-white">
      <Hero onFlipChange={handleFlipChange}>
        <Navigation />
      </Hero>
      <About />
      <Experience />
      <VeinaProject />
      <PastProjects />
      <Contact />
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-apple-gray mb-4 md:mb-0">
            © 2024 Saardhak. All rights reserved.
          </div>
          <div className="text-apple-gray text-sm">
            BME from Johns Hopkins University • Healthcare Innovation • Patient-Centered Design
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
