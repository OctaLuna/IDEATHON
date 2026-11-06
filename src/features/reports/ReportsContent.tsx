import { TapeBadge } from "@/components/decorative/DoodleSVGs";
import { Download, ExternalLink, Maximize2, X } from "lucide-react";
import { useRef } from "react";

const PDF = "/media/docs/articulo-empleo-juvenil-2026.pdf";
const pages = [1, 2];

export const ReportsContent = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-200">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <header className="max-w-3xl mx-auto text-center space-y-4">
          <TapeBadge
            text="INVESTIGACIÓN PARA TU IDEA"
            rotate="-1.5deg"
            color="var(--accent-yellow)"
          />
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight">
            Reportes: los datos detrás de tu idea
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Antes de crear, entiende el problema. Conoce el panorama del empleo juvenil y las
            potencialidades de La Paz.
          </p>
        </header>

        <section
          aria-labelledby="report-title"
          className="max-w-5xl mx-auto p-5 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border-3 border-[var(--border-ink)] sticker-shadow-lg space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-[var(--accent-blue-text)]">
            <span>FUNDACIÓN JUBILEO</span>
            <span aria-hidden="true">·</span>
            <span>NOVIEMBRE 2026</span>
            <span aria-hidden="true">·</span>
            <span>2 PÁGINAS</span>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-orange)]">
              Empleo juvenil y potencialidades de La Paz
            </p>
            <h2
              id="report-title"
              className="font-display font-black text-2xl sm:text-4xl leading-tight"
            >
              Más empleo no basta: Bolivia necesita trabajo digno para sus jóvenes
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-3xl">
              Un análisis de coyuntura sobre el empleo juvenil, la calidad del trabajo y las
              oportunidades productivas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[var(--border-ink)] bg-[var(--accent-yellow)] text-[#111111] font-bold text-sm sticker-shadow cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" aria-hidden="true" /> Ampliar reporte
            </button>
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[var(--border-ink)] bg-[var(--bg-surface-2)] font-bold text-sm sticker-shadow"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" /> Abrir PDF
            </a>
            <a
              href={PDF}
              download
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[var(--border-ink)] bg-[var(--bg-surface-2)] font-bold text-sm sticker-shadow"
            >
              <Download className="w-4 h-4" aria-hidden="true" /> Descargar PDF
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 rounded-2xl bg-[var(--bg-surface-2)] border-2 border-[var(--border-soft)] p-3 sm:p-5">
            {pages.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => dialogRef.current?.showModal()}
                aria-label={`Ampliar reporte, vista previa de página ${page}`}
                className="block w-full cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-blue)]"
              >
                <img
                  src={`/media/docs/articulo-empleo-juvenil-pagina-${page}.png`}
                  alt={`Vista previa de la página ${page} del reporte`}
                  className="block w-full rounded-lg border border-[var(--border-soft)]"
                  loading={page === 2 ? "lazy" : "eager"}
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Si tu dispositivo no muestra el visor, selecciona «Abrir PDF» o descárgalo.
          </p>
        </section>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="report-dialog-title"
        className="m-auto w-[calc(100%-1.5rem)] max-w-6xl max-h-[94dvh] rounded-3xl border-3 border-[var(--border-ink)] bg-[var(--bg-page)] text-[var(--text-main)] p-4 sm:p-6 backdrop:bg-black/80"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 id="report-dialog-title" className="font-display font-black text-xl sm:text-2xl">
            Vista ampliada del reporte
          </h2>
          <div className="flex items-center gap-3">
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm text-[var(--accent-blue-text)] underline"
            >
              Abrir PDF
            </a>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Cerrar vista ampliada"
              className="p-2 rounded-xl border-2 border-[var(--border-ink)] bg-[var(--bg-surface)] cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <iframe
          title="Reporte sobre empleo juvenil"
          src={PDF + "#view=FitH"}
          className="hidden md:block w-full h-[70vh] rounded-xl border-2 border-[var(--border-ink)] bg-white"
        >
          Tu navegador no admite la vista previa. Usa el enlace Abrir PDF.
        </iframe>
        <div className="md:hidden max-h-[70dvh] overflow-y-auto space-y-3">
          {pages.map((page) => (
            <img
              key={page}
              src={`/media/docs/articulo-empleo-juvenil-pagina-${page}.png`}
              alt={`Página ${page} del reporte`}
              className="block w-full rounded-lg border border-[var(--border-soft)]"
            />
          ))}
        </div>
      </dialog>
    </div>
  );
};
