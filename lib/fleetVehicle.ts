export type FleetVehicle = {
  name: string;
  tagline: string;
  /** Focus overlay path; must be 1920×1080 to match animation frames. */
  image: string;
  specs: readonly { label: string; value: string }[];
};

export const fleetVehicles: FleetVehicle[] = [
  {
    name: "Unidad tipo Rabón F-450",
    tagline: "Rutas locales y foráneas",
    image: "/images/assets/1.webp",
    specs: [
      { label: "Capacidad", value: "6 tons" },
      { label: "Volumen", value: "22 CBM" },
      { label: "Ideal para", value: "Carga media y distribución regional" },
      { label: "Cobertura", value: "Rutas locales y foráneas" },
    ],
  },
  {
    name: "Unidad tipo Stepvan F-350",
    tagline: "Rutas locales y foráneas",
    image: "/images/assets/2.webp",
    specs: [
      { label: "Capacidad", value: "3.5 tons" },
      { label: "Volumen", value: "19 CBM" },
      { label: "Ideal para", value: "Paquetería y entregas urbanas" },
      { label: "Cobertura", value: "Rutas locales y foráneas" },
    ],
  },
  {
    name: "Unidad tipo Panel",
    tagline: "Rutas locales dentro de Baja California",
    image: "/images/assets/3.webp",
    specs: [
      { label: "Capacidad", value: "1.5 tons" },
      { label: "Volumen", value: "9 CBM" },
      { label: "Ideal para", value: "Última milla y carga ligera" },
      { label: "Cobertura", value: "Rutas locales dentro de B.C." },
    ],
  },
];
