import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PawPrint } from "lucide-react";
import tigreIntro from "../../../lucas_reis/tigre_intro.jpeg";
import efeitoFundo from "../../../lucas_reis/efeito_fundo.jpeg";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const clawSlashRef = useRef<SVGSVGElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

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

    console.log("🎬 Iniciando animação rápida!");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          console.log("✅ Animação completa - Indo para dashboard");
          setIsAnimating(false);
          onComplete();
        },
      });

      // Estados iniciais
      gsap.set(imageRef.current, { opacity: 0, scale: 1.1 });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(flashRef.current, { opacity: 0 });
      gsap.set(clawSlashRef.current, { opacity: 0 });

      // SEQUÊNCIA RÁPIDA E AGRESSIVA
      tl
        // 1. Tigre aparece rapidamente (0.6s)
        .to(imageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        // 2. Logo aparece junto (0.4s)
        .to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        )
        // 3. Pausa brevíssima para tensão (0.5s)
        .to({}, { duration: 2.0 })
        // 4. GARRA RASGA A TELA! (0.3s)
        .to(
          clawSlashRef.current,
          {
            opacity: 1,
            duration: 0.05,
            ease: "none",
          },
          "slash"
        )
        // 5. FLASH BRANCO VIOLENTO (0.15s)
        .to(
          flashRef.current,
          {
            opacity: 1,
            duration: 0.1,
            ease: "power4.in",
          },
          "slash+=0.05"
        )
        // 6. Distorção da imagem no momento do corte
        .to(
          imageRef.current,
          {
            scaleX: 0.95,
            scaleY: 1.05,
            rotation: 2,
            duration: 0.15,
            ease: "power4.in",
          },
          "slash"
        )
        // 7. Flash some e tudo vai embora (0.2s)
        .to(
          [flashRef.current, containerRef.current],
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          "slash+=0.15"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, imageLoaded]);

  if (!isAnimating) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Imagem do tigre */}
      <div
        ref={imageRef}
        className="absolute inset-0 opacity-0"
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
        {/* Gradiente escuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
      </div>

      {/* Logo */}
      <div
        ref={logoRef}
        className="relative z-10 flex flex-col items-center gap-4 opacity-0"
      >
        <div className="w-20 h-20 rounded-2xl bg-black/60 backdrop-blur-sm border border-amber-500/40 flex items-center justify-center shadow-2xl">
          <PawPrint className="w-12 h-12 text-amber-500" />
        </div>
        <div className="text-center">
          <h1 className="font-display text-6xl font-bold text-amber-500 tracking-tight drop-shadow-2xl">
            Vet<span className="text-amber-400">+</span>
          </h1>
        </div>
      </div>

      {/* GARRA RASGANDO - SVG com 3 riscos diagonais agressivos */}
      <svg
        ref={clawSlashRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ zIndex: 30 }}
      >
        <defs>
          {/* Filtro de motion blur para efeito de velocidade */}
          <filter id="motionBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8,0" />
          </filter>
          
          {/* Gradiente da garra (escuro para transparente) */}
          <linearGradient id="clawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="30%" stopColor="#1a1a1a" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#2a2a2a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>

          {/* Gradiente do brilho laranja/vermelho */}
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4400" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff6600" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff4400" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g filter="url(#motionBlur)">
          {/* Risco 1 - Diagonal superior */}
          <path
            d="M -100 100 L 2000 400 L 2000 440 L -100 140 Z"
            fill="url(#clawGrad)"
            opacity="0.95"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-2200 0"
              to="0 0"
              dur="0.6s"
              begin="0s"
              fill="freeze"
            />
          </path>
          
          {/* Brilho do risco 1 */}
          <path
            d="M -100 115 L 2000 415 L 2000 425 L -100 125 Z"
            fill="url(#glowGrad)"
            opacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-2200 0"
              to="0 0"
              dur="0.3s"
              begin="0s"
              fill="freeze"
            />
          </path>

          {/* Risco 2 - Diagonal meio (mais largo e intenso) */}
          <path
            d="M -100 400 L 2000 700 L 2000 770 L -100 470 Z"
            fill="url(#clawGrad)"
            opacity="1"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-2200 0"
              to="0 0"
              dur="0.65s"
              begin="0.02s"
              fill="freeze"
            />
          </path>
          
          {/* Brilho do risco 2 */}
          <path
            d="M -100 425 L 2000 725 L 2000 745 L -100 445 Z"
            fill="url(#glowGrad)"
            opacity="0.9"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-2200 0"
              to="0 0"
              dur="0.28s"
              begin="0.02s"
              fill="freeze"
            />
          </path>

          {/* Risco 3 - Diagonal inferior */}
          <path
            d="M -100 700 L 2000 1000 L 2000 1040 L -100 740 Z"
            fill="url(#clawGrad)"
            opacity="0.9"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-2200 0"
              to="0 0"
              dur="0.7s"
              begin="0.01s"
              fill="freeze"
            />
          </path>
          
          {/* Brilho do risco 3 */}
          <path
            d="M -100 715 L 2000 1015 L 2000 1025 L -100 725 Z"
            fill="url(#glowGrad)"
            opacity="0.7"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-2200 0"
              to="0 0"
              dur="0.32s"
              begin="0.01s"
              fill="freeze"
            />
          </path>
        </g>

        {/* Linhas de impacto extras */}
        <line x1="-100" y1="120" x2="2000" y2="420" stroke="#ff6600" strokeWidth="3" opacity="0.6">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-2200 0"
            to="0 0"
            dur="0.25s"
            begin="0s"
            fill="freeze"
          />
          <animate attributeName="opacity" from="1" to="0" dur="0.3s" begin="0.1s" fill="freeze" />
        </line>
        <line x1="-100" y1="435" x2="2000" y2="735" stroke="#ff4400" strokeWidth="4" opacity="0.7">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-2200 0"
            to="0 0"
            dur="0.25s"
            begin="0.02s"
            fill="freeze"
          />
          <animate attributeName="opacity" from="1" to="0" dur="0.3s" begin="0.12s" fill="freeze" />
        </line>
      </svg>

      {/* FLASH BRANCO VIOLENTO */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white opacity-0 pointer-events-none"
        style={{ zIndex: 40 }}
      />
    </div>
  );
};

export default SplashScreen;