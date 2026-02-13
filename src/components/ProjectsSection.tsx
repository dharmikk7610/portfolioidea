import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: 'Hospital Management System',
    description: 'Role-based system for doctor, admin, and pharmacist with appointment scheduling, record management, and OTP email verification for patients.',
    techStack: ['Java Spring', 'Hibernate', 'REST API', 'MySQL'],
    githubUrl: 'https://github.com/dharmikk7610',
  },
  {
    title: 'Food Delivery Web Application',
    description: 'Full-stack food delivery platform with user, admin, and restaurant roles. Features authentication, menu management, cart, order placement, and real-time status updates.',
    techStack: ['Spring Boot', 'TypeScript', 'Hibernate', 'REST API', 'MySQL', 'JWT'],
    githubUrl: 'https://github.com/dharmikk7610',
  },
  {
    title: 'Hackathon Management System',
    description: 'Online hackathon platform for hosting and participating in events with event creation, team registration, submission tracking, and result management.',
    techStack: ['Spring Boot', 'Hibernate', 'REST API', 'MySQL', 'JWT', 'OTP'],
    githubUrl: 'https://github.com/dharmikk7610',
  },
  {
    title: 'GradeTrack System',
    description: 'A comprehensive grade tracking system for students and teachers with role-based access, grade entry, report generation, and academic performance analytics.',
    techStack: ['Spring MVC', 'Hibernate', 'MySQL', 'JSP', 'Bootstrap'],
    githubUrl: 'https://github.com/dharmikk7610',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="project-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative glass rounded-2xl p-6 md:p-8 h-full transition-all duration-500 ${
          isHovered ? 'shadow-xl scale-[1.02] border-primary/20' : ''
        }`}
        style={{
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                aria-label="GitHub Repository"
                className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  aria-label="Live Demo"
                  className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 hover:scale-110"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-secondary/80 text-secondary-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate project cards with stagger
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
            A selection of projects showcasing full-stack development and AI integration
          </p>
        </div>

        {/* Projects grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
