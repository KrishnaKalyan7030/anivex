import { useLanguage } from '@/lib/LanguageContext';
import { useScrollAnimate } from '@/hooks/useScrollAnimate';
import { Phone, MapPin, Mail } from 'lucide-react';

const ContactSection = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimate();

  const contacts = [
    { icon: Phone, label: t('contact_phone'), value: '+91 98765 43210' },
    { icon: Mail, label: t('contact_email'), value: 'info@anivex.com' },
    { icon: MapPin, label: t('contact_address'), value: t('contact_address_text') },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-3">{t('contact_title')}</h2>
          <p className="font-body text-muted-foreground text-lg">{t('contact_subtitle')}</p>
          <div className="w-20 h-1 gradient-water rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contacts.map((c, i) => (
            <div key={i} className="scroll-animate text-center bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-card-hover transition-all duration-300">
              <div className="w-16 h-16 rounded-full gradient-water flex items-center justify-center mx-auto mb-4">
                <c.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{c.label}</h3>
              <p className="font-body text-muted-foreground">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="scroll-animate rounded-2xl overflow-hidden shadow-card border border-border">
          <div className="w-full h-64 md:h-80 bg-secondary flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="font-display font-semibold text-foreground">{t('contact_map')}</p>
              <p className="text-sm text-muted-foreground mt-1">Google Maps Integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
