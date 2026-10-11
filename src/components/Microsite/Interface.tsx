export const getWidth = (inputWidth: number) => {
  const screenWidth = window.innerWidth;
  return `${(inputWidth / 430) * screenWidth}px`;
};

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

export interface PackageInterface {
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
}
export const NewBronze =
  "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-11092025T154504-bronze-ss.svg";

export const newGold =
  "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-08032025T113852-gold-big-2.jpg";

export const newSilver =
  "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-11092025T154319-silver-pack-im.png";

export const teleMedicine =
  "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06032025T110339-telimedicin.png";

export interface UserInfo {
  firstName: string;
  lastName: string;
  image?: string | File;
  email: string;
  bmdcRegistered?: boolean;
  bmdc?: string;
  phone?: string;
  bloodGroup?: string;
  nid?: string;
  address?: string;
  dob?: string;
}
export interface PaymentData {
  userId: any;
  packageId: string;
  packageVariationId: string;
  packageTitle: string;
  paymentMethod?: string; // optional
  paymentStatus?: string; // optional
  discountedPrice?: number; // optional
  discountPercent?: number; // optional
  discountReason?: string; // optional
  agentId?: string; // optional
  promoCodeId?: string; // optional
  ref?:string
}

export interface User {
  _id: string;
  countryCode: string;
  dialCode: string;
  phone: string;
  provider: string;
  type: string;
  role: string;
  callingPoint: number;
  lifeInsurenceAmount: number;
  hospitalAdmitAmount: number;
  accidentHospitalAdmitAmount: number;
  opdConsultationAmount: number;
  opdTestAmount: number;
  opdMedicineAmount: number;
  hasFreeCall: boolean;
  isActive: boolean;
  isDeleted: boolean;
  familyMembers: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  otp: string;
  otpExpAt: string;
  address: string;
  bloodGroup: string;
  dob: string;
  email: string;
  firstName: string;
  image: string;
  lastName: string;
  nid: number;
  id: string;
}

export interface BuyPackageVariation {
  doctorConsultation: number;
  discountPercent: number;
  title: string;
  bnTitle: string;
  sellingPrice: number;
  costPrice: number;
  premiumPerMonth: number;
  duration: string;
  bnDuration: string;
  saveAmount: number;
  isolationCoverage: number;
  hospitalCashback: number;
  perClaimBenefit: number;
  perDayBenefit: number;
  opd: number;
  member: number;
  condition: string;
  hasHospitalDiscount: boolean;
  teleCost: number;
  _id: string;
}

export interface PackageInfo {
  _id: string;
  type: string;
  bnType: string;
  order: number;
  tac: string;
  bnTac: string;
  packageType: string;
  packageVariation: BuyPackageVariation[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isInstant: boolean;
  showHome: boolean;
  bnTitle: string;
  title: string;
  image: string;
}

export interface PurchasedPackage {
  _id: string;
  packageId: PackageInfo;
  packageVariationId: string;
  packageTitle: string;
  healthCardId: number;
  userId: User;
  invoiceNumber: string;
  packageActivateDate: string;
  packageExpiredDate: string;
  paymentMethod: string;
  callCount: number;
  byCallingCard: boolean;
  discountedPrice: number;
  discountPercent: number;
  discountReason: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentId: string;
  paymentStatus: string;
}

export const validatePhone = (phone: string) => {
  // Remove spaces & hyphens
  const cleaned = phone.replace(/[\s-]/g, "");

  if (cleaned.length < 8) {
    return "Enter a Valid Number.";
  }
  if (!/^\d+$/.test(cleaned)) {
    return "Phone number must contain only digits.";
  }

  return null;
};
