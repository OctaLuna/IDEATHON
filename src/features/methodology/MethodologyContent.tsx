import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { RocketVehicleSVG, TapeBadge } from "@/components/decorative/DoodleSVGs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import confetti from "canvas-confetti";
import {
  Award,
  BarChart3,
  Box,
  CheckCircle2,
  ChevronDown,
  FileText,
  Film,
  Layers,
  Lightbulb,
  Mic,
  Printer,
  School,
  Search,
  Smartphone,
  UserCheck,
} from "lucide-react";
import React, { useRef, useState } from "react";
import {
  EVALUATION_CRITERIA,
  IDEATION_TECHNIQUES,
  LEAN_CANVAS_BLOCKS,
  METHODOLOGY_STEPS,
  PROFESSOR_ROLE,
  PROTOTYPING_TOOLS,
} from "./data/methodology";

export const MethodologyContent: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCanvasBlock, setSelectedCanvasBlock] = useState<string>("problem");
  const [showCanvasExample, setShowCanvasExample] = useState<boolean>(true);
  const [mobileCanvasAccordion, setMobileCanvasAccordion] = useState<string | null>("problem");
  const roadPathRef = useRef<SVGPathElement | null>(null);
  const rocketDesktopRef = useRef<HTMLDivElement | null>(null);
  const rocketDesktopFlipRef = useRef<HTMLDivElement | null>(null);
  const rocketDesktopBodyRef = useRef<HTMLDivElement | null>(null);
  const rocketMobileRef = useRef<HTMLDivElement | null>(null);
  const rocketMobileFlipRef = useRef<HTMLDivElement | null>(null);
  const rocketMobileBodyRef = useRef<HTMLDivElement | null>(null);
  const landingSiteDesktopRef = useRef<HTMLDivElement | null>(null);
  const landingSiteMobileRef = useRef<HTMLDivElement | null>(null);

  const confettiTriggeredRef = useRef(false);
  const landingTlRef = useRef<gsap.core.Timeline | null>(null);
  const landedRef = useRef(false);
  const isLandingActiveRef = useRef(false);
  const currentDirectionRef = useRef(1);
  const lastFlipTimeRef = useRef(0);
  const isFlippingRef = useRef(false);

  useGSAP(
    () => {
      let updateLandingPosition: (() => void) | undefined;
      const ctx = gsap.context(() => {
        const path = roadPathRef.current;
        const rocket = rocketDesktopRef.current;
        const rocketMobile = rocketMobileRef.current;

        if (prefersReducedMotion) {
          if (path) {
            gsap.set(path, { strokeDashoffset: 0 });
          }
          if (landingSiteDesktopRef.current) {
            gsap.set(
              landingSiteDesktopRef.current.querySelectorAll(".landing-platform, .landing-sticker"),
              {
                opacity: 1,
                scale: 1,
              },
            );
          }
          if (landingSiteMobileRef.current) {
            gsap.set(
              landingSiteMobileRef.current.querySelectorAll(".landing-platform, .landing-sticker"),
              {
                opacity: 1,
                scale: 1,
              },
            );
          }
          return;
        }

        // Build landing timeline (CAMBIO 2)
        const flips = [rocketDesktopFlipRef.current, rocketMobileFlipRef.current].filter(Boolean);
        const bodies = [rocketDesktopBodyRef.current, rocketMobileBodyRef.current].filter(Boolean);
        const smokeDesktop = landingSiteDesktopRef.current?.querySelectorAll(".smoke-puff");
        const smokeMobile = landingSiteMobileRef.current?.querySelectorAll(".smoke-puff");
        const sparklesDesktop =
          landingSiteDesktopRef.current?.querySelectorAll(".sparkle-destello");
        const sparklesMobile = landingSiteMobileRef.current?.querySelectorAll(".sparkle-destello");
        const stickerDesktop = landingSiteDesktopRef.current?.querySelector(".landing-sticker");
        const stickerMobile = landingSiteMobileRef.current?.querySelector(".landing-sticker");
        const platformDesktop = landingSiteDesktopRef.current?.querySelector(".landing-platform");
        const platformMobile = landingSiteMobileRef.current?.querySelector(".landing-platform");
        const flames = document.querySelectorAll(".rocket-flame-group");
        const beacons = document.querySelectorAll(".rocket-beacon-light");

        const landingTl = gsap.timeline({ paused: true });

        // 1. Aterrizaje de cola: vuelta en #rocketFlip (rotation 0 -> 180, ease back.out)
        landingTl.to(
          flips,
          {
            rotation: 180,
            duration: 0.48,
            ease: "back.out(1.5)",
            overwrite: "auto",
          },
          0,
        );

        // Llama estirándose y luego bajando de intensidad
        if (flames.length > 0) {
          landingTl.to(
            flames,
            {
              scale: 1.35,
              opacity: 1,
              duration: 0.22,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            },
            0.08,
          );
          landingTl.to(
            flames,
            {
              scale: 0.45,
              opacity: 0.35,
              duration: 0.35,
              ease: "power2.out",
            },
            0.52,
          );
        }

        // Plataforma discreta
        landingTl.fromTo(
          [platformDesktop, platformMobile].filter(Boolean),
          {
            opacity: 0,
            scale: 0.7,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          0.15,
        );

        // 2. Toque de suelo: rebote en #rocketBody (translateY 8px) y squash (scaleY 0.94 -> 1)
        landingTl.to(
          bodies,
          {
            y: 8,
            scaleY: 0.94,
            duration: 0.2,
            ease: "power2.in",
          },
          0.45,
        );
        landingTl.to(
          bodies,
          {
            y: 0,
            scaleY: 1,
            duration: 0.25,
            ease: "back.out(2)",
          },
          0.65,
        );

        // Bocanadas de humo
        if (smokeDesktop && smokeDesktop.length > 0) {
          landingTl.fromTo(
            smokeDesktop,
            {
              scale: 0.2,
              opacity: 0.85,
              x: 0,
              y: 0,
            },
            {
              scale: 1.5,
              opacity: 0,
              x: (i) => [-30, -18, 0, 18, 30][i % 5],
              y: (i) => [10, -6, -14, -6, 10][i % 5],
              duration: 0.65,
              stagger: 0.04,
              ease: "power2.out",
            },
            0.5,
          );
        }
        if (smokeMobile && smokeMobile.length > 0) {
          landingTl.fromTo(
            smokeMobile,
            {
              scale: 0.2,
              opacity: 0.85,
              x: 0,
              y: 0,
            },
            {
              scale: 1.35,
              opacity: 0,
              x: (i) => [-20, 0, 20][i % 3],
              y: (i) => [-6, -12, -6][i % 3],
              duration: 0.6,
              stagger: 0.04,
              ease: "power2.out",
            },
            0.5,
          );
        }

        // 3. Asentamiento: balanceo amortiguado (rotation +-5 deg en ~0.6s)
        landingTl.to(
          bodies,
          {
            rotation: 5,
            duration: 0.15,
            ease: "power1.inOut",
          },
          0.72,
        );
        landingTl.to(
          bodies,
          {
            rotation: -4,
            duration: 0.15,
            ease: "power1.inOut",
          },
          0.87,
        );
        landingTl.to(
          bodies,
          {
            rotation: 2,
            duration: 0.15,
            ease: "power1.inOut",
          },
          1.02,
        );
        landingTl.to(
          bodies,
          {
            rotation: 0,
            duration: 0.15,
            ease: "power1.out",
          },
          1.17,
        );

        // Destellos con pop
        landingTl.fromTo(
          [sparklesDesktop, sparklesMobile].filter(Boolean),
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "back.out(2)",
          },
          0.82,
        );

        // Sticker "¡Llegaste!"
        landingTl.fromTo(
          [stickerDesktop, stickerMobile].filter(Boolean),
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.38,
            ease: "back.out(2)",
          },
          0.92,
        );

        // Luz parpadeante
        if (beacons.length > 0) {
          landingTl.to(
            beacons,
            {
              opacity: 1,
              duration: 0.2,
            },
            1.15,
          );
        }

        landingTlRef.current = landingTl;

        // Positioning update for landing elements via getPointAtLength
        updateLandingPosition = () => {
          if (path && landingSiteDesktopRef.current) {
            const len = path.getTotalLength();
            const pt = path.getPointAtLength(len);
            landingSiteDesktopRef.current.style.left = `${(pt.x / 192) * 100}%`;
            landingSiteDesktopRef.current.style.top = `${(pt.y / 2400) * 100}%`;
          }
        };
        updateLandingPosition();
        ScrollTrigger.addEventListener("refreshInit", updateLandingPosition);

        // Core scroll update handler for both desktop and mobile ScrollTriggers
        const handleScrollUpdate = (self: ScrollTrigger) => {
          const progress = self.progress;
          const dir = self.direction; // 1 = down, -1 = up
          const vel = Math.abs(self.getVelocity ? self.getVelocity() : 0);
          const now = Date.now();

          const curFlips = [rocketDesktopFlipRef.current, rocketMobileFlipRef.current].filter(
            Boolean,
          );
          const curBodies = [rocketDesktopBodyRef.current, rocketMobileBodyRef.current].filter(
            Boolean,
          );

          // Confetti celebratory trigger at 0.95 progress
          if (progress > 0.95 && !confettiTriggeredRef.current) {
            confettiTriggeredRef.current = true;
            confetti({
              particleCount: 22,
              spread: 45,
              origin: { y: 0.7 },
              colors: ["#FFD23F", "#FF6B35", "#1F3FD1"],
            });
          }

          // ========================================================
          // CAMBIO 2: ATERRIZAJE / ESTACIONAMIENTO AL FINAL
          // ========================================================
          if (progress >= 0.93) {
            isLandingActiveRef.current = true;
            if (!landedRef.current) {
              landedRef.current = true;
              if (progress >= 0.98 && vel > 600) {
                landingTlRef.current?.progress(1);
              } else {
                landingTlRef.current?.timeScale(1).play();
              }
            }
          } else if (progress < 0.92) {
            if (landedRef.current) {
              landedRef.current = false;
              // Despegue rápido (~0.5s)
              landingTlRef.current?.timeScale(2.8).reverse();
              // Mantiene nariz arriba volando hacia arriba
              currentDirectionRef.current = -1;
              gsap.set(curFlips, { rotation: 180 });
            }
            isLandingActiveRef.current = false;
          }

          // Scroll rápido de vuelta al inicio
          if (progress <= 0.03) {
            landingTlRef.current?.progress(0).pause();
            landedRef.current = false;
            isLandingActiveRef.current = false;
            currentDirectionRef.current = 1;
            gsap.set(curFlips, { rotation: 0 });
          }

          // ========================================================
          // CAMBIO 1: EL COHETE MIRA HACIA DONDE VUELA
          // ========================================================
          if (!isLandingActiveRef.current) {
            if (
              dir !== currentDirectionRef.current &&
              vel > 80 &&
              now - lastFlipTimeRef.current > 250 &&
              !isFlippingRef.current
            ) {
              currentDirectionRef.current = dir;
              lastFlipTimeRef.current = now;
              isFlippingRef.current = true;

              const targetRotation = dir === 1 ? 0 : 180;

              gsap.to(curFlips, {
                rotation: targetRotation,
                duration: 0.5,
                ease: "back.out(1.6)",
                overwrite: "auto",
                onComplete: () => {
                  isFlippingRef.current = false;
                },
              });

              // Pulso de escala en #rocketBody (1 -> 1.12 -> 1)
              gsap.fromTo(
                curBodies,
                { scale: 1 },
                {
                  scale: 1.12,
                  duration: 0.25,
                  yoyo: true,
                  repeat: 1,
                  ease: "power2.out",
                  overwrite: "auto",
                },
              );
            }
          }
        };

        // Desktop winding road & Rocket with MotionPath
        if (path && rocket) {
          const pathLength = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          // Single master timeline for rocket + road drawing (Mejora 2)
          const mainTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".methodology-timeline-wrapper",
              start: "top 60%",
              end: "bottom 70%",
              scrub: 0.6,
              onUpdate: handleScrollUpdate,
            },
          });

          mainTl.to(
            path,
            {
              strokeDashoffset: 0,
              ease: "none",
            },
            0,
          );

          mainTl.to(
            rocket,
            {
              motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
              ease: "none",
            },
            0,
          );
        }

        // Mobile vertical tracking for rocket
        if (rocketMobile) {
          gsap.to(rocketMobile, {
            y: () => {
              const wrapper = document.querySelector(".methodology-timeline-wrapper");
              return wrapper ? wrapper.clientHeight - 80 : 1500;
            },
            ease: "none",
            scrollTrigger: {
              trigger: ".methodology-timeline-wrapper",
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              onUpdate: handleScrollUpdate,
            },
          });
        }

        // Scroll restoration check: si carga a mitad de camino, fija rotación inicial
        if (window.scrollY > 150) {
          const initialFlips = [rocketDesktopFlipRef.current, rocketMobileFlipRef.current].filter(
            Boolean,
          );
          gsap.set(initialFlips, { rotation: 0 });
        }

        // Step cards batch reveal: number bounce, icon spin (Mejora 2.4)
        gsap.utils.toArray<HTMLElement>(".methodology-step-card").forEach((card) => {
          const numBadge = card.querySelector(".step-number-badge");
          const iconEl = card.querySelector(".step-icon-node");

          ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.fromTo(
                card,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
              );
              if (numBadge) {
                gsap.fromTo(
                  numBadge,
                  { scale: 0.5 },
                  { scale: 1, duration: 0.4, ease: "back.out(2)" },
                );
              }
              if (iconEl) {
                gsap.fromTo(
                  iconEl,
                  { rotate: -45, scale: 0.7 },
                  { rotate: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
                );
              }
            },
          });
        });

        // Criteria progress bars fill with scaleX (Mejora 3.13)
        gsap.utils.toArray<HTMLElement>(".criteria-bar-fill").forEach((bar) => {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                once: true,
              },
            },
          );
        });
      }, containerRef);

      return () => {
        if (updateLandingPosition) {
          ScrollTrigger.removeEventListener("refreshInit", updateLandingPosition);
        }
        ctx.revert();
      };
    },
    { scope: containerRef, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  const getStepIcon = (num: number) => {
    switch (num) {
      case 1:
        return School;
      case 2:
        return CheckCircle2;
      case 3:
        return FileText;
      case 4:
        return Search;
      case 5:
        return Lightbulb;
      case 6:
        return Box;
      case 7:
        return Layers;
      case 8:
        return Mic;
      default:
        return Award;
    }
  };

  const selectedBlockData =
    LEAN_CANVAS_BLOCKS.find((b) => b.id === selectedCanvasBlock) || LEAN_CANVAS_BLOCKS[0];

  const handlePrintTemplate = () => {
    window.print();
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-28 sm:pt-36 pb-24 bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-200"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-block">
            <TapeBadge text="GUÍA METODOLÓGICA" rotate="-1.5deg" color="var(--accent-yellow)" />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-[var(--text-main)] tracking-tight">
            Tu ruta en el Ideaton
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)]">
            8 pasos para transformar una idea en una propuesta ganadora.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="methodology-timeline-wrapper relative my-12">
          {/* Desktop SVG Serpentine Line + MotionPath Rocket */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-48 hidden lg:block pointer-events-none z-10">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 192 2400"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="roadPath"
                ref={roadPathRef}
                d="M96 20 
                   C 170 180, 170 300, 96 450
                   C 20 600, 20 750, 96 900
                   C 170 1050, 170 1200, 96 1350
                   C 20 1500, 20 1650, 96 1800
                   C 170 1950, 170 2100, 96 2250
                   L 96 2380"
                stroke="var(--accent-blue)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="6 6"
              />
            </svg>

            {/* Desktop Landing Site Support Effects (FUERA del SVG del cohete) */}
            <div
              ref={landingSiteDesktopRef}
              className="absolute pointer-events-none z-20 hidden lg:block"
              style={{
                left: "50%",
                top: "99.167%",
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden="true"
            >
              {/* Landing Platform with soft pulsing ring */}
              <div className="landing-platform relative flex items-center justify-center opacity-0 origin-center">
                <div className="absolute w-14 h-14 rounded-full border-2 border-[var(--accent-blue)] animate-landing-ring pointer-events-none" />
                <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-yellow)]" />
                </div>
              </div>

              {/* 5 Smoke puffs */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="smoke-puff absolute w-5 h-5 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-soft)] opacity-0 origin-center"
                  />
                ))}
              </div>

              {/* 3 Sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="sparkle-destello absolute -top-8 -left-8 text-[var(--accent-yellow)] opacity-0 animate-sparkle-twinkle origin-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
                <div
                  className="sparkle-destello absolute -top-6 left-8 text-[var(--accent-orange)] opacity-0 animate-sparkle-twinkle origin-center"
                  style={{ animationDelay: "0.5s" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
                <div
                  className="sparkle-destello absolute top-6 -left-8 text-[var(--accent-blue)] opacity-0 animate-sparkle-twinkle origin-center"
                  style={{ animationDelay: "0.9s" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
              </div>

              {/* Sticker rotado ~3° "¡Llegaste!" */}
              <div className="absolute -top-10 left-6 pointer-events-none">
                <div className="landing-sticker px-3 py-1 rounded-xl bg-[var(--accent-yellow)] text-[#111111] font-display font-black text-xs sm:text-sm border-2 border-[var(--border-ink)] sticker-shadow opacity-0 rotate-[3deg] shadow-xs origin-bottom-left whitespace-nowrap">
                  ¡Llegaste!
                </div>
              </div>
            </div>

            {/* Desktop Rocket Vehicle that travels along MotionPath */}
            {/* #rocketPath (lo anima MotionPath, intacto) */}
            <div
              ref={rocketDesktopRef}
              id="rocketPath"
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none origin-center"
              style={{ willChange: "transform" }}
            >
              {/* #rocketFlip (nuevo: giro de dirección, propiedad rotation) */}
              <div
                ref={rocketDesktopFlipRef}
                id="rocketFlip"
                className="origin-center"
                style={{ willChange: "transform" }}
              >
                {/* #rocketBody (nuevo: rebote, inclinación y squash del aterrizaje) */}
                <div
                  ref={rocketDesktopBodyRef}
                  id="rocketBody"
                  className="origin-center relative"
                  style={{ willChange: "transform" }}
                >
                  <RocketVehicleSVG size={64} />
                  {/* Parking beacon light */}
                  <div className="rocket-beacon-light absolute top-2 right-1 w-2 h-2 rounded-full bg-[var(--accent-yellow)] border border-[var(--border-ink)] opacity-0 animate-beacon-pulse pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Straight Vertical Guide Line with downward pointing Rocket */}
          <div className="absolute top-4 bottom-4 left-6 w-1 bg-[var(--border-soft)] lg:hidden pointer-events-none z-10">
            {/* Mobile Landing Site Support Effects */}
            <div
              ref={landingSiteMobileRef}
              className="absolute left-0 pointer-events-none z-20 lg:hidden"
              style={{
                bottom: "64px",
                transform: "translate(-50%, 0)",
              }}
              aria-hidden="true"
            >
              <div className="landing-platform relative flex items-center justify-center opacity-0 origin-center">
                <div className="absolute w-12 h-12 rounded-full border-2 border-[var(--accent-blue)] animate-landing-ring pointer-events-none" />
                <div className="w-8 h-8 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-yellow)]" />
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="smoke-puff absolute w-4 h-4 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-soft)] opacity-0 origin-center"
                  />
                ))}
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <div className="sparkle-destello absolute -top-5 -left-5 text-[var(--accent-yellow)] opacity-0 animate-sparkle-twinkle origin-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
                <div
                  className="sparkle-destello absolute -top-4 left-6 text-[var(--accent-orange)] opacity-0 animate-sparkle-twinkle origin-center"
                  style={{ animationDelay: "0.4s" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
                <div
                  className="sparkle-destello absolute top-4 -left-5 text-[var(--accent-blue)] opacity-0 animate-sparkle-twinkle origin-center"
                  style={{ animationDelay: "0.8s" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
              </div>

              <div className="absolute -top-8 left-4 pointer-events-none">
                <div className="landing-sticker px-2.5 py-0.5 rounded-lg bg-[var(--accent-yellow)] text-[#111111] font-display font-black text-[11px] border-2 border-[var(--border-ink)] sticker-shadow opacity-0 rotate-[3deg] shadow-xs origin-bottom-left whitespace-nowrap">
                  ¡Llegaste!
                </div>
              </div>
            </div>

            {/* Mobile Rocket Vehicle */}
            <div
              ref={rocketMobileRef}
              id="rocketMobilePath"
              className="absolute top-0 -left-6 z-30 pointer-events-none rotate-90 origin-center"
            >
              <div
                ref={rocketMobileFlipRef}
                id="rocketMobileFlip"
                className="origin-center"
                style={{ willChange: "transform" }}
              >
                <div
                  ref={rocketMobileBodyRef}
                  id="rocketMobileBody"
                  className="origin-center relative"
                  style={{ willChange: "transform" }}
                >
                  <RocketVehicleSVG size={44} />
                  <div className="rocket-beacon-light absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-yellow)] border border-[var(--border-ink)] opacity-0 animate-beacon-pulse pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Steps Loop */}
          <div className="space-y-12 lg:space-y-16 relative z-10">
            {METHODOLOGY_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              const IconComp = getStepIcon(step.number);

              return (
                <div
                  key={step.number}
                  className={`methodology-step-card flex flex-col lg:flex-row items-center gap-6 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step Card Content */}
                  <div className="w-full lg:w-[46%] pl-14 lg:pl-0">
                    <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow-lg transition-transform hover:-translate-y-0.5 relative card-theme-transition">
                      {/* Top Step Code */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="step-number-badge px-3 py-1 rounded-full text-xs font-bold font-mono border-2 border-[var(--border-ink)] shadow-xs"
                          style={{
                            backgroundColor: step.accentColor,
                            color: step.accentColor === "#FFD23F" ? "#111111" : "#ffffff",
                          }}
                        >
                          Paso {step.stepCode}
                        </span>
                        <span className="text-[11px] font-mono text-[var(--text-muted)] font-bold">
                          Fase {step.number} de 8
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-black text-xl sm:text-2xl text-[var(--text-main)] mb-2">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Handwritten Mini-Tip */}
                      <div className="p-3.5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] rotate-[-0.5deg]">
                        <span className="font-sans font-bold text-xs sm:text-sm text-[var(--text-main)] block">
                          💡 Mini-tip: {step.tip}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="step-icon-node absolute left-6 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-[var(--accent-yellow)] border-3 border-[var(--border-ink)] flex items-center justify-center sticker-shadow z-20">
                    <IconComp className="w-6 h-6 text-[#111111]" />
                  </div>

                  {/* Empty Spacer Column on Desktop */}
                  <div className="hidden lg:block lg:w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECCIÓN 1: FASE DE IDEACIÓN (DESIGN THINKING - 4 TÉCNICAS) */}
        {/* ======================================================== */}
        <div className="mt-24 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-block">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-orange)]">
                DESIGN THINKING · FASE DIVERGENTE
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-main)]">
              Técnicas de Ideación en Equipo
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Antes de juzgar qué es posible, genera un gran volumen de alternativas. Estas 4
              técnicas guían la sesión:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IDEATION_TECHNIQUES.map((tech) => (
              <div
                key={tech.id}
                className="p-6 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow flex flex-col justify-between hover:-translate-y-1 transition-transform card-theme-transition"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent-blue)] block">
                    {tech.subtitle}
                  </span>
                  <h3 className="font-display font-black text-xl text-[var(--text-main)] leading-snug">
                    {tech.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {tech.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-soft)]">
                  <span className="text-[11px] font-mono font-semibold text-[var(--accent-orange)] block">
                    ⚡ {tech.tip}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECCIÓN 2: FASE DE PROTOTIPADO (4 HERRAMIENTAS + REGLA)  */}
        {/* ======================================================== */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="inline-block">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-mint)]">
                  DESIGN THINKING · FASE CONVERGENTE
                </span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-main)]">
                Prototipado Rápido
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Convierte la idea en algo que los jueces y mentores puedan ver, entender y
                retroalimentar.
              </p>
            </div>

            {/* Regla de oro sticker */}
            <div className="p-4 rounded-2xl bg-[var(--accent-yellow)] text-[#111111] border-2 border-[var(--border-ink)] sticker-shadow rotate-1 shrink-0 max-w-xs">
              <span className="text-[10px] font-mono font-bold uppercase block tracking-wider">
                REGLA DE ORO:
              </span>
              <p className="font-display font-black text-xs sm:text-sm leading-snug mt-0.5">
                "Un prototipo se hace rápido, barato y para aprender."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROTOTYPING_TOOLS.map((tool) => (
              <div
                key={tool.id}
                className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2 hover:border-[var(--border-ink)] transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--accent-blue)] text-white flex items-center justify-center border border-[var(--border-ink)]">
                  {tool.id === "sketch" && <FileText className="w-4 h-4" />}
                  {tool.id === "storyboard" && <Film className="w-4 h-4" />}
                  {tool.id === "mockup-fisico" && <Box className="w-4 h-4" />}
                  {tool.id === "mockup-celular" && <Smartphone className="w-4 h-4" />}
                </div>
                <h3 className="font-display font-bold text-base text-[var(--text-main)]">
                  {tool.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECCIÓN 3: LEAN CANVAS (PIEZA CENTRAL - 9 BLOQUES)        */}
        {/* ======================================================== */}
        <div id="lean-canvas-section" className="mt-20 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-block">
                <TapeBadge text="HERRAMIENTA CENTRAL" rotate="-1deg" color="var(--accent-yellow)" />
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text-main)] tracking-tight">
                Lienzo Lean Canvas (9 Bloques)
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Estructura tu propuesta en una sola hoja. Toca cualquier bloque para ver la pregunta
                guía y su explicación metodológica.
              </p>
            </div>

            {/* Controles de visualización & Imprimir */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowCanvasExample(!showCanvasExample)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--bg-surface)] text-[var(--text-main)] border-2 border-[var(--border-ink)] sticker-shadow hover:bg-[var(--accent-yellow)] hover:text-[#111111] transition-all cursor-pointer"
              >
                {showCanvasExample ? "Ocultar ejemplo ilustrativo" : "Ver ejemplo ilustrativo"}
              </button>

              <button
                onClick={handlePrintTemplate}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--accent-blue)] text-white border-2 border-[var(--border-ink)] sticker-shadow hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir plantilla vacía</span>
              </button>
            </div>
          </div>

          {/* Panel Informativo del Bloque Seleccionado */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--accent-blue)] space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[var(--accent-blue)] text-white font-mono text-[11px] font-bold">
                {selectedBlockData.orderBadge}
              </span>
              <h3 className="font-display font-black text-lg text-[var(--text-main)]">
                {selectedBlockData.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[var(--accent-orange)]">
              ❓ Pregunta guía: {selectedBlockData.guidingQuestion}
            </p>
            <p className="text-xs text-[var(--text-muted)]">{selectedBlockData.explanation}</p>
          </div>

          {/* Lienzo Desktop (5 Columnas x 2 Filas Clásico) */}
          <div className="hidden lg:grid grid-cols-5 gap-3 p-6 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow-lg text-left">
            {/* Col 1: 1. Problema */}
            <div
              onClick={() => setSelectedCanvasBlock("problem")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                selectedCanvasBlock === "problem"
                  ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] ring-2 ring-[var(--accent-blue)]"
                  : "bg-[var(--bg-surface-2)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-black text-sm text-[var(--text-main)]">
                    1. Problema
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--accent-blue)] text-white">
                    #1
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mb-3">
                  Los 3 principales dolores del cliente o del mercado laboral.
                </p>
              </div>
              {showCanvasExample && (
                <div className="text-[11px] p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] leading-relaxed italic">
                  "{LEAN_CANVAS_BLOCKS[0].sampleText}"
                </div>
              )}
            </div>

            {/* Col 2: 4. Solución & 8. Métricas Clave */}
            <div className="space-y-3 flex flex-col">
              <div
                onClick={() => setSelectedCanvasBlock("solution")}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex-1 flex flex-col justify-between ${
                  selectedCanvasBlock === "solution"
                    ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] ring-2 ring-[var(--accent-blue)]"
                    : "bg-[var(--bg-surface-2)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-black text-sm text-[var(--text-main)]">
                      4. Solución
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--accent-orange)] text-white">
                      #4
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    3 funciones del producto/servicio.
                  </p>
                </div>
                {showCanvasExample && (
                  <div className="text-[10px] p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] italic mt-2">
                    "{LEAN_CANVAS_BLOCKS[3].sampleText}"
                  </div>
                )}
              </div>

              <div
                onClick={() => setSelectedCanvasBlock("key_metrics")}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex-1 flex flex-col justify-between ${
                  selectedCanvasBlock === "key_metrics"
                    ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] ring-2 ring-[var(--accent-blue)]"
                    : "bg-[var(--bg-surface-2)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-black text-sm text-[var(--text-main)]">
                      8. Métricas Clave
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--accent-mint)] text-[#111111]">
                      #8
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Números de impacto y tracción.
                  </p>
                </div>
                {showCanvasExample && (
                  <div className="text-[10px] p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] italic mt-2">
                    "{LEAN_CANVAS_BLOCKS[7].sampleText}"
                  </div>
                )}
              </div>
            </div>

            {/* Col 3: 3. Propuesta de Valor Única (Centro) */}
            <div
              onClick={() => setSelectedCanvasBlock("value_prop")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                selectedCanvasBlock === "value_prop"
                  ? "bg-[var(--accent-yellow)]/20 border-[var(--border-ink)] ring-2 ring-[var(--accent-yellow)]"
                  : "bg-[var(--accent-yellow)]/10 border-[var(--border-soft)] hover:border-[var(--border-ink)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-black text-sm text-[var(--text-main)]">
                    3. Propuesta de Valor
                  </span>
                  <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-[var(--accent-yellow)] text-[#111111]">
                    #3
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mb-3">
                  Mensaje único, claro y memorable de tu promesa central.
                </p>
              </div>
              {showCanvasExample && (
                <div className="text-[11px] p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] font-medium leading-relaxed italic">
                  "{LEAN_CANVAS_BLOCKS[2].sampleText}"
                </div>
              )}
            </div>

            {/* Col 4: 9. Ventaja Competitiva & 5. Canales */}
            <div className="space-y-3 flex flex-col">
              <div
                onClick={() => setSelectedCanvasBlock("unfair_advantage")}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex-1 flex flex-col justify-between ${
                  selectedCanvasBlock === "unfair_advantage"
                    ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] ring-2 ring-[var(--accent-blue)]"
                    : "bg-[var(--bg-surface-2)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-black text-sm text-[var(--text-main)]">
                      9. Ventaja Competitiva
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--accent-blue)] text-white">
                      #9
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Difícil de copiar o comprar.
                  </p>
                </div>
                {showCanvasExample && (
                  <div className="text-[10px] p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] italic mt-2">
                    "{LEAN_CANVAS_BLOCKS[8].sampleText}"
                  </div>
                )}
              </div>

              <div
                onClick={() => setSelectedCanvasBlock("channels")}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex-1 flex flex-col justify-between ${
                  selectedCanvasBlock === "channels"
                    ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] ring-2 ring-[var(--accent-blue)]"
                    : "bg-[var(--bg-surface-2)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-black text-sm text-[var(--text-main)]">
                      5. Canales
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--accent-orange)] text-white">
                      #5
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">Rutas hacia los clientes.</p>
                </div>
                {showCanvasExample && (
                  <div className="text-[10px] p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] italic mt-2">
                    "{LEAN_CANVAS_BLOCKS[4].sampleText}"
                  </div>
                )}
              </div>
            </div>

            {/* Col 5: 2. Segmentos de Clientes */}
            <div
              onClick={() => setSelectedCanvasBlock("customer_segments")}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[220px] ${
                selectedCanvasBlock === "customer_segments"
                  ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] ring-2 ring-[var(--accent-blue)]"
                  : "bg-[var(--bg-surface-2)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-black text-sm text-[var(--text-main)]">
                    2. Segmentos
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--accent-blue)] text-white">
                    #2
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mb-3">
                  Público objetivo y primeros adoptantes.
                </p>
              </div>
              {showCanvasExample && (
                <div className="text-[11px] p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] leading-relaxed italic">
                  "{LEAN_CANVAS_BLOCKS[1].sampleText}"
                </div>
              )}
            </div>

            {/* Fila Inferior: 7. Estructura de Costos (50%) & 6. Fuentes de Ingresos (50%) */}
            <div
              onClick={() => setSelectedCanvasBlock("cost_structure")}
              className={`col-span-2 sm:col-span-3 p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedCanvasBlock === "cost_structure"
                  ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] ring-2 ring-[var(--accent-blue)]"
                  : "bg-[var(--bg-surface-2)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-black text-sm text-[var(--text-main)]">
                    7. Estructura de Costos
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--accent-mint)] text-[#111111]">
                    #7
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Costos fijos, variables y sueldos juveniles.
                </p>
              </div>
              {showCanvasExample && (
                <div className="text-[10px] p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] italic mt-2">
                  "{LEAN_CANVAS_BLOCKS[6].sampleText}"
                </div>
              )}
            </div>

            <div
              onClick={() => setSelectedCanvasBlock("revenue")}
              className={`col-span-3 sm:col-span-2 p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedCanvasBlock === "revenue"
                  ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] ring-2 ring-[var(--accent-blue)]"
                  : "bg-[var(--bg-surface-2)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display font-black text-sm text-[var(--text-main)]">
                    6. Fuentes de Ingresos
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--accent-mint)] text-[#111111]">
                    #6
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Cómo monetiza y genera flujo sostenible.
                </p>
              </div>
              {showCanvasExample && (
                <div className="text-[10px] p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] italic mt-2">
                  "{LEAN_CANVAS_BLOCKS[5].sampleText}"
                </div>
              )}
            </div>
          </div>

          {/* Lienzo Mobile (Acordeón Interactivo de 9 Bloques) */}
          <div className="lg:hidden space-y-3">
            {LEAN_CANVAS_BLOCKS.map((block) => {
              const isOpen = mobileCanvasAccordion === block.id;
              return (
                <div
                  key={block.id}
                  className="rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setMobileCanvasAccordion(isOpen ? null : block.id);
                      setSelectedCanvasBlock(block.id);
                    }}
                    className="w-full p-4 flex items-center justify-between text-left font-display font-bold text-sm text-[var(--text-main)] cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--accent-blue)] text-white">
                        {block.orderBadge}
                      </span>
                      <span>{block.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[var(--accent-blue)]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-[var(--border-soft)] space-y-3 text-xs bg-[var(--bg-surface-2)]">
                      <p className="font-semibold text-[var(--accent-orange)]">
                        ❓ {block.guidingQuestion}
                      </p>
                      <p className="text-[var(--text-muted)]">{block.explanation}</p>
                      {showCanvasExample && (
                        <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-soft)] text-[var(--text-main)] italic">
                          "{block.sampleText}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECCIÓN 4 & 5: CRITERIOS DE EVALUACIÓN & ROL DEL PROFESOR */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-20">
          {/* Criterios de Evaluación (4 barras animadas, peso por definir) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow-lg space-y-6 card-theme-transition">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[var(--accent-blue)]" />
              <h3 className="font-display font-black text-2xl text-[var(--text-main)]">
                Criterios de Evaluación
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              El jurado calificador interinstitucional evaluará los proyectos considerando estos 4
              ejes fundamentales (ponderación y peso específico sujeto a definición oficial):
            </p>

            <div className="space-y-5">
              {EVALUATION_CRITERIA.map((crit, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-sm sm:text-base font-bold">
                    <span className="text-[var(--text-main)]">{crit.label}</span>
                    <span className="font-mono text-xs text-[var(--accent-blue)] font-bold">
                      Eje evaluativo #{idx + 1}
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-full h-3 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-soft)] overflow-hidden">
                    <div
                      className="criteria-bar-fill h-full rounded-full origin-left"
                      style={{
                        backgroundColor: crit.color,
                        width: "100%",
                      }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-[var(--text-muted)] block leading-snug">
                    {crit.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rol del Profesor Acompañante */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[var(--bg-accent-blue)] text-white border-3 border-[var(--border-ink)] sticker-shadow-lg flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-6 h-6 text-[var(--accent-yellow)]" />
                <h3 className="font-display font-black text-2xl text-white">
                  {PROFESSOR_ROLE.title}
                </h3>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-[var(--accent-yellow)] mb-4">
                {PROFESSOR_ROLE.subtitle}
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-white/95">
                {PROFESSOR_ROLE.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-mint)] shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/20 text-xs font-mono text-[var(--accent-yellow)]">
              Coordinación académica: Administración de Empresas · UCB Sede La Paz
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
