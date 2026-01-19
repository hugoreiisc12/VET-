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
  const overlayRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<HTMLImageElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

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

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          onComplete();
        },
      });

      // Initial state
      gsap.set([logoRef.current, imageRef.current], { opacity: 0 });
      gsap.set(effectRef.current, { opacity: 0 });

      // Animation sequence
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
          logoRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to({}, { duration: 1.2 }) // Pause to let user see
        .to(
          containerRef.current,
          {
            scale: 1.1,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        .to(
          overlayRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.8"
        );

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
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 opacity-0"
        style={{ transform: "scale(1.05)" }}
      >
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id="sharpFilter">
            <feConvolveMatrix
              order="3"
              kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"
              edgeMode="duplicate"
            />
          </filter>
        </svg>
        <img
          src={tigreIntro}
          alt="Tigre"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          style={{ filter: "url(#sharpFilter) contrast(1.08) saturate(1.06)" }}
        />
        <img
          ref={effectRef}
          src={efeitoFundo}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ mixBlendMode: "soft-light" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-charcoal/40" />
      </div>

      {/* Logo container */}
      <div
        ref={logoRef}
        className="relative z-10 flex flex-col items-center gap-6 opacity-0"
        style={{ transform: "translateY(30px)" }}
      >
        {/* Logo icon */}
        <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-elevated animate-pulse-glow">
          <PawPrint className="w-14 h-14 text-gold" />
        </div>

        {/* Logo text */}
        <div className="text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-cream tracking-tight">
            Vet<span className="text-gold">+</span>
          </h1>
          <p className="text-cream/80 text-lg mt-2 font-medium">
            Atendimento Veterinário Domiciliar
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gold animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Fade overlay for transition */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background opacity-0 z-20"
      />
    </div>
  );
};

export default SplashScreen;
