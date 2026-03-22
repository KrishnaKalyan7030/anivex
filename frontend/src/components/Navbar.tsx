import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { Language } from '@/lib/translations';
import { Menu, X, Globe, Droplets, LogIn, User } from 'lucide-react';
import logo from '@/assets/logo.png'

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { key: 'nav_home', href: '#home' },
    { key: 'nav_about', href: '#about' },
    { key: 'nav_products', href: '#products' },
    { key: 'nav_why', href: '#why' },
    { key: 'nav_gallery', href: '#gallery' },
    { key: 'nav_contact', href: '#contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-card/95 backdrop-blur-md shadow-card' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('#home')}>
            <Droplets className={`w-8 h-8 ${scrolled ? 'text-primary' : 'text-primary-foreground'}`} />
            {/* <span className={`font-display font-bold text-xl md:text-2xl tracking-tight ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
            
            </span> */}
              <img 
                src={logo}                    // ← change this path
                alt="Anivex Logo"                   // ← very important for accessibility & SEO
                         // height 32px, width auto (keeps aspect ratio)
                // or: "h-9 w-auto", "h-10 w-auto", etc.

                className="
                        h-10               // ← was h-8, now bigger (try h-11, h-12, h-14)
                        w-auto             // keeps proportions
                        object-contain     // no stretching / cropping
                        drop-shadow-md     // soft premium shadow – very nice on blue background
                        transition-all     // smooth hover/scroll effects
                        duration-300
                            "
              />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-2 rounded-lg font-display text-sm font-medium transition-colors ${
                  scrolled ? 'text-foreground hover:text-primary hover:bg-secondary' : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                {t(link.key)}
              </button>
            ))}
            
            {/* Language Switcher */}
            <div className="relative ml-2">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-display text-sm font-medium transition-colors ${
                  scrolled ? 'text-foreground hover:text-primary hover:bg-secondary' : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                <Globe className="w-4 h-4" />
                {lang.toUpperCase()}
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-card rounded-lg shadow-card-hover border border-border overflow-hidden">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-body hover:bg-secondary transition-colors ${lang === l.code ? 'bg-secondary text-primary font-semibold' : 'text-foreground'}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Link */}
            {user ? (
              <button
                onClick={() => navigate(isAdmin ? '/admin' : '/employee')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-display text-sm font-medium transition-colors ${
                  scrolled ? 'text-foreground hover:text-primary hover:bg-secondary' : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                <User className="w-4 h-4" />
                {t('nav_dashboard')}
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-display text-sm font-medium transition-colors ${
                  scrolled ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-primary-foreground text-water-deep hover:bg-primary-foreground/90'
                }`}
              >
                <LogIn className="w-4 h-4" />
                {t('nav_login')}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border animate-fade-in-up">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left px-4 py-3 rounded-lg font-display text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                {t(link.key)}
              </button>
            ))}
            <div className="flex gap-2 pt-3 border-t border-border">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setIsOpen(false); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-display font-medium transition-colors ${
                    lang === l.code ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
