import { LabPackage } from "../common/interface";
import { initialState } from "../DoctorAccount/interface";
import { NewProduct } from "../MediMart/Interface";

export interface UserInfo {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  bloodGroup?: string;
  nid?: string;
  address?: string;
  image?: File;
}
interface PackageVeriationinterface {
  _id: string;
  title: string;
  bnTitle: string;
  sellingPrice: number;
  costPrice: number;
  premiumPerMonth: number;
  duration: string; // Adjust as needed
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
}

export interface Package {
  _id: string;
  packageId: {
    _id: string;
    title: string;
    description: string;
    price: number;
    duration: "yearly" | "monthly";
    saveAmount: number;
    tac: string;
    isActive: boolean;
    type: string;
    packageVariation?: PackageVeriationinterface[];
  };
  poweredBy?: string
  packageTitle: string;
  healthCardId: number;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    phone: string;
    role: "general_user" | "admin";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    address: string;
    bloodGroup: string;
    dob: string;
    email: string;
    image: string;
    nid: number;
  };
  packageActivateDate: string;
  packageExpiredDate: string;
  isActive: boolean;
  type: string;
}

interface BankDetails {
  bankName?: string;
  accountName?: string;
  accountNumber?: number;
  branch?: string;
  routingNumber?: string;
  district?: string;
}

interface MfsDetails {
  accountName?: string;
  phone?: string;
  mfsOperator?: string;
}

export interface ClaimData {
  nameofOrganization?: string;
  nameofPatient?: string;
  employeeStatus?: string;
  phone?: string;
  address?: string;
  user?: string;
  bookedPackage?: string;
  consultantFee?: string;
  claimAmount?: string;
  accountType?: "Bank" | "MFS";
  bank?: BankDetails;
  mfs?: MfsDetails;
  doctorPrescription?: string[];
  dischargeCertificate?: string[];
  hospitalBillReceipt?: string[];
  diagnosticTestReport?: string[];
  otherDocuments?: string[];
}

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  degree: string;
  visitFee: number;
}

export interface Appointment {
  _id?: string;
  fullName?: string;
  date?: string;
  time?: string;
  gender?: "male" | "female" | "other";
  email?: string;
  paymentFee?: number;
  phone?: string;
  doctor?: initialState;
  user?: User;
  status?: "done" | "pending";
  age?: string;
  prescription?: string;
  prescription_data?: Prescription;
  paymentStatus?: string;
}

export interface RxInterface {
  doseForm: string;
  rx: string;
  doseTime: string;
  doseWithMeal: string;
  containueUntil: string;
  note: string;
}

export interface Prescription {
  chiefComplaints: string[];
  recommendedTest: string[];
  advice: string[];
  history: string;
  followUpWithin: string;
  referral: string;
  rx: RxInterface[];
}
export interface UserInfo2 {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  bloodGroup?: string;
  nid?: string;
  address?: string;
  image?: string;
}
export interface Claimhistory {
  _id: string;
  nameofOrganization?: string;
  nameofPatient?: string;
  employeeStatus?: string;
  phone?: string;
  address?: string;
  user?: UserInfo2;
  bookedPackage?: Package;
  consultantFee?: string;
  claimAmount?: string;
  accountType?: "Bank" | "MFS";
  bank?: BankDetails;
  mfs?: MfsDetails;
  doctorPrescription?: string[];
  dischargeCertificate?: string[];
  hospitalBillReceipt?: string[];
  diagnosticTestReport?: string[];
  otherDocuments?: string[];
  status: string;
}

export interface Order {
  _id: string;
  currentAddress: Address;
  shippingMethod: string;
  invoiceNumber: string;
  orderItems: OrderItem[];
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shippingStatus: string;
  totalCost: number;
  user: User;
  createdAt?: string;
}

interface HistoryOrderItem {
  medicine?: NewProduct;
  mrp?: number;
  quantity?: number;
  itemCost?: number;
  _id: string;
}
interface LabTestItem {
  lab_test: LabTest;
  mrp: number;
  quantity: number;
  itemCost: number;
  _id: string;
}

interface LabTest {
  _id: string;
  name: string;
  category: string;
  mrp: number;
  discount: number;
  discountPrice: number;
  isActive: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
export interface OrderHistory {
  _id: string;
  currentAddress: Address;
  shippingMethod: string;
  invoiceNumber: string;
  orderItems?: HistoryOrderItem[];
  labTestItems?: LabTestItem[];
  labPackageId?: LabPackage;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shippingStatus: string;
  totalCost: number;
  user: User;
  createdAt?: string;
}

interface Address {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  district: string;
  postalCode: number;
  thana: string;
  isDefault: boolean;
  isHome: boolean;
  user: string;
}

interface OrderItem {
  medicine: string;
  mrp: number;
  quantity: number;
  itemCost: number;
  _id: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  address: string;
  bloodGroup: string;
  dob: string;
  email: string;
  image: string;
  nid: number;
  passResetOtp: string;
  passResetOtpExpAt: string;
}

export interface Product {
  itemCost: number;
  medicine: NewProduct;
  mrp: number;
  quantity: number;
}
interface lab {
  name: string;
  category: string;
}
export interface labTest {
  itemCost: number;
  lab_test: lab;
  mrp: number;
  quantity: number;
}
export interface labOrderTest {
  itemCost: number;
  lab_test: string;
  mrp: number;
  quantity: number;
}

export interface LabOrder {
  _id: string;
  currentAddress: Address;
  shippingMethod: string;
  invoiceNumber: string;
  labTestItems: labOrderTest[];
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shippingStatus: string;
  totalCost: number;
  user: User;
}

export const englishtobangla = (text: string, language: string) => {
  if (language == "en") {
    return text;
  }
  switch (text) {
    case "Upload":
      return "ডকুমেন্ট";
    case "Document":
      return "আপলোড করুন";
    default:
      break;
  }
};

export interface reportUpload {
  userId: string;
  title: string;
  desc: string;
  reportFile: string[];
}

export const getPackageImage = (type: string) => {
  const imagetype = type.trim().toLowerCase();
  switch (imagetype) {
    case "gold":
      return `http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28052025T082748-gold.png`;
    case "silver":
      return `http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28052025T082918-silver.png`;
    case "bronze":
      return `http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28052025T082943-bronze.png`;
    default:
      return `http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-23122025T173019-telimedicine.png`
  }
};


export interface PhysicalDoctor {
  _id: string;
  service: string;
  scope: string;
  price: number;
  b2b_price: number;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  bnService: string;
  categories: string[];
}

export interface Userdetails {
  _id: string;
  countryCode: string;
  dialCode: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}

export interface DoctorVisite {
  _id: string;
  fullName: string;
  countryCode: string;
  dialCode: string;
  phone: string;
  gender: string;
  age: string;
  weight: string;
  address: string;
  visitTime: string; // ISO datetime string
  visitDate: string; // ISO date string
  invoiceNumber: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  physicalDoctorId: PhysicalDoctor;
  userId: Userdetails;
  isActive: boolean;
  __v: number;
}
