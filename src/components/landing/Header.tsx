import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Menu, X, PawPrint } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const prevScrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(navRef.current?.children || [], {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (!isMobile) return;
    if (isScrolled && !prevScrolledRef.current) {
      setIsMobileMenuOpen(true);
    }
    if (!isScrolled) {
      setIsMobileMenuOpen(false);
    }
    prevScrolledRef.current = isScrolled;
  }, [isScrolled]);

  const navLinks = [
    { href: "#inicio", label: "Início" },
    { href: "#servicos", label: "Serviços" },
    { href: "#sobre", label: "Sobre" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md py-3 border-b border-white/10"
          : "bg-black/40 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4 lg:mb-0">
          <div ref={logoRef} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <PawPrint className="w-5 h-5 text-gold" />
            </div>
            <span className="font-display text-xl font-semibold text-gold neon-text-yellow whitespace-nowrap">
              Vet<span className="text-white">+</span>
            </span>
          </div>

          {/* Desktop & Tablet Button */}
          <div className="hidden sm:block">
            <Button variant="accent" size="default" asChild>
              <a href="https://wa.me/5521993453923" target="_blank" rel="noopener noreferrer">
                Agendar Consulta
              </a>
            </Button>
          </div>
        </div>

        {/* Navigation - Horizontal Scrollable on Mobile, Flex on Desktop */}
        <nav className="w-full">
          <ul 
            ref={navRef} 
            className="flex items-center gap-6 lg:gap-8 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide mask-fade-right lg:mask-none justify-start lg:justify-end"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  className="text-gold neon-text-yellow hover:text-white transition-colors duration-300 font-medium text-sm lg:text-base uppercase tracking-wider"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
