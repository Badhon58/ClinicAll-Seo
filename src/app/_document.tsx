<meta name="viewport" content="width=device-width, initial-scale=1.0" />;
export const schemaData = {
  "@context": "https://schema.org",
  "@type": "PublicHealth",
  name: "Clinicall",
  image: "https://www.theclinicall.com/other/logo.svg",
  url: "https://www.theclinicall.com/",
  telephone: "+880 17 1163 3519",
  email: "info@theclinicall.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "House-3, Road-2 Baridhara J Block",
    addressLocality: "Dhaka",
    postalCode: "1212",
    addressCountry: "BD",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.799056686153683,
    longitude: 90.42398413590843,
  },

  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },

  MedicalSpecialty: [
    "BDOnlineDoctor",
    "OnlineMedicalDoctorConsultation",
    "DigitalHealthSolutions",
    "OnlineHealthServices",
    "TelemedicineService",
  ],

  availableService: [
    {
      "@type": "CommunityHealth",
      name: "Online Doctor Appointment",
      url: "https://www.theclinicall.com/doctorlist",
      telephone: "+880 17 1163 3519",
    },
    {
      "@type": "PublicHealth",
      name: "HealthPackage",
      url: "https://www.theclinicall.com/healthPackage",
      telephone: "+880 17 1163 3519",
    },
    {
      "@type": "MedicalProcedure",
      name: "Lab Test",
      url: "https://www.theclinicall.com/lab",
      telephone: "+880 17 1163 3519",
    },
    {
      "@type": "Pharmacy",
      name: "Buy Medicine",
      image: "https://www.theclinicall.com/mediMart",
      telephone: "+880 17 1163 3519",
    },
  ],

  sameAs: [
    "https://www.facebook.com/theclinicall",
    "https://www.instagram.com/theclinicall/",
  ],
};
