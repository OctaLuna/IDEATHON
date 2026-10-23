export interface MethodologyStep {
  number: number;
  stepCode: string;
  title: string;
  description: string;
  tip: string;
  accentColor: string;
}

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: 1,
    stepCode: "01",
    title: "Postulación a través de tu colegio",
    description:
      "La unidad educativa inscribe a equipos de 4 a 5 estudiantes de prepromoción o promoción mediante el formulario oficial hasta el 26 de octubre. Máximo 3 equipos por colegio.",
    tip: "Habla con la dirección o los profesores de tu colegio para postular a tiempo.",
    accentColor: "#1F3FD1",
  },
  {
    number: 2,
    stepCode: "02",
    title: "Confirmación oficial",
    description:
      "La UCB notifica a los equipos aceptados el 30 de octubre de 2026. Los cupos se asignan por orden de postulación con filtro de representatividad entre colegios.",
    tip: "Revisa la notificación y la lista oficial con la dirección de tu colegio.",
    accentColor: "#FF6B35",
  },
  {
    number: 3,
    stepCode: "03",
    title: "Prepárate con reportes y videos",
    description:
      "Revisa la biblioteca de Reportes (/reportes) y las cápsulas de Videos (/videos) para entender la realidad del empleo juvenil y las potencialidades productivas de La Paz.",
    tip: "Anota ideas preliminares, datos llamativos y preguntas antes de llegar a la jornada.",
    accentColor: "#FFD23F",
  },
  {
    number: 4,
    stepCode: "04",
    title: "Diagnóstico con datos",
    description:
      "El viernes 6 de noviembre a las 09:00 en la Capilla UCB, analiza los reportes y estadísticas de empleo de Fundación Jubileo y las necesidades de tu municipio. Define el problema central.",
    tip: "Elige un problema concreto y delimitado: quien mucho abarca, poco aprieta.",
    accentColor: "#22C55E",
  },
  {
    number: 5,
    stepCode: "05",
    title: "Ideación (Design Thinking)",
    description:
      "Comprende al usuario, define sus problemas y genera ideas de solución con el equipo siguiendo Design Thinking.",
    tip: "Aplica la regla de oro: cantidad primero, juicio y crítica después.",
    accentColor: "#1F3FD1",
  },
  {
    number: 6,
    stepCode: "06",
    title: "Lean Canvas",
    description:
      "Estructura la propuesta en nueve bloques para definir clientes, problema, solución y viabilidad del modelo.",
    tip: "Comienza siempre por los Segmentos de clientes y el Problema antes que por la solución.",
    accentColor: "#FFD23F",
  },
  {
    number: 7,
    stepCode: "07",
    title: "Prototipado (Design Thinking)",
    description:
      "Convierte la idea elegida en algo visible y tangible: un boceto en papel, un storyboard de viñetas, una maqueta simple o un mockup en celular.",
    tip: "Hazlo rápido y barato para aprender y recibir retroalimentación temprana.",
    accentColor: "#FF6B35",
  },
  {
    number: 8,
    stepCode: "08",
    title: "Pitch y premiación",
    description:
      "Presenta tu propuesta en un pitch de formato libre ante el jurado interinstitucional. Al finalizar, se anuncian los tres equipos con mayor puntuación.",
    tip: "Destaca con claridad cómo tu modelo genera empleo digno para jóvenes en La Paz.",
    accentColor: "#22C55E",
  },
];

export const IDEATION_STAGES = [
  {
    id: "user",
    title: "USUARIO",
    description: "Conoce a las personas y el contexto que viven.",
  },
  {
    id: "problems",
    title: "PROBLEMAS",
    description: "Define las necesidades concretas que enfrentan.",
  },
  {
    id: "solution-idea",
    title: "IDEA / SOLUCIÓN",
    description: "Propón y selecciona una respuesta para esos problemas.",
  },
];

