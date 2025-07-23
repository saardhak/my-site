import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useSectionAnimation } from '@/hooks/use-section-animation';
import { useState } from 'react';

const Portfolio = () => {
  const sectionRef = useSectionAnimation();
  const headerRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();

  const projects = [
    {
      title: 'Design Team Leader',
      company: 'Johns Hopkins Center for Bioengineering Innovation & Design',
      logo: '/logos/jhu-cbid.png', // Place logo in public/logos/
      role: 'Design Team Leader',
      location: 'Baltimore, MD, USA',
      period: 'Jan 2022 - Jun 2025',
      description: 'Managed an undergraduate engineering team to identify industry needs, research technologies, and develop new medical device concepts. Led product definition, regulatory research, and design control.',
      skills: ['ISO 13485', 'ISO 14971', 'Design for Manufacturing', 'Mechanical Product Design', 'Design Control', '3D CAD', 'Medical Devices', 'Problem Solving'],
    },
    {
      title: 'AI/ML Researcher',
      company: 'Universidad Carlos III de Madrid',
      logo: '/logos/uc3m.png',
      role: 'Artificial Intelligence and Machine Learning Researcher',
      location: 'Leganés, Spain',
      period: 'May 2023 - Jul 2023',
      description: 'Developed and analyzed AI/ML algorithms to determine tool wear for Airbus A350 drilling operations.',
      skills: ['AI/ML', 'Problem Solving'],
    },
    {
      title: 'Co-Founder, Technical Lead',
      company: 'InVenimus',
      logo: '/logos/invenimus.png',
      role: 'Co-Founder, Technical Lead',
      location: 'Baltimore, MD, USA',
      period: 'Jan 2021 - May 2023',
      description: 'Developed a medical device for IV access in pediatric patients. Led customer interviews, root-cause analysis, and technical documentation.',
      skills: ['ISO 13485', 'Design for Manufacturing', 'Medical Devices', '3D CAD', 'Problem Solving'],
    },
    {
      title: 'R&D Engineering Intern',
      company: 'Optosurgical LLC',
      logo: '/logos/optosurgical.png',
      role: 'Research and Development Engineering Intern',
      location: 'Columbia, MD, USA',
      period: 'May 2022 - Aug 2022',
      description: 'Worked across R&D, Marketing, and Regulatory. Developed new product concepts, wrote research papers, and presented at SPIE Biomedical Optics Symposium.',
      skills: ['ISO 13485', 'Design for Manufacturing', 'Industrial Design', '3D CAD', 'Mass Production'],
    },
    {
      title: 'Co-Founder, Technical Lead',
      company: 'StetPulse LLC',
      logo: '/logos/stetpulse.png',
      role: 'Co-Founder, Technical Lead',
      location: 'Baltimore, MD, USA',
      period: 'Nov 2020 - May 2022',
      description: 'Designed and validated a UV-C lightbox for stethoscope sanitation to reduce COVID transmission. Piloted prototype at Johns Hopkins Hospital.',
      skills: ['ISO 13485', 'Design for Manufacturing', 'Medical Devices', '3D CAD', 'Problem Solving'],
    },
    {
      title: 'Product Development Engineer, CAD & Design Lead, Co-Founder',
      company: 'Polair LLC',
      logo: '/logos/polair.png',
      role: 'Product Development Engineer, CAD & Design Lead, Co-Founder',
      location: 'Baltimore, MD, USA',
      period: 'Jul 2020 - May 2022',
      description: 'Won 2nd place and $250,000 in X-Prize Next-Gen Mask Challenge. Designed modular face mask, worked with Honeywell, and filed for patent.',
      skills: ['ISO 13485', 'Design for Manufacturing', 'Injection Molding', '3D CAD', 'Medical Devices', 'Problem Solving'],
      links: [
        { label: 'Polair Mask', url: 'https://www.polairmask.com/' },
        { label: 'JHU News', url: 'https://ventures.jhu.edu/news/student-engineers-polair-xprize-adaptable-surgical-mask/' },
      ],
    },
  ];

  const [flipped, setFlipped] = useState(Array(projects.length).fill(false));

  const handleFlip = (idx: number) => {
    setFlipped((prev) => prev.map((f, i) => (i === idx ? !f : f)));
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative group perspective"
              style={{ minHeight: 320 }}
              onClick={() => handleFlip(idx)}
            >
              <div className={`transition-transform duration-700 transform-style-preserve-3d ${flipped[idx] ? 'rotate-y-180' : ''}`}
                style={{ minHeight: 320 }}
              >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-white dark:bg-neutral-800 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200 dark:border-gray-700">
                  {project.logo && <img src={project.logo} alt={project.company + ' logo'} className="h-16 mb-4" />}
                  <h3 className="text-xl font-semibold text-apple-text mb-2 text-center">{project.title}</h3>
                  <div className="text-apple-gray text-center text-sm mb-1">{project.company}</div>
                  <div className="text-xs text-gray-400 mb-2">{project.period}</div>
                  <div className="text-xs text-gray-400 mb-2">{project.location}</div>
                  <div className="mt-2 text-xs text-primary font-medium">Click to flip</div>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden bg-background dark:bg-neutral-900 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 rotate-y-180 cursor-pointer border border-gray-200 dark:border-gray-700">
                  <div className="text-apple-text text-base font-semibold mb-2 text-center">{project.role}</div>
                  <div className="text-apple-gray text-sm mb-3 text-center">{project.description}</div>
                  <div className="flex flex-wrap gap-2 justify-center mb-2">
                    {project.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-background dark:bg-neutral-800 rounded text-xs text-foreground dark:text-white border border-gray-200 dark:border-gray-700">{skill}</span>
                    ))}
                  </div>
                  {project.links && project.links.length > 0 && (
                    <div className="flex flex-col gap-1 mt-2">
                      {project.links.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs">{link.label}</a>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 text-xs text-primary font-medium">Click to flip back</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
