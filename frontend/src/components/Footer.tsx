import { useLanguage } from '@/lib/LanguageContext';
import { Droplets, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Language } from '@/lib/translations';

const Footer = () => {
  const { t, lang, setLang } = useLanguage();
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'mr', label: 'मरा' },
    { code: 'hi', label: 'हिं' },
  ];

  return (
    <footer className="gradient-hero py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <Droplets className="w-7 h-7 text-primary-foreground" />
              <span className="font-display font-bold text-2xl text-primary-foreground">ANIVEX</span>
            </div>
            <p className="font-body text-primary-foreground/70">{t('footer_tagline')}</p>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">{t('footer_follow')}</h4>
            <div className="flex gap-3 justify-center md:justify-start">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Language</h4>
            <div className="flex gap-2 justify-center md:justify-start">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-4 py-2 rounded-lg font-display text-sm font-medium transition-all ${
                    lang === l.code ? 'bg-primary-foreground text-water-deep' : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="font-body text-primary-foreground/50 text-sm">
            © 2026 ANIVEX. {t('footer_rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
