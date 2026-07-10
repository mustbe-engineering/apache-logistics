export const siteContact = {
  street: "Blvd. Colosio 1240, Col. Pitic",
  city: "Hermosillo, Sonora, CP 83100",
  mapsUrl: "https://maps.app.goo.gl/FYorUt7BE1wtsUM76",
  phone: "+52 662 123 4567",
  phoneHref: "tel:+526621234567",
  whatsappHref:
    "https://wa.me/526621234567?text=" +
    encodeURIComponent("Hola, me gustaría cotizar un servicio con Apache Logistics."),
  email: "operaciones@apachelogistics.mx",
  hours: "Lunes a viernes, 07:00 a 19:00",
} as const;

export const siteAddressText = `${siteContact.street}, ${siteContact.city}`;
