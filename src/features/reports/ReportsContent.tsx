import { TapeBadge } from "@/components/decorative/DoodleSVGs";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Download,
  FileText,
  HelpCircle,
  Search,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  KEY_STATS_SAMPLE,
  PRODUCTIVE_POTENTIALS,
  READING_GUIDE_STEPS,
  SAMPLE_REPORTS,
  TEAM_QUESTIONS,
} from "./data/reports";

export const ReportsContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filterTabs = [
    { id: "all", label: "Todos" },
    { id: "desempleo", label: "Desempleo juvenil" },
    { id: "potencialidades", label: "Potencialidades de La Paz" },
    { id: "estadisticas", label: "Estadísticas" },
    { id: "papers", label: "Papers/Investigaciones" },
    { id: "institucionales", label: "Reportes institucionales" },
  ];

  const filteredReports = useMemo(() => {
    return SAMPLE_REPORTS.filter((doc) => {
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.institution.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredReport = SAMPLE_REPORTS.find((r) => r.isFeatured);

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-200">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-block">
            <TapeBadge
              text="BIBLIOTECA DE INVESTIGACIÓN"
              rotate="-1.5deg"
              color="var(--accent-yellow)"
            />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-[var(--text-main)] tracking-tight">
            Reportes: los datos detrás de tu idea
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Antes de crear, entiende el problema. Estos documentos te ayudan a conocer el empleo
            juvenil y las oportunidades productivas de La Paz.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[var(--accent-blue)]/10 text-[var(--accent-blue-text)] border border-[var(--accent-blue)]/30">
              Datos e investigaciones aportados por Fundación Jubileo y aliados
            </span>
          </div>
        </div>

        {/* Datos clave de un vistazo (4 tarjetas) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[var(--accent-blue-text)]" />
            <h2 className="font-display font-black text-xl sm:text-2xl text-[var(--text-main)]">
              Datos clave de un vistazo
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KEY_STATS_SAMPLE.map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] sticker-shadow space-y-2 card-theme-transition"
              >
                <div className="font-display font-black text-3xl sm:text-4xl text-[var(--accent-orange)]">
                  {st.value}
                </div>
                <h3 className="font-bold text-sm text-[var(--text-main)] leading-snug">
                  {st.label}
                </h3>
                <span className="text-[10px] font-mono text-[var(--text-muted)] block border-t border-[var(--border-soft)] pt-2 uppercase">
                  {st.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reporte Principal Destacado (Fundación Jubileo) */}
        {featuredReport && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface-2)] border-3 border-[var(--accent-blue)] sticker-shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[var(--accent-blue)] text-white font-mono text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
              Reporte Principal de Fundación Jubileo
            </div>

            <div className="max-w-3xl space-y-4 pt-4 sm:pt-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-blue-text)]">
                <span>{featuredReport.institution}</span>
                <span>·</span>
                <span>Año {featuredReport.year}</span>
                <span>·</span>
                <span className="uppercase">{featuredReport.type}</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-main)]">
                {featuredReport.title}
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                {featuredReport.summary}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {featuredReport.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono font-semibold text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-soft)] px-2.5 py-1 rounded-lg"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  disabled
                  className="px-5 py-2.5 rounded-xl bg-[var(--accent-yellow)] text-[#111111] font-bold text-xs sm:text-sm border-2 border-[var(--border-ink)] sticker-shadow opacity-90 cursor-not-allowed flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Ver / Descargar documento (Próximamente)</span>
                </button>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  Contenido de muestra · Disponible para la jornada
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Buscador & Filtros por Categoría */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Buscador */}
            <div className="relative flex-grow max-w-md">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por tema, institución o palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-hidden focus:ring-2 focus:ring-[var(--accent-blue)]"
              />
            </div>

            <div className="text-xs font-mono text-[var(--text-muted)] font-bold">
              Mostrando {filteredReports.length} de {SAMPLE_REPORTS.length} documentos
            </div>
          </div>

          {/* Chips de filtro */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterTabs.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono border-2 transition-all shrink-0 cursor-pointer ${
                    active
                      ? "bg-[var(--accent-blue)] text-white border-[var(--border-ink)] sticker-shadow-sm scale-102"
                      : "bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grilla de Documentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow flex flex-col justify-between hover:-translate-y-1 transition-transform card-theme-transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                  <span className="font-bold text-[var(--accent-blue-text)]">
                    {doc.institution}
                  </span>
                  <span>{doc.year}</span>
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="w-5 h-5 text-[var(--accent-orange)] shrink-0 mt-0.5" />
                  <h3 className="font-display font-extrabold text-lg text-[var(--text-main)] leading-snug">
                    {doc.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-3">
                  {doc.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {doc.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-[var(--bg-surface-2)] text-[var(--text-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[var(--border-soft)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  Muestra para el taller
                </span>
                <button
                  disabled
                  className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-muted)] text-xs font-bold border border-[var(--border-soft)] cursor-not-allowed flex items-center gap-1.5"
                >
                  <span>Próximamente</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Potencialidades productivas de La Paz (6 chips-tarjeta) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-6">
          <div className="space-y-2">
            <div className="inline-block">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-orange)]">
                VOCACIONES REGIONALES
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-main)]">
              Potencialidades productivas del departamento de La Paz
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Sectores estratégicos para generar ideas de negocio viables (contenido de ejemplo, a
              validar con los reportes oficiales durante el certamen).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTIVE_POTENTIALS.map((pot, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] space-y-2 hover:border-[var(--border-ink)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--accent-blue-text)]">
                    {pot.badge}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-mint)]" />
                </div>
                <h3 className="font-display font-bold text-base text-[var(--text-main)]">
                  {pot.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{pot.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guía para leer un reporte & Preguntas para tu equipo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Guía en 3 pasos */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow space-y-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--accent-blue-text)]" />
              <h2 className="font-display font-black text-xl sm:text-2xl text-[var(--text-main)]">
                Guía para leer un reporte
              </h2>
            </div>

            <div className="space-y-4">
              {READING_GUIDE_STEPS.map((st) => (
                <div
                  key={st.step}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)]"
                >
                  <div className="w-8 h-8 rounded-xl bg-[var(--accent-yellow)] text-[#111111] font-display font-black flex items-center justify-center shrink-0 border border-[var(--border-ink)]">
                    {st.step}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[var(--text-main)]">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preguntas para tu equipo */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[var(--accent-yellow)]/15 border-3 border-[var(--border-ink)] sticker-shadow space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[var(--accent-orange)]" />
              <h2 className="font-display font-black text-xl text-[var(--text-main)]">
                Preguntas para tu equipo
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Hazte estas 4 preguntas al revisar los documentos antes de formular tu propuesta:
            </p>
            <ul className="space-y-3">
              {TEAM_QUESTIONS.map((q, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-main)] font-medium"
                >
                  <span className="font-mono font-bold text-[var(--accent-blue-text)] mt-0.5">
                    0{i + 1}.
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3">
              <Link
                to="/metodologia"
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent-blue-text)] hover:underline"
              >
                <span>Aprende a transformar estos datos en el Lean Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
