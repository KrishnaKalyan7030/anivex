import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [status, setStatus] = useState('Checking backend...');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)   // → http://localhost:8000/
      .then((r) => {
        if (!r.ok) throw new Error(`Backend responded with status ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setStatus(data.message || 'Connected – but no "message" field found');
      })
      .catch((err) => {
        console.error('Backend connection error:', err);
        setStatus('Cannot reach backend – check if it is running on port 8000');
      });
  }, []); // empty dependency array → runs only once on mount

  return (
    <div className="min-h-screen bg-background">
      
      {/* ── Temporary backend connection test ── */}
      {/* <div className="p-6 bg-gray-100 rounded-lg mb-8 max-w-2xl mx-auto border border-gray-300">
        <h2 className="text-xl font-semibold mb-2">Backend Connection Test</h2>
        <p className="text-lg">
          Status:{' '}
          <strong
            className={
              status.includes('Cannot') || status.includes('error')
                ? 'text-red-600'
                : 'text-green-600'
            }
          >
            {status}
          </strong>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          (Expected: "Hello from FastAPI! Your Lovable frontend is now connected 🎉")
        </p>
      </div> */}

      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <WhyChooseSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
