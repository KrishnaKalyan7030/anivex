import { useLanguage } from '@/lib/LanguageContext';
import { Droplets, Target, ShieldCheck, Truck } from 'lucide-react';
import { useScrollAnimate } from '@/hooks/useScrollAnimate';

const AboutSection = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimate();

  const items = [
    { icon: Droplets, title: t('about_who'), text: t('about_who_text') },
    { icon: Target, title: t('about_mission'), text: t('about_mission_text') },
    { icon: ShieldCheck, title: t('about_safe'), text: t('about_safe_text') },
    { icon: Truck, title: t('about_rural'), text: t('about_rural_text') },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
            {t('about_title')}
          </h2>
          <div className="w-20 h-1 gradient-water rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="scroll-animate gradient-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 border border-border"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-water flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">{item.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
