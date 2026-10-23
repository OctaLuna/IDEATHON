import {
  CrownDoodle,
  LightbulbDoodle,
  StarDoodle,
  TapeBadge,
} from "@/components/decorative/DoodleSVGs";
import { PROGRAM_DATA } from "@/config/event";
import { Building2, Mail, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const navLinks = [
    { label: "Ideathon 2026", path: "/" },
    { label: "Reportes", path: "/reportes" },
    { label: "Videos", path: "/videos" },
    { label: "Metodología", path: "/metodologia" },
    { label: "Socios", path: "/socios" },
  ];

  return (
    <footer className="relative bg-[var(--bg-surface)] text-[var(--text-main)] pt-16 pb-12 overflow-hidden border-t-4 border-[var(--accent-blue)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-[var(--border-soft)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-yellow)] border-2 border-[var(--border-ink)] flex items-center justify-center sticker-shadow -rotate-3">
              <LightbulbDoodle size={28} color="#111111" />
            </div>
            <div>
              <span className="font-display font-black text-3xl tracking-tight text-[var(--text-main)] block">
                IDEATHON<span className="text-[var(--accent-orange)]">.</span>
              </span>
              <span className="font-mono text-xs text-[var(--accent-blue)] tracking-wider uppercase font-bold">
                UCB · LA PAZ · Colegios 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <TapeBadge text="UCB LA PAZ" rotate="-1deg" color="var(--accent-yellow)" />
            <TapeBadge text="SOCIOS & AUSPICIO" rotate="2deg" color="var(--accent-orange)" />
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12">
          {/* Column 1: Organization & Alliance */}
          <div className="space-y-4">
            <h4 className="font-display font-extrabold text-lg text-[var(--text-main)] flex items-center gap-2">
              <CrownDoodle size={22} color="var(--accent-yellow)" />
              Organización & Ecosistema
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              <p>
                <strong className="text-[var(--text-main)] block">Organiza:</strong>
                Facultad de Ciencias Económicas y Financieras · UCB Sede La Paz (Carrera de
                Administración de Empresas).
              </p>
              <p>
                <strong className="text-[var(--text-main)] block">En alianza con:</strong>
                Fundación Jubileo, Manq'a y Escuela de Emprendedores Samuel Doria Medina.
              </p>
              <div className="p-3 rounded-xl bg-[var(--accent-yellow)]/15 border-2 border-[var(--accent-yellow)] inline-block">
                <span className="font-mono font-bold text-xs text-[var(--text-main)] block">
                  Auspicia: Banco Sol (BancoSol)
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Las 5 Pestañas Oficiales */}
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-lg text-[var(--text-main)] flex items-center gap-2">
              <StarDoodle size={18} color="var(--accent-mint)" />
              Navegación Oficial
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors font-semibold flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Sede & Contacto */}
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-lg text-[var(--text-main)] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[var(--accent-blue)]" />
              Sede de la Jornada
            </h4>
            <div className="space-y-2.5 text-xs text-[var(--text-muted)]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--accent-blue)] shrink-0 mt-0.5" />
                <span>{PROGRAM_DATA.campusAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent-blue)] shrink-0" />
                <span>{PROGRAM_DATA.contact.email}</span>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[var(--accent-orange)] font-bold">
                Viernes 6 de noviembre · 09:00 a 13:00
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner with Official Note */}
        <div className="pt-8 mt-6 border-t border-[var(--border-soft)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-[var(--text-muted)] max-w-2xl">
            Información basada en las bases de participación oficiales, sujeta a ajustes por los
            organizadores.
          </p>
          <div className="text-xs text-[var(--text-muted)] font-mono">
            IDEATHON UCB © 2026 · La Paz, Bolivia
          </div>
        </div>
      </div>
    </footer>
  );
};