export const IDEATION_TECHNIQUES = [
  {
    id: "hwm",
    title: "¿Cómo podríamos…?",
    subtitle: "How Might We (HMW)",
    description:
      "Reformula el problema detectado en los reportes en preguntas abiertas que inviten a soluciones creativas (ej. '¿Cómo podríamos conectar la fibra de alpaca con compradores jóvenes urbanos?').",
    tip: "Genera al menos 3 preguntas HMW antes de proponer soluciones concretas.",
  },
  {
    id: "brainstorming",
    title: "Lluvia de ideas sin juicio",
    subtitle: "Brainstorming divergente",
    description:
      "Cada integrante escribe ideas en post-its o tarjetas durante 5 minutos en silencio. Está prohibido decir 'eso no va a funcionar' durante la fase divergente.",
    tip: "Construye sobre las ideas de los demás: combina dos conceptos simples en uno potente.",
  },
  {
    id: "crazy8",
    title: "8 ideas en 8 minutos",
    subtitle: "Crazy Eights",
    description:
      "Dobla una hoja en 8 cuadrantes. En exactamente 8 minutos (1 minuto por casilla), dibuja o escribe 8 variaciones distintas de la solución.",
    tip: "Obliga a tu cerebro a pasar de las ideas obvias a las verdaderamente innovadoras.",
  },
  {
    id: "voting",
    title: "Votación con puntos & Matriz",
    subtitle: "Matriz Impacto vs. Esfuerzo",
    description:
      "Cada miembro del equipo coloca 3 puntos adhesivos en sus ideas preferidas y luego las ubican en una matriz de Alto Impacto en Empleo vs. Facilidad de Implementación.",
    tip: "Elige la idea que genere mayor empleo juvenil con una puesta en marcha realista.",
  },
];

export const PROTOTYPING_TOOLS = [
  {
    id: "sketch",
    title: "Boceto en papel",
    desc: "Dibuja a mano alzada el producto, el envase, el espacio físico o la vista principal de la aplicación. Rápido, claro y sin costo.",
    icon: "file-text",
  },
  {
    id: "storyboard",
    title: "Storyboard de 4 viñetas",
    desc: "Ilustra el viaje del usuario en 4 momentos: 1) El problema que sufre, 2) Descubre tu solución, 3) Cómo la utiliza, 4) El beneficio final obtenido.",
    icon: "film",
  },
  {
    id: "mockup-fisico",
    title: "Maqueta con materiales simples",
    desc: "Usa cartulinas, plastilina, tijeras o envases reciclados para darle volumen tridimensional al producto antes de fabricarlo.",
    icon: "box",
  },
  {
    id: "mockup-celular",
    title: "Mockup en celular",
    desc: "Crea pantallas interactivas en papel o en una app de diapositivas del teléfono para simular cómo un cliente compraría o pediría el servicio.",
    icon: "smartphone",
  },
];

export interface LeanCanvasBlock {
  id: string;
  number: number;
  title: string;
  orderBadge: string;
  guidingQuestion: string;
  explanation: string;
  sampleText: string;
}

