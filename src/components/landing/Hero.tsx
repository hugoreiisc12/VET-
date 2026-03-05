import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { SuccessIcon, HeartIcon } from "../ui/animated-state-icons";
import { Calendar, Award } from "lucide-react";
import heroVet from "@/assets/hero-vet.jpg";
import floresta from "../../../lucas_reis/floresta.jpeg";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const [aurora, setAurora] = useState<{ x: string; y: string }>({ x: "50%", y: "50%" });

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([contentRef.current, imageRef.current], { visibility: "visible" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        contentRef.current?.querySelector("h1"),
        { opacity: 0, y: 60, filter: "blur(8px)" },
        { opacity: 1, y: 0, duration: 1, filter: "blur(0px)" }
      )
        .fromTo(
          contentRef.current?.querySelector("p"),
          { opacity: 0, y: 40, filter: "blur(6px)" },
          { opacity: 1, y: 0, duration: 0.8, filter: "blur(0px)" },
          "-=0.5"
        )
        .fromTo(
          contentRef.current?.querySelectorAll(".hero-buttons button"),
          { opacity: 0, y: 30, filter: "blur(4px)" },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, filter: "blur(0px)" },
          "-=0.4"
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9, x: 60 },
          { opacity: 1, scale: 1, x: 0, duration: 1 },
          "-=1"
        )
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
          "-=0.5"
        );

      gsap.fromTo(
        smokeRef.current,
        { opacity: 0.28, y: 20 },
        {
          opacity: 0.08,
          y: -10,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: SuccessIcon, value: "100%", label: "Satisfação" },
    { icon: HeartIcon, value: "Domiciliar", label: "Atendimento" },
  ];

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden has-aurora"
      onMouseMove={(e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setAurora({ x: `${x}px`, y: `${y}px` });
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${floresta})`,
          filter: "contrast(1.15) saturate(1.3) brightness(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="aurora-overlay"
        style={{
          ["--aurora-x" as any]: aurora.x,
          ["--aurora-y" as any]: aurora.y,
        }}
      />
      <div ref={smokeRef} className="smoke-overlay" />

      <div className="container mx-auto px-4 py-12 relative z-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="text-center lg:text-left">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gold neon-text-yellow leading-tight mb-6">
              Cuidado{" "}
              <span className="text-primary neon-text-green text-outline-white">veterinário</span> com{" "}
              <span className="relative">
                amor
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="hsl(var(--coral))"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              e dedicação
            </h1>

            <p className="text-lg sm:text-xl text-white text-outline-white max-w-xl mx-auto lg:mx-0 mb-8">
              Dr. Lucas Reis oferece atendimento veterinário domiciliar
              personalizado e humanizado para o seu pet. Cuidado profissional
              no conforto da sua casa.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="xl"
                className="bg-black text-gold neon-text-yellow border border-white/10 hover:bg-black/90 shadow-soft hover:shadow-medium hover:-translate-y-0.5"
                asChild
              >
                <a href="#contato">
                  <Calendar className="w-5 h-5" />
                  Agendar Consulta
                </a>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="bg-primary text-white border-primary hover:bg-primary/90 hover:text-white shadow-soft animate-jump"
                asChild
              >
                <a href="#servicos">Conhecer Serviços</a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={heroVet}
                alt="Dr. Lucas Reis - Veterinário Domiciliar"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 gap-4 mt-16 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-black shadow-soft hover:shadow-medium transition-shadow duration-300 border border-white/10"
            >
              <div className="flex justify-center mb-3">
                <stat.icon size={32} color="#EAB308" />
              </div>
              <p className="font-display text-3xl font-bold text-gold neon-text-yellow text-outline-white">
                {stat.value}
              </p>
              <p className="text-sm text-gold neon-text-yellow text-outline-white">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
