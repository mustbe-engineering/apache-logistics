export const siteContact = {
  street: "Blvd. Colosio 1240, Col. Pitic",
  city: "Hermosillo, Sonora, CP 83100",
  mapsUrl: "https://maps.app.goo.gl/FYorUt7BE1wtsUM76",
  phone: "+52 646 150 9120",
  phoneHref: "tel:+526461509120",
  whatsappHref:
    "https://wa.me/526461509120?text=" +
    encodeURIComponent("Hola, me gustaría cotizar un servicio con Apache Logistics."),
  email: "logistica@apachelogistics.com.mx",
  hours: "Lunes a viernes, 07:00 a 19:00",
} as const;

export const siteAddressText = `${siteContact.street}, ${siteContact.city}`;
