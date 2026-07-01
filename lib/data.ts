export type StatIconId = "trips" | "clients" | "comments";

export const stats: { value: string; label: string; icon: StatIconId }[] = [
  { value: "1000+", label: "Viajes", icon: "trips" },
  { value: "30+", label: "Clientes", icon: "clients" },
  { value: "50+", label: "Comentarios", icon: "comments" },
];

export type ServiceIconId =
  | "lcl"
  | "ltl"
  | "trasbordo"
  | "maniobras"
  | "almacen"
  | "ultima";

export type Service = {
  name: string;
  title: string;
  tagline: string;
  desc: string;
  benefits: string;
  icon: ServiceIconId;
};

export const services: Service[] = [
  {
    name: "LCL",
    title: "LCL - Consolidación de Carga Parcial",
    tagline: "Solución económica para envíos de menor volumen",
    desc: "Optimiza tus costos de envío sin sacrificar rapidez. Nuestro servicio de consolidación agrupa múltiples cargas parciales en un solo viaje, garantizando trazabilidad lote por lote. Ideal para pequeñas y medianas empresas que requieren confiabilidad en transporte terrestre a escala regional.",
    benefits: "Reducción de costos, seguimiento detallado, flexibilidad de horarios.",
    icon: "lcl",
  },
  {
    name: "LTL",
    title: "LTL - Transporte Dedicado Puerta a Puerta",
    tagline: "Tu carga, tu vehículo, tu ruta",
    desc: "Cuando tu envío requiere exclusividad y rapidez. Nuestro servicio de carga completa dedicada asegura que tu mercancía viaje de forma aislada, sin manipulaciones innecesarias. Desde el punto de origen hasta el destino final, con asignación de unidad y conductor exclusivos.",
    benefits: "Máxima seguridad, tiempos garantizados, sin transbordos intermedios.",
    icon: "ltl",
  },
  {
    name: "Transbordos",
    title: "Transbordos - Transferencia Segura",
    tagline: "Continuidad sin compromisos",
    desc: "Cambios de ruta y terminal sin riesgos. Nuestro sistema de transferencia está diseñado para minimizar tiempos de espera y maximizar la integridad de la carga. Personal especializado y protocolos de seguridad en cada traslado.",
    benefits: "Cero averías, documentación completa, eficiencia operativa.",
    icon: "trasbordo",
  },
  {
    name: "Maniobras",
    title: "Maniobras - Carga y Descarga Profesional",
    tagline: "Equipos certificados, operarios capacitados",
    desc: "Tu carga merece expertos. Contamos con personal certificado y equipamiento de última tecnología para manejar cualquier tipo de mercancía. Desde operaciones simples hasta cargas especiales, garantizamos precisión y seguridad en cada movimiento.",
    benefits: "Equipo certificado, reducción de daños, cumplimiento normativo.",
    icon: "maniobras",
  },
  {
    name: "Almacenaje",
    title: "Almacenaje - Custodia Temporal Documentada",
    tagline: "Tu mercancía bajo control total",
    desc: "Resguardo seguro con visibilidad completa. Ofrecemos espacios climatizados y monitoreados donde tu carga se mantiene protegida. Sistema de inventario digital en tiempo real te permite conocer el estado exacto de tus productos en todo momento.",
    benefits: "Seguridad 24/7, trazabilidad digital, flexibilidad de permanencia.",
    icon: "almacen",
  },
  {
    name: "Última milla",
    title: "Última Milla - Entrega Final Flexible",
    tagline: "Llega a donde sea, cuando sea",
    desc: "Desde la ciudad hasta el campo más remoto. Completamos tu cadena logística con entregas especializadas en zonas metropolitanas y rurales. Rutas optimizadas, horarios flexibles y confirmación de entrega en tiempo real.",
    benefits: "Cobertura total, puntualidad garantizada, entrega confirmada.",
    icon: "ultima",
  },
];

export const fleetSpecs = [
  { id: "GPS", detail: "Rastreo en tiempo real por unidad" },
  { id: "PERMISO SCT", detail: "Autorización federal vigente" },
  { id: "UNIDADES NUEVAS", detail: "Flota renovada 2022-2025" },
  { id: "MONITOREO", detail: "Centro de control 24/7" },
  { id: "BOTÓN PÁNICO", detail: "Alerta inmediata ante incidente" },
  { id: "LÍMITE 95 KM/H", detail: "Política de velocidad controlada" },
];
