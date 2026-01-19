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
    { href: "#sobre", label: "Sobre" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#servicos", label: "Serviços" },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md py-3 border-b border-white/10 opacity-100 translate-y-0"
          : "bg-transparent py-5 opacity-0 -translate-y-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div ref={logoRef} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <PawPrint className="w-5 h-5 text-gold" />
          </div>
          <span className="font-display text-xl font-semibold text-gold neon-text-yellow">
            Vet<span className="text-white">+</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="block">
          <ul ref={navRef} className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-gold neon-text-yellow hover:text-white transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button variant="accent" size="default">
                Agendar Consulta
              </Button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu (fade/slide) */}
      <nav className="hidden">
        <ul className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-gold neon-text-yellow hover:text-white transition-colors duration-300 font-medium block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Button variant="accent" size="default" className="w-full">
              Agendar Consulta
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
