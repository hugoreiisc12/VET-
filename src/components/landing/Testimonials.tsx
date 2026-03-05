import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import aguia from "../../../lucas_reis/aguia.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [aurora, setAurora] = useState<{ x: string; y: string }>({ x: "50%", y: "50%" });

  const testimonials = [
    {
      name: "Ana Carolina",
      pet: "Max (Golden Retriever)",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "O Dr. Lucas é excepcional! O Max passou por uma cirurgia delicada e recebemos todo o suporte necessário. O atendimento domiciliar fez toda a diferença para a recuperação dele.",
    },
    {
      name: "Pedro Henrique",
      pet: "Luna (Gata Persa)",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Finalmente encontrei um veterinário que realmente se importa. A Luna tem problemas cardíacos e o acompanhamento domiciliar é impecável. Recebo lembretes de medicação e retorno.",
    },
    {
      name: "Mariana Costa",
      pet: "Thor e Loki (Labradores)",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Ter dois cachorros grandes exige muito cuidado. O Dr. Lucas vem até nossa casa e os meninos ficam muito mais tranquilos. Atendimento humano e profissional!",
    },
    {
      name: "Roberto Silva",
      pet: "Bella (Bulldog Francês)",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "A Bella nasceu com problemas respiratórios e o Dr. Lucas acompanha desde filhote. Profissional dedicado que trata nossos pets com muito carinho.",
    },
  ];

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelector(".testimonial-header"), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        filter: "blur(8px)",
        duration: 0.8,
        ease: "power3.out",
      });

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

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      id="depoimentos"
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
          backgroundImage: `url(${aguia})`,
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

      <div className="container mx-auto px-4 relative z-30">
        <div className="testimonial-header text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-gold neon-text-yellow font-semibold text-sm uppercase tracking-wider mb-4 text-outline-white">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gold neon-text-yellow mb-6 text-outline-white">
            O que dizem nossos <span className="text-primary neon-text-green">tutores</span>
          </h2>
          <p className="text-white text-outline-white text-lg">
            A satisfação dos tutores e a saúde dos pets são nossa maior
            recompensa.
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black rounded-3xl p-8 sm:p-12 shadow-elevated border border-white/10">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-gold/30" />

            <div className="relative z-10">
              <div className="flex items-center gap-1 justify-center mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold text-gold"
                  />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-gold neon-text-yellow text-center leading-relaxed mb-8">
                "{testimonials[activeIndex].text}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div className="text-left">
                  <p className="font-semibold text-gold neon-text-yellow">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-sm text-gold neon-text-yellow">
                    Tutor(a) de {testimonials[activeIndex].pet}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-primary w-8"
                        : "bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
