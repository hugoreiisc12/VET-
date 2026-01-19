import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";
import pantera from "../../../lucas_reis/pantera.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [aurora, setAurora] = useState<{ x: string; y: string }>({ x: "50%", y: "50%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: "(21) 99345-3923",
      link: "tel:+5521993453923",
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "contato@vetmais.com.br",
      link: "mailto:contato@vetmais.com.br",
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: "Teresópolis - RJ",
      link: "#",
    },
    {
      icon: Clock,
      title: "Horário de Agendamento",
      value: "Seg a Sex: 8h às 19h",
      link: null,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contato"
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
          backgroundImage: `url(${pantera})`,
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
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-gold neon-text-yellow font-semibold text-sm uppercase tracking-wider mb-4">
            Contato
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Entre em{" "}
            <span className="text-primary neon-text-green">contato</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Estamos prontos para atender você e seu pet. Agende uma consulta ou
            tire suas dúvidas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <form
            ref={formRef}
            className="bg-black p-8 rounded-3xl shadow-soft border border-white/10"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="font-display text-2xl font-semibold text-gold neon-text-yellow mb-6">
              Agendar Consulta
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gold neon-text-yellow mb-2 block">
                  Seu Nome
                </label>
                <Input
                  placeholder="Digite seu nome"
                  className="bg-black/60 text-gold neon-text-yellow placeholder:text-gold/60 border-white/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gold neon-text-yellow mb-2 block">
                  Telefone
                </label>
                <Input
                  placeholder="(00) 00000-0000"
                  className="bg-black/60 text-gold neon-text-yellow placeholder:text-gold/60 border-white/10"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gold neon-text-yellow mb-2 block">
                  Nome do Pet
                </label>
                <Input
                  placeholder="Nome do seu pet"
                  className="bg-black/60 text-gold neon-text-yellow placeholder:text-gold/60 border-white/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gold neon-text-yellow mb-2 block">
                  Espécie
                </label>
                <Input
                  placeholder="Cão, Gato, etc."
                  className="bg-black/60 text-gold neon-text-yellow placeholder:text-gold/60 border-white/10"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gold neon-text-yellow mb-2 block">
                Motivo da Consulta
              </label>
              <Textarea
                placeholder="Descreva brevemente o motivo da consulta"
                className="bg-black/60 text-gold neon-text-yellow placeholder:text-gold/60 border-white/10 min-h-[120px]"
              />
            </div>

            <Button
              size="lg"
              className="w-full bg-black text-gold neon-text-yellow border border-white/10 hover:bg-black/90 shadow-soft hover:shadow-medium hover:-translate-y-0.5"
            >
              Solicitar Agendamento
            </Button>
          </form>

          {/* Info */}
          <div ref={infoRef} className="space-y-6">
            <div className="bg-black rounded-3xl p-8 border border-white/10">
              <h3 className="font-display text-2xl font-semibold text-primary neon-text-green mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-primary neon-text-green">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-primary neon-text-green underline hover:text-primary/90"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-primary/80 neon-text-green">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-medium text-primary neon-text-green mb-4">Redes Sociais</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center hover:bg-black/90 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-black border border-white/10 flex items-center justify-center hover:bg-black/90 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
