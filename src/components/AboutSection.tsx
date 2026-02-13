import { useEffect, useRef } from 'react';
import { Code2, Brain, Rocket, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable solutions with best practices',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Embedding intelligence into applications that solve real problems',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimizing systems for speed, reliability, and efficiency',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Building together with clear communication and shared goals',
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left content
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate highlight cards with stagger
      gsap.fromTo(
        '.about-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 100% 30%, hsl(262 83% 75% / 0.08), transparent)
            `,
          }}
        />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <div ref={leftContentRef}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Building the future,
              <br />
              <span className="text-gradient">one line at a time</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                With a passion for both elegant code and innovative AI solutions,
                I specialize in creating full-stack applications that are not only
                functional but truly intelligent.
              </p>
              <p>
                My expertise spans from designing robust Java backends with Spring Boot
                to implementing sophisticated machine learning models that transform
                how businesses operate.
              </p>
              <p>
                I believe in writing code that future developers will thank you for—
                clean, documented, and thoughtfully architected.
              </p>
            </div>
          </div>

          {/* Right - Highlight cards */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="about-card group p-6 glass rounded-2xl hover-lift cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
