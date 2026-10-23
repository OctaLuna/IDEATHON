import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { RocketVehicleSVG, TapeBadge } from "@/components/decorative/DoodleSVGs";
import { PROGRAM_DATA } from "@/config/event";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  Clock,
  Coins,
  Crown,
  Download,
  GraduationCap,
  Laptop,
  Lightbulb,
  MapPin,
  Navigation,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CompactCountdown, CountdownTimer } from "./components/CountdownTimer";
import { InteractiveMapModal } from "./components/InteractiveMapModal";
import { FAQS_DATA } from "./data/faqs";
import { EXPERIENCE_STEPS, PRIZES_DATA } from "./data/prizes";

const anchorLinks = [
  { id: "bienvenida", label: "Bienvenida" },
  { id: "objetivos", label: "Objetivos" },
  { id: "requisitos", label: "Requisitos" },
  { id: "cronograma", label: "Cronograma" },
  { id: "premios", label: "Premios" },
  { id: "organiza", label: "Organiza" },
  { id: "faq", label: "FAQ" },
];

export const HomeContent: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const statsBandRef = useRef<HTMLDivElement | null>(null);
  const statsCountersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const milestonesLineRef = useRef<SVGPathElement | null>(null);
  const routeLineRef = useRef<SVGPathElement | null>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeAnchor, setActiveAnchor] = useState<string>("bienvenida");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const confettiRanRef = useRef(false);

  // Handle scroll to hash smoothly if URL contains hash on mount
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  // IntersectionObserver for Sticky Anchor Bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0.1 },
    );

    anchorLinks.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // GSAP Animations
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const ctx = gsap.context(() => {
        // 1. Headline Staggered Reveal
        if (headlineRef.current) {
          const words = headlineRef.current.querySelectorAll(".word-item");
          gsap.fromTo(
            words,
            { opacity: 0, y: 30, rotate: 2 },
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "back.out(1.4)",
            },
          );
        }

        // 2. Stats Band Counters Animation
        if (statsBandRef.current) {
          ScrollTrigger.create({
            trigger: statsBandRef.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              const targets = [
                { el: statsCountersRef.current[0], target: 5, prefix: "4–", suffix: "" },
                { el: statsCountersRef.current[1], target: 3, prefix: "", suffix: " máx." },
                { el: statsCountersRef.current[2], target: 3, prefix: "3+", suffix: " auspicio" },
                { el: statsCountersRef.current[3], target: 3, prefix: "", suffix: " podio" },
                { el: statsCountersRef.current[4], target: 0, prefix: "Bs ", suffix: "" },
              ];

              targets.forEach((item) => {
                if (!item.el) return;
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: item.target,
                  duration: 1.2,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (item.el) {
                      item.el.textContent = `${item.prefix}${Math.round(obj.val)}${item.suffix}`;
                    }
                  },
                });
              });
            },
          });
        }

        // 3. DrawSVG on Tu Ruta
        if (routeLineRef.current) {
          const length = routeLineRef.current.getTotalLength();
          gsap.set(routeLineRef.current, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(routeLineRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#tu-ruta-container",
              start: "top 75%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          });
        }

        // 4. DrawSVG on Milestones line
        if (milestonesLineRef.current) {
          const mLength = milestonesLineRef.current.getTotalLength();
          gsap.set(milestonesLineRef.current, {
            strokeDasharray: mLength,
            strokeDashoffset: mLength,
          });
          gsap.to(milestonesLineRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".milestones-container",
              start: "top 80%",
              end: "bottom 75%",
              scrub: 0.5,
            },
          });
        }

        // 5. Premios Podium Rise & Subtle Confetti
        ScrollTrigger.create({
          trigger: "#premios",
          start: "top 70%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              ".podium-card-item",
              { opacity: 0, y: 40, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.12,
                duration: 0.6,
                ease: "back.out(1.5)",
              },
            );

            if (!confettiRanRef.current) {
              confettiRanRef.current = true;
              confetti({
                particleCount: 28,
                spread: 50,
                origin: { y: 0.6 },
                colors: ["#FFD23F", "#FF6B35", "#1F3FD1", "#22C55E"],
              });
            }
          },
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  const handleDownloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//IDEATHON UCB//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:ideathon-ucb-2026@ucb.edu.bo",
      "DTSTAMP:20261019T120000Z",
      "DTSTART:20261106T130000Z",
      "DTEND:20261106T170000Z",
      "SUMMARY:IDEATHON UCB 2026 - Jornada de Innovación",
      "DESCRIPTION:Ideathon Colegios 2026 en la Capilla de la UCB Sede La Paz.",
      "LOCATION:Capilla de la UCB, Av. 14 de Septiembre y Calle 2, Obrajes, La Paz",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "IDEATHON-UCB-2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-200 overflow-x-hidden"
    >
      {/* ======================================================== */}
      {/* 1. HERO / BIENVENIDA (id="bienvenida")                     */}
      {/* ======================================================== */}
      <section id="bienvenida" className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Top Badge & Compact Countdown */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <TapeBadge
                text="EDICIÓN COLEGIOS 2026"
                rotate="-1.5deg"
                color="var(--accent-yellow)"
              />
              <CompactCountdown />
            </div>

            {/* Titular Gigante */}
            <h1
              ref={headlineRef}
              className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[var(--text-main)] leading-[1.08]"
            >
              <span className="inline-block word-item">BIENVENIDO</span>{" "}
              <span className="inline-block word-item">AL</span>{" "}
              <span className="inline-block word-item text-[var(--accent-blue)]">IDEATHON</span>{" "}
              <span className="inline-block word-item text-[var(--accent-orange)]">2026</span>
            </h1>

            {/* Subtítulo Oficial */}
            <p className="text-base sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
              Una jornada intensiva de innovación social y económica donde estudiantes de colegio
              crean soluciones reales para disminuir el desempleo juvenil en La Paz.
            </p>

            {/* Sticker de Fecha y Sede */}
            <div className="inline-block p-3 px-5 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow rotate-1 font-mono text-xs sm:text-sm font-bold text-[var(--text-main)]">
              📍 6 de noviembre · 09:00 a 13:00 · Capilla UCB
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <button
                onClick={() => scrollToSection("cronograma")}
                className="px-6 py-3.5 bg-[var(--accent-yellow)] hover:brightness-105 text-[#111111] font-display font-black text-sm sm:text-base rounded-2xl border-2 border-[var(--border-ink)] sticker-shadow hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Ver cronograma</span>
              </button>

              <Link
                to="/metodologia"
                className="px-6 py-3.5 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] text-[var(--text-main)] font-display font-black text-sm sm:text-base rounded-2xl border-2 border-[var(--border-ink)] sticker-shadow hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Conoce la metodología</span>
                <ArrowRight className="w-5 h-5 text-[var(--accent-blue)]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* BARRA DE ANCLAS PEGAJOSA (CHIPS)                          */}
      {/* ======================================================== */}
      <div className="sticky top-16 sm:top-20 z-40 bg-[var(--bg-page)]/90 backdrop-blur-md border-y-2 border-[var(--border-soft)] py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
            {anchorLinks.map((anchor) => {
              const isActive = activeAnchor === anchor.id;
              return (
                <button
                  key={anchor.id}
                  onClick={() => scrollToSection(anchor.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border-2 transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[var(--accent-blue)] text-white border-[var(--border-ink)] shadow-xs scale-102"
                      : "bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
                  }`}
                >
                  {anchor.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. BANDA DE DATOS CON CONTADORES                          */}
      {/* ======================================================== */}
      <section
        ref={statsBandRef}
        className="py-12 bg-[var(--bg-surface)] border-b-2 border-[var(--border-soft)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="space-y-1">
              <span
                ref={(el) => {
                  statsCountersRef.current[0] = el;
                }}
                className="font-display font-black text-3xl sm:text-4xl text-[var(--accent-blue)] block"
              >
                4–5
              </span>
              <span className="text-xs text-[var(--text-muted)] font-bold">
                integrantes por equipo
              </span>
            </div>

            <div className="space-y-1">
              <span
                ref={(el) => {
                  statsCountersRef.current[1] = el;
                }}
                className="font-display font-black text-3xl sm:text-4xl text-[var(--accent-orange)] block"
              >
                3 máx.
              </span>
              <span className="text-xs text-[var(--text-muted)] font-bold">
                equipos máx. por colegio
              </span>
            </div>

            <div className="space-y-1">
              <span
                ref={(el) => {
                  statsCountersRef.current[2] = el;
                }}
                className="font-display font-black text-3xl sm:text-4xl text-[var(--text-main)] block"
              >
                3+1
              </span>
              <span className="text-xs text-[var(--text-muted)] font-bold">
                3 socios + 1 auspiciador
              </span>
            </div>

            <div className="space-y-1">
              <span
                ref={(el) => {
                  statsCountersRef.current[3] = el;
                }}
                className="font-display font-black text-3xl sm:text-4xl text-[var(--accent-mint)] block"
              >
                3
              </span>
              <span className="text-xs text-[var(--text-muted)] font-bold">equipos ganadores</span>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-1">
              <span
                ref={(el) => {
                  statsCountersRef.current[4] = el;
                }}
                className="font-display font-black text-3xl sm:text-4xl text-[var(--accent-yellow)] block"
              >
                Bs 0
              </span>
              <span className="text-xs text-[var(--text-muted)] font-bold">
                de costo (100% gratuito)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. ¿QUÉ ES UN IDEATHON?                                  */}
      {/* ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-block">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-blue)]">
              EL CONCEPTO
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text-main)]">
            ¿Qué es un Ideathon?
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Un Ideathon es un espacio de innovación intensiva donde equipos de trabajo se reúnen
            para resolver problemas específicos en un periodo corto. La dinámica fomenta la
            creatividad colaborativa y empuja a los grupos a usar metodologías de diseño ágil para
            transformar conceptos abstractos en propuestas de valor concretas.
          </p>
        </div>

        {/* 3 Tarjetas Sticker: Analiza, Crea, Presenta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-3 rotate-[-1deg] hover:rotate-0 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-blue)] text-white flex items-center justify-center font-display font-black text-xl border-2 border-[var(--border-ink)]">
              1
            </div>
            <h3 className="font-display font-black text-2xl text-[var(--text-main)]">Analiza</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Datos y estadísticas de empleo de tu municipio provistos por Fundación Jubileo para
              comprender la raíz del problema.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-3 rotate-[1deg] hover:rotate-0 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-yellow)] text-[#111111] flex items-center justify-center font-display font-black text-xl border-2 border-[var(--border-ink)]">
              2
            </div>
            <h3 className="font-display font-black text-2xl text-[var(--text-main)]">Crea</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Tu modelo de negocio ágil con Lean Canvas de 9 bloques, prototipando soluciones
              viables y escalables en una sola hoja.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-3 rotate-[-0.5deg] hover:rotate-0 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-orange)] text-white flex items-center justify-center font-display font-black text-xl border-2 border-[var(--border-ink)]">
              3
            </div>
            <h3 className="font-display font-black text-2xl text-[var(--text-main)]">Presenta</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Pitch de formato libre ante un jurado interinstitucional demostrando impacto concreto
              en la generación de empleo paceño.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. OBJETIVOS (id="objetivos")                             */}
      {/* ======================================================== */}
      <section
        id="objetivos"
        className="py-20 bg-[var(--bg-surface-2)] border-y-2 border-[var(--border-soft)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-block">
              <TapeBadge
                text="PROPÓSITO DEL CERTAMEN"
                rotate="-1deg"
                color="var(--accent-yellow)"
              />
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text-main)]">
              Objetivos del Ideathon
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)]">
              Tres metas concretas que unen a colegios, universidad y organizaciones sociales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-blue)] text-white flex items-center justify-center border-2 border-[var(--border-ink)]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--text-main)] leading-snug">
                Disminución del desempleo juvenil
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Disminuir el desempleo juvenil estructurando modelos de negocio que aprovechen las
                potencialidades productivas del departamento de La Paz.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-orange)] text-white flex items-center justify-center border-2 border-[var(--border-ink)]">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--text-main)] leading-snug">
                Capacitación en innovación ágil
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Capacitar a los estudiantes de colegio en el uso de herramientas ágiles de
                innovación aplicadas a problemas reales del mercado laboral.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-mint)] text-[#111111] flex items-center justify-center border-2 border-[var(--border-ink)]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--text-main)] leading-snug">
                Vinculación interinstitucional
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Consolidar un espacio de vinculación interinstitucional entre estudiantes de
                colegio, la comunidad universitaria y organizaciones de desarrollo socioeconómico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. TU RUTA (4 tarjetas con línea SVG DrawSVG)             */}
      {/* ======================================================== */}
      <section
        id="tu-ruta-container"
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-block">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-blue)]">
              PASO A PASO
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text-main)]">
            Tu ruta de preparación
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Avanza por cada etapa para llegar al 6 de noviembre con una propuesta sólida.
          </p>
        </div>

        <div className="relative">
          {/* Línea SVG de fondo en desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 1000 24" fill="none">
              <path
                ref={routeLineRef}
                d="M 50 12 L 950 12"
                stroke="var(--accent-blue)"
                strokeWidth="4"
                strokeDasharray="8 8"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <Link
              to="/reportes"
              className="p-6 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-3 hover:-translate-y-1 transition-transform group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-blue)] text-white font-display font-black flex items-center justify-center border-2 border-[var(--border-ink)]">
                ①&nbsp;
              </div>
              <h3 className="font-display font-black text-lg text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                Reportes
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Entiende las cifras oficiales de desempleo y potencialidades productivas de La Paz.
              </p>
              <span className="text-xs font-bold text-[var(--accent-blue)] flex items-center gap-1">
                Explorar biblioteca <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to="/videos"
              className="p-6 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-3 hover:-translate-y-1 transition-transform group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-orange)] text-white font-display font-black flex items-center justify-center border-2 border-[var(--border-ink)]">
                ②
              </div>
              <h3 className="font-display font-black text-lg text-[var(--text-main)] group-hover:text-[var(--accent-orange)] transition-colors">
                Videos
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Inspírate con cápsulas de productores locales realizadas por los socios.
              </p>
              <span className="text-xs font-bold text-[var(--accent-orange)] flex items-center gap-1">
                Ver testimonios <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to="/metodologia"
              className="p-6 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-3 hover:-translate-y-1 transition-transform group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-yellow)] text-[#111111] font-display font-black flex items-center justify-center border-2 border-[var(--border-ink)]">
                ③
              </div>
              <h3 className="font-display font-black text-lg text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                Metodología
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Domina el Design Thinking y el lienzo interactivo Lean Canvas de 9 bloques.
              </p>
              <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1">
                Aprender ruta <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <button
              onClick={() => scrollToSection("cronograma")}
              className="p-6 rounded-3xl bg-[var(--accent-mint)]/20 border-3 border-[var(--border-ink)] sticker-shadow space-y-3 hover:-translate-y-1 transition-transform text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-mint)] text-[#111111] font-display font-black flex items-center justify-center border-2 border-[var(--border-ink)]">
                ④
              </div>
              <h3 className="font-display font-black text-lg text-[var(--text-main)] group-hover:text-[var(--accent-mint)] transition-colors">
                Jornada 6 nov
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Capilla UCB (09:00 - 13:00): diagnóstico, prototipado y pitch final ante jurado.
              </p>
              <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1">
                Ver agenda <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. REQUISITOS Y CONDICIONES (id="requisitos")              */}
      {/* ======================================================== */}
      <section
        id="requisitos"
        className="py-20 bg-[var(--bg-surface)] border-y-2 border-[var(--border-soft)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-block">
              <TapeBadge
                text="BASES DE PARTICIPACIÓN"
                rotate="-1deg"
                color="var(--accent-orange)"
              />
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text-main)]">
              Requisitos y Condiciones
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Lineamientos obligatorios basados en las bases oficiales de participación.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2">
              <Users className="w-5 h-5 text-[var(--accent-blue)]" />
              <h3 className="font-display font-bold text-sm text-[var(--text-main)]">
                Equipos de 4 a 5 estudiantes
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Exclusivo para alumnos de prepromoción (5to) o promoción (6to de secundaria).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2">
              <Building2 className="w-5 h-5 text-[var(--accent-orange)]" />
              <h3 className="font-display font-bold text-sm text-[var(--text-main)]">
                Inscripción por el colegio
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                La postulación es por equipo completo y la realiza formalmente la unidad educativa.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent-mint)]" />
              <h3 className="font-display font-bold text-sm text-[var(--text-main)]">
                Máx. 3 equipos por colegio
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Con autorización formal de la dirección del colegio para todos los inscritos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2">
              <GraduationCap className="w-5 h-5 text-[var(--accent-yellow)]" />
              <h3 className="font-display font-bold text-sm text-[var(--text-main)]">
                Un profesor acompañante
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Rol exclusivo de orientación metodológica, sin intervenir en el diseño ni en el
                pitch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2">
              <Clock className="w-5 h-5 text-[var(--accent-blue)]" />
              <h3 className="font-display font-bold text-sm text-[var(--text-main)]">
                Asignación de cupos
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Por orden cronológico de postulación con filtro de representatividad equitativa.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2">
              <Camera className="w-5 h-5 text-[var(--accent-orange)]" />
              <h3 className="font-display font-bold text-sm text-[var(--text-main)]">
                Difusión institucional
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                La participación implica aceptar la toma de fotografías y videos para difusión
                académica.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2">
              <Laptop className="w-5 h-5 text-[var(--accent-mint)]" />
              <h3 className="font-display font-bold text-sm text-[var(--text-main)]">
                Laptop o celular
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Cada equipo debe llevar sus dispositivos; se provee material de escritorio y wifi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2">
              <Coins className="w-5 h-5 text-[var(--accent-yellow)]" />
              <h3 className="font-display font-bold text-sm text-[var(--text-main)]">
                Participación Gratuita
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Bs 0 de costo de postulación o participación para los colegios y estudiantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. CRONOGRAMA (id="cronograma")                           */}
      {/* ======================================================== */}
      <section id="cronograma" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-block">
            <TapeBadge text="FECHAS & SEDE OFICIAL" rotate="-1deg" color="var(--accent-yellow)" />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text-main)]">
            Ficha del Evento & Cronograma
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Conoce la sede, horarios, etapas preparatorias y la agenda referencial de la jornada.
          </p>
        </div>

        {/* Grid de 12 Columnas en Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {/* Columna Izquierda (3 cols): ¿Qué llevar? + Dato Útil */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[var(--accent-blue)]" />
                <h3 className="font-display font-black text-lg text-[var(--text-main)]">
                  ¿Qué llevar?
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--text-muted)]">
                {PROGRAM_DATA.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-mint)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-main)] block">{item.item}</strong>
                      <span className="text-[11px] text-[var(--text-muted)]">{item.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-orange)] font-bold block">
                {PROGRAM_DATA.usefulFact.title}
              </span>
              <p className="text-xs text-[var(--text-main)]">{PROGRAM_DATA.usefulFact.desc}</p>
            </div>
          </div>

          {/* Columna Central (6 cols): FICHA DEL EVENTO */}
          <div className="md:col-span-2 lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow-lg overflow-hidden">
              <div className="bg-[var(--accent-yellow)] py-2 px-6 border-b-2 border-[var(--border-ink)] flex items-center justify-between font-mono text-xs font-bold text-[#111111]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  FICHA OFICIAL DEL EVENTO
                </span>
                <span>{PROGRAM_DATA.sheetNumber}</span>
              </div>

              <div className="p-6 sm:p-8 space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[var(--accent-orange)] font-bold uppercase block mb-1">
                    UNIVERSIDAD CATÓLICA BOLIVIANA "SAN PABLO"
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-main)] tracking-tight">
                    IDEATHON 2026
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Facultad de Ciencias Económicas y Financieras · UCB Sede La Paz
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-blue)] mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>FECHA</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
                      {PROGRAM_DATA.eventDate}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-orange)] mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>HORARIO</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
                      {PROGRAM_DATA.eventTime}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-mint)] mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>SEDE</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
                      {PROGRAM_DATA.eventLocation}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setIsMapModalOpen(true)}
                    className="px-5 py-2.5 bg-[var(--bg-accent-blue)] text-white text-xs sm:text-sm font-bold rounded-xl border-2 border-[var(--border-ink)] sticker-shadow hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Cómo llegar</span>
                  </button>

                  <button
                    onClick={handleDownloadICS}
                    className="px-5 py-2.5 bg-[var(--accent-yellow)] text-[#111111] text-xs sm:text-sm font-bold rounded-xl border-2 border-[var(--border-ink)] sticker-shadow hover:brightness-105 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-[#111111]" />
                    <span>Agregar al calendario (.ics)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha (3 cols): CUENTA REGRESIVA + Recuerda */}
          <div className="lg:col-span-3 space-y-6 order-3">
            <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-orange)] font-bold block">
                CUENTA REGRESIVA
              </span>
              <h4 className="font-display font-black text-lg text-[var(--text-main)]">
                Tiempo hacia el evento
              </h4>
              <CountdownTimer />
            </div>

            <div className="p-5 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-blue)] font-bold block">
                {PROGRAM_DATA.rememberNote.title}
              </span>
              <p className="text-xs text-[var(--text-main)] font-semibold">
                {PROGRAM_DATA.rememberNote.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Línea de Hitos con DrawSVG */}
        <div className="milestones-container space-y-6 pt-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-bold text-[var(--accent-orange)] uppercase">
              ETAPAS OFICIALES
            </span>
            <h3 className="font-display font-black text-2xl text-[var(--text-main)]">
              Hitos de la convocatoria
            </h3>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0">
              <svg className="w-full h-4 overflow-visible" viewBox="0 0 1000 12" fill="none">
                <path
                  ref={milestonesLineRef}
                  d="M 50 6 L 950 6"
                  stroke="var(--accent-blue)"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {PROGRAM_DATA.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-[var(--accent-blue)] text-white text-[10px] font-mono font-bold uppercase">
                      {m.badge}
                    </span>
                    {m.isDeadline && (
                      <span className="px-2 py-0.5 rounded-md bg-[var(--accent-orange)] text-white text-[10px] font-mono font-bold uppercase">
                        Fecha límite
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs font-bold text-[var(--accent-blue)]">
                    {m.date}
                  </div>
                  <h4 className="font-display font-black text-lg text-[var(--text-main)]">
                    {m.title}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agenda Referencial de la Jornada */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[var(--accent-orange)]">
                HORARIOS POR CONFIRMAR
              </span>
              <h3 className="font-display font-black text-2xl text-[var(--text-main)]">
                Agenda referencial de la jornada (Viernes 6 de noviembre)
              </h3>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              09:00 a 13:00 · Capilla UCB
            </span>
          </div>

          <div className="divide-y divide-[var(--border-soft)]">
            {PROGRAM_DATA.dayAgenda.map((item, idx) => (
              <div
                key={idx}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-sm text-[var(--accent-blue)] w-16">
                    {item.time}
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base text-[var(--text-main)]">
                    {item.title}
                  </span>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold self-start sm:self-auto uppercase"
                  style={{
                    backgroundColor: item.badgeColor === "#111111" ? "#1F3FD1" : item.badgeColor,
                    color: item.badgeColor === "#FFD23F" ? "#111111" : "#ffffff",
                  }}
                >
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. PREMIOS (id="premios")                                 */}
      {/* ======================================================== */}
      <section
        id="premios"
        className="py-20 bg-[var(--bg-surface-2)] border-y-2 border-[var(--border-soft)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-block">
              <TapeBadge
                text="EXPERIENCIAS DE FORMACIÓN"
                rotate="-1.5deg"
                color="var(--accent-yellow)"
              />
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text-main)]">
              Premios que abren puertas
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Los integrantes de los TRES equipos con mayor puntuación ganan experiencias
              empresariales y formativas de alto impacto.
            </p>
          </div>

          {/* Podio 1º, 2º y 3º Lugar */}
          <div className="podium-grid-wrapper grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* 2do Lugar (Izquierda) */}
            <div className="podium-card-item order-2 md:order-1 p-7 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow flex flex-col justify-between hover:-translate-y-1 transition-transform card-theme-transition">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-[var(--accent-orange)] text-white border-2 border-[var(--border-ink)]">
                    2do Lugar
                  </span>
                  <Award className="w-7 h-7 text-[var(--accent-orange)]" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[var(--text-main)] mb-4">
                  {PRIZES_DATA[1].title}
                </h3>
                <ul className="space-y-2.5 text-xs text-[var(--text-muted)]">
                  {PRIZES_DATA[1].perks.map((p, pi) => (
                    <li key={pi} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-mint)] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 1er Lugar (Centro Elevado con Brillo) */}
            <div className="podium-card-item order-1 md:order-2 p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border-4 border-[var(--accent-yellow)] sticker-shadow-lg flex flex-col justify-between md:-translate-y-4 hover:-translate-y-5 transition-transform relative overflow-hidden card-theme-transition">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--accent-yellow)]/20 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black font-mono bg-[var(--accent-yellow)] text-[#111111] border-2 border-[var(--border-ink)] sticker-shadow uppercase">
                    1er Lugar · Campeón
                  </span>
                  <Crown className="w-8 h-8 text-[var(--accent-yellow)] fill-current" />
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-main)] mb-4">
                  {PRIZES_DATA[0].title}
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[var(--text-main)]">
                  {PRIZES_DATA[0].perks.map((p, pi) => (
                    <li key={pi} className="flex items-start gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-yellow)] fill-current text-[#111111] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t-2 border-[var(--border-soft)]">
                <span className="text-[11px] font-mono text-[var(--accent-orange)] font-bold">
                  Premio mayor con aval institucional UCB
                </span>
              </div>
            </div>

            {/* 3er Lugar (Derecha) */}
            <div className="podium-card-item order-3 md:order-3 p-7 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow flex flex-col justify-between hover:-translate-y-1 transition-transform card-theme-transition">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-[var(--accent-mint)] text-[#111111] border-2 border-[var(--border-ink)]">
                    3er Lugar
                  </span>
                  <Award className="w-7 h-7 text-[var(--accent-mint)]" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[var(--text-main)] mb-4">
                  {PRIZES_DATA[2].title}
                </h3>
                <ul className="space-y-2.5 text-xs text-[var(--text-muted)]">
                  {PRIZES_DATA[2].perks.map((p, pi) => (
                    <li key={pi} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-mint)] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bloque Principal Destacado: Las 3 Experiencias */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCE_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] space-y-2"
              >
                <div className="font-mono text-xs font-bold text-[var(--accent-blue)]">
                  EXPERIENCIA {step.step}
                </div>
                <h4 className="font-display font-black text-lg text-[var(--text-main)]">
                  {step.title}
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Certificados para todos & Nota oficial */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--accent-blue)]/10 border-2 border-[var(--accent-blue)] space-y-4 text-center max-w-3xl mx-auto">
            <h4 className="font-display font-black text-xl text-[var(--text-main)]">
              Certificado Oficial para TODOS los Participantes
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Todos los estudiantes inscritos y sus profesores acompañantes recibirán certificados
              oficiales emitidos por la Facultad de Ciencias Económicas y Financieras de la
              Universidad Católica Boliviana "San Pablo" Sede La Paz.
            </p>
            <span className="text-[11px] font-mono text-[var(--text-muted)] block">
              * Las empresas aliadas a visitar serán comunicadas por los organizadores.
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. ORGANIZA (id="organiza")                               */}
      {/* ======================================================== */}
      <section id="organiza" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-block">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-blue)]">
                ORGANIZADOR ACADÉMICO
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-main)]">
              Facultad de Ciencias Económicas y Financieras · UCB Sede La Paz
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              La UCB organiza el Ideathon como un espacio de vinculación activa entre estudiantes de
              colegio, la comunidad universitaria y las organizaciones de desarrollo socioeconómico
              del país.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)] space-y-1">
                <strong className="text-xs text-[var(--text-main)] block">
                  Liderazgo & Decisiones
                </strong>
                <span className="text-[11px] text-[var(--text-muted)]">
                  Formación estratégica y visión ética para liderar organizaciones.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)] space-y-1">
                <strong className="text-xs text-[var(--text-main)] block">
                  Proyectos & Emprendimiento
                </strong>
                <span className="text-[11px] text-[var(--text-muted)]">
                  Metodologías ágiles y creación de modelos de negocio sostenibles.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)] space-y-1">
                <strong className="text-xs text-[var(--text-main)] block">
                  Convenios Empresariales
                </strong>
                <span className="text-[11px] text-[var(--text-muted)]">
                  Pasantías y vinculación directa con empresas líderes de Bolivia.
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://ucb.edu.bo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[var(--accent-blue)] text-white font-display font-bold text-xs sm:text-sm border-2 border-[var(--border-ink)] sticker-shadow hover:opacity-95 transition-all flex items-center gap-2"
              >
                <span>Conoce más en la web de la UCB</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                Información referencial
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 text-center p-6 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-yellow)] text-[#111111] mx-auto flex items-center justify-center font-display font-black text-2xl border-2 border-[var(--border-ink)] sticker-shadow">
              UCB
            </div>
            <h3 className="font-display font-black text-xl text-[var(--text-main)]">
              Administración de Empresas
            </h3>
            <p className="text-xs text-[var(--text-muted)]">Sede La Paz · Capilla UCB</p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. SOCIOS Y AUSPICIADOR (Tira con logos)                 */}
      {/* ======================================================== */}
      <section className="py-16 bg-[var(--bg-surface)] border-y-2 border-[var(--border-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-blue)]">
                RED DE APOYO INSTITUCIONAL
              </span>
              <h3 className="font-display font-black text-2xl text-[var(--text-main)]">
                Socios y Auspiciador
              </h3>
            </div>
            <Link
              to="/socios"
              className="text-xs font-mono font-bold text-[var(--accent-blue)] hover:underline flex items-center gap-1.5"
            >
              <span>Conoce a todos los socios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/socios"
              className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] hover:border-[var(--border-ink)] transition-all text-center space-y-1.5"
            >
              <span className="text-[10px] font-mono uppercase text-[var(--accent-blue)] font-bold block">
                Socio
              </span>
              <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-main)]">
                Fundación Jubileo
              </h4>
              <span className="text-[11px] text-[var(--text-muted)] block">
                Investigación & Datos
              </span>
            </Link>

            <Link
              to="/socios"
              className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] hover:border-[var(--border-ink)] transition-all text-center space-y-1.5"
            >
              <span className="text-[10px] font-mono uppercase text-[var(--accent-orange)] font-bold block">
                Socio
              </span>
              <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-main)]">
                Manq'a
              </h4>
              <span className="text-[11px] text-[var(--text-muted)] block">Gastronomía Social</span>
            </Link>

            <Link
              to="/socios"
              className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] hover:border-[var(--border-ink)] transition-all text-center space-y-1.5"
            >
              <span className="text-[10px] font-mono uppercase text-[var(--accent-yellow)] font-bold block">
                Socio
              </span>
              <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-main)]">
                Escuela Doria Medina
              </h4>
              <span className="text-[11px] text-[var(--text-muted)] block">Mentoría & Premios</span>
            </Link>

            <Link
              to="/socios"
              className="p-5 rounded-2xl bg-[var(--accent-yellow)]/20 border-2 border-[var(--accent-yellow)] hover:border-[var(--border-ink)] transition-all text-center space-y-1.5"
            >
              <span className="text-[10px] font-mono uppercase text-[#111111] font-black block">
                Auspicia
              </span>
              <h4 className="font-display font-black text-sm sm:text-base text-[var(--text-main)]">
                Banco Sol (BancoSol)
              </h4>
              <span className="text-[11px] text-[var(--text-muted)] block">
                Microfinanzas & Inclusión
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 11. FAQ (id="faq")                                       */}
      {/* ======================================================== */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-block">
            <TapeBadge text="PREGUNTAS FRECUENTES" rotate="-1deg" color="var(--accent-yellow)" />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[var(--text-main)]">
            Todo lo que necesitas saber
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Respuestas directas a las dudas comunes sobre el certamen escolar.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-display font-bold text-sm sm:text-base text-[var(--text-main)] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-200 shrink-0 ml-3 ${
                      isOpen ? "rotate-180 text-[var(--accent-blue)]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-soft)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 12. CTA FINAL CON COHETE                                 */}
      {/* ======================================================== */}
      <section className="py-20 bg-[var(--bg-accent-blue)] text-white border-t-4 border-[var(--border-ink)] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="w-16 h-16 mx-auto flex items-center justify-center">
            <RocketVehicleSVG size={52} />
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Prepárate para el Ideathon
          </h2>

          <p className="text-sm sm:text-lg text-[var(--sky-soft)] max-w-2xl mx-auto leading-relaxed">
            Revisa los reportes con datos reales, mira los videos de inspiración y domina la
            metodología del Lean Canvas para defender tu propuesta ante el jurado.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/reportes"
              className="px-5 py-3 rounded-xl bg-white text-[#111111] font-display font-black text-xs sm:text-sm border-2 border-[var(--border-ink)] sticker-shadow hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Revisar reportes
            </Link>

            <Link
              to="/videos"
              className="px-5 py-3 rounded-xl bg-[var(--accent-orange)] text-white font-display font-black text-xs sm:text-sm border-2 border-[var(--border-ink)] sticker-shadow hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Mirar videos
            </Link>

            <Link
              to="/metodologia"
              className="px-5 py-3 rounded-xl bg-[var(--accent-yellow)] text-[#111111] font-display font-black text-xs sm:text-sm border-2 border-[var(--border-ink)] sticker-shadow hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Dominar metodología
            </Link>
          </div>
        </div>
      </section>

      {/* Modal de Mapa Interactivo */}
      <InteractiveMapModal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} />
    </div>
  );
};
