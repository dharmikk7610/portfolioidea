import { useEffect, useState } from 'react';

interface CodeLoaderProps {
  onComplete: () => void;
}

const codeLines = [
  { text: 'const developer = {', delay: 0 },
  { text: '  name: "Dharmik Prajapati",', delay: 150 },
  { text: '  role: "Full-Stack AI Java Developer",', delay: 300 },
  { text: '  skills: ["Java", "AI/ML", "React"],', delay: 450 },
  { text: '  passion: "Building intelligent systems"', delay: 600 },
  { text: '};', delay: 750 },
  { text: '', delay: 850 },
  { text: 'developer.initialize();', delay: 950 },
];

const CodeLoader = ({ onComplete }: CodeLoaderProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [typingLine, setTypingLine] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState<Record<number, number>>({});
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    codeLines.forEach((line, index) => {
      // Start showing line
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
        setTypingLine(index);
        setTypedChars(prev => ({ ...prev, [index]: 0 }));
        
        // Type out the line character by character
        const chars = line.text.length;
        for (let i = 0; i <= chars; i++) {
          setTimeout(() => {
            setTypedChars(prev => ({ ...prev, [index]: i }));
          }, i * 25);
        }
      }, line.delay);
    });

    // Complete animation
    const lastLine = codeLines[codeLines.length - 1];
    const totalDuration = lastLine.delay + (lastLine.text.length * 25) + 600;
    
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 500);
    }, totalDuration);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating orbs */}
      <div 
        className="absolute w-64 h-64 rounded-full blur-3xl animate-pulse-soft"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
          top: '20%',
          right: '20%',
        }}
      />
      <div 
        className="absolute w-48 h-48 rounded-full blur-3xl animate-pulse-soft"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
          bottom: '30%',
          left: '15%',
          animationDelay: '1s',
        }}
      />

      {/* Code terminal */}
      <div className="relative w-full max-w-xl mx-6">
        <div className="glass rounded-2xl overflow-hidden shadow-elevated">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="ml-3 text-xs font-mono text-muted-foreground">developer.ts</span>
          </div>

          {/* Code content */}
          <div className="p-6 font-mono text-sm leading-relaxed min-h-[280px]">
            {codeLines.map((line, index) => {
              const isVisible = visibleLines.includes(index);
              const chars = typedChars[index] || 0;
              const displayText = line.text.substring(0, chars);
              const isTyping = typingLine === index && chars < line.text.length;

              return (
                <div 
                  key={index}
                  className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ height: '1.75rem' }}
                >
                  <span className="text-muted-foreground/50 mr-4 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-foreground">
                    {displayText.split(/(".*?"|'.*?'|\d+|true|false|null)/).map((part, i) => {
                      if (/^["'].*["']$/.test(part)) {
                        return <span key={i} className="text-primary">{part}</span>;
                      }
                      if (/^(const|let|var|function|return|if|else)$/.test(part)) {
                        return <span key={i} className="text-primary/80">{part}</span>;
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </span>
                  {isTyping && (
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-muted/50">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ 
                width: `${(visibleLines.length / codeLines.length) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm animate-pulse">
            Initializing...
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeLoader;
