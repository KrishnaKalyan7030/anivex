import { useLanguage } from '@/lib/LanguageContext';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-water.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Pure water splash" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-water-deep/70 via-water-mid/50 to-water-deep/80" />
      </div>

      {/* Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-foreground/10 animate-bubble"
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-droplet mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground/90 font-display text-sm font-medium tracking-wider uppercase border border-primary-foreground/20">
            Premium RO Water
          </span>
        </div>
        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground mb-4 leading-tight animate-fade-in-up">
          ANIVEX
        </h1>
        <p className="font-display text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 font-light mb-3 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {t('hero_tagline')}
        </p>
        <p className="font-body text-base sm:text-lg text-primary-foreground/70 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {t('hero_desc')}
        </p>
        <button
          onClick={scrollToAbout}
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-water-deep font-display font-bold rounded-full shadow-water hover:shadow-card-hover hover:scale-105 transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: '0.45s' }}
        >
          {t('hero_cta')}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z" fill="hsl(200, 20%, 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
