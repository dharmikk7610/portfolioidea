import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import gsap from 'gsap';
import dharmikPhoto from '@/assets/dharmik-avatar.png';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial states
      gsap.set([cardRef.current, avatarRef.current, badgeRef.current, headlineRef.current, subtitleRef.current, descRef.current, ctaRef.current, socialsRef.current], {
        opacity: 0,
        y: 40,
      });
      gsap.set(scrollRef.current, { opacity: 0, y: 20 });
      gsap.set([orb1Ref.current, orb2Ref.current], { scale: 0, opacity: 0 });

      // Animation sequence
      tl.to(cardRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .to(orb1Ref.current, { scale: 1, opacity: 0.2, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 0.3)
        .to(orb2Ref.current, { scale: 1, opacity: 0.15, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 0.5)
        .to(avatarRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
        .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.7)
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.8)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.95)
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.1)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.25)
        .to(socialsRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.4)
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.5);

      // Floating animation for orbs
      gsap.to(orb1Ref.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(orb2Ref.current, {
        y: 12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Subtle pulse for avatar glow
      gsap.to('.avatar-glow', {
        scale: 1.15,
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]"
        >
          <source
            src="https://www.shutterstock.com/shutterstock/videos/3935414483/preview/stock-footage-futuristic-digital-document-management-concept-showing-a-hand-working-on-a-laptop-with-virtual.webm"
            type="video/webm"
          />
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      </div>

      {/* Subtle floating orbs with parallax */}
      <div
        ref={orb1Ref}
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(200 80% 60% / 0.3) 0%, transparent 70%)',
          top: '15%',
          right: '15%',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute w-64 h-64 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(190 60% 50% / 0.25) 0%, transparent 70%)',
          bottom: '25%',
          left: '10%',
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Floating card with 3D tilt effect */}
        <div
          ref={cardRef}
          className="max-w-xl mx-auto"
          style={{
            transform: `perspective(1000px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div className="glass rounded-3xl p-10 md:p-14 shadow-2xl border border-white/10">
            {/* Avatar with glow and parallax */}
            <div
              ref={avatarRef}
              className="mb-6 flex justify-center"
              style={{
                transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="avatar-glow absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 to-sky-500/30 blur-xl scale-110" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-300/20 to-cyan-400/20 blur-2xl scale-125" />
                {/* Avatar */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
                  <img
                    src={dharmikPhoto}
                    alt="Dharmik Prajapati"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Status badge */}
            <div ref={badgeRef} className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-xs font-medium text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Open to work
              </span>
            </div>

            {/* Small headline */}
            <h1 ref={headlineRef} className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3 text-center">
              Dharmik Prajapati
            </h1>

            {/* Short subtitle */}
            <p ref={subtitleRef} className="text-base md:text-lg text-muted-foreground mb-6 font-light text-center">
              Full-Stack AI Java Developer
            </p>

            {/* Brief description */}
            <p ref={descRef} className="text-sm text-muted-foreground/70 mb-8 leading-relaxed text-center">
              Building intelligent systems with clean code and modern AI.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <a
                href="#contact"
                className="group px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get in Touch
                <span className="inline-block ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#projects"
                className="px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-foreground hover:bg-white/80 hover:scale-105 transition-all duration-300"
              >
                View Work
              </a>
              <a
                href="/resume.pdf"
                download="Dharmik_Prajapati_Resume.pdf"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 bg-white/40 backdrop-blur-sm rounded-full text-sm font-medium text-foreground hover:bg-white/60 hover:border-foreground/40 hover:scale-105 transition-all duration-300"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                Resume
              </a>
            </div>

            {/* Social links */}
            <div ref={socialsRef} className="flex items-center justify-center gap-4">
              {[
                { icon: Github, href: 'https://github.com/dharmikk7610', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/dharmik-prajapati-469836293/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:prajapatidharmik2812@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2.5 bg-white/40 backdrop-blur-sm rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/60 hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a
            href="#technologies"
            className="flex flex-col items-center gap-1.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            <span className="text-xs font-medium">Scroll</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
