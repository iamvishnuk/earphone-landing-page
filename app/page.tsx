import Hero from '@/components/hero';
import ProductSection from '@/components/products-section';
import SoundCustomizer from '@/components/sound-customizer';
import FeaturesBento from '@/components/features-bento';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className='w-full'>
      <Hero />
      <ProductSection />
      <SoundCustomizer />
      <FeaturesBento />
      <Footer />
    </div>
  );
}

