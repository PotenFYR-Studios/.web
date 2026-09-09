import { ParallaxProvider } from 'react-scroll-parallax';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import { HQTelemetry } from './components/HQTelemetry';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import { HQVisualTelemetry } from './components/HQVisualTelemetry';
import TechStack from './components/TechStack';
import Services from './components/Services';
import { HQTerminal } from './components/HQTerminal';
import { BugBounty } from './components/BugBounty';
import Community from './components/Community';
import SocialLinks from './components/SocialLinks';
import Footer from './components/Footer';

function App() {
  useSmoothScroll();

  return (
    <ParallaxProvider>
      <div className="bg-[#030712] text-white min-h-screen antialiased selection:bg-cyan-500/30 selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <HQTelemetry />
          <About />
          <Projects />
          <HQVisualTelemetry />
          <TechStack />
          <Services />
          <HQTerminal />
          <BugBounty />
          <Community />
          <SocialLinks />
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default App;