export const LEAN_CANVAS_BLOCKS: LeanCanvasBlock[] = [
  {
    id: "problem",
    number: 1,
    orderBadge: "Paso 1",
    title: "1. Problema",
    guidingQuestion: "¿Cuáles son los 3 principales problemas que sufren tus clientes?",
    explanation:
      "Identifica dolores reales respaldados por los datos de empleo o por la realidad productiva de La Paz.",
    sampleText:
      "Jóvenes egresados de gastronomía de El Alto tienen dificultades para acceder a capital inicial y empleo formal estable; además, restaurantes urbanos carecen de proveedores confiables de insumos andinos nativos.",
  },
  {
    id: "customer_segments",
    number: 2,
    orderBadge: "Paso 2",
    title: "2. Segmentos de Clientes",
    guidingQuestion: "¿Quiénes son tus clientes objetivo y quiénes tus primeros adoptantes?",
    explanation:
      "Define quién pagará por tu solución. Especifica nichos concretos y sus características demográficas.",
    sampleText:
      "Clientes primarios: Familias y profesionales jóvenes de La Paz (22 a 40 años) que buscan comida saludable con identidad boliviana. Primeros adoptantes: Oficinistas de Sopocachi y San Miguel.",
  },
  {
    id: "value_prop",
    number: 3,
    orderBadge: "Paso 3",
    title: "3. Propuesta de Valor Única",
    guidingQuestion:
      "¿Qué mensaje claro y convincente explica por qué tu solución es diferente y vale la pena?",
    explanation:
      "Tu promesa central: por qué te elegirán a ti y cómo tu negocio resuelve el problema de forma memorable.",
    sampleText:
      "'Comida rápida gourmet elaborada con superalimentos andinos por jóvenes cocineros certificados, a precio accesible y con entrega en envases 100% compostables.'",
  },
  {
    id: "solution",
    number: 4,
    orderBadge: "Paso 4",
    title: "4. Solución",
    guidingQuestion: "¿Cuáles son las 3 características clave de tu producto o servicio?",
    explanation:
      "Las funciones indispensables de tu producto mínimo viable (PMV) que resuelven los problemas del bloque 1.",
    sampleText:
      "1) Menú estacional con insumos nativos comprados directamente a productores de Achocalla. 2) Dark kitchen con turnos rotativos juveniles. 3) Pedidos directos vía WhatsApp y delivery ecológico.",
  },
  {
    id: "channels",
    number: 5,
    orderBadge: "Paso 5",
    title: "5. Canales",
    guidingQuestion:
      "¿A través de qué medios llegarás a tus clientes (comunicación, venta y entrega)?",
    explanation:
      "Rutas para adquirir clientes y entregar el producto o servicio en La Paz de manera eficiente.",
    sampleText:
      "Campaña en redes sociales (TikTok e Instagram con historias de productores), alianzas con cafeterías locales y puesto pop-up en ferias universitarias de La Paz.",
  },
  {
    id: "revenue",
    number: 6,
    orderBadge: "Paso 6",
    title: "6. Fuentes de Ingresos",
    guidingQuestion: "¿Cómo generarás dinero? ¿Qué precios cobrarás y con qué frecuencia?",
    explanation: "Estructura de precios, ventas unitarias, suscripciones o convenios corporativos.",
    sampleText:
      "Venta de combos de almuerzos (Bs 25 – 35 por unidad), catering para eventos universitarios e institucionales, y venta de conservas artesanales envasadas.",
  },
  {
    id: "cost_structure",
    number: 7,
    orderBadge: "Paso 7",
    title: "7. Estructura de Costos",
    guidingQuestion: "¿Cuáles son tus costos fijos y variables más importantes para operar?",
    explanation:
      "Materia prima, remuneración justa a los jóvenes trabajadores, empaques, alquiler y servicios básicos.",
    sampleText:
      "Compra de insumos agroecológicos (40%), salarios y honorarios del equipo juvenil (35%), empaques biodegradables y logística de entrega (15%), marketing y servicios (10%).",
  },
  {
    id: "key_metrics",
    number: 8,
    orderBadge: "Paso 8",
    title: "8. Métricas Clave",
    guidingQuestion: "¿Qué 2 o 3 números te dirán si tu negocio está creciendo y funcionando bien?",
    explanation:
      "Indicadores concretos de tracción: ventas semanales, empleos generados, clientes recurrentes.",
    sampleText:
      "Número de empleos juveniles dignos creados por mes, platos vendidos por día (meta: 60), porcentaje de clientes que repiten compra (meta: >30%).",
  },
  {
    id: "unfair_advantage",
    number: 9,
    orderBadge: "Paso 9",
    title: "9. Ventaja Competitiva",
    guidingQuestion:
      "¿Qué tienes que no pueda ser copiado o comprado fácilmente por la competencia?",
    explanation:
      "Alianzas comunitarias, receta secreta, red de productores, identidad cultural o certificación.",
    sampleText:
      "Acuerdo de compra directa con asociaciones de productores campesinos de La Paz y certificación de buenas prácticas avalada por la red social de aliados.",
  },
];

export const EVALUATION_CRITERIA = [
  {
    label: "Impacto local en el empleo",
    detail:
      "Potencial concreto de la propuesta para generar trabajo digno para jóvenes en el municipio paceño seleccionado.",
    color: "#1F3FD1",
  },
  {
    label: "Viabilidad técnica y financiera",
    detail:
      "Claridad en la estructura de costos e ingresos del Lean Canvas y factibilidad operativa real.",
    color: "#FF6B35",
  },
  {
    label: "Nivel de innovación",
    detail:
      "Originalidad de la solución frente a las alternativas tradicionales existentes en el mercado laboral boliviano.",
    color: "#22C55E",
  },
  {
    label: "Capacidad de persuasión en la exposición",
    detail:
      "Claridad argumental, solvencia al defender la idea en el pitch y trabajo en equipo visible durante la sesión.",
    color: "#FFD23F",
  },
];

export const PROFESSOR_ROLE = {
  title: "Rol del Profesor Acompañante",
  subtitle: "Guía metodológica, no protagonista",
  rules: [
    "Un profesor por colegio asiste como tutor metodológico de la delegación escolar.",
    "Su función es exclusiva de orientación metodológica general, apoyo emocional y logística.",
    "NO puede intervenir en el diseño, en la formulación de la propuesta ni en la creación del Lean Canvas.",
    "Durante el pitch de 5 minutos, la exposición y defensa es 100% exclusiva de los estudiantes.",
    "El profesor recibe también su Certificado Oficial de Participación emitido por la UCB.",
  ],
};
