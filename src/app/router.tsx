import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { VIDEO_LIBRARY_ENABLED } from "@/config/features";
import { SITE_ROUTES } from "@/config/navigation";
import { ScrollRestoration } from "./ScrollRestoration";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ReportsPage = lazy(() => import("@/pages/reports/ReportsPage"));
const VideosPage = lazy(() => import("@/pages/videos/VideosPage"));
const MethodologyPage = lazy(() => import("@/pages/methodology/MethodologyPage"));
const PartnersPage = lazy(() => import("@/pages/partners/PartnersPage"));

export function SiteRoutes() {
  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reportes" element={<ReportsPage />} />
        <Route
          path={SITE_ROUTES.videos}
          element={
            VIDEO_LIBRARY_ENABLED ? <VideosPage /> : <Navigate to={SITE_ROUTES.home} replace />
          }
        />
        <Route path="/metodologia" element={<MethodologyPage />} />
        <Route path="/socios" element={<PartnersPage />} />
        <Route path="/empresas" element={<Navigate to="/socios" replace />} />
        <Route path="/premios" element={<Navigate to="/#premios" replace />} />
        <Route path="/cronograma" element={<Navigate to="/#cronograma" replace />} />
        <Route path="/carrera" element={<Navigate to="/#organiza" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
