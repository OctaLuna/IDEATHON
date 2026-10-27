export interface Partner {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  roleType: "socio" | "auspiciador";
  accentColor: string;
  secondaryColor: string;
  summary: string;
  origin?: string;
  mission: string;
  workAreas: string[];
  keyStats: string[];
  contribution: string; // "Su aporte a la metodología y a los videos"
  links?: { label: string; url: string }[];
  website?: string;
  disclaimer?: string;
}

export const PARTNERS_DATA: Partner[] = [
  {
    id: "fundacion-jubileo",
    name: "Fundación Jubileo",
    shortName: "Jubileo",
    badge: "Socio Metodológico & Datos",
    roleType: "socio",
    accentColor: "#1F3FD1",
    secondaryColor: "#FFD23F",
    summary:
      "Institución católica boliviana de investigación, análisis socioeconómico, formación ciudadana e incidencia en políticas públicas con sede en La Paz. Referente técnico e independiente en el análisis del mercado laboral y presupuestos públicos.",
    origin:
      "Fundada en noviembre de 2003 por la Conferencia Episcopal Boliviana junto con las diócesis alemanas de Hildesheim y Tréveris, con raíces en el movimiento global Jubileo 2000 por la justicia económica y el alivio de la pobreza.",
    mission:
      "Cualificar la participación de los actores sociales en la toma de decisiones e incidencia política y económica, promoviendo una sociedad democrática, transparente y solidaria.",
    workAreas: [
      "Industrias extractivas y gobernanza de recursos naturales",
      "Matriz energética y sostenibilidad ambiental",
      "Diversificación productiva y desarrollo económico local",
      "Presupuestos públicos, deuda y tributación equitativa",
      "Desarrollo social, empleo juvenil y mercado laboral",
      "Participación ciudadana, control social y ética pública",
      "Formación de liderazgos juveniles y veeduría democrática",
    ],
    keyStats: [
      "Sede central: Calle Quintín Barrios 768, Sopocachi, La Paz",
      "Fundada en 2003 · Más de 20 años de investigación empírica",
      "Portal institucional: jubileobolivia.org.bo",
    ],
    contribution:
      "Proporciona reportes y estadísticas de empleo juvenil que sirven como base para el diagnóstico inicial.",
    links: [{ label: "Ver Reportes de Empleo", url: "/reportes" }],
    website: "https://jubileobolivia.org.bo",
    disclaimer: "Información referencial basada en fuentes institucionales oficiales.",
  },
  {
    id: "manqa",
    name: "Manq'a",
    shortName: "Manq'a",
    badge: "Socio de Innovación & Empleo Juvenil",
    roleType: "socio",
    accentColor: "#FF6B35",
    secondaryColor: "#FFD23F",
    summary:
      "Proyecto de innovación social y modelo de escuelas de formación gastronómica para jóvenes en situación de vulnerabilidad social y económica ('comida' en idioma aymara). Utiliza la gastronomía como motor de inclusión socioeconómica y revalorización del patrimonio agroalimentario.",
    origin:
      "Su primera escuela abrió en 2014 en la ciudad de El Alto, impulsada por Melting Pot Bolivia (cofundada por el empresario gastronómico Claus Meyer y Kamilla Seidler) junto con ICCO Cooperación (actualmente parte de Cordaid).",
    mission:
      "Generar oportunidades de vida digna para jóvenes a través de la formación técnica gastronómica, el empleo digno, el emprendimiento y el consumo responsable con identidad boliviana.",
    workAreas: [
      "Red de escuelas técnicas de cocina y cafeterías barriales",
      "Prácticas formativas y modelo de articulación e intermediación laboral",
      "Incubación y mentoría para jóvenes emprendedores gastronómicos",
      "Desarrollo de habilidades blandas y proyecto de vida",
      "Compras directas y cadenas cortas con pequeños productores agroecológicos",
    ],
    keyStats: [
      "+7.000 jóvenes capacitados en Bolivia (76% mujeres)",
      "+2.400 emprendimientos juveniles acompañados",
      "Primera escuela fundada en 2014 en la ciudad de El Alto",
    ],
    contribution:
      "Aporta su experiencia en la inserción laboral digna y el emprendimiento juvenil de productores locales.",
    website: "https://www.manqa.org.bo/",
    disclaimer: "Información referencial basada en fuentes institucionales oficiales.",
  },
  {
    id: "escuela-doria-medina",
    name: "Escuela de Emprendedores Samuel Doria Medina",
    shortName: "Escuela de Emprendedores",
    badge: "Socio Coorganizador & Mentoría",
    roleType: "socio",
    accentColor: "#FFD23F",
    secondaryColor: "#1F3FD1",
    summary:
      "Escuela de formación práctica en emprendimiento y modelos de negocio ágiles para apoyar a emprendedores y jóvenes bolivianos en la creación y consolidación de iniciativas productivas sostenibles.",
    origin:
      "Impulsada por la Fundación Samuel Doria Medina, entidad con amplia trayectoria en el fomento del espíritu emprendedor nacional a través del certamen 'Emprende Ideas' con más de 10 versiones.",
    mission:
      "Capacitar y dotar de herramientas prácticas de gestión empresarial, modelos de negocio e innovación a jóvenes bolivianos para dinamizar la economía y generar empleo.",
    workAreas: [
      "Seminarios presenciales y talleres virtuales de modelos de negocio",
      "Capacitación estructurada en metodología Lean Canvas y finanzas",
      "Mentoría con empresarios y directivos del sector productivo",
      "Fomento a la cultura del emprendimiento juvenil y la asociatividad",
    ],
    keyStats: [
      "Inaugurada en mayo de 2024 para democratizar la formación gerencial",
      "+4.000 emprendedores capacitados en sus programas",
      "Docentes y directivos empresariales de trayectoria nacional e internacional",
    ],
    contribution:
      "Coorganiza el evento y aporta la lógica de estructuración del Lean Canvas y otorga a los estudiantes de los 3 equipos ganadores un paquete virtual exclusivo de capacitación empresarial.",
    website: "https://fundacionsamueldoriamedina.com/",
    disclaimer: "Información sujeta a verificación y ajustes por los organizadores oficiales.",
  },
  {
    id: "banco-sol",
    name: "Banco Sol (Banco Solidario S.A.)",
    shortName: "BancoSol",
    badge: "Auspiciador Oficial",
    roleType: "auspiciador",
    accentColor: "#FFD23F",
    secondaryColor: "#111111",
    summary:
      "Entidad financiera boliviana pionera y referente mundial en microfinanzas, con un fuerte enfoque en inclusión financiera, desarrollo social y respaldo a microempresarios y emprendedores de todo el país.",
    origin:
      "Nació en Bolivia en 1992 como el primer banco comercial del mundo dedicado exclusivamente a las microfinanzas, transformando el acceso al crédito productivo para sectores tradicionalmente desatendidos.",
    mission:
      "Brindar oportunidades de desarrollo y crecimiento sostenible a personas y emprendedores mediante servicios financieros inclusivos, transparentes y de impacto medible.",
    workAreas: [
      "Microcrédito productivo y financiamiento para emprendimientos",
      "Educación financiera para jóvenes y familias bolivianas",
      "Banca digital inclusiva y canales de ahorro accesibles",
      "Programas de responsabilidad social empresarial con impacto comunitario",
    ],
    keyStats: [
      "Pionero global en microfinanzas desde 1992",
      "Presencia en los 9 departamentos de Bolivia",
      "Auspiciador oficial del Ideathon Colegios 2026",
    ],
    contribution:
      "Auspicia el Ideathon Colegios 2026. Conexión clave con el evento: el acceso responsable al financiamiento es el puente que permite a una idea innovadora transformarse en una empresa sostenible. Esto se refleja directamente en los bloques 'Fuentes de Ingresos' y 'Estructura de Costos' del Lean Canvas.",
    links: [{ label: "Ver Bloques del Lean Canvas", url: "/metodologia" }],
    website: "https://www.bancosol.com.bo/",
    disclaimer: "Información sujeta a verificación y ajustes por los organizadores oficiales.",
  },
];

export const ECOSYSTEM_FLOW_STEPS = [
  { step: "1", title: "Socios", desc: "Fundación Jubileo, Manq'a y Escuela Doria Medina" },
  {
    step: "2",
    title: "Reportes para innovar",
    desc: "Datos de empleo juvenil y oportunidades productivas",
  },
  { step: "3", title: "Metodología", desc: "Design Thinking + Lean Canvas de 9 bloques" },
  {
    step: "4",
    title: "Tu Propuesta",
    desc: "Solución viable defendida en la jornada del Ideathon",
  },
];
