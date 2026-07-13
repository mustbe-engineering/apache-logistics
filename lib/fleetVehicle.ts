export type FleetVehicle = {
  name: string;
  tagline: string;
  image: string;
  specs: readonly { label: string; value: string }[];
};

export const fleetVehicles: FleetVehicle[] = [
  {
    name: "Furgoneta Chevrolet Express Cargo 2026",
    tagline: "Entregas de última milla y carga ligera",
    image: "/images/assets/1.webp",
    specs: [
      { label: "Capacidad", value: "hasta 1,300 kg / 8 m³" },
      { label: "Área de carga", value: "3.0 m × 1.7 m × 1.4 m" },
      { label: "Ideal para", value: "Paquetería, mensajería, distribución urbana" },
      { label: "Cobertura", value: "Tijuana y zona metropolitana" },
    ],
  },
  {
    name: "Rabón Freightliner M2 2025",
    tagline: "Carga seca regional y consolidada",
    image: "/images/assets/2.webp",
    specs: [
      { label: "Capacidad", value: "hasta 8,000 kg / 30 m³" },
      { label: "Área de carga", value: "7.3 m × 2.4 m × 2.4 m" },
      { label: "Ideal para", value: "LTL, abarrotes, equipos industriales" },
      { label: "Cobertura", value: "Baja California y Sonora" },
    ],
  },
  {
    name: "Torton Kenworth T370 2024",
    tagline: "Volumen medio para rutas interestatales",
    image: "/images/assets/3.webp",
    specs: [
      { label: "Capacidad", value: "hasta 12,000 kg / 45 m³" },
      { label: "Área de carga", value: "9.5 m × 2.5 m × 2.6 m" },
      { label: "Ideal para", value: "FCL parcial, retail, ferretería" },
      { label: "Cobertura", value: "Noroeste de México" },
    ],
  },
  {
    name: "Tractocamión International LT 2025",
    tagline: "Full y transferencia de larga distancia",
    image: "/images/assets/4.webp",
    specs: [
      { label: "Capacidad", value: "hasta 25,000 kg / 68 m³" },
      { label: "Área de carga", value: "16.1 m × 2.6 m × 2.7 m" },
      { label: "Ideal para", value: "Fulls, contenedores, carga dedicada" },
      { label: "Cobertura", value: "BC, Sonora, Chihuahua y BCS" },
    ],
  },
];
