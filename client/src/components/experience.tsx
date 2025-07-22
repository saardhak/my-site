import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useSectionAnimation } from '@/hooks/use-section-animation';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const sectionRef = useSectionAnimation();
  const titleRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const exp1Ref = useScrollAnimation();
  const exp2Ref = useScrollAnimation();
  const exp3Ref = useScrollAnimation();

  const experiences = [
    {
      title: "Biomedical Engineer",
      company: "Medical Device Startup",
      location: "Baltimore, MD",
      duration: "2023 - Present",
      description: "Leading the development of innovative medical devices, including the Veina syringe project. Collaborating with cross-functional teams to bring breakthrough healthcare solutions from concept to clinical implementation.",
      highlights: ["Led Veina project development", "Improved blood draw success rates by 85%", "Filed 3 provisional patents"]
    },
    {
      title: "Research Associate",
      company: "Johns Hopkins University",
      location: "Baltimore, MD", 
      duration: "2022 - 2023",
      description: "Conducted cutting-edge research in biomedical engineering, focusing on medical device innovation and healthcare technology applications.",
      highlights: ["Published 2 peer-reviewed papers", "Developed novel diagnostic tools", "Collaborated with clinical teams"]
    },
    {
      title: "Engineering Intern",
      company: "Healthcare Innovation Lab",
      location: "Baltimore, MD",
      duration: "2021 - 2022",
      description: "Gained hands-on experience in medical device design and testing, working on projects that bridge engineering principles with clinical needs.",
      highlights: ["Designed prototype medical devices", "Conducted user research with healthcare professionals", "Implemented quality assurance protocols"]
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="py-32 px-6 bg-gray-50 section-transition">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div ref={titleRef} className="reveal">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 leading-tight text-apple-text">
              Professional<br/>
              <span className="font-medium">Experience</span>
            </h2>
          </div>
          
          <div ref={subtitleRef} className="reveal">
            <p className="text-xl text-apple-gray max-w-3xl mx-auto leading-relaxed">
              A journey through healthcare innovation, from academic research to real-world medical device development.
            </p>
          </div>
        </div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              ref={index === 0 ? exp1Ref : index === 1 ? exp2Ref : exp3Ref}
              className="reveal"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-500 button-hover">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <h3 className="text-2xl font-medium text-apple-text mb-4">{exp.title}</h3>
                    <div className="space-y-2 text-apple-gray">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="text-lg text-apple-gray leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-apple-text mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-apple-gray">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;