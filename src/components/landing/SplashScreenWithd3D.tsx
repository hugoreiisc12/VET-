import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PawPrint, ChevronDown } from "lucide-react";
import ContainerScroll from "@/components/ui/container-scroll-animations";
import tigreIntro from "../../../lucas_reis/tigre_intro.jpeg";
import efeitoFundo from "../../../lucas_reis/efeito_fundo.jpeg";
import LoadingSpinner from "@/components/ui/snow-ball-loading-spinner";

interface SplashScreenProps {
  onComplete: () => void;
  dashboardPreview: React.ReactNode; // O conteúdo do dashboard
}

const SplashScreenWith3D = ({ onComplete, dashboardPreview }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Timeout de segurança
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!imageLoaded) {
        console.warn("⚠️ Timeout - Iniciando animação");
        setImageLoaded(true);
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [imageLoaded]);

  useEffect(() => {
    if (!imageLoaded || !isVisible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          console.log("✅ Intro completa - Chamando onComplete");
          setIsVisible(false); // Inicia o fade-out do componente
          setTimeout(onComplete, 500); // Sincroniza com a duração do fade-out
        },
      });

      // Estados iniciais
      gsap.set(imageRef.current, { opacity: 0, scale: 1.05 });
      gsap.set(logoRef.current, { opacity: 0, y: 30 });

      // SEQUÊNCIA DA ANIMAÇÃO
      tl
        // 1. Tigre aparece (1s)
        .to(imageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        })
        
        // 2. Logo VET+ aparece (0.8s)
        .to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }, "-=0.3")
        
        // 3. Loading circular (2.5s)
        .to({}, { duration: 2.5 });
        
    }, containerRef);

    return () => ctx.revert();
  }, [imageLoaded, onComplete, isVisible]);

  return (
    <div className="relative tap-transparent">
      {/* SEÇÃO 1: INTRO COM TIGRE */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden ios-dvh safe-top safe-bottom"
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {/* Imagem do tigre */}
        <div
          ref={imageRef}
          className="absolute inset-0 opacity-0 touch-smooth"
          style={{ willChange: "opacity, transform" }}
        >
          <img
            src={tigreIntro}
            alt="Tigre"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            onLoad={() => {
              console.log("✅ Imagem carregada!");
              setImageLoaded(true);
            }}
            onError={() => {
              console.error("❌ Erro na imagem, iniciando mesmo assim");
              setImageLoaded(true);
            }}
            style={{
              filter: "contrast(1.1) saturate(1.2) brightness(0.9)",
            }}
          />
          <img
            src={efeitoFundo}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-30"
            style={{ mixBlendMode: "soft-light" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        </div>

        {/* Logo */}
        <div
          ref={logoRef}
          className="relative z-10 flex flex-col items-center gap-6 opacity-0"
        >
          <div className="w-24 h-24 rounded-3xl bg-black/60 backdrop-blur-sm border border-amber-500/40 flex items-center justify-center shadow-2xl">
            <PawPrint className="w-14 h-14 text-amber-500" />
          </div>
          <div className="text-center">
            <h1 className="font-display text-6xl font-bold text-amber-500 tracking-tight drop-shadow-2xl">
              Vet<span className="text-amber-400">+</span>
            </h1>
            <p className="text-amber-100/80 text-lg mt-2 font-medium">
              Atendimento Veterinário Domiciliar
            </p>
          </div>
          
          {/* Símbolo de loading circular */}
          <div className="mt-6">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreenWith3D;
