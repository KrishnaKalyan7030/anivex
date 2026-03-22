import { useLanguage } from '@/lib/LanguageContext';
import { useScrollAnimate } from '@/hooks/useScrollAnimate';
import { Droplets, ShieldCheck, IndianRupee, Heart, FlaskConical, Truck } from 'lucide-react';

const WhyChooseSection = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimate();

  const benefits = [
    { icon: Droplets, title: t('why_pure'), desc: t('why_pure_desc') },
    { icon: ShieldCheck, title: t('why_safe'), desc: t('why_safe_desc') },
    { icon: IndianRupee, title: t('why_affordable'), desc: t('why_affordable_desc') },
    { icon: Heart, title: t('why_trusted'), desc: t('why_trusted_desc') },
    { icon: FlaskConical, title: t('why_quality'), desc: t('why_quality_desc') },
    { icon: Truck, title: t('why_delivery'), desc: t('why_delivery_desc') },
  ];

  return (
    <section id="why" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-3">{t('why_title')}</h2>
          <div className="w-20 h-1 gradient-water rounded-full mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="scroll-animate group relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 border border-border overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 gradient-water opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-5 group-hover:gradient-water transition-all duration-300">
                <b.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">{b.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
