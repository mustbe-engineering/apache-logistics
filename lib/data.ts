export type StatIconId = "trips" | "clients" | "comments";

export const stats: { value: string; label: string; icon: StatIconId }[] = [
  { value: "1000+", label: "Viajes", icon: "trips" },
  { value: "30+", label: "Clientes", icon: "clients" },
  { value: "50+", label: "Comentarios", icon: "comments" },
];

export const services = [
  { name: "LCL", desc: "Consolidación de carga parcial con control por lote.", seed: "lcl" },
  { name: "LTL", desc: "Carga completa dedicada puerta a puerta.", seed: "ltl" },
  { name: "Trasbordos", desc: "Transferencia segura entre terminales y rutas.", seed: "trasbordo" },
  { name: "Maniobras", desc: "Carga y descarga con equipo certificado.", seed: "maniobras" },
  { name: "Almacenaje", desc: "Resguardo temporal con inventario documentado.", seed: "almacen" },
  { name: "Última milla", desc: "Entrega final en zona metropolitana y rural.", seed: "ultima" },
];

export const fleetSpecs = [
  { id: "GPS", detail: "Rastreo en tiempo real por unidad" },
  { id: "PERMISO SCT", detail: "Autorización federal vigente" },
  { id: "UNIDADES NUEVAS", detail: "Flota renovada 2022-2025" },
  { id: "MONITOREO", detail: "Centro de control 24/7" },
  { id: "BOTÓN PÁNICO", detail: "Alerta inmediata ante incidente" },
  { id: "LÍMITE 95 KM/H", detail: "Política de velocidad controlada" },
];
