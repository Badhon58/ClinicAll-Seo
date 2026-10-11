// import Physicaldoctor from "./Physicaldoctor";

import { User } from "../DoctorAccount/interface";

export interface CareGiverInterface {
  _id: string;
  name: string;
  types: string[]; // or more specifically: types: ("Normal" | "Critical")[];
  image: string;
  desc: string;
  bnName: string
}

export const Physicaldoctordata = [
  {
    title: "Gp doctor consolation at home",
    description: "Home visit by a GP doctor",
    price: "2500",
    catagory: "gpdoctor",
  },
  {
    title: "Specialist doctor at home ",
    description:
      "Home visit palliative/Critical care/physical/medicine specialist",
    price: "2500",
    catagory: "specialistdoctor",
  },
];
export interface catagoryinterface {
  service: string;
  scope: string;
  price: number;
  b2b_price: number;
  _id: string;
  bnService: string;
  categories: catagory[];
}

export interface specialist {
  fullName: string;
  visitDate: Date | null;
  visitTime: Date | null;
  address: string;
  age: string;
  weight: string;
  payment: string;
  category?: string;
  physicalDoctorId?: string;
  gender?: string;
  district?: string;
  thana?: string;

  // categories: catagory[];
}

export interface catagory {
  desc: string;
  icon: string;
  name: string;
  _id: string;
}

interface user {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface paymentdata {
  invoiceNumber: string;
  totalCost: string;
  user: user;
}


export const servicesData = [
  {
    slug: "discount",
    image: "/servicesImage/DiscountCenter.svg",
    title: "Discount Center",
    description: "Unlock exclusive discounts and save more"
  },
  {
    slug: "/account/claim",
    image: "/servicesImage/MakeClaim.svg",
    title: "Make Claim",
    description: "Easily claim and enjoy your health care benefits!"
  },
]

export type ServiceKey =
  | "Nurse"
  | "BabySitter"
  | "Paramedics"
  | "PhysioTherapist"
  | "SpeechTherapist"
  | "TrainedTherapist";

export const service_key_Value_pair: Record<ServiceKey, string> = {
  Nurse: "Nurse Diplome/BSc",
  BabySitter: "Baby Sitter",
  Paramedics: "Paramedics",
  PhysioTherapist: "Physiotherapist Diploma/BSc",
  SpeechTherapist: "Speech Therapist",
  TrainedTherapist: "Trained Therapist"
}
export const isServiceKey = (key: string): key is ServiceKey => {
  return key in service_key_Value_pair;
};


export interface CareGiverBookingPayload {
  fullName?: string;
  countryCode?: string;
  dialCode?: string;
  phone?: string;
  dutyTime?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  session?: number;
  gender?: "male" | "female" | "other";
  paymentMethod?: "cod" | "online";
  userId?: string;
  careGiverId?: string;
  address?: string;
  age?: string;
  weight?: string;
  discountedPrice: number,
  discountPercent: number,
  discountReason: string
}

export interface babySitterPackageInterface {
  dutyTime: number,
  price: number,
  withFood: boolean,
  patientType: string,
  hasSession: boolean
}

export const babySitterPackage: babySitterPackageInterface[] = [
  {
    dutyTime: 8,
    price: 700,
    withFood: true,
    patientType: "Normal",
    hasSession: false
  },
  {
    dutyTime: 12,
    price: 900,
    withFood: true,
    patientType: "Normal",
    hasSession: false
  },
  {
    dutyTime: 24,
    price: 1400,
    withFood: true,
    patientType: "Normal",
    hasSession: false
  },
]

export const nursePackage: babySitterPackageInterface[] = [
  {
    dutyTime: 8,
    price: 1200,
    withFood: true,
    patientType: "Critical Normal",
    hasSession: false
  },
  {
    dutyTime: 12,
    price: 1500,
    withFood: true,
    patientType: "Critical Normal",
    hasSession: false
  },
  {
    dutyTime: 8,
    price: 1000,
    withFood: true,
    patientType: "Normal Patient",
    hasSession: false
  },
  {
    dutyTime: 12,
    price: 1100,
    withFood: true,
    patientType: "Normal Patient",
    hasSession: false
  },
]

export const paramedicPackage: babySitterPackageInterface[] = [
  {
    dutyTime: 12,
    price: 900,
    withFood: true,
    patientType: "Normal Patient",
    hasSession: false
  },
  {
    dutyTime: 24,
    price: 1500,
    withFood: true,
    patientType: "Normal Patient",
    hasSession: false
  }
]

export const physioTherapistPackage: babySitterPackageInterface[] = [
  {
    dutyTime: 4,
    price: 1500,
    withFood: false,
    patientType: "",
    hasSession: true
  },
]

export const speechTherapistPackage: babySitterPackageInterface[] = [
  {
    dutyTime: 4,
    price: 2500,
    withFood: false,
    patientType: "",
    hasSession: true
  },
]
export const trainedTherapistPackage: babySitterPackageInterface[] = [
  {
    dutyTime: 4,
    price: 1000,
    withFood: false,
    patientType: "",
    hasSession: true
  },
]

export interface ServicePackage {
  _id?: string;
  serviceType?: "BabySitter" | "Nurse" | "Caregiver" | string;
  patientType?: "Normal" | "Critical" | string;
  dutyTime?: string;
  sellPrice?: number;
  isActive?: boolean;
  hasSession?: boolean;
  withFood?: boolean;
  createdAt?: string;
  updatedAt?: string;
  bnDutyTime?: string;
  __v?: number;
}

export interface careGiverResponse {
  _id: string
  fullName: string
  countryCode: string
  dialCode: string
  phone: string
  gender?: string
  age?: number
  weight?: number
  address?: string
  startTime: string
  startDate: string
  endDate: string
  invoiceNumber: string
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  careGiverId?: ServicePackage
  userId?: User
  discountedPrice?: number
  discountPercent?: number
  discountReason?: string
  createdAt: string
}