import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Stethoscope,
  Syringe,
  Scissors,
  Heart,
  FlaskConical,
  Home,
} from "lucide-react";
import jaguar from "../../../lucas_reis/jaguar.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Stethoscope,
      title: "Consultas Clínicas",
      description:
        "Avaliação completa da saúde do seu pet com diagnóstico preciso e tratamento personalizado.",
    },
    {
      icon: Syringe,
      title: "Vacinação",
      description:
        "Protocolo vacinal completo seguindo as melhores práticas e orientações veterinárias.",
    },
    {
      icon: Scissors,
      title: "Cirurgias",
      description:
        "Procedimentos cirúrgicos com equipe especializada e ambiente totalmente equipado.",
    },
    {
      icon: Heart,
      title: "Cardiologia",
      description:
        "Exames cardíacos especializados para diagnóstico e acompanhamento de doenças do coração.",
    },
    {
      icon: FlaskConical,
      title: "Exames Laboratoriais",
      description:
        "Análises clínicas completas com resultados rápidos para diagnóstico preciso.",
    },
    {
      icon: Home,
      title: "Atendimento Domiciliar",
      description:
        "Cuidado veterinário no conforto da sua casa para pets que precisam de atenção especial.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="servicos"
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
          backgroundImage: `url(${jaguar})`,
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
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-gold neon-text-yellow font-semibold text-sm uppercase tracking-wider mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Cuidado completo para o seu{" "}
            <span className="text-primary neon-text-green">melhor amigo</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Oferecemos uma gama completa de serviços veterinários, sempre
            priorizando o bem-estar e a saúde do seu pet.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-sage-light flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
