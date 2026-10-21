export interface PrizeTier {
  place: 1 | 2 | 3;
  placeLabel: string;
  badge: string;
  title: string;
  accentColor: string;
  perks: string[];
}

export const PRIZES_DATA: PrizeTier[] = [
  {
    place: 1,
    placeLabel: "1er Lugar",
    badge: "Mayor Puntuación",
    title: "Visita Empresarial, Presentación Directa & Capacitación",
    accentColor: "#FFD23F",
    perks: [
      "Visitas guiadas a las instalaciones de empresas aliadas convocantes.",
      "Presentación de la iniciativa ante gerentes y directores de esas instituciones para recibir retroalimentación especializada.",
      "Paquete virtual de capacitación de la Escuela de Emprendedores Samuel Doria Medina para los estudiantes del equipo ganador.",
      "Certificado oficial de reconocimiento avalado por la Universidad Católica Boliviana (U.C.B.).",
    ],
  },
  {
    place: 2,
    placeLabel: "2do Lugar",
    badge: "2do Lugar Destacado",
    title: "Visita Empresarial, Presentación Directa & Capacitación",
    accentColor: "#FF6B35",
    perks: [
      "Visitas guiadas a las instalaciones de empresas aliadas convocantes.",
      "Presentación de la iniciativa ante gerentes y directores de esas instituciones para recibir retroalimentación especializada.",
      "Paquete virtual de capacitación de la Escuela de Emprendedores Samuel Doria Medina para los estudiantes del equipo.",
      "Certificado oficial de reconocimiento avalado por la Universidad Católica Boliviana (U.C.B.).",
    ],
  },
  {
    place: 3,
    placeLabel: "3er Lugar",
    badge: "3er Lugar Destacado",
    title: "Visita Empresarial, Presentación Directa & Capacitación",
    accentColor: "#22C55E",
    perks: [
      "Visitas guiadas a las instalaciones de empresas aliadas convocantes.",
      "Presentación de la iniciativa ante gerentes y directores de esas instituciones para recibir retroalimentación especializada.",
      "Paquete virtual de capacitación de la Escuela de Emprendedores Samuel Doria Medina para los estudiantes del equipo.",
      "Certificado oficial de reconocimiento avalado por la Universidad Católica Boliviana (U.C.B.).",
    ],
  },
];

export const EXPERIENCE_STEPS = [
  {
    step: "01",
    title: "Visitas guiadas a empresas aliadas",
    description:
      "Los integrantes de los tres equipos con mayor puntuación recorrerán por dentro las instalaciones productivas y operativas de destacadas empresas aliadas.",
    icon: "building",
  },
  {
    step: "02",
    title: "Presentación ante gerentes y directores",
    description:
      "Espacio exclusivo para exponer la solución ante altos ejecutivos y directivos institucionales, recibiendo retroalimentación gerencial constructiva.",
    icon: "users",
  },
  {
    step: "03",
    title: "Paquete virtual de capacitación",
    description:
      "Formación especializada otorgada por la Escuela de Emprendedores Samuel Doria Medina para continuar perfeccionando sus modelos de negocio.",
    icon: "lightbulb",
  },
];

export const GENERAL_RECOGNITION = [
  {
    title: "Certificado Oficial para TODOS los Participantes",
    description:
      "Todos los estudiantes participantes, así como sus profesores acompañantes y guías, recibirán certificados de valor curricular emitidos por la Facultad de Ciencias Económicas y Financieras de la UCB Sede La Paz.",
  },
  {
    title: "Reconocimiento a Unidades Educativas",
    description:
      "Distinción formal otorgada a los colegios participantes por su compromiso con la educación económica y la cultura de innovación en la juventud paceña.",
  },
  {
    title: "Retroalimentación Multidisciplinaria",
    description:
      "Todos los equipos reciben evaluación crítica y constructiva por parte del jurado interinstitucional (UCB, Jubileo, Manq'a, Escuela Doria Medina).",
  },
];
