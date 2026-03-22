import { useLanguage } from '@/lib/LanguageContext';
import { useScrollAnimate } from '@/hooks/useScrollAnimate';
import bottle20l from '@/assets/bottle-20l.png';
import bottle10l from '@/assets/bottle-10l.png';
import bottle5l from '@/assets/bottle-5l.png';
import bottle2l from '@/assets/bottle-2l.png';
import bottle1l from '@/assets/bottle-1l.png';

const ProductsSection = () => {
  const { t } = useLanguage();
  const ref = useScrollAnimate();

  const products = [
    { img: bottle20l, name: t('product_20l_name'), desc: t('product_20l_desc'), price: t('product_20l_price') },
    { img: bottle10l, name: t('product_10l_name'), desc: t('product_10l_desc'), price: t('product_10l_price') },
    { img: bottle5l, name: t('product_5l_name'), desc: t('product_5l_desc'), price: t('product_5l_price') },
    { img: bottle2l, name: t('product_2l_name'), desc: t('product_2l_desc'), price: t('product_2l_price') },
    { img: bottle1l, name: t('product_1l_name'), desc: t('product_1l_desc'), price: t('product_1l_price') },
  ];

  return (
    <section id="products" className="py-20 md:py-28 bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-3">{t('products_title')}</h2>
          <p className="font-body text-muted-foreground text-lg">{t('products_subtitle')}</p>
          <div className="w-20 h-1 gradient-water rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className="scroll-animate group bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 border border-border text-center"
            >
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-secondary/50 flex items-center justify-center">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">{p.name}</h3>
              <p className="font-body text-sm text-muted-foreground mb-3 line-clamp-2">{p.desc}</p>
              <span className="inline-block px-4 py-1.5 rounded-full gradient-water text-primary-foreground font-display font-bold text-lg">
                {p.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
