export interface PackageInterface {
  _id?: string;
  title?: string;
  bnDescription?: string;
  description?: string;
  price?: number;
  duration?: string;
  saveAmount?: number;
  tac?: string;
  doctorConsultation?: string;
  isolationCoverage?: string;
  hospitalCashback?: string;
  opd?: string;
  member?: string;
  condition?: string;
  type?: string;
}
// export const silverBg =
//   "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-14012025T104754-silver.png";
// export const bronzeBg =
//   "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-14012025T104715-bronze.png";
// export const goldBg =
//   "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-14012025T104656-gold.png";

// export const bronzeButton =
// "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28122024T161857-bronzebutton.svg";
// export const SilverButton =
//   "bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-29122024T122432-silver_button.svg')]";

// export const bronzeButton =
//   "bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-02012025T170026-group-1171276748.png')]";

// export const GoldButton =
//   "bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-29122024T122459-gold_button.svg')]";

export const DoctorConsultation = (text: string, language: string) => {
  if (language == "en") {
    return text;
  } else {
    return `( ডাক্তারের পরামর্শ )`;
  }
};

export interface addressDetails {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  district?: string;
  thana?: string;
  postalCode?: string | number;
  isDefault?: boolean;
  isHome?: boolean;
  user?: string;
}

export const NewBronze =
  // "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27022025T153144-bronze.png";
  "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-11092025T154504-bronze-ss.svg";

export const newGold =
  // "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27022025T153216-gold.png";
  // "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-08032025T112514-gold-big-2.jpg"
  "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-08032025T113852-gold-big-2.jpg";

export const newSilver =
  // "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27022025T153235-silver.png";
  "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-11092025T154319-silver-pack-im.png";

export const teleMedicine =
  "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06032025T110339-telimedicin.png";

//   export const NewBronze =
//   "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06032025T141558-bronze-1-o.png";

// export const newGold =
//   "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06032025T141613-gold-1-o.png";

// export const newSilver =
//   "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06032025T141627-silver-1-o.png";

// export const teleMedicine =
//   "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06032025T110339-telimedicin.png";

export interface PackageVariation {
  title?: string;
  bnTitle?: string;
  sellingPrice?: number;
  bnSellingPrice?: string;
  costPrice?: number;
  premiumPerMonth?: number;
  duration?: string;
  bnDuration?: string;
  saveAmount?: number;
  bnSaveAmount?: string;
  isolationCoverage?: number;
  hospitalCashback?: number;
  perClaimBenefit?: number;
  perDayBenefit?: number;
  opd?: number;
  member?: number;
  condition?: string;
  hasHospitalDiscount?: boolean;
  teleCost?: number;
  _id?: string;
}

export interface Package {
  member?: number;
  isActive?: boolean;
  _id?: string;
  type?: string;
  bnType?: string;
  order?: number;
  tac?: string;
  bnTac?: string;
  packageType?: string;
  packageVariation?: PackageVariation[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  title?: string;
  bnTitle?: string;
  showHome?: boolean;
  isInstant?: boolean
}
export interface PromoCode {
  _id: string;
  code: string;
  activationType: "discount" | string;
  userType: "common" | string;
  promoType: "pak" | string;
  discountPercent: number;
  packageId: string;
  users: string[]; // assuming array of user IDs (strings)
  packageVariationId: string;
  isUsed: boolean;
  isActive: boolean;
  createdAt: string; // or `Date` if parsed
  updatedAt: string; // or `Date` if parsed
  __v: number;
  expDate: string; // or `Date`
  variations: string[]; // assuming array of variation IDs
}

export interface BracPromoCode {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minExpense: number;
  bankName: string;
}
export interface GPPromoCode {
  code: string;
  discountPercent: number;
}
export interface PurchaseRequest {
  senderId?: string;
  packageId?: string;
  packageVariationId?: string;
  userCountryCode?: string;
  userDialCode?: string;
  userPhone?: string;
  discountedPrice?: number;
  discountPercent?: number;
  discountReason?: string;
  promoCodeId?: string;
  userName?: string;
}

export const scrollToTop = () => {
  window.scrollTo({ top: 10, behavior: "smooth" });
};