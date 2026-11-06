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
      "Proporciona un análisis de empleo juvenil que sirve como base para el diagnóstico inicial.",
    links: [{ label: "Ver reporte de empleo", url: "/reportes" }],
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
    id: "banco-fie",
    name: "Banco FIE",
    shortName: "Banco FIE",
    badge: "Auspiciador Oficial",
    roleType: "auspiciador",
    accentColor: "#FFD23F",
    secondaryColor: "#111111",
    summary:
      "Entidad bancaria múltiple boliviana con sede en La Paz, especializada en microfinanzas, inclusión financiera y social, desarrollo productivo y financiamiento agropecuario. Promueve la equidad de género y las finanzas sostenibles mediante una red de agencias urbanas, periurbanas y rurales.",
    origin:
      "Cinco mujeres impulsaron la ONG FIE, que inició operaciones en 1985 durante la crisis económica para atender a personas y pequeñas unidades productivas excluidas de la banca tradicional. En 1998 se constituyó el FFP FIE, en 2010 se transformó en banco y en 2014 se constituyó jurídicamente como Banco Múltiple.",
    mission:
      "Somos un Banco que ofrece soluciones financieras integrales de calidad para nuestra clientela, preferentemente al sector de la micro y pequeña empresa. Basamos nuestro accionar en la ética, generamos valor para nuestros grupos de interés y aportamos a la construcción de una sociedad sostenible, inclusiva y equitativa.",
    workAreas: [
      "Microcrédito y PyME: financiamiento para unidades productivas familiares y pequeñas empresas.",
      "Financiamiento agropecuario sostenible: apoyo financiero y técnico a productores y cadenas de valor mediante FIExperto.",
      "Igualdad de género: Marca Magenta, apoyo a negocios liderados por mujeres y educación digital y financiera.",
      "Inclusión financiera: presencia en áreas urbanas, periurbanas y rurales de los nueve departamentos.",
      "Sostenibilidad y ecoeficiencia: gestión ambiental, agricultura climáticamente inteligente, Pacto Global y residuos electrónicos.",
      "Captaciones y banca digital: ahorro, depósitos a plazo fijo y canales electrónicos.",
    ],
    keyStats: [
      "Sede central: La Paz, Bolivia; agencias en Sopocachi y San Jorge",
      "Más de 40 años de trayectoria; operaciones desde 1985",
      "Supervisado por la Autoridad de Supervisión del Sistema Financiero (ASFI)",
      "Identidad: inclusión, microfinanzas y Marca Magenta",
      "Portal institucional: bancofie.com.bo",
    ],
    contribution:
      "Provee financiamiento formal a sectores tradicionalmente excluidos, especialmente a mujeres emprendedoras y pequeños productores agropecuarios, con acompañamiento técnico, inclusión territorial e impacto social y ambiental.",
    links: [{ label: "Ver Bloques del Lean Canvas", url: "/metodologia" }],
    website: "https://www.bancofie.com.bo/",
    disclaimer:
      "Información referencial basada en fuentes institucionales y memorias corporativas de Banco FIE.",
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
