export interface ReportDoc {
  id: string;
  title: string;
  institution: string;
  year: string;
  type: "Reporte" | "Estadística" | "Paper" | "Diagnóstico";
  category: "desempleo" | "potencialidades" | "estadisticas" | "papers" | "institucionales";
  summary: string;
  tags: string[];
  url?: string;
  isFeatured?: boolean;
}

export const SAMPLE_REPORTS: ReportDoc[] = [
  {
    id: "rep-jubileo-principal",
    title: "Diagnóstico del Empleo Juvenil y Mercado Laboral en el Departamento de La Paz",
    institution: "Fundación Jubileo",
    year: "2025",
    type: "Diagnóstico",
    category: "desempleo",
    summary:
      "Estudio técnico sobre la tasa de desempleo juvenil (XX %), subempleo e informalidad laboral en los principales municipios del departamento de La Paz.",
    tags: ["Empleo Juvenil", "La Paz", "Mercado Laboral", "Juventud"],
    isFeatured: true,
    url: "",
  },
  {
    id: "rep-ine-censo",
    title: "Estadísticas Demográficas y Ocupacionales de Jóvenes en La Paz y El Alto",
    institution: "INE",
    year: "2024",
    type: "Estadística",
    category: "estadisticas",
    summary:
      "Datos censales sobre población en edad de trabajar, transición escuela-trabajo y distribución de empleo por sectores económicos.",
    tags: ["Cifras Oficiales", "Demografía", "El Alto", "La Paz"],
    url: "",
  },
  {
    id: "rep-oit-jovenes",
    title: "Tendencias de Transición Laboral y Trabajo Decente para Juventudes en Bolivia",
    institution: "OIT",
    year: "2024",
    type: "Paper",
    category: "papers",
    summary:
      "Análisis comparativo de inserción laboral formal, brechas salariales y oportunidades de primer empleo para jóvenes bolivianos.",
    tags: ["OIT", "Trabajo Decente", "Primer Empleo"],
    url: "",
  },
  {
    id: "rep-udape-vocaciones",
    title: "Mapeo de Potencialidades Productivas y Cadenas de Valor del Departamento de La Paz",
    institution: "UDAPE",
    year: "2024",
    type: "Reporte",
    category: "potencialidades",
    summary:
      "Evaluación de vocaciones productivas regionales: Yungas, Altiplano, Valles y la cuenca metropolitana de La Paz y El Alto.",
    tags: ["Vocaciones Productivas", "Cadenas de Valor", "Desarrollo Local"],
    url: "",
  },
  {
    id: "rep-ucb-emprendimiento",
    title: "Ecosistema Emprendedor Juvenil y Modelos de Negocio Sostenibles en La Paz",
    institution: "UCB",
    year: "2025",
    type: "Paper",
    category: "papers",
    summary:
      "Investigación académica sobre barreras de financiamiento, adopción digital y supervivencia de microemprendimientos juveniles paceños.",
    tags: ["Emprendimiento", "Innovación", "Investigación UCB"],
    url: "",
  },
  {
    id: "rep-gobernacion-agro",
    title: "Diagnóstico de Oportunidades Agroecológicas y Seguridad Alimentaria Departamental",
    institution: "Gobernación de La Paz",
    year: "2024",
    type: "Reporte",
    category: "potencialidades",
    summary:
      "Relevamiento de productos agrícolas nativos, transformación industrial y articulación comercial de pequeños productores hacia mercados urbanos.",
    tags: ["Agroindustria", "Alimentos", "Economía Rural"],
    url: "",
  },
  {
    id: "rep-jubileo-fiscal",
    title: "Boletín Fiscal: Inversión Pública Municipal en Fomento al Empleo Joven",
    institution: "Fundación Jubileo",
    year: "2025",
    type: "Reporte",
    category: "institucionales",
    summary:
      "Fiscalización del destino de recursos IDH y transferencias presupuestarias hacia proyectos de desarrollo productivo y empleo juvenil.",
    tags: ["Finanzas Públicas", "Presupuesto", "Fiscalización"],
    url: "",
  },
  {
    id: "rep-ine-genero",
    title: "Brechas de Género en el Empleo Juvenil Urbano y Rural del Departamento de La Paz",
    institution: "INE",
    year: "2024",
    type: "Estadística",
    category: "estadisticas",
    summary:
      "Indicadores comparativos de participación laboral femenina, brecha de ingresos (XX %) y dedicación a cuidados no remunerados.",
    tags: ["Género", "Equidad", "Estadísticas"],
    url: "",
  },
];

export const KEY_STATS_SAMPLE = [
  {
    value: "XX %",
    label: "Tasa de desempleo juvenil departamental",
    detail: "contenido de ejemplo, reemplazar con dato oficial",
  },
  {
    value: "XX %",
    label: "Tasa de informalidad laboral en jóvenes",
    detail: "contenido de ejemplo, reemplazar con dato oficial",
  },
  {
    value: "XX %",
    label: "Jóvenes dedicados al comercio o servicios",
    detail: "contenido de ejemplo, reemplazar con dato oficial",
  },
  {
    value: "XX %",
    label: "Emprendimientos que surgen por necesidad",
    detail: "contenido de ejemplo, reemplazar con dato oficial",
  },
];

export const PRODUCTIVE_POTENTIALS = [
  {
    name: "Agroindustria y Alimentos",
    desc: "Transformación de quinua, café de Yungas, cacao y tubérculos andinos con valor agregado.",
    badge: "Rural / Urbano",
  },
  {
    name: "Turismo Sostenible y Comunitario",
    desc: "Circuitos ecoturísticos en el lago Titicaca, cordillera Real, valles y parque Madidi.",
    badge: "Servicios",
  },
  {
    name: "Textiles, Moda y Artesanía",
    desc: "Confección en fibra de alpaca, diseño identitario y manufactura de indumentaria urbana.",
    badge: "Manufactura",
  },
  {
    name: "Gastronomía con Identidad",
    desc: "Revalorización culinaria nativa, cocina fusión, repostería con frutos locales y franquicias sociales.",
    badge: "Alimentos",
  },
  {
    name: "Manufactura y Economía Circular",
    desc: "Reciclaje, bioplásticos, mobiliario sustentable y transformación de insumos locales.",
    badge: "Producción",
  },
  {
    name: "Servicios Digitales y Tecnología",
    desc: "Soluciones de comercio electrónico, logística de última milla y servicios creativos digitales.",
    badge: "Tecnología",
  },
];

export const READING_GUIDE_STEPS = [
  {
    step: "01",
    title: "Identifica el problema y a quién afecta",
    desc: "Averigua si la dificultad laboral golpea más a bachilleres, mujeres, áreas rurales o zonas periurbanas de La Paz y El Alto.",
  },
  {
    step: "02",
    title: "Busca cifras, causas y tendencias",
    desc: "No te quedes con la impresión general: anota porcentajes, salarios promedio y por qué los empleos actuales son informales o temporales.",
  },
  {
    step: "03",
    title: "Anota oportunidades para tu emprendimiento",
    desc: "Detecta vacíos en el mercado donde una idea de negocio ágil pueda generar nuevos puestos de trabajo y bienestar sostenible.",
  },
];

export const TEAM_QUESTIONS = [
  "¿A qué grupo específico de jóvenes queremos ayudar a conseguir o crear trabajo?",
  "¿Qué recursos o productos locales de La Paz podemos aprovechar mejor?",
  "¿Por qué las soluciones anteriores no funcionaron y qué haremos de manera diferente?",
  "¿Cómo validaremos con números que nuestra propuesta de negocio es económicamente viable?",
];
