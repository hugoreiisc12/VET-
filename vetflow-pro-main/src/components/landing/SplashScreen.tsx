import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PawPrint } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<HTMLImageElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const clawSvgRef = useRef<SVGSVGElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Posições dos olhos do tigre (ajuste conforme necessário)
  const eyeLeftX = "45%";
  const eyeLeftY = "42%";
  const eyeRightX = "57%";
  const eyeRightY = "42%";

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsAnimating(false);
      onComplete();
      return;
    }

    if (!imageLoaded) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          onComplete();
        },
      });

      // Estados iniciais
      gsap.set([logoRef.current, imageRef.current], { opacity: 0 });
      gsap.set(effectRef.current, { opacity: 0 });
      gsap.set(eyesRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(overlayRef.current, { opacity: 0 });

      // Animação de entrada do tigre
      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          effectRef.current,
          {
            opacity: 0.35,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          eyesRef.current,
          {
            opacity: 1,
            scale: 1.2,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          logoRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to({}, { duration: 1.5 }); // Pausa para visualizar

      // ANIMAÇÃO DA GARRA RASGANDO
      const claws = Array.from(
        clawSvgRef.current?.querySelectorAll("#clawShapes path") || []
      );
      const displace = clawSvgRef.current?.querySelector("#clawDisplace");
      const turbulence = clawSvgRef.current?.querySelector("#clawNoise");
      const scratchLines = clawSvgRef.current?.querySelector("#scratchLines");

      if (claws.length && displace && turbulence) {
        // Estado inicial das garras (fora da tela, à esquerda)
        gsap.set(claws, {
          x: -200,
          scaleX: 0.1,
          transformOrigin: "left center",
        });
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(scratchLines, { opacity: 0 });

        const clawTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        clawTl
          // SOM de garra (visual cue) - Brilho intenso nos olhos
          .to(eyesRef.current, {
            scale: 1.5,
            filter: "brightness(2)",
            duration: 0.3,
            ease: "power2.in",
          })
          // Garras entram rasgando com velocidade
          .to(
            claws[0],
            {
              x: 100,
              scaleX: 3.5,
              skewX: -15,
              duration: 0.4,
              ease: "power3.in",
            },
            "+=0.1"
          )
          .to(
            claws[1],
            {
              x: 80,
              scaleX: 4,
              skewX: 18,
              duration: 0.45,
              ease: "power3.in",
            },
            "-=0.35"
          )
          .to(
            claws[2],
            {
              x: 60,
              scaleX: 3.2,
              skewX: -12,
              duration: 0.42,
              ease: "power3.in",
            },
            "-=0.4"
          )
          // Distorção intensa durante o rasgo
          .to(
            displace,
            {
              attr: { scale: 40 },
              duration: 0.3,
              ease: "power2.inOut",
            },
            "-=0.4"
          )
          .to(
            turbulence,
            {
              attr: { baseFrequency: 0.03 },
              duration: 0.3,
              ease: "power2.inOut",
            },
            "-=0.4"
          )
          // Linhas de arranhão aparecem
          .to(
            scratchLines,
            {
              opacity: 0.8,
              duration: 0.2,
            },
            "-=0.3"
          )
          // Garras se expandem ao máximo
          .to(
            claws,
            {
              scaleX: 5,
              x: (i) => 120 + i * 20,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.2"
          )
          // Distorção diminui gradualmente
          .to(
            displace,
            {
              attr: { scale: 8 },
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .to(
            turbulence,
            {
              attr: { baseFrequency: 0.008 },
              duration: 0.5,
            },
            "-=0.5"
          )
          // Overlay some revelando o dashboard
          .to(
            overlayRef.current,
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            },
            "-=0.3"
          )
          // Zoom dramático final
          .to(
            containerRef.current,
            {
              scale: 1.2,
              duration: 0.6,
              ease: "power2.in",
            },
            "-=0.4"
          );
      }

      // Efeito de respiração sutil no fundo
      gsap.to(effectRef.current, {
        scale: 1.05,
        rotate: 1,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, imageLoaded]);

  type EyeVars = React.CSSProperties & {
    "--eye-left-x": string;
    "--eye-left-y": string;
    "--eye-right-x": string;
    "--eye-right-y": string;
    "--eye-size": string;
  };

  const eyeGlowVars: EyeVars = {
    "--eye-left-x": eyeLeftX,
    "--eye-left-y": eyeLeftY,
    "--eye-right-x": eyeRightX,
    "--eye-right-y": eyeRightY,
    "--eye-size": "160px",
  };

  if (!isAnimating) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Filtros SVG */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="sharpFilter">
          <feConvolveMatrix
            order="3"
            kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"
            edgeMode="duplicate"
          />
        </filter>
      </svg>

      {/* Imagem de fundo do tigre */}
      <div
        ref={imageRef}
        className="absolute inset-0 opacity-0"
        style={{ transform: "scale(1.05)", willChange: "opacity, transform" }}
      >
        <img
          src="https://images.unsplash.com/photo-1551880698-e0c1b9a6d6e0?w=1920&h=1080&fit=crop"
          alt="Tigre"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          style={{
            filter: "url(#sharpFilter) contrast(1.05) saturate(1.04)",
            willChange: "opacity, transform",
          }}
        />
        {/* Brilho nos olhos */}
        <div ref={eyesRef} className="eye-glow" style={eyeGlowVars} />
        {/* Efeito de textura */}
        <img
          ref={effectRef}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ mixBlendMode: "soft-light", willChange: "opacity, transform" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
      </div>

      {/* Logo */}
      <div
        ref={logoRef}
        className="relative z-10 flex flex-col items-center gap-6 opacity-0"
        style={{ transform: "translateY(30px)", willChange: "opacity, transform" }}
      >
        <div className="w-24 h-24 rounded-3xl bg-black/80 border border-amber-500/30 flex items-center justify-center shadow-2xl">
          <PawPrint className="w-14 h-14 text-amber-500" />
        </div>

        <div className="text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-amber-500 tracking-tight">
            Vet<span className="text-amber-400">+</span>
          </h1>
          <p className="text-amber-100/80 text-lg mt-2 font-medium">
            Atendimento Veterinário Domiciliar
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Overlay de garra rasgando */}
      <div ref={overlayRef} className="absolute inset-0 z-20 opacity-0">
        <svg
          ref={clawSvgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Filtro de distorção */}
            <filter id="clawDistort" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence
                id="clawNoise"
                type="fractalNoise"
                baseFrequency="0.008"
                numOctaves="3"
                seed="7"
              />
              <feDisplacementMap
                id="clawDisplace"
                in="SourceGraphic"
                in2="clawNoise"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* Formas das garras - 3 riscos paralelos */}
            <g id="clawShapes">
              {/* Garra 1 - Superior */}
              <path
                d="M 0 200 Q 400 180 800 200 L 850 250 Q 420 270 50 250 Z"
                fill="black"
              />
              {/* Garra 2 - Meio */}
              <path
                d="M 0 400 Q 400 380 800 400 L 850 480 Q 420 500 50 480 Z"
                fill="black"
              />
              {/* Garra 3 - Inferior */}
              <path
                d="M 0 650 Q 400 630 800 650 L 850 730 Q 420 750 50 730 Z"
                fill="black"
              />
            </g>

            {/* Linhas de arranhão decorativas */}
            <g id="scratchLines">
              <line x1="0" y1="225" x2="1920" y2="225" stroke="#ff4400" strokeWidth="2" opacity="0.6" />
              <line x1="0" y1="440" x2="1920" y2="440" stroke="#ff4400" strokeWidth="3" opacity="0.7" />
              <line x1="0" y1="690" x2="1920" y2="690" stroke="#ff4400" strokeWidth="2" opacity="0.6" />
            </g>

            {/* Máscara: branco mantém overlay, preto recorta */}
            <mask id="tearMask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <use href="#clawShapes" fill="black" />
            </mask>

            {/* ClipPath para revelar textura de garra */}
            <clipPath id="clawClip">
              <use href="#clawShapes" />
            </clipPath>

            {/* Gradiente para efeito de profundidade */}
            <linearGradient id="clawGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,0,0,0.95)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0.85)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.95)" />
            </linearGradient>
          </defs>

          <g filter="url(#clawDistort)">
            {/* Overlay preto recortado pelas garras */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#clawGrad)"
              mask="url(#tearMask)"
            />

            {/* Bordas das garras com brilho */}
            <use
              href="#clawShapes"
              fill="none"
              stroke="#ff6600"
              strokeWidth="3"
              opacity="0.5"
              style={{ filter: "blur(2px)" }}
            />

            {/* Linhas de arranhão */}
            <use href="#scratchLines" />

            {/* Textura de garra (opcional - usando padrão) */}
            <pattern
              id="clawTexture"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect width="100" height="100" fill="#1a1a1a" />
              <path
                d="M 0 20 L 100 20 M 0 50 L 100 50 M 0 80 L 100 80"
                stroke="#2a2a2a"
                strokeWidth="2"
              />
            </pattern>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#clawTexture)"
              clipPath="url(#clawClip)"
              opacity="0.3"
            />
          </g>
        </svg>
      </div>

      <style>{`
        .eye-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .eye-glow::before,
        .eye-glow::after {
          content: '';
          position: absolute;
          width: var(--eye-size);
          height: var(--eye-size);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(0, 255, 100, 0.8) 0%,
            rgba(0, 255, 100, 0.4) 30%,
            transparent 70%
          );
          filter: blur(20px);
          animation: eye-pulse 2s ease-in-out infinite;
        }
        
        .eye-glow::before {
          left: var(--eye-left-x);
          top: var(--eye-left-y);
          transform: translate(-50%, -50%);
        }
        
        .eye-glow::after {
          left: var(--eye-right-x);
          top: var(--eye-right-y);
          transform: translate(-50%, -50%);
        }
        
        @keyframes eye-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;