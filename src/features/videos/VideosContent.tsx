import { TapeBadge } from "@/components/decorative/DoodleSVGs";
import { ArrowRight, Clock, HelpCircle, Play, Video as VideoIcon, X } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SAMPLE_VIDEOS, VIDEO_REFLECTION_QUESTIONS, VideoItem } from "./data/videos";

export const VideosContent: React.FC = () => {
  const [partnerFilter, setPartnerFilter] = useState<string>(
    () => new URLSearchParams(window.location.search).get("socio") ?? "all",
  );
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  const partners = [
    { id: "all", label: "Todos los socios" },
    ...Array.from(new Set(SAMPLE_VIDEOS.map((video) => video.creator))).map((creator) => ({
      id: creator === "Manq'a" ? "manqa" : "samuel",
      label:
        creator === "Escuela de Emprendedores Samuel Doria Medina"
          ? "Escuela Doria Medina"
          : creator,
    })),
  ];

  const sectors = [
    { id: "all", label: "Todos los rubros" },
    { id: "agro", label: "Agro" },
    { id: "gastronomia", label: "Gastronomía" },
    { id: "textil", label: "Textil" },
    { id: "artesania", label: "Artesanía" },
    { id: "servicios", label: "Servicios" },
    { id: "otros", label: "Otros" },
  ];

  const filteredVideos = useMemo(() => {
    return SAMPLE_VIDEOS.filter((v) => {
      const matchPartner =
        partnerFilter === "all" ||
        (partnerFilter === "manqa"
          ? v.creator === "Manq'a"
          : v.creator === "Escuela de Emprendedores Samuel Doria Medina");
      const matchSector = sectorFilter === "all" || v.sector === sectorFilter;
      return matchPartner && matchSector;
    });
  }, [partnerFilter, sectorFilter]);

  const featuredVideo = SAMPLE_VIDEOS.find((v) => v.isFeatured) || SAMPLE_VIDEOS[0];

  useEffect(() => {
    if (!activeModalVideo) return;

    const previousOverflow = document.body.style.overflow;
    const previousScrollY = window.scrollY;
    const modal = modalRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (document.fullscreenElement) {
          void document.exitFullscreen();
          return;
        }
        setActiveModalVideo(null);
        return;
      }

      if (event.key === "Tab" && modal) {
        const focusable = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) {
          event.preventDefault();
          closeButtonRef.current?.focus({ preventScroll: true });
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!modal.contains(document.activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.scrollTo(0, previousScrollY);
      returnFocusRef.current?.focus({ preventScroll: true });
    };
  }, [activeModalVideo]);

  const handleOpenVideo = (video: VideoItem, trigger: HTMLButtonElement) => {
    if (video.src) {
      returnFocusRef.current = trigger;
      setActiveModalVideo(video);
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-200">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-block">
            <TapeBadge text="CÁPSULAS DE INSPIRACIÓN" rotate="-1deg" color="var(--accent-yellow)" />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-[var(--text-main)] tracking-tight">
            Videos: historias que inspiran ideas
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Conoce testimonios y modelos de negocio de productores y emprendedores paceños
            elaborados por Manq'a, la Escuela de Emprendedores Samuel Doria Medina y Fundación
            Jubileo.
          </p>
        </div>

        {/* Video Destacado Arriba */}
        {featuredVideo && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Facade / Thumbnail */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border-2 border-[var(--border-ink)] bg-slate-900 aspect-video flex items-center justify-center group shadow-md">
              {featuredVideo.poster && (
                <img
                  src={featuredVideo.poster}
                  alt=""
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent z-10" />

              <div className="relative z-20 text-center p-6 space-y-3">
                {featuredVideo.src ? (
                  <button
                    onClick={(event) => handleOpenVideo(featuredVideo, event.currentTarget)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--accent-yellow)] text-[#111111] flex items-center justify-center mx-auto border-3 border-[var(--border-ink)] sticker-shadow group-hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    aria-label={`Reproducir video ${featuredVideo.title}`}
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-yellow)] text-[#111111] font-display font-black text-xs sm:text-sm border-2 border-[var(--border-ink)] sticker-shadow">
                    <Clock className="w-4 h-4" />
                    <span>Próximamente para la jornada</span>
                  </div>
                )}
                <div className="text-white text-xs font-mono font-bold tracking-wider uppercase opacity-90">
                  {featuredVideo.municipality} · {featuredVideo.duration}
                </div>
              </div>

              {/* Tag de creador */}
              <div className="absolute bottom-3 left-3 z-20 px-3 py-1 rounded-lg bg-black/80 text-white text-xs font-mono font-bold border border-white/20">
                Elaborado por: {featuredVideo.creator}
              </div>
            </div>

            {/* Info Destacada */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-orange)]">
                <span>DESTACADO</span>
                <span>·</span>
                <span className="uppercase">{featuredVideo.sectorLabel}</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-main)] leading-tight">
                {featuredVideo.title}
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {featuredVideo.description}
              </p>

              <div className="pt-2 text-xs text-[var(--text-muted)] space-y-1">
                <div>
                  <strong>Emprendedor:</strong> {featuredVideo.entrepreneur}
                </div>
                <div>
                  <strong>Municipio:</strong> {featuredVideo.municipality}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">
                  * Cápsula referencial de muestra para el taller de ideación.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filtros por Socio y por Rubro */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b-2 border-[var(--border-soft)]">
            <h3 className="font-display font-black text-lg text-[var(--text-main)] flex items-center gap-2">
              <VideoIcon className="w-5 h-5 text-[var(--accent-blue)]" />
              Explora las cápsulas ({filteredVideos.length})
            </h3>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Filtra por socio productor y por rubro
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-[var(--text-muted)] mr-2">
              Socio:
            </span>
            {partners.map((p) => (
              <button
                key={p.id}
                onClick={() => setPartnerFilter(p.id)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border-2 transition-all cursor-pointer ${
                  partnerFilter === p.id
                    ? "bg-[var(--accent-blue)] text-white border-[var(--border-ink)] sticker-shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-[var(--text-muted)] mr-2">
              Rubro:
            </span>
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setSectorFilter(s.id)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border-2 transition-all cursor-pointer ${
                  sectorFilter === s.id
                    ? "bg-[var(--accent-orange)] text-white border-[var(--border-ink)] sticker-shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-soft)] hover:border-[var(--border-ink)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Videos (4 col desktop, 2 col tablet, 1 col móvil) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-transform card-theme-transition"
            >
              {/* Facade Thumbnail */}
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden border-b-2 border-[var(--border-ink)] group">
                {video.poster && (
                  <img
                    src={video.poster}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full ${video.orientation === "vertical" ? "object-contain" : "object-cover"}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

                {video.src ? (
                  <button
                    onClick={(event) => handleOpenVideo(video, event.currentTarget)}
                    className="relative z-20 w-12 h-12 rounded-full bg-[var(--accent-yellow)] text-[#111111] flex items-center justify-center border-2 border-[var(--border-ink)] sticker-shadow group-hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                    aria-label={`Ver video ${video.title}`}
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                ) : (
                  <span className="relative z-20 px-3 py-1 rounded-lg bg-[var(--bg-surface)]/90 text-[var(--text-main)] font-mono text-[10px] font-bold border border-[var(--border-ink)]">
                    Próximamente
                  </span>
                )}

                <span className="absolute bottom-2 right-2 z-20 text-[10px] font-mono font-bold text-white bg-black/60 px-1.5 py-0.5 rounded-sm">
                  {video.duration}
                </span>

                <span className="absolute top-2 left-2 z-20 text-[10px] font-mono font-bold text-white bg-[var(--accent-blue)] px-2 py-0.5 rounded-md uppercase">
                  {video.sectorLabel}
                </span>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-5 flex-grow space-y-2.5">
                <div className="text-[11px] font-mono text-[var(--text-muted)] font-bold">
                  {video.municipality}
                </div>

                <h3 className="font-display font-extrabold text-base text-[var(--text-main)] leading-snug line-clamp-2">
                  {video.title}
                </h3>

                <p className="text-xs text-[var(--text-muted)] line-clamp-2">{video.description}</p>

                <div className="pt-2 text-[11px] text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-main)]">Socio:</span>{" "}
                  {video.creator}
                </div>
                <img
                  src={
                    video.creator === "Manq'a"
                      ? "/media/partners/manqa-logo.jpg"
                      : "/media/partners/samuel-logo.jpeg"
                  }
                  alt={`Logo de ${video.creator}`}
                  loading="lazy"
                  decoding="async"
                  className="h-8 max-w-28 object-contain object-left"
                />
              </div>

              {/* Botón inferior */}
              <div className="p-4 pt-0">
                {video.src ? (
                  <button
                    onClick={(event) => handleOpenVideo(video, event.currentTarget)}
                    className="w-full py-2 rounded-xl bg-[var(--accent-yellow)] text-[#111111] text-xs font-bold border-2 border-[var(--border-ink)] sticker-shadow flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Ver cápsula</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-2 rounded-xl bg-[var(--bg-surface-2)] text-[var(--text-muted)] text-xs font-bold border border-[var(--border-soft)] cursor-not-allowed text-center"
                  >
                    Disponible en la jornada
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sección final: Cómo usar los videos en tu equipo */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--accent-blue)]/10 border-3 border-[var(--accent-blue)] sticker-shadow space-y-6">
          <div className="space-y-2">
            <div className="inline-block">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-blue)]">
                GUÍA PARA EL EQUIPO
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-main)]">
              Cómo usar los videos en tu equipo
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Sigue estos 3 pasos para aprovechar las cápsulas antes de armar tu modelo en el Lean
              Canvas:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent-yellow)] text-[#111111] font-display font-black flex items-center justify-center border border-[var(--border-ink)]">
                1
              </div>
              <h3 className="font-display font-bold text-base text-[var(--text-main)]">
                Ver con atención
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Observa cómo los productores identifican una materia prima y la convierten en una
                solución demandada.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent-orange)] text-white font-display font-black flex items-center justify-center border border-[var(--border-ink)]">
                2
              </div>
              <h3 className="font-display font-bold text-base text-[var(--text-main)]">
                Comentar en grupo
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Debatan qué dificultades enfrentaron y cómo lograron generar autoempleo o empleo
                para otros jóvenes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent-mint)] text-[#111111] font-display font-black flex items-center justify-center border border-[var(--border-ink)]">
                3
              </div>
              <h3 className="font-display font-bold text-base text-[var(--text-main)]">
                Convertir observaciones en ideas
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Anota elementos replicables para plasmarlos en el Lean Canvas y defenderlos en el
                pitch ante el jurado.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/metodologia"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-blue)] text-white font-display font-bold text-sm border-2 border-[var(--border-ink)] sticker-shadow hover:opacity-95 transition-all"
            >
              <span>Ir a la Metodología (Design Thinking + Lean Canvas)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Accessible Modal con Facade Video & Panel "Mientras miras, anota" */}
      {activeModalVideo && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[150] bg-black/80 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <div className="relative w-full max-w-4xl rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow-lg overflow-hidden my-8">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-4 px-6 border-b-2 border-[var(--border-soft)] bg-[var(--bg-surface-2)]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-orange)] font-bold">
                  {activeModalVideo.creator} · {activeModalVideo.municipality}
                </span>
                <h3
                  id="video-modal-title"
                  className="font-display font-black text-lg text-[var(--text-main)] truncate max-w-lg"
                >
                  {activeModalVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="w-9 h-9 rounded-xl bg-[var(--bg-surface)] text-[var(--text-main)] border-2 border-[var(--border-ink)] flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Cerrar video"
                ref={closeButtonRef}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className={`w-full bg-black ${activeModalVideo.orientation === "vertical" ? "max-h-[75vh]" : "aspect-video"}`}
            >
              <video
                key={activeModalVideo.id}
                src={activeModalVideo.src}
                poster={activeModalVideo.poster}
                title={activeModalVideo.title}
                controls
                autoPlay
                playsInline
                preload="none"
                className={`mx-auto h-full w-full ${activeModalVideo.orientation === "vertical" ? "max-h-[75vh] object-contain" : "object-contain"}`}
              />
            </div>

            {/* Panel: Mientras miras, anota */}
            <div className="p-6 bg-[var(--bg-surface)] space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[var(--accent-yellow)]" />
                <h4 className="font-display font-black text-base text-[var(--text-main)]">
                  Mientras miras, anota para tu equipo:
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {VIDEO_REFLECTION_QUESTIONS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)] space-y-1"
                  >
                    <strong className="text-[var(--text-main)] block">{item.q}</strong>
                    <span className="text-[var(--text-muted)] text-[11px] block">{item.hint}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
