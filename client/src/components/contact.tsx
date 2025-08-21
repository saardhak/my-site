import { Mail, Linkedin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useSectionAnimation } from '@/hooks/use-section-animation';

const Contact = () => {
  const sectionRef = useSectionAnimation();
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  return (
    <section ref={sectionRef} id="contact" className="py-16 sm:py-32 px-4 sm:px-6 bg-background dark:bg-neutral-900 text-foreground dark:text-white section-transition">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={titleRef} className="reveal">
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 leading-tight">
            Let's Connect
          </h2>
        </div>
        <div ref={subtitleRef} className="reveal">
          <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed">
            I’m always open to new opportunities, collaborations, and conversations about healthcare, technology, and entrepreneurship. Reach out to start a conversation or just say hello.
          </p>
        </div>
        <div ref={ctaRef} className="reveal">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="mailto:hello@saardhak.com" 
              className="inline-flex items-center bg-gradient-primary text-white px-8 py-4 rounded-full text-lg font-medium button-hover hover:bg-gradient-primary-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
            >
              <Mail className="w-5 h-5 mr-3" />
              Email Me
            </a>
            <a 
              href="https://linkedin.com/in/saardhak" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-gradient-primary border-2 border-gradient-primary px-8 py-4 rounded-full text-lg font-medium button-hover hover:bg-gradient-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <Linkedin className="w-5 h-5 mr-3" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
