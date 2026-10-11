interface OrderItem {
  _id: string;
  title: string;
  generic: string;
  mrp: number;
  quantity: number;
  itemCost: number;
  itemType: string;
  image: string;
}

interface UserAddress {
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
  isActive: boolean;
  createdAt: string; // ISO 8601 string for date
  updatedAt: string; // ISO 8601 string for date
  __v: number;
}
export interface Order {
  currentAddress: UserAddress;
  shippingMethod: string;
  invoiceNumber: string;
  orderItems: OrderItem[];
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  shippingStatus: string;
  totalCost: number;
  user: string;
  isActive: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Appointment {
  fullName: string;
  date: string;
  time: string;
  gender: string;
  email: string;
  age: string;
  paymentFee: number;
  phone: string;
  doctor: string; // Doctor ID
  user: string | null; // User ID or null
  status: "pending" | "confirmed" | "cancelled"; // Enum for status
  invoiceNumber: string;
  paymentStatus: "pending" | "paid" | "failed"; // Enum for payment status
  isActive: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "general_user" | "admin" | "doctor"; // Enum for role
  passResetOtp: string;
  passResetOtpExpAt: string; // ISO date string
  passResetToken: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"; // Enum for blood groups
  dob: string; // Date of birth in string format (ISO or custom)
  email: string;
  image: string; // URL to the user's image
  address: string;
  nid: number; // National ID as a number
}

export interface PackageDetails {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: "monthly" | "yearly" | "weekly"; // Enum for package duration
  saveAmount: number;
  tac: string; // Terms and conditions
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface PackageSubscription {
  _id: string;
  packageId: PackageDetails;
  packageTitle: string;
  healthCardId: number;
  userId: string; // User ID
  invoiceNumber: string;
  packageActivateDate: string; // ISO date string
  packageExpiredDate: string; // ISO date string
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface LabPackageItem {
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
export interface OrderData {
  _id: string;
  currentAddress: UserAddress;
  collectionTime: string;
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
}
