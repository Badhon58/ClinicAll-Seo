interface Category {
  value?: string;
  label?: string;
}

interface Hospital {
  _id?: string;
  name?: string;
  address?: string;
}

interface WorkDetail {
  organization?: string;
  designation?: string;
  startMonth?: string;
  startYear?: number;
  endMonth?: string;
  endYear?: number;
  isCurrentlyWorking?: boolean;
}

export interface TimeSlot {
  time?: string;
  period?: string;
}

export interface DateSlot {
  date?: string;
  timeSlots?: TimeSlot[];
}

export interface category1 {
  _id: string;
  name: string;
}

export interface initialState {
  _id?: string;
  firstName?: string;
  lastName?: string;
  category?: [];
  hospital?: string;
  degree?: string;
  bmdc?: string;
  visitFee?: string;
  yearsOfExperience?: string;
  workDetails?: WorkDetail[];
  dateSlot?: DateSlot[];
  email?: string;
  phone?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
  image?: string | File;
  personalDetails?: string;
  bmdcRegistered: boolean;
}

export interface MorningOptionInterface {
  value: string;
  label: string;
}

export const timeRange: MorningOptionInterface[] = [
  { value: "7", label: "7" },
  { value: "15", label: "15" },
  { value: "30", label: "30" },
  { value: "45", label: "45" },
];

export const MorningOption: MorningOptionInterface[] = [
  { value: "07:30 AM - 08:00 AM & morning", label: "07:30 AM - 08:00 AM" },
  { value: "08:00 AM - 08:30 AM & morning", label: "08:00 AM - 08:30 AM" },
  { value: "08:30 AM - 09:00 AM & morning", label: "08:30 AM - 09:00 AM" },
  { value: "09:00 AM - 09:30 AM & morning", label: "09:00 AM - 09:30 AM" },
  { value: "09:30 AM - 10:00 AM  & morning", label: "09:30 AM - 10:00 AM" },
  { value: "10:00 AM - 10:30 AM  & morning", label: "10:00 AM - 10:30 AM" },
  { value: "10:30 AM - 11:00 AM  & morning", label: "10:30 AM - 11:00 AM" },
  { value: "11:00 AM - 11:30 AM  & morning", label: "11:00 AM - 11:30 AM" },
  { value: "11:30 AM - 12:00 PM  & morning", label: "11:30 AM - 12:00 PM" },
  // { value: "12:00 PM - 12:30 PM & afternoon", label: "12:00 PM - 12:30 PM" },
  // { value: "12:30 PM - 01:00 PM & afternoon", label: "12:30 PM - 01:00 PM" },
  // { value: "01:00 PM - 01:30 PM & afternoon", label: "01:00 PM - 01:30 PM" },
  // { value: "01:30 PM - 02:00 PM  & afternoon", label: "01:30 PM - 02:00 PM" },
  // { value: "02:00 PM - 02:30 PM  & afternoon", label: "02:00 PM - 02:30 PM" },
  // { value: "02:30 PM - 03:00 PM  & afternoon", label: "02:30 PM - 03:00 PM" },
  // { value: "03:00 PM - 03:30 PM  & afternoon", label: "03:00 PM - 03:30 PM" },
  // { value: "03:30 PM - 04:00 PM  & afternoon", label: "03:30 PM - 04:00 PM" },
  // { value: "04:00 PM - 04:30 PM  & afternoon", label: "04:00 PM - 04:30 PM" },
  // { value: "04:30 PM - 05:00 PM  & afternoon", label: "04:30 PM - 05:00 PM" },
  // { value: "05:00 PM - 05:30 PM  & afternoon", label: "05:00 PM - 05:30 PM" },
  // { value: "05:30 PM - 06:00 PM  & afternoon", label: "05:30 PM - 06:00 PM" },
  // { value: "06:00 PM - 06:30 PM & evening", label: "06:00 PM - 06:30 PM" },
  // { value: "06:30 PM - 07:00 PM & evening", label: "06:30 PM - 07:00 PM" },
  // { value: "07:00 PM - 07:30 PM & evening", label: "07:00 PM - 07:30 PM" },
  // { value: "07:30 PM - 08:00 PM & evening", label: "07:30 PM - 08:00 PM" },
  // { value: "08:00 PM - 08:30 PM & evening", label: "08:00 PM - 08:30 PM" },
  // { value: "08:30 PM - 09:00 PM & evening", label: "08:30 PM - 09:00 PM" },
  // { value: "09:00 PM - 09:30 PM & evening", label: "09:00 PM - 09:30 PM" },
  // { value: "09:30 PM - 10:00 PM & evening", label: "09:30 PM - 10:00 PM" },
  // { value: "10:00 PM - 10:30 PM & evening", label: "10:00 PM - 10:30 PM" },
  // { value: "10:30 PM - 11:00 PM & evening", label: "10:30 PM - 11:00 PM" },
  // { value: "11:00 PM - 11:30 PM & evening", label: "11:00 PM - 11:30 PM" },
  // { value: "11:30 PM - 12:00 AM & evening", label: "11:30 PM - 12:00 AM" },
];

