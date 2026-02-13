import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? 'glass-strong py-4' : 'py-6 bg-transparent'}
        `}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            DP
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover-lift transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`
          fixed inset-0 z-40 glass-strong transition-all duration-300 md:hidden
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-4 bg-foreground text-background font-medium rounded-full"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
