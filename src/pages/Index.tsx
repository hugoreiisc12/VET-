import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import About from "@/components/landing/About";
import SystemPreview from "@/components/landing/SystemPreview";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import SplashScreenWith3D from "@/components/landing/SplashScreenWithd3D";
import { DashboardPreview } from "@/components/landing/DashboardPreview";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!showContent) return;

    // Smooth scroll setup
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
        if (href) {
          const target = document.querySelector(href);
          target?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [showContent]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowContent(true);
    // Scroll para o topo quando entrar no site principal
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showSplash && (
        <SplashScreenWith3D 
          onComplete={handleSplashComplete}
          dashboardPreview={<DashboardPreview />}
        />
      )}
      {showContent && (
        <main className="min-h-screen bg-background overflow-x-hidden animate-fade-in">
          <Header />
          <Hero />
          <Services />
          <About />
          <SystemPreview />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Index;