export const AfternoonOption: MorningOptionInterface[] = [
  { value: "12:00 PM - 12:30 PM & afternoon", label: "12:00 PM - 12:30 PM" },
  { value: "12:30 PM - 01:00 PM & afternoon", label: "12:30 PM - 01:00 PM" },
  { value: "01:00 PM - 01:30 PM & afternoon", label: "01:00 PM - 01:30 PM" },
  { value: "01:30 PM - 02:00 PM  & afternoon", label: "01:30 PM - 02:00 PM" },
  { value: "02:00 PM - 02:30 PM  & afternoon", label: "02:00 PM - 02:30 PM" },
  { value: "02:30 PM - 03:00 PM  & afternoon", label: "02:30 PM - 03:00 PM" },
  { value: "03:00 PM - 03:30 PM  & afternoon", label: "03:00 PM - 03:30 PM" },
  { value: "03:30 PM - 04:00 PM  & afternoon", label: "03:30 PM - 04:00 PM" },
  { value: "04:00 PM - 04:30 PM  & afternoon", label: "04:00 PM - 04:30 PM" },
  { value: "04:30 PM - 05:00 PM  & afternoon", label: "04:30 PM - 05:00 PM" },
  { value: "05:00 PM - 05:30 PM  & afternoon", label: "05:00 PM - 05:30 PM" },
  { value: "05:30 PM - 06:00 PM  & afternoon", label: "05:30 PM - 06:00 PM" },
];

export const EveningOption: MorningOptionInterface[] = [
  { value: "06:00 PM - 06:30 PM & evening", label: "06:00 PM - 06:30 PM" },
  { value: "06:30 PM - 07:00 PM & evening", label: "06:30 PM - 07:00 PM" },
  { value: "07:00 PM - 07:30 PM & evening", label: "07:00 PM - 07:30 PM" },
  { value: "07:30 PM - 08:00 PM & evening", label: "07:30 PM - 08:00 PM" },
  { value: "08:00 PM - 08:30 PM & evening", label: "08:00 PM - 08:30 PM" },
  { value: "08:30 PM - 09:00 PM & evening", label: "08:30 PM - 09:00 PM" },
  { value: "09:00 PM - 09:30 PM & evening", label: "09:00 PM - 09:30 PM" },
  { value: "09:30 PM - 10:00 PM & evening", label: "09:30 PM - 10:00 PM" },
  { value: "10:00 PM - 10:30 PM & evening", label: "10:00 PM - 10:30 PM" },
  { value: "10:30 PM - 11:00 PM & evening", label: "10:30 PM - 11:00 PM" },
  { value: "11:00 PM - 11:30 PM & evening", label: "11:00 PM - 11:30 PM" },
  { value: "11:30 PM - 12:00 AM & evening", label: "11:30 PM - 12:00 AM" },
];
export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  phone?: string;
  role?: string;
  bloodGroup?: string;
  dob?: string;
  email?: string;
  image?: string;
  address?: string;
  nid?: number;
  dialCode?: string;
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
  // status?: "pending" | "confirmed" | "cancelled";
  status?: string;
  age?: string;
  prescription?: string;
  prescription_data?: Prescription;
  paymentStatus?: string;
  weight?: string;
  createdAt?: string;
  updatedAt?: string;
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
  fullName?: string;
  weight?: string;
  gender?: "male" | "female" | "other";
  age?: string;
  probablediagnosis?: string;
  probableDiagnosis?: string;
}
export const ratio =
  "relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary";

