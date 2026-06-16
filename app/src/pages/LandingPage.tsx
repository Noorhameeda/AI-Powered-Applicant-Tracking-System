import { useNavigate } from 'react-router-dom';
import FluidBackground from '@/components/FluidBackground';
import Navigation from '@/components/Navigation';
import HeroField from '@/sections/HeroField';
import PhilosophyCarousel from '@/sections/PhilosophyCarousel';
import ImmersiveGallery from '@/sections/ImmersiveGallery';
import MediumsGlossary from '@/sections/MediumsGlossary';
import Footer from '@/sections/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative' }}>
      <FluidBackground isActive={true} />
      <Navigation />

      <div id="hero-section" style={{ position: 'relative', zIndex: 1 }}>
        <HeroField />
      </div>

      <div id="philosophy" style={{ position: 'relative', zIndex: 2 }}>
        <PhilosophyCarousel />
      </div>

      <div id="gallery" style={{ position: 'relative', zIndex: 3 }}>
        <ImmersiveGallery onSelect={(id) => navigate(`/login?feature=${id}`)} />
      </div>

      <div style={{ position: 'relative', zIndex: 50 }}>
        <div id="mediums">
          <MediumsGlossary />
        </div>
        <div id="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
