import { useState } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Loader from './components/Loader';
import Navbar from './components/Navbar';

import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import VideoShowcase from './components/VideoShowcase';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div className={isLoading ? 'pointer-events-none opacity-0' : 'opacity-100'}>
        <Navbar />
        <main>
          <Hero />
          <About />

          <VideoShowcase />
          <Pricing />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
}
