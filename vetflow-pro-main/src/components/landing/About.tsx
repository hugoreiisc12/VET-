import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Award } from "lucide-react";
import panda from "../../../lucas_reis/panda.jpeg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -80,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 80,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const credentials = [
    {
      icon: GraduationCap,
      title: "Formação",
      description: "Medicina Veterinária - UNIFESO",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="py-24 relative overflow-hidden has-aurora"
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
          backgroundImage: `url(${panda})`,
          filter: "contrast(1.15) saturate(1.3) brightness(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />
      <div
        className="aurora-overlay"
        style={{
          ["--aurora-x" as any]: aurora.x,
          ["--aurora-y" as any]: aurora.y,
        }}
      />

      <div className="container mx-auto px-4 relative z-30">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Badge lateral */}
          <div ref={imageRef} className="relative hidden lg:block" />

          {/* Content */}
          <div ref={contentRef}>
            <span className="inline-block text-gold neon-text-yellow font-semibold text-sm uppercase tracking-wider mb-4">
              Sobre o Dr. Lucas
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Paixão por{" "}
              <span className="text-primary neon-text-green">cuidar de animais</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Dr. Lucas Reis é especializado em atendimento veterinário domiciliar,
              levando cuidado profissional e carinhoso até a sua casa. Seu compromisso
              é proporcionar o melhor tratamento para seu pet no ambiente onde ele
              se sente mais confortável.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Acredito que cada pet é único e merece atenção individualizada.
              O atendimento domiciliar reduz o estresse do animal e permite
              um acompanhamento mais próximo e personalizado.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {credentials.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-black border border-white/10"
                >
                  <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-gold neon-text-yellow">{item.title}</p>
                    <p className="text-sm text-gold neon-text-yellow">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-black border border-white/10">
                <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-gold neon-text-yellow">1000+</p>
                  <p className="text-sm text-gold neon-text-yellow">Pets atendidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
