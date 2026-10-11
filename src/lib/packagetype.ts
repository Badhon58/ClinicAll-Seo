import moment from "moment";

export const mapTypeToBangla = (type: string, language: string) => {
  if (language == "en") {
    return type;
  }
  switch (type) {
    case "gold":
      return "গোল্ড";
    case "silver":
      return "সিলভার";
    case "bronze":
      return "ব্রোঞ্জ";
    default:
      return type; // Fallback if no Bangla equivalent
  }
};

export const mapIdToLanguage = (id: string, language: string): string => {
  const banglaNumbers: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };
  const englishNumbers: Record<string, string> = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
  };
  const numberMap = language === "bn" ? banglaNumbers : englishNumbers;
  const idGroups = id.match(/\d{1,3}/g) || [];
  const formattedId = idGroups
    .map((group) =>
      group
        .split("")
        .map((digit) => numberMap[digit] || digit)
        .join("")
    )
    .join("-");

  return formattedId;
};

const mapToBangla = (value: string): string => {
  const banglaNumbers: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return value
    .split("")
    .map((char) => banglaNumbers[char] || char)
    .join("");
};
export const formatDate = (date: string, language: string): string => {
  const dateMoment = moment(date);
  if (language === "en") {
    return dateMoment.format("DD-MM-YYYY");
  } else if (language === "bn") {
    const day = mapToBangla(dateMoment.format("DD"));
    const month = mapToBangla(dateMoment.format("MM"));
    const year = mapToBangla(dateMoment.format("YYYY"));
    return `${day}-${month}-${year}`;
  }
  return "";
};

export const HealthCardDetails = {
  en: {
    firstTitle: "Card Benefits",
    doctorCall: "24-hour Doctor Call (Audio, Video)",
    hospitalCashback: "Up to BDT 200,000 Cashback on Hospital Admission",
    diagnosticDiscount:
      "Up to 35% Discount on Diagnostic Tests at 250+ Hospitals",
    opdReimbursement: "Up to BDT 2000 OPD Expense Reimbursement",
    isolationCoverage: "500 Isolation Coverage",
    secondTitle: "Terms and Conditions",
  },
  bn: {
    firstTitle: "কার্ডের সুবিধা ",
    doctorCall: "২৪ ঘন্টা ডাক্তার কল (অডিও, ভিডিও)",
    hospitalCashback: "হাসপাতাল ভর্তি হলে ২,০০,০০০ টাকা পর্যন্ত ক্যাশব্যাক",
    diagnosticDiscount:
      "২৫০+ হাসপাতালে ডায়াগনস্টিক টেস্টে ৩৫% পর্যন্ত ডিসকাউন্ট",
    opdReimbursement: "২০০০ টাকা পর্যন্ত ওপিডি খরচ ফেরত ",
    isolationCoverage: "৫০০ টাকার আইসোলেশন কভারেজ ",
    secondTitle: "শর্তাবলী ",
  },
};

export const HealthCardTerms = {
  en: {
    termsTitle: "Terms and Conditions",
    validity: "The card is only valid within the specified time period.",
    doctorCallUse:
      "Doctor Calling Card is applicable only for general medical advice over the phone.",
    noRefund: "No refund or return will be given after purchasing the card.",
    confidentiality:
      "Customer's personal and medical information will be kept confidential.",
    rightsReserved:
      "CliniCall Limited reserves the right to change terms and conditions as needed.",
  },
  bn: {
    termsTitle: "শর্তাবলী",
    validity: "কার্ডটি শুধুমাত্র নির্ধারিত সময়সীমার মধ্যে ব্যবহারযোগ্য।",
    doctorCallUse:
      "ডাক্তার কলিং কার্ড শুধুমাত্র টেলিফোনে সাধারণ চিকিৎসা পরামর্শ প্রদানের জন্য প্রযোজ্য।",
    noRefund: "কার্ড কেনার পর কোনো ফেরত বা রিফান্ড প্রদান করা হবে না।",
    confidentiality:
      "গ্রাহকের ব্যক্তিগত এবং চিকিৎসা সম্পর্কিত তথা গোপন রাখা হবে।",
    rightsReserved:
      "ক্লিনিকল লিমিটেড প্রয়োজনে শর্তাবলী পরিবর্তন করার অধিকার সংরক্ষণ করে।",
  },
};

// export const packagetype = (type: string, language: string) => {
//   if (language == "en") {
//     return type;
//   }
//   switch (type.toLowerCase()) {
//     case "all":
//       return language === "bn" ? "সব" : type;
//     case "monthly":
//       return language === "bn" ? "মাসিক" : type;
//     case "yearly":
//       return language === "bn" ? "বার্ষিক" : type;
//     case "instaint-Doctor":
//       return language === "bn" ? "তাৎক্ষণিক ডাক্তার" : type;
//     case "quarterly":
//       return language === "bn" ? "ত্রৈমাসিক" : type;
//     case "half-yearly":
//       return language === "bn" ? "অর্ধ-বার্ষিক" : type;
//     default:
//       return type;
//   }
// };
export const packagetype = (type: string, language: string) => {
  if (language === "en") {
    return type;
  }
  switch (type.toLowerCase()) {
    case "all":
      return "সব";
    case "monthly":
      return "মাসিক";
    case "yearly":
      return "বার্ষিক";
    case "instant-doctor":
      return "তাৎক্ষণিক ডাক্তার";
    case "quarterly":
      return "ত্রৈমাসিক";
    case "half-yearly":
      return "অর্ধ-বার্ষিক";
    default:
      return type;
  }
};

export const buyButton = (text: string, language: string) => {
  if (language == "en") {
    return text;
  } else {
    return "এখনই কিনুন";
  }
};

export const PriceConv = (text: string, language: string) => {
  if (language == "en") {
    return `BDT ${text}`;
  } else {
    return `৳ ${mapToBangla(text)}`;
  }
};
