import { Mail, Linkedin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useSectionAnimation } from '@/hooks/use-section-animation';

const Contact = () => {
  const sectionRef = useSectionAnimation();
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  return (
    <section ref={sectionRef} id="contact" className="py-32 px-6 bg-apple-text text-white section-transition">
      <div className="max-w-4xl mx-auto text-center">
        <div ref={titleRef} className="reveal">
          <h2 className="text-5xl md:text-6xl font-extralight mb-8 leading-tight">
            Let's Connect<br/>
            <span className="font-medium">& Create</span>
          </h2>
        </div>
        
        <div ref={subtitleRef} className="reveal">
          <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Interested in collaborating on the next breakthrough in medical device innovation? I'd love to hear about your challenges and explore solutions together.
          </p>
        </div>
        
        <div ref={ctaRef} className="reveal">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:hello@saardhak.com" 
              className="inline-flex items-center bg-white text-apple-text px-8 py-4 rounded-full text-lg font-medium button-hover"
            >
              <Mail className="w-5 h-5 mr-3" />
              Email Me
            </a>
            
            <a 
              href="https://linkedin.com/in/saardhak" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white text-white px-8 py-4 rounded-full text-lg font-medium button-hover hover:bg-white hover:text-apple-text"
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