const parseTime = (time: any) => {
  const [hour, minute] = time.split(/:| /);
  const isPM = time.includes("PM");
  return (
    (parseInt(hour, 10) % 12) * 60 + parseInt(minute, 10) + (isPM ? 720 : 0)
  );
};

interface MorningOptiongroup {
  value: string;
  label: string;
  group: string;
}

export const MorningOptiongroup: MorningOptiongroup[] = [
  //   {
  //     value: "07:30 AM - 08:00 AM & morning",
  //     label: "07:30 AM - 08:00 AM",
  //     group: "Morning",
  //   },
  //   {
  //     value: "08:00 AM - 08:30 AM & morning",
  //     label: "08:00 AM - 08:30 AM",
  //     group: "Morning",
  //   },
  //   {
  //     value: "08:30 AM - 09:00 AM & morning",
  //     label: "08:30 AM - 09:00 AM",
  //     group: "Morning",
  //   },
  //   {
  //     value: "09:00 AM - 09:30 AM & morning",
  //     label: "09:00 AM - 09:30 AM",
  //     group: "Morning",
  //   },
  //   {
  //     value: "09:30 AM - 10:00 AM  & morning",
  //     label: "09:30 AM - 10:00 AM",
  //     group: "Morning",
  //   },
  //   {
  //     value: "10:00 AM - 10:30 AM  & morning",
  //     label: "10:00 AM - 10:30 AM",
  //     group: "Morning",
  //   },
  //   {
  //     value: "10:30 AM - 11:00 AM  & morning",
  //     label: "10:30 AM - 11:00 AM",
  //     group: "Morning",
  //   },
  //   {
  //     value: "11:00 AM - 11:30 AM  & morning",
  //     label: "11:00 AM - 11:30 AM",
  //     group: "Morning",
  //   },
  //   {
  //     value: "11:30 AM - 12:00 PM  & morning",
  //     label: "11:30 AM - 12:00 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "12:00 PM - 12:30 PM & afternoon",
  //     label: "12:00 PM - 12:30 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "12:30 PM - 01:00 PM & afternoon",
  //     label: "12:30 PM - 01:00 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "01:00 PM - 01:30 PM & afternoon",
  //     label: "01:00 PM - 01:30 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "01:30 PM - 02:00 PM  & afternoon",
  //     label: "01:30 PM - 02:00 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "02:00 PM - 02:30 PM  & afternoon",
  //     label: "02:00 PM - 02:30 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "02:30 PM - 03:00 PM  & afternoon",
  //     label: "02:30 PM - 03:00 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "03:00 PM - 03:30 PM  & afternoon",
  //     label: "03:00 PM - 03:30 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "03:30 PM - 04:00 PM  & afternoon",
  //     label: "03:30 PM - 04:00 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "04:00 PM - 04:30 PM  & afternoon",
  //     label: "04:00 PM - 04:30 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "04:30 PM - 05:00 PM  & afternoon",
  //     label: "04:30 PM - 05:00 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "05:00 PM - 05:30 PM  & afternoon",
  //     label: "05:00 PM - 05:30 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "05:30 PM - 06:00 PM  & afternoon",
  //     label: "05:30 PM - 06:00 PM",
  //     group: "Afternoon",
  //   },
  //   {
  //     value: "06:00 PM - 06:30 PM & evening",
  //     label: "06:00 PM - 06:30 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "06:30 PM - 07:00 PM & evening",
  //     label: "06:30 PM - 07:00 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "07:00 PM - 07:30 PM & evening",
  //     label: "07:00 PM - 07:30 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "07:30 PM - 08:00 PM & evening",
  //     label: "07:30 PM - 08:00 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "08:00 PM - 08:30 PM & evening",
  //     label: "08:00 PM - 08:30 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "08:30 PM - 09:00 PM & evening",
  //     label: "08:30 PM - 09:00 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "09:00 PM - 09:30 PM & evening",
  //     label: "09:00 PM - 09:30 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "09:30 PM - 10:00 PM & evening",
  //     label: "09:30 PM - 10:00 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "10:00 PM - 10:30 PM & evening",
  //     label: "10:00 PM - 10:30 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "10:30 PM - 11:00 PM & evening",
  //     label: "10:30 PM - 11:00 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "11:00 PM - 11:30 PM & evening",
  //     label: "11:00 PM - 11:30 PM",
  //     group: "Evening",
  //   },
  //   {
  //     value: "11:30 PM - 12:00 AM & evening",
  //     label: "11:30 PM - 12:00 AM",
  //     group: "Evening",
  //   },
  // ];
];
export const groupedOptions = [
  {
    label: "Morning",
    options: MorningOptiongroup.filter(
      (option) => option.group === "Morning",
    ).map((option) => ({
      value: option.value,
      label: option.label,
    })),
  },
  {
    label: "Afternoon",
    options: MorningOptiongroup.filter(
      (option) => option.group === "Afternoon",
    ).map((option) => ({
      value: option.value,
      label: option.label,
    })),
  },
  {
    label: "Evening",
    options: MorningOptiongroup.filter(
      (option) => option.group === "Evening",
    ).map((option) => ({
      value: option.value,
      label: option.label,
    })),
  },
];
import moment from "moment";
export const timeselectrange = () => {
  const formattedDate = moment().format("YYYY-MM-DD");

  // Get the current time
  const now: any = moment();

  // Round the current time to the nearest half-hour
  const roundedTime = moment(
    Math.ceil(now / (30 * 60 * 1000)) * (30 * 60 * 1000),
  );

  // Calculate the next half-hour
  const nextHalfHour = roundedTime.clone().add(30, "minutes");

  // Format the time range as "h:mm A - h:mm A"
  const timeRange = `${roundedTime.format("h:mm A")} - ${nextHalfHour.format(
    "h:mm A",
  )}`;
  return timeRange;
};

