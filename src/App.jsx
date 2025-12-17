import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Stats from "./components/Stats";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import CursorGlow from "./components/CursorGlow";
import FloatingContact from "./components/FloatingContact";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative">
      <CursorGlow />
      <FloatingContact />
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Stats />
        <WhyUs />
        <Testimonials />
        <Blog />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
