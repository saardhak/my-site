import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import About from '@/components/about';
import Experience from '@/components/experience';
import VeinaProject from '@/components/veina-project';
import PastProjects from '@/components/past-projects';
import Contact from '@/components/contact';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Navigation />
      <About />
      <Experience />
      <VeinaProject />
      <PastProjects />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
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
