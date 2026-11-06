import { REPORTS_VISIBLE, VIDEO_LIBRARY_ENABLED } from "./features";

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

export function isResourceLinkVisible(path: string, resourcesOpen: boolean) {
  if (path === SITE_ROUTES.reports) return REPORTS_VISIBLE && resourcesOpen;
  if (path === SITE_ROUTES.videos) return VIDEO_LIBRARY_ENABLED;
  return true;
}

export function visibleNavigationLinks(resourcesOpen: boolean) {
  return NAVIGATION_LINKS.filter((link) => isResourceLinkVisible(link.path, resourcesOpen));
}