export interface callInterface {
  _id?: string;
  duration: string;
  doctor?: initialState;
  user: User;
  callReached: boolean;
  callReceived: boolean;
  callCancelled: boolean;
  callRejected: boolean;
  callByDoctor: boolean;
  rating: 0;
  createdAt: string;
  updatedAt: string;
  note?: string;
}

export interface patientInfo {
  provider?: "web" | "mobile" | "api" | string;
  _id?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  type?: "user" | string;
  role?: "patient" | "b2b_patient" | "doctor" | string;
  callingPoint?: number;
  hasFreeCall?: boolean;
  isDeleted?: boolean;
  fcmToken?: string;
  familyMembers?: any[]; // Consider replacing with a proper interface
  pragatiFamily?: any[]; // Consider replacing with a proper interface

  // Insurance/medical amounts
  lifeInsurenceAmount?: number;
  hospitalAdmitAmount?: number;
  accidentHospitalAdmitAmount?: number;
  opdConsultationAmount?: number;
  opdTestAmount?: number;
  opdMedicineAmount?: number;

  // From second object only
  dob?: string; // Consider using Date if you'll parse it
  bloodGroup?: string;
  nid?: number;
  address?: string;
  organization?: string;
  image?: string; // From first object
  passResetOtp?: string;
  passResetOtpExpAt?: string | Date;
  passResetToken?: string;
}

export interface MedicalReport {
  _id: string;
  userId: string;
  reportFile?: string[]; // Array of file URLs
  title?: string;
  desc?: string;
  createdAt: string | Date; // Can be used as string or Date object
  updatedAt: string | Date; // Can be used as string or Date object
  __v?: number; // Version key (usually optional)
  id: string; // Duplicate of _id
}

export interface ScheduleOptionInterface1 {
  value: string;
  label: string;
}

export interface DaySchedule {
  dayName: string;
  dayOfWeek: number;
  morning: string[];
  afternoon: string[];
  night: string[];
}

