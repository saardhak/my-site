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
                About Me
              </h2>
            </div>
            
            <div ref={text1Ref} className="reveal">
              <p className="text-lg text-apple-gray leading-relaxed mb-6">
                I am a biomedical engineer passionate about transforming healthcare through technology and innovation. With a degree from Johns Hopkins University and hands-on experience in both research and startups, I thrive at the intersection of engineering, medicine, and entrepreneurship.
              </p>
            </div>
            
            <div ref={text2Ref} className="reveal">
              <p className="text-lg text-apple-gray leading-relaxed">
                My mission is to bridge the gap between clinical needs and real-world solutions—leading teams, building products, and driving impact in patient care. I believe in the power of collaboration, curiosity, and relentless problem-solving to create a healthier future for all.
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
