export interface MilestoneItem {
  date: string;
  badge: string;
  title: string;
  description: string;
  isDeadline?: boolean;
}

export interface DayAgendaItem {
  time: string;
  title: string;
  badge: string;
  badgeColor: string;
}

export const PROGRAM_DATA = {
  eventName: "Ideathon Colegios 2026",
  eventBrand: "IDEATHON",
  organizer:
    'Facultad de Ciencias Económicas y Financieras · Universidad Católica Boliviana "San Pablo" Sede La Paz',
  eventDate: "Viernes 6 de noviembre de 2026",
  eventTime: "09:00 a 13:00",
  eventLocation: "Capilla de la UCB, Sede La Paz",
  campusAddress: "Av. 14 de Septiembre y Calle 2, Obrajes, La Paz",
  city: "La Paz, Bolivia",
  countdownTarget: "2026-11-06T09:00:00-04:00",
  postulationDeadline: "2026-10-26T23:59:59-04:00",
  notificationDate: "Viernes 30 de octubre de 2026",
  cost: "Bs 0 (Gratuito)",
  sheetNumber: "IDTN-UCB-2026",
  disclaimer:
    "Información basada en las bases de participación oficiales, sujeta a ajustes por los organizadores.",
  checklist: [
    {
      item: "Laptop o celular con batería",
      detail: "Para investigar datos, consultar reportes y estructurar el Lean Canvas.",
    },
    {
      item: "Autorización formal del colegio",
      detail: "Inscripción avalada por la dirección de la unidad educativa.",
    },
    {
      item: "Material provisto en sala",
      detail: "La UCB provee hojas de trabajo, marcadores y red wifi institucional.",
    },
    {
      item: "Puntualidad institucional",
      detail: "La jornada inicia puntualmente a las 09:00 en la Capilla UCB.",
    },
  ],
  usefulFact: {
    title: "Dato útil",
    desc: "Habrá wifi de alta velocidad y estaciones de trabajo designadas por equipo en la Capilla UCB.",
  },
  rememberNote: {
    title: "Recuerda",
    desc: "La jornada inicia puntualmente a las 09:00 en la Capilla UCB. Asiste con tu equipo completo y tu profesor guía.",
  },
  contact: {
    whatsapp: "+591 2 2782222",
    email: "administracion.lpz@ucb.edu.bo",
    campusAddress: "Capilla de la UCB, Av. 14 de Septiembre y Calle 2, Obrajes, La Paz",
  },
  milestones: [
    {
      date: "Hasta el 26 de octubre",
      badge: "Postulación",
      title: "Plazo de postulación de colegios",
      description:
        "Las unidades educativas inscriben a sus equipos completos (4 a 5 estudiantes, máx. 3 equipos por colegio) mediante el formulario digital.",
      isDeadline: true,
    },
    {
      date: "30 de octubre",
      badge: "Selección",
      title: "Notificación a equipos aceptados",
      description:
        "La UCB comunica la lista oficial de equipos seleccionados mediante orden cronológico y filtro de representatividad equitativa.",
      isDeadline: false,
    },
    {
      date: "6 de noviembre",
      badge: "Jornada",
      title: "Jornada Ideathon 2026 (09:00 – 13:00)",
      description:
        "Encuentro presencial intensivo en la Capilla UCB: diagnóstico con datos, ideación (usuario, problemas e idea/solución), Lean Canvas, prototipado y exposición ante el jurado.",
      isDeadline: false,
    },
  ] as MilestoneItem[],
  dayAgenda: [
    {
      time: "09:00",
      title: "Recepción y bienvenida oficial",
      badge: "Apertura",
      badgeColor: "#FFD23F",
    },
    {
      time: "09:30",
      title: "Presentación del reto y datos de empleo",
      badge: "Diagnóstico",
      badgeColor: "#1F3FD1",
    },
    {
      time: "10:00",
      title: "Ideación: usuario, problemas e idea/solución",
      badge: "Design Thinking",
      badgeColor: "#FF6B35",
    },
    {
      time: "10:45",
      title: "Lean Canvas y prototipado de la solución",
      badge: "Lean Canvas · Design Thinking",
      badgeColor: "#22C55E",
    },
    {
      time: "11:30",
      title: "Pitch de formato libre ante el jurado",
      badge: "Exposición",
      badgeColor: "#1F3FD1",
    },
    {
      time: "12:30",
      title: "Deliberación y premiación oficial",
      badge: "Premiación",
      badgeColor: "#FFD23F",
    },
    {
      time: "13:00",
      title: "Cierre de la jornada",
      badge: "Clausura",
      badgeColor: "#111111",
    },
  ] as DayAgendaItem[],
};
