import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useSectionAnimation } from '@/hooks/use-section-animation';

const Reflections = () => {
  const sectionRef = useSectionAnimation();
  const headerRef = useScrollAnimation();
  const subtitleRef = useScrollAnimation();

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Medical Device Innovation",
      excerpt: "Exploring how AI and machine learning are transforming healthcare technology...",
      date: "March 2024",
      category: "Innovation",
      content: "Medical device innovation is at a crossroads. With the rapid advancement of artificial intelligence and machine learning, we're seeing unprecedented opportunities to create devices that not only treat symptoms but predict and prevent health issues before they arise..."
    },
    {
      id: 2,
      title: "Building Teams in Healthcare Startups",
      excerpt: "Lessons learned from leading cross-functional teams in the medical device space...",
      date: "February 2024",
      category: "Leadership",
      content: "Leading a healthcare startup team requires a unique blend of technical expertise, regulatory knowledge, and human-centered design thinking. The stakes are high, but so are the rewards when you get it right..."
    },
    {
      id: 3,
      title: "Patient-Centered Design in Medical Technology",
      excerpt: "How putting patients first leads to better outcomes and more successful products...",
      date: "January 2024",
      category: "Design",
      content: "True innovation in medical technology comes from understanding the patient journey from their perspective. It's not just about solving technical problems—it's about solving human problems..."
    },
    {
      id: 4,
      title: "The Intersection of Engineering and Entrepreneurship",
      excerpt: "Bridging the gap between technical excellence and business success...",
      date: "December 2023",
      category: "Entrepreneurship",
      content: "Engineering and entrepreneurship might seem like different worlds, but they're more connected than you might think. Both require systematic thinking, problem-solving, and the ability to iterate quickly..."
    }
  ];

  return (
    <section ref={sectionRef} id="reflections" className="py-32 px-6 bg-background dark:bg-neutral-900 section-transition">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div ref={headerRef} className="reveal">
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 leading-tight text-apple-text">
              Reflections
            </h2>
          </div>
          <div ref={subtitleRef} className="reveal">
            <p className="text-xl text-apple-gray max-w-3xl mx-auto leading-relaxed">
              Thoughts, insights, and lessons learned from my journey in healthcare innovation and entrepreneurship.
            </p>
          </div>
        </div>

        {/* Blog Post Panel */}
        <div className="relative max-w-6xl mx-auto overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-6">
            {blogPosts.map((post, index) => (
              <div 
                key={post.id}
                className="flex-shrink-0 w-full max-w-2xl snap-center"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200 dark:border-gray-700 h-full hover-lift hover-glow transition-all duration-300">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gradient-primary font-medium">{post.category}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-3xl font-medium text-apple-text mb-4">
                      {post.title}
                    </h3>
                    <p className="text-lg text-apple-gray leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll indicator */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">
              Scroll left/right to explore posts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reflections; 