export const MorningOptionInterface1: ScheduleOptionInterface1[] = [
  {
    value: "07:30 AM - 08:00 AM",
    label: "07:30 AM - 08:00 AM",
  },
  {
    value: "08:00 AM - 08:30 AM",
    label: "08:00 AM - 08:30 AM",
  },
  {
    value: "08:30 AM - 09:00 AM",
    label: "08:30 AM - 09:00 AM",
  },
  {
    value: "09:00 AM - 09:30 AM",
    label: "09:00 AM - 09:30 AM",
  },
  {
    value: "09:30 AM - 10:00 AM",
    label: "09:30 AM - 10:00 AM",
  },
  {
    value: "10:00 AM - 10:30 AM",
    label: "10:00 AM - 10:30 AM",
  },
  {
    value: "10:30 AM - 11:00 AM",
    label: "10:30 AM - 11:00 AM",
  },
  {
    value: "11:00 AM - 11:30 AM",
    label: "11:00 AM - 11:30 AM",
  },
];

export const afterNoonOptionInterface1: ScheduleOptionInterface1[] = [
  {
    value: "11:30 AM - 12:00 PM",
    label: "11:30 AM - 12:00 PM",
  },
  {
    value: "12:00 PM - 12:30 PM",
    label: "12:00 PM - 12:30 PM",
  },
  {
    value: "12:30 PM - 01:00 PM",
    label: "12:30 PM - 01:00 PM",
  },
  {
    value: "01:00 PM - 01:30 PM",
    label: "01:00 PM - 01:30 PM",
  },
  {
    value: "01:30 PM - 02:00 PM",
    label: "01:30 PM - 02:00 PM",
  },
  {
    value: "02:00 PM - 02:30 PM",
    label: "02:00 PM - 02:30 PM",
  },
  {
    value: "02:30 PM - 03:00 PM",
    label: "02:30 PM - 03:00 PM",
  },
  {
    value: "03:00 PM - 03:30 PM",
    label: "03:00 PM - 03:30 PM",
  },
  {
    value: "03:30 PM - 04:00 PM",
    label: "03:30 PM - 04:00 PM",
  },
  {
    value: "04:00 PM - 04:30 PM",
    label: "04:00 PM - 04:30 PM",
  },
  {
    value: "04:30 PM - 05:00 PM",
    label: "04:30 PM - 05:00 PM",
  },
  {
    value: "05:00 PM - 05:30 PM",
    label: "05:00 PM - 05:30 PM",
  },
  {
    value: "05:30 PM - 06:00 PM",
    label: "05:30 PM - 06:00 PM",
  },
];
export const eveningOptionInterface1: ScheduleOptionInterface1[] = [
  {
    value: "06:00 PM - 06:30 PM",
    label: "06:00 PM - 06:30 PM",
  },
  {
    value: "06:30 PM - 07:00 PM",
    label: "06:30 PM - 07:00 PM",
  },
  {
    value: "07:00 PM - 07:30 PM",
    label: "07:00 PM - 07:30 PM",
  },
  {
    value: "07:30 PM - 08:00 PM",
    label: "07:30 PM - 08:00 PM",
  },
  {
    value: "08:00 PM - 08:30 PM",
    label: "08:00 PM - 08:30 PM",
  },
  {
    value: "08:30 PM - 09:00 PM",
    label: "08:30 PM - 09:00 PM",
  },
  {
    value: "09:00 PM - 09:30 PM",
    label: "09:00 PM - 09:30 PM",
  },
  {
    value: "09:30 PM - 10:00 PM",
    label: "09:30 PM - 10:00 PM",
  },
  {
    value: "10:00 PM - 10:30 PM",
    label: "10:00 PM - 10:30 PM",
  },
  {
    value: "10:30 PM - 11:00 PM",
    label: "10:30 PM - 11:00 PM",
  },
  {
    value: "11:00 PM - 11:30 PM",
    label: "11:00 PM - 11:30 PM",
  },
  {
    value: "11:30 PM - 12:00 AM",
    label: "11:30 PM - 12:00 AM",
  },
];

export interface MetaData {
  dateTime: string;
  status: string;
  patientId: User;
  doctorId: initialState;
  note?: string;
}

export const formatDate = (d: any) => {
  const date = new Date(d);
  const day = String(date.getDate()).padStart(2, "0");
  // const month = String(date.getMonth() + 1).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
