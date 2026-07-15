import Hero from '@/components/Hero';
import CVShowcase from '@/components/CVShowcase';
import Features from '@/components/Features';
import SmartBuilder from '@/components/SmartBuilder';
import Stats from '@/components/Stats';
import Reviews from '@/components/Reviews';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />
      <CVShowcase />
      <Features />
      <SmartBuilder />
      <Reviews />
      <Stats />
    </div>
  );
}
