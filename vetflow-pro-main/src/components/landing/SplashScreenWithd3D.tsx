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
  const [showScrollSection, setShowScrollSection] = useState(false);

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
    if (!imageLoaded) return;

    console.log("🎬 Iniciando animação da intro!");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          console.log("✅ Intro completa - Ativando scroll 3D");
          setShowScrollSection(true);
        },
      });

      // Estados iniciais
      gsap.set(imageRef.current, { opacity: 0, scale: 1.05 });
      gsap.set(logoRef.current, { opacity: 0, y: 30 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });

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
        .to({}, { duration: 2.5 })
        
        // 4. Indicador de scroll aparece
        .to(scrollIndicatorRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        
    }, containerRef);

    return () => ctx.revert();
  }, [imageLoaded]);

  return (
    <div className="relative tap-transparent">
      {/* SEÇÃO 1: INTRO COM TIGRE */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden ios-dvh safe-top safe-bottom"
        style={{ 
          opacity: showScrollSection ? 0 : 1,
          pointerEvents: showScrollSection ? 'none' : 'auto',
          transition: 'opacity 0.5s ease-out'
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

        {/* Indicador de scroll */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        >
          <p className="text-amber-500/90 text-sm font-medium tracking-wide">
            Role para continuar
          </p>
          <ChevronDown className="w-6 h-6 text-amber-500 animate-bounce" />
        </div>
      </div>

      {/* SEÇÃO 2: SCROLL 3D COM DASHBOARD */}
      {showScrollSection && (
        <div className="relative z-[99] bg-black safe-bottom min-h-ios-dvh">
          <ContainerScroll
            titleComponent={
              <div className="flex flex-col items-center gap-4 mb-8">
                {/* Logo pequeno no topo durante scroll */}
                <div className="w-16 h-16 rounded-2xl bg-black/80 border border-amber-500/40 flex items-center justify-center shadow-xl">
                  <PawPrint className="w-9 h-9 text-amber-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-amber-500">
                  Bem-vindo ao <span className="text-amber-400">Vet+</span>
                </h1>
                <p className="text-amber-100/80 text-lg max-w-2xl">
                  Seu sistema completo de gestão veterinária domiciliar
                </p>
              </div>
            }
          >
            {/* Conteúdo do dashboard que será passado como prop */}
            {dashboardPreview}
          </ContainerScroll>

          {/* Botão para completar transição */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              Entrar no Sistema
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreenWith3D;
