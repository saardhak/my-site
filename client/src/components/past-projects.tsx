import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useSectionAnimation } from '@/hooks/use-section-animation';

const PastProjects = () => {
  const sectionRef = useSectionAnimation();
  const headerRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const project1ImageRef = useScrollAnimation();
  const project1TextRef = useScrollAnimation();
  const project2ImageRef = useScrollAnimation();
  const project2TextRef = useScrollAnimation();
  const project3ImageRef = useScrollAnimation();
  const project3TextRef = useScrollAnimation();

  const projects = [
    {
      title: 'Cardiac Monitoring System',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      alt: 'Biomedical engineering laboratory equipment',
      description: 'Developed a non-invasive cardiac monitoring device that provides continuous real-time data with 99.7% accuracy. The system reduces hospital readmissions by 30% through early detection of cardiac events.',
      tags: ['Biomedical Engineering', 'FDA Approved', 'Clinical Trials'],
    },
    {
      title: 'Smart Surgical Instruments',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      alt: 'Healthcare technology development laboratory',
      description: 'Created intelligent surgical tools with embedded sensors that provide real-time feedback to surgeons, reducing operative complications by 25% and improving patient recovery times.',
      tags: ['IoT Integration', 'Machine Learning', 'Patent Pending'],
    },
    {
      title: 'Diagnostic Imaging Enhancement',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      alt: 'Medical professionals collaborating on healthcare technology',
      description: 'Pioneered AI-powered imaging enhancement technology that improves diagnostic accuracy by 40% while reducing radiation exposure. Currently deployed in 15+ medical centers nationwide.',
      tags: ['Artificial Intelligence', 'Medical Imaging', 'Commercial Success'],
    },
    // Add more projects here as you get them from LinkedIn
    {
      title: 'Project Title Placeholder',
      image: '',
      alt: '',
      description: 'Project description placeholder. Replace with real project details from LinkedIn.',
      tags: ['Tag1', 'Tag2'],
    },
  ];

  return (
    <section ref={sectionRef} id="portfolio" className="py-32 px-6 bg-background dark:bg-neutral-900 section-transition">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div ref={headerRef} className="reveal">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 leading-tight text-apple-text">
              Portfolio
            </h2>
          </div>
          
          <div ref={subtitleRef} className="reveal">
            <p className="text-xl text-apple-gray max-w-3xl mx-auto leading-relaxed">
              A selection of projects and innovations I’ve led or contributed to—spanning medical devices, digital health, and patient-centered solutions. Each project reflects my commitment to impact, creativity, and collaboration.
            </p>
          </div>
        </div>

        <div className="space-y-24">
          {projects.map((project, idx) => (
            <div className="grid md:grid-cols-2 gap-16 items-center" key={idx}>
              <div className={idx % 2 === 1 ? 'md:order-2 reveal' : 'reveal'}>
                {project.image && (
                  <div className="group cursor-pointer">
                    <img 
                      src={project.image}
                      alt={project.alt}
                      className="rounded-2xl shadow-lg w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
              <div className={idx % 2 === 1 ? 'md:order-1 reveal' : 'reveal'}>
                <h3 className="text-4xl font-extralight mb-6 text-apple-text">{project.title}</h3>
                <p className="text-lg text-apple-gray leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="px-4 py-2 bg-background dark:bg-neutral-800 rounded-full text-sm font-medium text-foreground dark:text-white shadow-sm hover:shadow-md transition-shadow duration-300">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastProjects;
