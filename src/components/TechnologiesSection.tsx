import { useEffect, useRef, useState } from 'react';

interface TechCategory {
  title: string;
  items: string[];
}

const technologies: TechCategory[] = [
  {
    title: 'Languages',
    items: ['Java', 'C', 'C++', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    title: 'Backend',
    items: ['Spring Boot', 'Spring Cloud', 'Hibernate', 'REST APIs', 'Node.js', 'Microservices'],
  },
  {
    title: 'AI & ML',
    items: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenAI', 'Hugging Face', 'RAG'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'Vite'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    title: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
];

const TechItem = ({ item, delay }: { item: string; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative inline-block cursor-default transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <span
        className={`
          relative z-10 transition-colors duration-300
          ${isHovered ? 'text-foreground' : 'text-muted-foreground'}
        `}
      >
        {item}
      </span>
      {/* Animated underline */}
      <span
        className={`
          absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-primary to-accent
          transition-all duration-300 ease-out
          ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
        `}
      />
    </span>
  );
};

const TechCategory = ({ category, index }: { category: TechCategory; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <h3 className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-lg md:text-xl font-light leading-relaxed">
        {category.items.map((item, i) => (
          <TechItem key={item} item={item} delay={i * 50} />
        ))}
      </div>
    </div>
  );
};

const TechnologiesSection = () => {
  return (
    <section id="technologies" className="relative py-32 bg-background">
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 100% 50% at 50% 100%, hsl(217 91% 60% / 0.05), transparent)
          `,
        }}
      />

      <div className="relative container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Technologies
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A curated stack of modern technologies I work with to build
            scalable, intelligent applications.
          </p>
        </div>

        {/* Tech grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {technologies.map((category, index) => (
            <TechCategory key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
