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

  return (
    <section ref={sectionRef} id="projects" className="py-32 px-6 bg-gray-50 section-transition">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div ref={headerRef} className="reveal">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 leading-tight text-apple-text">
              Past <span className="font-medium">Projects</span>
            </h2>
          </div>
          
          <div ref={subtitleRef} className="reveal">
            <p className="text-xl text-apple-gray max-w-3xl mx-auto leading-relaxed">
              A collection of innovative medical devices and healthcare solutions developed throughout my career.
            </p>
          </div>
        </div>

        <div className="space-y-24">
          {/* Project 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={project1ImageRef} className="reveal">
              <div className="group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Biomedical engineering laboratory equipment" 
                  className="rounded-2xl shadow-lg w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            
            <div ref={project1TextRef} className="reveal">
              <h3 className="text-4xl font-extralight mb-6 text-apple-text">Cardiac Monitoring System</h3>
              <p className="text-lg text-apple-gray leading-relaxed mb-6">
                Developed a non-invasive cardiac monitoring device that provides continuous real-time data with 99.7% accuracy. The system reduces hospital readmissions by 30% through early detection of cardiac events.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-apple-text shadow-sm hover:shadow-md transition-shadow duration-300">Biomedical Engineering</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-apple-text shadow-sm hover:shadow-md transition-shadow duration-300">FDA Approved</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-apple-text shadow-sm hover:shadow-md transition-shadow duration-300">Clinical Trials</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="md:order-2" ref={project2TextRef}>
              <div className="reveal">
                <h3 className="text-4xl font-extralight mb-6 text-apple-text">Smart Surgical Instruments</h3>
                <p className="text-lg text-apple-gray leading-relaxed mb-6">
                  Created intelligent surgical tools with embedded sensors that provide real-time feedback to surgeons, reducing operative complications by 25% and improving patient recovery times.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-apple-text shadow-sm hover:shadow-md transition-shadow duration-300">IoT Integration</span>
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-apple-text shadow-sm hover:shadow-md transition-shadow duration-300">Machine Learning</span>
                  <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-apple-text shadow-sm hover:shadow-md transition-shadow duration-300">Patent Pending</span>
                </div>
              </div>
            </div>
            
            <div className="md:order-1" ref={project2ImageRef}>
              <div className="reveal">
                <div className="group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                    alt="Healthcare technology development laboratory" 
                    className="rounded-2xl shadow-lg w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={project3ImageRef} className="reveal">
              <div className="group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Medical professionals collaborating on healthcare technology" 
                  className="rounded-2xl shadow-lg w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            
            <div ref={project3TextRef} className="reveal">
              <h3 className="text-4xl font-extralight mb-6 text-apple-text">Diagnostic Imaging Enhancement</h3>
              <p className="text-lg text-apple-gray leading-relaxed mb-6">
                Pioneered AI-powered imaging enhancement technology that improves diagnostic accuracy by 40% while reducing radiation exposure. Currently deployed in 15+ medical centers nationwide.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-apple-text shadow-sm hover:shadow-md transition-shadow duration-300">Artificial Intelligence</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-apple-text shadow-sm hover:shadow-md transition-shadow duration-300">Medical Imaging</span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-apple-text shadow-sm hover:shadow-md transition-shadow duration-300">Commercial Success</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastProjects;
