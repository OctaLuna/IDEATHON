import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { TapeBadge } from "@/components/decorative/DoodleSVGs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Coins,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ECOSYSTEM_FLOW_STEPS, PARTNERS_DATA } from "./data/companies";

export const PartnersContent: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".partner-card-item").forEach((card, i) => {
          const fromX = i % 2 === 0 ? -30 : 30;

          ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.fromTo(
                card,
                { opacity: 0, x: fromX },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.55,
                  ease: "power2.out",
                },
              );
            },
          });
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  const partnersOnly = PARTNERS_DATA.filter((p) => p.roleType === "socio");
  const sponsor = PARTNERS_DATA.find((p) => p.roleType === "auspiciador");

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-28 sm:pt-36 pb-24 bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-200"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-block">
            <TapeBadge
              text="ECOSISTEMA INTERINSTITUCIONAL"
              rotate="-1deg"
              color="var(--accent-yellow)"
            />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-[var(--text-main)] tracking-tight">
            Nuestros socios y auspiciador
          </h1>
          <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow inline-block">
            <span className="text-xs sm:text-sm font-bold text-[var(--text-main)]">
              Organiza: Facultad de Ciencias Económicas y Financieras · UCB Sede La Paz
            </span>
          </div>
          <p className="text-base sm:text-lg text-[var(--text-muted)]">
            Instituciones de investigación, gastronomía social, formación de negocios y
            microfinanzas que inspiran y potencian a los equipos del Ideathon.
          </p>
        </div>

        {/* 3 Tarjetas de Socios (Fundación Jubileo, Manq'a, Escuela Doria Medina) */}
        <div className="space-y-12">
          {partnersOnly.map((partner, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={partner.id}
                className="partner-card-item p-6 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow-lg transition-transform hover:-translate-y-0.5 card-theme-transition"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column (Brand & Stats) */}
                  <div className={`lg:col-span-4 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="p-6 sm:p-8 rounded-2xl border-2 border-[var(--border-soft)] text-center relative overflow-hidden sticker-shadow bg-[var(--bg-surface-2)]">
                      <div className="company-logo-icon w-16 h-16 mx-auto rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] flex items-center justify-center mb-4 sticker-shadow">
                        {partner.id === "manqa" ? (
                          <img
                            src="/media/partners/manqa-logo.jpg"
                            alt="Logo de Manq'a"
                            className="h-full w-full rounded-xl object-contain"
                          />
                        ) : partner.id === "escuela-doria-medina" ? (
                          <img
                            src="/media/partners/samuel-logo.jpeg"
                            alt="Logo de la Escuela de Emprendedores Samuel Doria Medina"
                            className="h-full w-full rounded-xl object-contain"
                          />
                        ) : (
                          <Building2 className="w-8 h-8 text-[var(--accent-blue)]" />
                        )}
                      </div>

                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold font-mono border border-[var(--border-ink)] mb-3 bg-[var(--accent-yellow)] text-[#111111]">
                        {partner.badge}
                      </div>

                      <h3 className="font-display font-black text-xl sm:text-2xl text-[var(--text-main)]">
                        {partner.name}
                      </h3>

                      {/* Key stats list */}
                      <div className="mt-5 pt-4 border-t border-[var(--border-soft)] space-y-2 text-left">
                        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block">
                          DATOS CLAVE:
                        </span>
                        {partner.keyStats.map((st, i) => (
                          <div
                            key={i}
                            className="text-xs sm:text-sm text-[var(--text-muted)] font-medium flex items-center gap-2"
                          >
                            <span className="text-[var(--accent-blue)] font-bold">·</span>
                            <span>{st}</span>
                          </div>
                        ))}
                      </div>

                      {partner.website && (
                        <div className="mt-6 pt-3">
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--bg-surface)] text-[var(--text-main)] text-xs sm:text-sm font-bold rounded-xl border border-[var(--border-ink)] hover:bg-[var(--accent-yellow)] hover:text-[#111111] transition-colors"
                          >
                            <span>Visitar sitio oficial</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column (Detailed Investigation) */}
                  <div className={`lg:col-span-8 space-y-5 ${isEven ? "" : "lg:order-1"}`}>
                    <div>
                      <span className="text-xs font-bold font-mono text-[var(--accent-blue)] uppercase tracking-wider block mb-1">
                        RESUMEN INSTITUCIONAL
                      </span>
                      <p className="text-sm sm:text-base text-[var(--text-main)] leading-relaxed">
                        {partner.summary}
                      </p>
                    </div>

                    {partner.origin && (
                      <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)] text-xs sm:text-sm">
                        <span className="font-mono font-bold text-[var(--text-muted)] uppercase text-[10px] block mb-1">
                          ORIGEN & TRAYECTORIA HISTÓRICA:
                        </span>
                        <p className="text-[var(--text-muted)]">{partner.origin}</p>
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)]">
                      <span className="text-xs font-bold font-mono text-[var(--accent-blue)] uppercase block mb-1">
                        MISIÓN:
                      </span>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] italic">
                        "{partner.mission}"
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold font-mono text-[var(--accent-blue)] uppercase block mb-2">
                        ÁREAS DE TRABAJO:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {partner.workAreas.map((area, ai) => (
                          <div
                            key={ai}
                            className="work-area-chip flex items-start gap-2 p-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[var(--accent-mint)] shrink-0 mt-0.5" />
                            <span className="text-[var(--text-main)]">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Destacado: Su aporte a la metodología y a los videos */}
                    <div className="p-5 rounded-2xl bg-[var(--accent-blue)]/10 border-2 border-[var(--accent-blue)] space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[var(--accent-blue)]" />
                        <span className="text-xs font-bold font-mono text-[var(--accent-blue)] uppercase tracking-wider">
                          SU APORTE A LA METODOLOGÍA Y A LOS VIDEOS
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed font-medium">
                        {partner.contribution}
                      </p>

                      {partner.links && partner.links.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          {partner.links.map((lnk, li) => (
                            <Link
                              key={li}
                              to={lnk.url}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-blue)] text-white text-xs font-bold border border-[var(--border-ink)] hover:opacity-90"
                            >
                              <span>{lnk.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {partner.disclaimer && (
                      <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{partner.disclaimer}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tarjeta Diferenciada del Auspiciador (Banco Sol) */}
        {sponsor && (
          <div className="partner-card-item p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[var(--accent-yellow)]/25 via-[var(--bg-surface)] to-[var(--bg-surface)] border-3 border-[var(--accent-yellow)] sticker-shadow-lg card-theme-transition">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <div className="p-6 sm:p-8 rounded-2xl border-2 border-[var(--border-ink)] bg-[var(--accent-yellow)]/20 text-center relative sticker-shadow">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--accent-yellow)] border-2 border-[var(--border-ink)] flex items-center justify-center mb-4 sticker-shadow">
                    <Coins className="w-8 h-8 text-[#111111]" />
                  </div>

                  <div className="inline-block px-3.5 py-1 rounded-full text-xs font-black font-mono border-2 border-[var(--border-ink)] mb-3 bg-[var(--accent-yellow)] text-[#111111] uppercase tracking-wider">
                    AUSPICIADOR
                  </div>

                  <h3 className="font-display font-black text-2xl text-[var(--text-main)]">
                    {sponsor.name}
                  </h3>

                  <div className="mt-5 pt-4 border-t border-[var(--border-soft)] space-y-2 text-left">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold block">
                      DATOS INSTITUCIONALES:
                    </span>
                    {sponsor.keyStats.map((st, i) => (
                      <div
                        key={i}
                        className="text-xs sm:text-sm text-[var(--text-muted)] font-medium flex items-center gap-2"
                      >
                        <span className="text-[var(--accent-orange)] font-bold">·</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>

                  {sponsor.website && (
                    <div className="mt-6 pt-3">
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--bg-surface)] text-[var(--text-main)] text-xs sm:text-sm font-bold rounded-xl border-2 border-[var(--border-ink)] hover:bg-[var(--accent-yellow)] hover:text-[#111111] transition-colors"
                      >
                        <span>Visitar BancoSol</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <div>
                  <span className="text-xs font-bold font-mono text-[var(--accent-orange)] uppercase tracking-wider block mb-1">
                    ROL DE AUSPICIO & IMPACTO
                  </span>
                  <p className="text-sm sm:text-base text-[var(--text-main)] leading-relaxed">
                    {sponsor.summary}
                  </p>
                </div>

                {sponsor.origin && (
                  <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)] text-xs sm:text-sm">
                    <span className="font-mono font-bold text-[var(--text-muted)] uppercase text-[10px] block mb-1">
                      TRAYECTORIA PIONERA:
                    </span>
                    <p className="text-[var(--text-muted)]">{sponsor.origin}</p>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)]">
                  <span className="text-xs font-bold font-mono text-[var(--accent-orange)] uppercase block mb-1">
                    MISIÓN SOCIAL Y FINANCIERA:
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] italic">
                    "{sponsor.mission}"
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--accent-yellow)]/20 border-2 border-[var(--border-ink)] space-y-3">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#111111]" />
                    <span className="text-xs font-bold font-mono text-[#111111] uppercase tracking-wider">
                      CONEXIÓN CON EL IDEATON & EL LEAN CANVAS
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed font-medium">
                    {sponsor.contribution}
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/metodologia"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-yellow)] text-[#111111] text-xs font-bold border-2 border-[var(--border-ink)] hover:brightness-105"
                    >
                      <span>Ver estructura del Lean Canvas</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Información sujeta a verificación y ajustes por los organizadores oficiales.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cierre: Diagrama SVG animado sencillo */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow text-center space-y-6">
          <div className="inline-block">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-blue)]">
              FLUJO DEL ECOSISTEMA
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-main)]">
            De la experiencia de los socios a tu propuesta ganadora
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {ECOSYSTEM_FLOW_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-ink)] sticker-shadow-sm flex flex-col items-center text-center space-y-2 relative"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--accent-blue)] text-white font-display font-black text-base flex items-center justify-center border-2 border-[var(--border-ink)]">
                  {step.step}
                </div>
                <h3 className="font-display font-extrabold text-base text-[var(--text-main)]">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">{step.desc}</p>
                {idx < ECOSYSTEM_FLOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[var(--accent-orange)]">
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
