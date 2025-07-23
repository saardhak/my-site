import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useSectionAnimation } from '@/hooks/use-section-animation';

const VeinaProject = () => {
  const sectionRef = useSectionAnimation();
  const headerRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const imageRef = useScrollAnimation();
  const challengeRef = useScrollAnimation();
  const innovationRef = useScrollAnimation();
  const stat1Ref = useScrollAnimation();
  const stat2Ref = useScrollAnimation();
  const stat3Ref = useScrollAnimation();

  return (
    <section ref={sectionRef} id="startup" className="py-32 px-6 section-transition">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div ref={headerRef} className="reveal">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 leading-tight text-apple-text">
              My Startup
            </h2>
          </div>
          
          <div ref={subtitleRef} className="reveal">
            <p className="text-xl text-apple-gray max-w-3xl mx-auto leading-relaxed">
              As founder of Veina, I am dedicated to solving one of healthcare’s most frustrating challenges: failed blood draws. Our team is building a revolutionary syringe that empowers clinicians and improves patient outcomes worldwide.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div ref={imageRef} className="reveal">
            <img 
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Medical device innovation in laboratory setting" 
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div>
            <div ref={challengeRef} className="reveal">
              <h3 className="text-3xl font-medium mb-6 text-apple-text">The Problem</h3>
              <p className="text-lg text-apple-gray leading-relaxed mb-8">
                Every year, millions of patients endure multiple needle sticks due to failed blood draws. This not only causes pain and anxiety, but also increases costs and delays care. I started Veina to change that.
              </p>
            </div>
            
            <div ref={innovationRef} className="reveal">
              <h3 className="text-3xl font-medium mb-6 text-apple-text">Our Solution</h3>
              <p className="text-lg text-apple-gray leading-relaxed">
                Veina’s patented technology combines smart guidance and ergonomic design to make blood draws faster, safer, and more successful. We’re on a mission to set a new standard for patient-centered care—one draw at a time.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div ref={stat1Ref} className="reveal text-center">
            <div className="text-4xl font-extralight text-primary mb-4">85%</div>
            <h4 className="text-xl font-medium mb-3 text-apple-text">Success Rate</h4>
            <p className="text-apple-gray">Improvement in first-attempt blood draw success</p>
          </div>
          
          <div ref={stat2Ref} className="reveal text-center">
            <div className="text-4xl font-extralight text-primary mb-4">40%</div>
            <h4 className="text-xl font-medium mb-3 text-apple-text">Time Reduction</h4>
            <p className="text-apple-gray">Decrease in procedure time per patient</p>
          </div>
          
          <div ref={stat3Ref} className="reveal text-center">
            <div className="text-4xl font-extralight text-primary mb-4">95%</div>
            <h4 className="text-xl font-medium mb-3 text-apple-text">Patient Satisfaction</h4>
            <p className="text-apple-gray">Positive feedback in clinical trials</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeinaProject;
