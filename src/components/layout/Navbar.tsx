import { gsap, useGSAP } from "@/animations/gsap";
import { LightbulbDoodle } from "@/components/decorative/DoodleSVGs";
import { useTheme } from "@/features/theme";
import { ArrowUpRight, Calendar, Menu, Moon, Sun, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLinksRef = useRef<HTMLDivElement | null>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const { contextSafe } = useGSAP({ scope: navContainerRef });

  // 5 pestañas oficiales en este orden estricto
  const navLinks = [
    { label: "Ideathon 2026", path: "/" },
    { label: "Reportes", path: "/reportes" },
    { label: "Videos", path: "/videos" },
    { label: "Metodología", path: "/metodologia" },
    { label: "Socios", path: "/socios" },
  ];

  // En /, las anclas (#cronograma, #premios, etc.) NO cambian el link activo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic button on desktop (Mejora 3.16)
  useEffect(() => {
    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
    ).matches;
    const btn = ctaBtnRef.current;
    if (!isDesktop || !btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.25, ease: "power2.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.25, ease: "power2.out" });

    const handleMouseMove = contextSafe((e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x * 0.2);
      yTo(y * 0.2);
    });

    const handleMouseLeave = contextSafe(() => {
      xTo(0);
      yTo(0);
    });

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [contextSafe]);

  // GSAP animation for Mobile Menu open / close
  useGSAP(
    () => {
      const menu = mobileMenuRef.current;
      const linksContainer = mobileLinksRef.current;
      if (!menu || !linksContainer) return;

      if (isMobileMenuOpen) {
        const tl = gsap.timeline();
        tl.set(menu, { display: "flex", opacity: 0, y: -15 })
          .to(menu, {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          })
          .fromTo(
            linksContainer.children,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.25,
              ease: "power2.out",
            },
            "-=0.1",
          );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(menu, { display: "none" });
          },
        });
      }
    },
    { scope: navContainerRef, dependencies: [isMobileMenuOpen] },
  );

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on navigate
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleCronogramaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("cronograma");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "py-2 bg-[var(--bg-page)] border-b-2 border-[var(--border-soft)] shadow-md backdrop-blur-md"
            : "py-3 sm:py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Logo Brand Zone */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="shrink-0 flex items-center gap-2 sm:gap-2.5 select-none"
            aria-label="Ir al inicio de IDEATHON"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--accent-blue)] border-2 border-[var(--border-ink)] flex items-center justify-center sticker-shadow group-hover:rotate-6 transition-transform duration-200 shrink-0">
              <LightbulbDoodle size={22} color="var(--accent-yellow)" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-[var(--text-main)] leading-none">
                IDEATHON<span className="text-[var(--accent-orange)]">.</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest font-bold text-[var(--accent-blue)] uppercase">
                UCB · LA PAZ
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links with Sliding Indicator Pill */}
          <nav
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-surface)]/90 border-2 border-[var(--border-soft)] shadow-xs relative"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative z-10 px-3.5 py-1.5 text-xs xl:text-sm font-bold tracking-tight rounded-full transition-colors duration-150 ${
                    isActive
                      ? "bg-[var(--accent-blue)] text-white shadow-xs"
                      : "text-[var(--text-main)] hover:text-[var(--accent-blue)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-[var(--accent-blue)] -z-10 animate-fade-in"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Zone: Theme Toggle & Cronograma Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--bg-surface)] border-2 border-[var(--border-ink)] flex items-center justify-center text-[var(--text-main)] sticker-shadow hover:scale-105 active:scale-95 transition-transform cursor-pointer relative overflow-hidden"
              aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
              title={`Modo ${theme === "light" ? "Oscuro" : "Claro"}`}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-main)] transition-transform duration-300 hover:-rotate-12" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-yellow)] transition-transform duration-300 hover:rotate-45" />
              )}
            </button>

            {/* Ver Cronograma Button: Visible from tablet (sm) up to avoid pushing hamburger out on phones */}
            <a
              ref={ctaBtnRef}
              href="/#cronograma"
              onClick={handleCronogramaClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-[var(--accent-yellow)] hover:brightness-105 text-[#111111] font-display font-extrabold text-xs sm:text-sm rounded-xl border-2 border-[var(--border-ink)] sticker-shadow hover:-translate-y-0.5 active:scale-95 transition-all shrink-0"
            >
              <Calendar className="w-4 h-4 text-[#111111]" />
              <span>Ver cronograma</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={
                isMobileMenuOpen ? { backgroundColor: "#DC2626", color: "#FFFFFF" } : undefined
              }
              className={`lg:hidden shrink-0 w-10 h-10 rounded-xl border-2 border-[var(--border-ink)] flex items-center justify-center sticker-shadow active:scale-95 transition-all cursor-pointer ${
                isMobileMenuOpen
                  ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                  : "bg-[var(--bg-surface)] text-[var(--text-main)]"
              }`}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              title={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[3] text-white" />
              ) : (
                <Menu className="w-5 h-5 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay using semantic tokens */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[115] bg-[var(--bg-page)] text-[var(--text-main)] hidden flex-col justify-between p-4 sm:p-6 pt-20 sm:pt-24 overflow-y-auto"
      >
        {/* Visible In-Menu Bar with guaranteed Exit/Close button */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[var(--border-soft)] max-w-sm mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">
              NAVEGACIÓN IDEATHON 2026
            </span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ backgroundColor: "#DC2626", color: "#FFFFFF" }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white border-2 border-[var(--border-ink)] shadow-[2px_2px_0px_var(--border-ink)] active:scale-95 transition-all cursor-pointer font-display font-black text-xs"
            aria-label="Cerrar menú de navegación"
          >
            <X className="w-4 h-4 stroke-[3] text-white" />
            <span className="text-white font-black tracking-wide">SALIR</span>
          </button>
        </div>

        <div ref={mobileLinksRef} className="flex flex-col gap-3 max-w-sm mx-auto w-full">
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            const rotations = ["-1deg", "1deg", "-1.5deg", "1.5deg", "-1deg"];
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ transform: `rotate(${rotations[idx % rotations.length]})` }}
                className={`flex items-center justify-between p-3.5 rounded-2xl border-2 border-[var(--border-ink)] text-base font-display font-extrabold transition-transform active:scale-95 ${
                  isActive
                    ? "bg-[var(--accent-blue)] text-white sticker-shadow-yellow"
                    : "bg-[var(--bg-surface)] text-[var(--text-main)] sticker-shadow"
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-5 h-5 opacity-70" />
              </Link>
            );
          })}

          <div className="pt-4 mt-2 border-t border-[var(--border-soft)]">
            <a
              href="/#cronograma"
              onClick={handleCronogramaClick}
              className="w-full py-3.5 bg-[var(--accent-yellow)] text-[#111111] font-display font-extrabold text-base rounded-2xl border-2 border-[var(--border-ink)] sticker-shadow-blue flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5 text-[#111111]" />
              <span>Ver cronograma</span>
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-[var(--text-muted)] font-mono py-4">
          Organizado por la Facultad de Ciencias Económicas y Financieras · Universidad Católica
          Boliviana "San Pablo" (U.C.B.)
        </div>
      </div>
    </>
  );
};
