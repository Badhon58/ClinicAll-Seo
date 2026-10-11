import { initialState } from "../DoctorAccount/interface";

interface PackageVariation {
  _id: string;
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
}

export interface Package {
  _id: string;
  type: string;
  bnType: string;
  order: number;
  tac: string;
  bnTac: string;
  packageType: string;
  packageVariation: PackageVariation[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  countryCode: string;
  dialCode: string;
  phone: string;
  type: string;
  role: string;
  callingPoint: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  otp: string;
  otpExpAt: string;
  bloodGroup: string;
  dob: string;
  email: string;
  firstName: string;
  image: string;
  lastName: string;
  nid: number;
  id: string;
}

interface Payment {
  _id: string;
  payer_authentication_transaction_id: string;
  auth_trans_ref_no: string;
  req_payment_method: string;
  req_payer_authentication_merchant_name: string;
  req_amount: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Subscription {
  _id: string;
  packageId: Package;
  packageVariationId: string;
  packageTitle: string;
  healthCardId: number;
  userId: User;
  invoiceNumber: string;
  packageActivateDate: string;
  packageExpiredDate: string;
  paymentMethod: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentId: Payment;
  paymentStatus: string;
  discountedPrice: number;
}

//Medicine Interface
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

interface Medicine {
  _id: string;
  product_id: number;
  product_name: string;
  is_stock: boolean;
  price: string;
  generic_name: string;
  company_name: string;
  type: string;
  otc: string | null;
  packsize: string;
  updated_at: string;
  images: string;
  category_id: number;
  category_name: string;
  parent_category_id: number;
  parent_category_name: string;
  product_variations: any[];
  origin: string;
  discount_percentage: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OrderItem {
  medicine: Medicine;
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
  type: string;
  role: string;
  callingPoint: number;
  hasFreeCall: boolean;
  isDeleted: boolean;
  familyMembers: any[];
  image: string;
  email: string;
}

interface PaymentId {
  payer_authentication_transaction_id: string;
  auth_trans_ref_no: string;
  req_payment_method: string;
  req_payer_authentication_merchant_name: string;
  req_amount: string;
  createdAt: string;
  updatedAt: string;
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
  deliveryCharge: number;
  user: User;
  isActive: boolean;
  isMailSent: boolean;
  createdAt: string;
  updatedAt: string;
  paymentId: PaymentId;
}

// _______________________
// Lab
// _______________________

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

interface LabTestItem {
  lab_test: LabTest;
  mrp: number;
  quantity: number;
  itemCost: number;
  _id: string;
}

export interface LabOrder {
  _id: string;
  currentAddress: Address;
  collectionTime: Date;
  shippingMethod: string;
  invoiceNumber: string;
  labTestItems: LabTestItem[];
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shippingStatus: string;
  totalCost: number;
  user: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentId: PaymentId;
  location?: string;
  deliveryCharge?: number;
}

interface LabPackageItem {
  title: string;
  bnTitle: string;
  price: number;
  b2Price: number;
  discountPercent: number;
  _id: string;
}

export interface LabPackage {
  _id: string;
  title: string;
  bnTitle: string;
  subTitle: string;
  bnSubTitle: string;
  price: number;
  discountPercent: number;
  labPackageItems: LabPackageItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  telemedecineDuration: number;
}

interface User {
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
  familyMembers: any[]; // You might want to replace 'any' with a more specific type
  createdAt: string;
  updatedAt: string;
  __v: number;
  otp: string;
  otpExpAt: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  id: string;
}

interface Payment {
  _id: string;
  payer_authentication_transaction_id: string;
  auth_trans_ref_no: string;
  req_payment_method: string;
  req_payer_authentication_merchant_name: string;
  req_amount: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LabPackageOrder {
  _id: string;
  currentAddress: Address;
  collectionTime: Date;
  shippingMethod: string;
  labPackageId: LabPackage;
  userId: User;
  invoiceNumber: string;
  orderStatus: string;
  shippingStatus: string;
  totalCost: number;
  paymentMethod: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentId: Payment;
  paymentStatus: string;
}

// Package Interface
// ________________________
interface PackageVariation {
  _id: string;
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
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  type: string;
  role: string;
  callingPoint: number;
  hasFreeCall: boolean;
  isActive: boolean;
  isDeleted: boolean;
  familyMembers: any[]; // If family members have a specific structure, define an interface for it
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
  email: string;
  id: string;
}

interface Payment {
  _id: string;
  payer_authentication_transaction_id: string;
  auth_trans_ref_no: string;
  req_payment_method: string;
  req_payer_authentication_merchant_name: string;
  req_amount: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface PaymentTransaction {
  _id: string;
  payer_authentication_transaction_id: string;
  auth_trans_ref_no: string;
  req_payment_method: string;
  req_payer_authentication_merchant_name: string;
  req_amount: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
export interface Appointment {
  _id: string;
  fullName: string;
  date: string;
  time: string;
  gender: string;
  email: string;
  age: string;
  weight: string;
  paymentFee: number;
  phone: string;
  doctor?: initialState;
  user?: User;
  status: string;
  invoiceNumber: string;
  paymentStatus: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentId: PaymentTransaction;
  paymentMethod: string;
}

export interface Category {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
  bnName: string;
}

export interface PhysicalDoctor {
  _id: string;
  service: string;
  scope: string;
  price: number;
  b2b_price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface patientuser {
  _id: string;
  countryCode: string;
  dialCode: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}

export interface PatientOrder {
  _id: string;
  fullName: string;
  countryCode: string;
  dialCode: string;
  phone: string;
  gender: string;
  age: string;
  weight: string;
  address: string;
  visitTime: Date; // ISO Date
  visitDate: Date; // ISO Date
  invoiceNumber: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  // categoryId: Category;
  category: string;
  physicalDoctorId: PhysicalDoctor;
  userId: patientuser;
  isActive: boolean;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  __v: number;
}
