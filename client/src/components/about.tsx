import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useSectionAnimation } from '@/hooks/use-section-animation';
import headshot from '../assets/headshot.jpeg';

const About = () => {
  const sectionRef = useSectionAnimation();
  const titleRef = useScrollAnimation();
  const text1Ref = useScrollAnimation();
  const text2Ref = useScrollAnimation();
  const imageRef = useScrollAnimation();

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 section-transition">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div ref={titleRef} className="reveal">
              <h2 className="text-5xl md:text-6xl font-extralight mb-8 leading-tight text-apple-text">
                About<br/>
                <span className="font-medium">Saardhak</span>
              </h2>
            </div>
            
            <div ref={text1Ref} className="reveal">
              <p className="text-lg text-apple-gray leading-relaxed mb-6">
                With a foundation in Biomedical Engineering from Johns Hopkins University, I bring a unique perspective to healthcare innovation. My approach combines rigorous scientific methodology with real-world clinical insights to create meaningful solutions.
              </p>
            </div>
            
            <div ref={text2Ref} className="reveal">
              <p className="text-lg text-apple-gray leading-relaxed">
                I'm passionate about bridging the gap between cutting-edge technology and practical healthcare applications. My work focuses on developing medical devices that not only meet clinical needs but also improve the patient experience and healthcare outcomes.
              </p>
            </div>
          </div>
          <div ref={imageRef} className="reveal">
            <img 
              src={headshot} 
              alt="Professional medical device engineer in laboratory setting" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
