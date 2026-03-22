import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useScrollAnimate } from '@/hooks/useScrollAnimate';
import { X } from 'lucide-react';
import galleryPlant from '@/assets/gallery-plant.jpg';
import galleryDelivery from '@/assets/gallery-delivery.jpg';
import bottle20l from '@/assets/bottle-20l.png';
import bottle5l from '@/assets/bottle-5l.png';

const GallerySection = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimate();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images = [
    { src: galleryPlant, label: t('gallery_plant') },
    { src: galleryDelivery, label: t('gallery_delivery') },
    { src: bottle20l, label: t('gallery_bottles') },
    { src: bottle5l, label: t('gallery_quality') },
  ];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-3">{t('gallery_title')}</h2>
          <p className="font-body text-muted-foreground text-lg">{t('gallery_subtitle')}</p>
          <div className="w-20 h-1 gradient-water rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="scroll-animate group relative aspect-square rounded-2xl overflow-hidden shadow-card cursor-pointer"
              onClick={() => setLightbox(img.src)}
            >
              <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-water-deep/0 group-hover:bg-water-deep/60 transition-all duration-300 flex items-end p-4">
                <span className="font-display font-semibold text-primary-foreground opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-primary-foreground" onClick={() => setLightbox(null)}>
            <X className="w-8 h-8" />
          </button>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
