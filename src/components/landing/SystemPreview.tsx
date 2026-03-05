import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  NotificationIcon,
  SuccessIcon,
  CopiedIcon,
  EyeToggleIcon,
  VolumeIcon
} from "../ui/animated-state-icons";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
} from "lucide-react";
import floresta2 from "../../../lucas_reis/floresta_2.jpeg";

gsap.registerPlugin(ScrollTrigger);

const SystemPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"black" | "white">("black");
  const [aurora, setAurora] = useState<{ x: string; y: string }>({ x: "50%", y: "50%" });

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // ... (existing content animations)
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(mockupRef.current, {
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
      });

      // Organic reactions - Optimized for mobile
      const section = sectionRef.current;
      if (section && mockupRef.current) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            // Disable heavy updates on mobile to prevent stuttering
            if (isMobile) return;

            const v = self.getVelocity(); // scroll velocity
            gsap.to(mockupRef.current, {
              skewX: Math.max(Math.min(v * 0.005, 8), -8),
              rotate: Math.max(Math.min(v * 0.0015, 3), -3),
              y: Math.max(Math.min(v * 0.02, 18), -18),
              duration: 0.3,
              overwrite: "auto",
            });
            
            // animate filter intensity with speed for organic distortion
            const displace = document.getElementById("dashDisplace");
            const noise = document.getElementById("dashNoise");
            if (displace && noise) {
              const intensity = Math.min(Math.abs(v) * 0.06, 30);
              gsap.to(displace, { attr: { scale: intensity }, duration: 0.3 });
              gsap.to(noise, { attr: { baseFrequency: 0.008 + Math.min(Math.abs(v) * 0.00008, 0.015) }, duration: 0.3 });
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: SuccessIcon,
      title: "Prontuário Digital",
      description: "Histórico completo do paciente sempre acessível",
    },
    {
      icon: EyeToggleIcon,
      title: "Agenda Inteligente",
      description: "Agendamento online com confirmação automática",
    },
    {
      icon: CopiedIcon,
      title: "Receitas Digitais",
      description: "Prescrições eletrônicas seguras e práticas",
    },
    {
      icon: NotificationIcon,
      title: "Lembretes Automáticos",
      description: "Vacinas, retornos e medicações no prazo",
    },
    {
      icon: VolumeIcon,
      title: "Relatórios Completos",
      description: "Acompanhe a evolução da saúde do pet",
    },
    {
      icon: Smartphone,
      title: "Acesso pelo Celular",
      description: "Tudo na palma da mão, a qualquer hora",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="sistema"
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
          backgroundImage: `url(${floresta2})`,
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
      {/* Invisible SVG filter for organic distortion on dashboard */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="dashDistort">
          <feTurbulence id="dashNoise" type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="2" />
          <feDisplacementMap id="dashDisplace" in="SourceGraphic" in2="dashNoise" scale="0" />
        </filter>
      </svg>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary-foreground rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-primary-foreground rounded-full" />
      </div>

      

      <div className="container mx-auto px-4 relative z-30">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold neon-text-yellow font-semibold text-sm uppercase tracking-wider mb-4 text-outline-white">
            Sistema de Gestão
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gold neon-text-yellow text-outline-white mb-3">
            Tecnologia a serviço do <span className="text-gold neon-text-yellow">cuidado animal</span>
          </h2>
          <p className="text-gold neon-text-yellow text-outline-white text-lg">
            Plataforma completa para gestão clínica, desenvolvida para otimizar
            atendimentos e proporcionar a melhor experiência para tutores e
            profissionais.
          </p>
        </div>

        {/* System mockup */}
        <div ref={mockupRef} className="relative w-full max-w-5xl mx-auto mb-16 px-2 sm:px-0" style={{ filter: "url(#dashDistort)" }}>
          <div
            className={`rounded-3xl shadow-elevated overflow-hidden border ${
              theme === "black" ? "bg-black text-gold border-white/10" : "bg-white text-foreground border-border"
            }`}
          >
            {/* Browser header + Theme toggle */}
            <div
              className={`px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-2 border-b ${
                theme === "black" ? "bg-black/80 border-white/10" : "bg-muted border-border"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-coral" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="flex-1 w-full sm:ml-4">
                <div
                  className={`rounded-lg px-4 py-2 w-full max-w-md ${
                    theme === "black" ? "bg-black/50" : "bg-background"
                  }`}
                >
                  <span className={`text-xs sm:text-sm truncate block ${theme === "black" ? "text-gold/80" : "text-muted-foreground"}`}>
                    vetcare.app/dashboard
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] sm:text-xs ${theme === "black" ? "text-gold/80" : "text-muted-foreground"}`}>Tema</span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    className={`h-7 px-2 text-[10px] sm:h-8 sm:px-3 sm:text-xs rounded-md ${
                      theme === "black"
                        ? "bg-black text-gold border border-white/10"
                        : "bg-white text-foreground border border-border"
                    }`}
                    onClick={() => setTheme("black")}
                  >
                    Black
                  </Button>
                  <Button
                    size="sm"
                    className={`h-7 px-2 text-[10px] sm:h-8 sm:px-3 sm:text-xs rounded-md ${
                      theme === "white"
                        ? "bg-white text-foreground border border-border"
                        : "bg-black text-gold border border-white/10"
                    }`}
                    onClick={() => setTheme("white")}
                  >
                    White
                  </Button>
                </div>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className={`p-4 sm:p-8 min-h-[300px] sm:min-h-[400px] ${theme === "black" ? "bg-black" : "bg-white"}`}>
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="hidden lg:block lg:col-span-3 space-y-4">
                  <div className={`h-12 ${theme === "black" ? "bg-black/60 border border-white/10" : "bg-primary/10"} rounded-xl animate-pulse`} />
                  <div className={`h-10 ${theme === "black" ? "bg-black/60 border border-white/10" : "bg-muted"} rounded-lg`} />
                  <div className={`h-10 ${theme === "black" ? "bg-black/60 border border-white/10" : "bg-sage-light"} rounded-lg`} />
                  <div className={`h-10 ${theme === "black" ? "bg-black/60 border border-white/10" : "bg-muted"} rounded-lg`} />
                  <div className={`h-10 ${theme === "black" ? "bg-black/60 border border-white/10" : "bg-muted"} rounded-lg`} />
                </div>

                {/* Main content */}
                <div className="flex-1 lg:col-span-9 space-y-6">
                  {/* Stats cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className={`rounded-xl p-4 ${theme === "black" ? "bg-black border border-white/10" : "bg-sage-light"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <EyeToggleIcon size={16} color={theme === "black" ? "#EAB308" : "currentColor"} />
                        <p className={`text-sm font-medium ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-primary neon-text-green"}`}>
                          Consultas Hoje
                        </p>
                      </div>
                      <p className={`font-display text-2xl font-bold ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-foreground"}`}>
                        8
                      </p>
                    </div>
                    <div className={`rounded-xl p-4 ${theme === "black" ? "bg-black border border-white/10" : "bg-coral-light"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <SuccessIcon size={16} color={theme === "black" ? "#EAB308" : "currentColor"} />
                        <p className={`text-sm font-medium ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-coral-dark"}`}>
                          Pendentes
                        </p>
                      </div>
                      <p className={`font-display text-2xl font-bold ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-foreground"}`}>
                        3
                      </p>
                    </div>
                    <div className={`rounded-xl p-4 ${theme === "black" ? "bg-black border border-white/10" : "bg-secondary"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <VolumeIcon size={16} color={theme === "black" ? "#EAB308" : "currentColor"} />
                        <p className={`text-sm font-medium ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-muted-foreground"}`}>
                          Esta Semana
                        </p>
                      </div>
                      <p className={`font-display text-2xl font-bold ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-foreground"}`}>
                        42
                      </p>
                    </div>
                  </div>

                  {/* Table preview */}
                  <div className={`rounded-xl overflow-hidden border ${theme === "black" ? "bg-black border-white/10" : "bg-card border-border"}`}>
                    <div className={`px-4 sm:px-6 py-4 border-b ${theme === "black" ? "border-white/10" : "border-border"}`}>
                      <p className={`font-semibold ${theme === "black" ? "text-gold text-outline-white" : "text-foreground"}`}>
                        Próximas Consultas
                      </p>
                    </div>
                    <div className={`divide-y ${theme === "black" ? "divide-white/10" : "divide-border"}`}>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
                        >
                          <div className={`w-10 h-10 rounded-full shrink-0 ${theme === "black" ? "bg-black/60 border border-white/10" : "bg-muted"}`} />
                          <div className="flex-1 min-w-0">
                            <div className={`h-4 rounded w-full sm:w-32 mb-2 ${theme === "black" ? "bg-black/60 border border-white/10" : "bg-muted"}`} />
                            <div className={`h-3 rounded w-2/3 sm:w-24 ${theme === "black" ? "bg-black/40 border border-white/10" : "bg-muted/50"}`} />
                          </div>
                          <div className={`h-8 rounded-lg w-full sm:w-20 shrink-0 ${theme === "black" ? "bg-black/60 border border-white/10" : "bg-sage-light"}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Como funciona */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className={`p-4 rounded-xl border ${theme === "black" ? "bg-black border-white/10" : "bg-white border-border"}`}>
                      <p className={`font-semibold mb-2 ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-foreground"}`}>Fluxo de Agendamento</p>
                      <p className={`text-sm sm:text-base ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-muted-foreground"}`}>
                        O tutor escolhe dia e horário online. A confirmação é automática e
                        lembretes são enviados por e-mail/WhatsApp.
                      </p>
                    </div>
                    <div className={`p-4 rounded-xl border ${theme === "black" ? "bg-black border-white/10" : "bg-white border-border"}`}>
                      <p className={`font-semibold mb-2 ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-foreground"}`}>Prontuário e Receitas</p>
                      <p className={`text-sm sm:text-base ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-muted-foreground"}`}>
                        Histórico clínico centralizado, com receitas digitais e anexos de exames
                        disponíveis para o tutor e equipe.
                      </p>
                    </div>
                    <div className={`p-4 rounded-xl border ${theme === "black" ? "bg-black border-white/10" : "bg-white border-border"}`}>
                      <p className={`font-semibold mb-2 ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-foreground"}`}>Relatórios</p>
                      <p className={`text-sm sm:text-base ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-muted-foreground"}`}>
                        Indicadores de saúde e produtividade com gráficos e exportação para PDF/Excel.
                      </p>
                    </div>
                    <div className={`p-4 rounded-xl border ${theme === "black" ? "bg-black border-white/10" : "bg-white border-border"}`}>
                      <p className={`font-semibold mb-2 ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-foreground"}`}>Acesso Mobile</p>
                      <p className={`text-sm sm:text-base ${theme === "black" ? "text-gold neon-text-yellow text-outline-white" : "text-muted-foreground"}`}>
                        Interface responsiva e app para tutores acompanharem consultas e documentos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-black border border-white/10 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-gold neon-text-yellow text-outline-white">
                      {feature.title}
                    </p>
                    <p className="text-sm text-gold neon-text-yellow text-outline-white">
                      {feature.description}
                    </p>
                  </div>
                </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemPreview;
