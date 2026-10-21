export interface VideoItem {
  id: string;
  title: string;
  entrepreneur: string;
  sector: "agro" | "gastronomia" | "textil" | "artesania" | "servicios" | "otros";
  sectorLabel: string;
  municipality: string;
  duration: string;
  creator: "Manq'a" | "Escuela de Emprendedores Samuel Doria Medina" | "Fundación Jubileo";
  youtubeId?: string;
  src?: string;
  poster?: string;
  orientation?: "horizontal" | "vertical";
  description: string;
  isFeatured?: boolean;
}

export const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: "guesandina",
    title: "Guesandina",
    entrepreneur: "Guesandina",
    sector: "otros",
    sectorLabel: "Emprendimiento",
    municipality: "Bolivia",
    duration: "3:00 min",
    creator: "Manq'a",
    src: "/media/videos/guesandina.mp4",
    poster: "/media/posters/guesandina.jpg",
    orientation: "horizontal",
    description: "Cápsula audiovisual de Guesandina, producida por Manq'a.",
    isFeatured: true,
  },
  {
    id: "miski-muu",
    title: "Miski Muu",
    entrepreneur: "Miski Muu",
    sector: "otros",
    sectorLabel: "Emprendimiento",
    municipality: "Bolivia",
    duration: "3:00 min",
    creator: "Manq'a",
    src: "/media/videos/miski-muu.mp4",
    poster: "/media/posters/miski-muu.jpg",
    orientation: "horizontal",
    description: "Cápsula audiovisual de Miski Muu, producida por Manq'a.",
  },
  {
    id: "qarwita",
    title: "Qarwita",
    entrepreneur: "Qarwita",
    sector: "otros",
    sectorLabel: "Emprendimiento",
    municipality: "Bolivia",
    duration: "3:02 min",
    creator: "Manq'a",
    src: "/media/videos/qarwita.mp4",
    poster: "/media/posters/qarwita.jpg",
    orientation: "horizontal",
    description: "Cápsula audiovisual de Qarwita, producida por Manq'a.",
  },
  {
    id: "wayna",
    title: "Wayna",
    entrepreneur: "Wayna",
    sector: "otros",
    sectorLabel: "Emprendimiento",
    municipality: "Bolivia",
    duration: "2:32 min",
    creator: "Manq'a",
    src: "/media/videos/wayna.mp4",
    poster: "/media/posters/wayna.jpg",
    orientation: "horizontal",
    description: "Cápsula audiovisual de Wayna, producida por Manq'a.",
  },
  {
    id: "alwacafe",
    title: "Alwacafe",
    entrepreneur: "Alwacafe",
    sector: "gastronomia",
    sectorLabel: "Gastronomía",
    municipality: "Bolivia",
    duration: "1:24 min",
    creator: "Escuela de Emprendedores Samuel Doria Medina",
    src: "/media/videos/alwacafe.mp4",
    poster: "/media/posters/alwacafe.jpg",
    orientation: "vertical",
    description:
      "Cápsula audiovisual de Alwacafe, producida por la Escuela de Emprendedores Samuel Doria Medina.",
  },
  {
    id: "bio-bol",
    title: "Bio Bol",
    entrepreneur: "Bio Bol",
    sector: "otros",
    sectorLabel: "Emprendimiento",
    municipality: "Bolivia",
    duration: "1:06 min",
    creator: "Escuela de Emprendedores Samuel Doria Medina",
    src: "/media/videos/bio-bol.mp4",
    poster: "/media/posters/bio-bol.jpg",
    orientation: "vertical",
    description:
      "Cápsula audiovisual de Bio Bol, producida por la Escuela de Emprendedores Samuel Doria Medina.",
  },
  {
    id: "du-de-una",
    title: "DU De una",
    entrepreneur: "DU De una",
    sector: "otros",
    sectorLabel: "Emprendimiento",
    municipality: "Bolivia",
    duration: "0:27 min",
    creator: "Escuela de Emprendedores Samuel Doria Medina",
    src: "/media/videos/du-de-una.mp4",
    poster: "/media/posters/du-de-una.jpg",
    orientation: "vertical",
    description:
      "Cápsula audiovisual de DU De una, producida por la Escuela de Emprendedores Samuel Doria Medina.",
  },
  {
    id: "sin-etiquetas",
    title: "Sin etiquetas",
    entrepreneur: "Sin etiquetas",
    sector: "otros",
    sectorLabel: "Emprendimiento",
    municipality: "Bolivia",
    duration: "1:46 min",
    creator: "Escuela de Emprendedores Samuel Doria Medina",
    src: "/media/videos/sin-etiquetas.mp4",
    poster: "/media/posters/sin-etiquetas.jpg",
    orientation: "horizontal",
    description:
      "Cápsula audiovisual de Sin etiquetas, producida por la Escuela de Emprendedores Samuel Doria Medina.",
  },
];

export const VIDEO_REFLECTION_QUESTIONS = [
  {
    q: "¿Qué problema concreto resuelve este emprendedor?",
    hint: "Identifica la necesidad real de los clientes a la que responde.",
  },
  {
    q: "¿Qué recursos o ventajas del departamento de La Paz aprovecha?",
    hint: "Materia prima local, conocimientos tradicionales o ubicación geográfica.",
  },
  {
    q: "¿A quién le vende y cómo se sostiene financieramente?",
    hint: "Segmentos de clientes y canales de distribución utilizados.",
  },
  {
    q: "¿Qué oportunidad o aprendizaje ves para tu propia idea en el Ideaton?",
    hint: "Elementos del modelo que tu equipo puede adaptar con Lean Canvas.",
  },
];
