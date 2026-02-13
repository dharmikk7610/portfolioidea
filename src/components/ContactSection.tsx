import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsFormOpen(false);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, hsl(217 91% 60% / 0.08), transparent)
          `,
        }}
      />

      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <div
            className={`
              transition-all duration-700 ease-out mb-12
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Let's work together
            </h2>
            <p className="text-lg text-muted-foreground">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </div>

          {/* Contact card */}
          <div
            className={`
              glass-strong rounded-3xl p-8 md:p-12 transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>prajapatidharmik2812@gmail.com</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Open to Remote</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover-lift hover:shadow-glow transition-all duration-300"
            >
              <Send className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Send a Message
            </button>
          </div>

          {/* Footer text */}
          <p
            className={`
              mt-12 text-sm text-muted-foreground/60 transition-all duration-700
              ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ transitionDelay: '400ms' }}
          >
            Designed & built with precision
          </p>
        </div>
      </div>

      {/* Contact Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          />

          {/* Form Card */}
          <div className="relative w-full max-w-md glass-strong rounded-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Close button */}
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <h3 className="text-2xl font-semibold text-foreground mb-2">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">Fill out the form and I'll get back to you soon.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  maxLength={255}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  maxLength={1000}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;
