import { PROGRAM_DATA } from "@/config/event";
import { Bus, ExternalLink, MapPin, Navigation, Train, X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface InteractiveMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveMapModal: React.FC<InteractiveMapModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-map-title"
    >
      <div className="relative w-full max-w-3xl my-auto bg-[var(--bg-page)] text-[var(--text-main)] rounded-3xl border-3 border-[var(--border-ink)] p-5 sm:p-8 sticker-shadow-lg max-h-[92vh] overflow-y-auto">
        {/* Top Header Bar inside Modal */}
        <div className="flex items-start justify-between gap-3 pb-3 mb-4 border-b-2 border-[var(--border-soft)]">
          <div className="pr-2">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase text-[var(--accent-blue-text)] mb-1">
              <MapPin className="w-4 h-4 text-[var(--accent-blue-text)]" />
              <span>SEDE OFICIAL DEL EVENTO</span>
            </div>
            <h3
              id="modal-map-title"
              className="font-display font-black text-xl sm:text-3xl text-[var(--text-main)] leading-tight"
            >
              Capilla de la UCB · Sede La Paz
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Av. 14 de Septiembre y Calle 2, Zona Obrajes, La Paz - Bolivia.
            </p>
          </div>

          {/* Close Button - Guaranteed Visible, High Contrast Red */}
          <button
            onClick={onClose}
            className="shrink-0 w-10 h-10 rounded-xl bg-[var(--accent-red)] text-white border-2 border-[var(--border-ink)] flex items-center justify-center sticker-shadow hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Cerrar modal de mapa"
            title="Cerrar"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Campus distribution layout */}
        <div className="my-5 rounded-2xl border-2 border-[var(--border-ink)] bg-[var(--bg-surface)] p-4 sm:p-5 sticker-shadow relative overflow-hidden">
          <div className="text-xs font-bold font-mono text-[var(--text-muted)] mb-3 flex flex-wrap items-center justify-between gap-2">
            <span>DISTRIBUCIÓN DE ESPACIOS // DÍA DEL EVENTO</span>
            <span className="px-2.5 py-0.5 bg-[var(--accent-yellow)] text-[#111111] text-[10px] rounded font-bold border border-[var(--border-ink)]">
              ACCESO PRINCIPAL CAPILLA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[var(--accent-blue)]/10 border-2 border-[var(--accent-blue)] text-left">
              <span className="text-[10px] font-bold font-mono text-[var(--accent-blue-text)]">
                ZONA A
              </span>
              <h4 className="font-bold text-sm text-[var(--text-main)] mt-1">
                Ingreso Capilla UCB
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Acreditación general, entrega de identificaciones y materiales de trabajo.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--accent-yellow)]/15 border-2 border-[var(--accent-yellow)] text-left">
              <span className="text-[10px] font-bold font-mono text-[var(--accent-orange)]">
                ZONA B
              </span>
              <h4 className="font-bold text-sm text-[var(--text-main)] mt-1">Nave Central</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Ceremonia inaugural, rondas de pitch de 5 minutos y premiación oficial.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--accent-mint)]/15 border-2 border-[var(--accent-mint)] text-left">
              <span className="text-[10px] font-bold font-mono text-[var(--accent-mint)]">
                ZONA C
              </span>
              <h4 className="font-bold text-sm text-[var(--text-main)] mt-1">Mesas de Trabajo</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Modelado ágil con Lean Canvas y mentoría docente interinstitucional.
              </p>
            </div>
          </div>
        </div>

        {/* Transportation guidelines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)]">
            <div className="flex items-center gap-2 font-bold mb-2 text-[var(--accent-blue-text)]">
              <Bus className="w-4 h-4" />
              <span>En Transporte Público & PumaKatari</span>
            </div>
            <p className="text-[var(--text-muted)] text-xs leading-relaxed">
              Ruta Integradora o Chasquipampa / Achumani hasta la parada Calle 2 de Obrajes.
              Minibuses desde el Centro hacia la Zona Sur.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-soft)]">
            <div className="flex items-center gap-2 font-bold mb-2 text-[var(--accent-orange)]">
              <Train className="w-4 h-4" />
              <span>En Mi Teleférico</span>
            </div>
            <p className="text-[var(--text-muted)] text-xs leading-relaxed">
              Línea Verde hasta la Estación Alto Obrajes o Línea Amarilla (Estación San Jorge /
              Curva de Holguín) y conexión de 5 minutos en transporte hasta la Calle 2.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-[var(--border-soft)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[var(--text-muted)]">
            Contacto UCB: <strong>{PROGRAM_DATA.contact.whatsapp}</strong>
          </div>
          <a
            href="https://maps.google.com/?q=Universidad+Catolica+Boliviana+La+Paz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-accent-blue)] text-white text-xs sm:text-sm font-bold rounded-xl border border-[var(--border-ink)] hover:opacity-90 transition-opacity"
          >
            <Navigation className="w-4 h-4" />
            <span>Abrir en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
};
