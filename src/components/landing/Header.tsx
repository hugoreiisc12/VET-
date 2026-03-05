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
        <nav className="hidden lg:block">
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
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gold hover:text-white transition-colors p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Sidebar (Slide from right) */}
      <div
        className={`fixed inset-y-0 right-0 z-[60] w-[85%] max-w-[400px] bg-black/95 backdrop-blur-xl border-l border-white/10 flex flex-col transition-all duration-500 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <PawPrint className="w-4 h-4 text-gold" />
            </div>
            <span className="font-display text-lg font-semibold text-gold neon-text-yellow">
              Vet<span className="text-white">+</span>
            </span>
          </div>
          <button
            className="text-gold p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-6">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xl font-display text-gold/90 hover:text-white hover:bg-white/5 transition-all duration-300 block py-4 px-4 rounded-xl border border-transparent hover:border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 border-t border-white/10">
          <Button variant="accent" size="xl" className="w-full text-lg h-14" asChild>
            <a href="https://wa.me/5521993453923" target="_blank" rel="noopener noreferrer">
              Agendar Consulta
            </a>
          </Button>
          <p className="text-center text-gold/40 text-xs mt-6">
            © 2024 Vet+ Atendimento Veterinário
          </p>
        </div>
      </div>

      {/* Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
