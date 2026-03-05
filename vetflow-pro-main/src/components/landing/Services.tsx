import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SuccessIcon,
  NotificationIcon,
  CopiedIcon,
  HeartIcon,
  VolumeIcon,
  ToggleIcon,
  EyeToggleIcon
} from "../ui/animated-state-icons";
import {
  Activity,
} from "lucide-react";
import jaguar from "../../../lucas_reis/jaguar.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
      // Reativando animações com fromTo (mais seguro)
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, 
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(Array.from(cardsRef.current.children), 
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
          }
        );
      }

      gsap.fromTo(
        smokeRef.current,
        { opacity: 0.24, y: 20 },
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

  const services = [
    {
      icon: SuccessIcon,
      title: "Consultas Clínicas",
      description:
        "Avaliação completa da saúde do seu pet no conforto do seu lar, com diagnóstico preciso e sem o estresse do transporte.",
    },
    {
      icon: ToggleIcon,
      title: "Vacinação em Dia",
      description:
        "Protocolo vacinal personalizado para cães e gatos, garantindo a proteção contra as principais doenças.",
    },
    {
      icon: VolumeIcon,
      title: "Coleta de Exames",
      description:
        "Realizamos a coleta de sangue, urina e outros exames laboratoriais diretamente na sua residência.",
    },
    {
      icon: CopiedIcon,
      title: "Check-up Preventivo",
      description:
        "Exames periódicos focados na prevenção e detecção precoce de doenças, aumentando a longevidade do seu pet.",
    },
    {
      icon: Activity,
      title: "Tratamento de Doenças",
      description:
        "Acompanhamento e prescrição de tratamentos para doenças crônicas ou agudas, com monitoramento constante.",
    },
    {
      icon: NotificationIcon,
      title: "Administração de Medicamentos",
      description:
        "Auxílio na aplicação de medicamentos injetáveis ou orais, garantindo a eficácia do tratamento prescrito.",
    },
    {
      icon: HeartIcon,
      title: "Pediatria Veterinária",
      description:
        "Cuidados especiais para os primeiros meses de vida, com orientações sobre manejo, nutrição e vermifugação.",
    },
    {
      icon: EyeToggleIcon,
      title: "Acompanhamento Geriátrico",
      description:
        "Atenção dedicada aos pets idosos, focando na qualidade de vida e controle de dores articulares ou doenças da idade.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="py-24 relative has-aurora bg-black border-y border-white/20"
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
          filter: "contrast(1.15) saturate(1.3) brightness(0.9)",
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

      <div className="container mx-auto px-4 relative z-30">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-gold neon-text-yellow font-semibold text-sm uppercase tracking-wider mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gold neon-text-yellow mb-6">
            Cuidado completo para o seu{" "}
            <span className="text-primary neon-text-green">melhor amigo</span>
          </h2>
          <p className="text-white text-outline-white text-lg">
            Oferecemos uma gama completa de serviços veterinários, sempre
            priorizando o bem-estar e a saúde do seu pet.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-black rounded-3xl shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/10"
            >
              <div className="w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <service.icon className="w-7 h-7 text-gold group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gold neon-text-yellow mb-3">
                {service.title}
              </h3>
              <p className="text-white text-outline-white leading-relaxed">
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
