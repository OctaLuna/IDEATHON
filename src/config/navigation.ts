import { VIDEO_LIBRARY_ENABLED } from "./features";

export const SITE_ROUTES = {
  home: "/",
  reports: "/reportes",
  videos: "/videos",
  methodology: "/metodologia",
  partners: "/socios",
} as const;

export const NAVIGATION_LINKS = [
  { label: "Ideathon 2026", path: SITE_ROUTES.home },
  { label: "Reportes", path: SITE_ROUTES.reports },
  ...(VIDEO_LIBRARY_ENABLED ? [{ label: "Videos", path: SITE_ROUTES.videos }] : []),
  { label: "Metodología", path: SITE_ROUTES.methodology },
  { label: "Socios", path: SITE_ROUTES.partners },
] as const;

export function isEventResourcePath(path: string) {
  return path === SITE_ROUTES.reports || path === SITE_ROUTES.videos;
}

export function visibleNavigationLinks(resourcesOpen: boolean) {
  return NAVIGATION_LINKS.filter((link) => resourcesOpen || !isEventResourcePath(link.path));
}
