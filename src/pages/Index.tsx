import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import CodeLoader from '@/components/CodeLoader';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <CodeLoader onComplete={() => setIsLoading(false)} />}
      <main className={`bg-background min-h-screen transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <TechnologiesSection />
        <ContactSection />
        <Chatbot />
      </main>
    </>
  );
};

export default Index;
