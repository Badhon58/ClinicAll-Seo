import moment from "moment";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
}

interface Hospital {
  _id: string;
  name: string;
  address: string;
}

interface WorkDetail {
  organization: string;
  designation: string;
  startMonth: string;
  startYear: number;
  endMonth: string;
  endYear: number;
  isCurrentlyWorking: boolean;
}

interface TimeSlot {
  time: string;
  period: string;
}

interface DateSlot {
  date: string;
  timeSlots: TimeSlot[];
}

export interface DoctorProfile {
  _id: string;
  firstName: string;
  lastName: string;
  category: Category[];
  hospital: string;
  degree: string;
  bmdc: string;
  visitFee: number;
  yearsOfExperience: number;
  workDetails: WorkDetail[];
  dateSlot: DateSlot[];
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
  personalDetails?: string;
  bmdcRegistered: boolean;
  isAvailable?: boolean;
  slug: string
}

export interface Appointment {
  date?: string; // format: "dd-MM-yyyy"
  time?: string; // format: "hh:mm A-hh:mm A"
  fullName?: string;
  gender?: "male" | "female" | "other";
  age?: string;
  phone?: string;
  email?: string;
  doctor?: string; // assuming this is a reference ID (e.g., MongoDB ObjectId)
  prescription?: string; // URL string
  user?: string | null | undefined; // assuming this is also a reference ID
  weight?: string;
  // book
}
export interface Appointment2 {
  date?: string; // format: "dd-MM-yyyy"
  time?: string; // format: "hh:mm A-hh:mm A"
  firstName?: string;
  lastName?: string;
  gender?: "male" | "female" | "other";
  age?: string;
  phone?: string;
  email?: string;
  doctor?: string; // assuming this is a reference ID (e.g., MongoDB ObjectId)
  prescription?: string; // URL string
  user?: string | null | undefined; // assuming this is also a reference ID
  weight?: string;
  dialCode?: string;
}
export const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "green",
        color: "red",
        padding: "1px",
        fontSize: "18px",
      }}
      onClick={onClick}
    />
  );
};
export const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
};

export interface TimeSlot2 {
  time: string;
  period: string;
}

export interface DateSlot2 {
  date: string;
  timeSlots: TimeSlot[];
}

export const DoctorEnQuestionData = [
  {
    key: 1,
    label: (
      <span className="my-3 font-medium text-base ">
        How can I get an immediate online medical doctor consultation or make an
        online doctor appointment with a 24/7 online doctor service?
      </span>
    ),
    children: (
      <>
        <p className="text-sm font-[450]">
          Download the Clinicall APP ({" "}
          <Link
            href={
              "https://play.google.com/store/apps/details?id=com.clinicall.clinicallapp"
            }
            className="text-blue-500 underline"
          >
            Play Store
          </Link>{" "}
          or{" "}
          <Link
            href={
              "https://apps.apple.com/us/app/clinicall-online-doctor-app/id6743645786"
            }
            className="text-blue-500 underline"
          >
            App Store
          </Link>{" "}
          ). Register with your phone number. After that, click on “Call Doctor
          24/7” or “ডাক্তার কল করুন ২৪/৭” and within a few seconds, you will get
          a medical doctor consultation.
        </p>
      </>
    ),
  },
  {
    key: 2,
    label: (
      <span className="my-3 text-base font-medium ">
        Where can I find a comprehensive list of specialized doctors to choose
        the best Online doctor in BD for a specific condition?
      </span>
    ),
    children: (
      <p className="text-sm font-[450]">
        You can find it in the Clinicall APP. All you have to do is choose the
        category of the specialized doctor list from “Book Appointment”, or you
        can choose the category-wise doctor in “Book Appointment”. From the
        Clinicall website, go to the service page named “Online Doctor
        Appointment” and find the relevant specialist doctor.
      </p>
    ),
  },
  {
    key: 3,
    label: (
      <span className="my-3 font-medium text-base ">
        Is "online medical doctor consultation" safe and effective in BD?
      </span>
    ),
    children: (
      <>
        <p className="text-sm">
          {" "}
          With rising online healthcare concerns among people, Clinicall ensures
          HIPAA-like privacy and follows DGHS standards. It's perfect for 24/7
          online doctor access in Bangladesh, even for chronic condition
          management.
        </p>
      </>
    ),
  },
  {
    key: 4,
    label: (
      <span className="my-3 font-medium text-base ">
        How do I find a reliable online doctor in BD for general check-ups?
      </span>
    ),
    children: (
      <p className="text-sm">
        To find a trusted online doctor for general check-ups, visit Clinicall.
        Our platform connects you with board-certified physicians offering
        secure, high-quality online health services tailored for busy
        lifestyles. Easily book appointments, receive expert advice, and get
        prescriptions delivered with Clinicall’s seamless and reliable
        telehealth experience.
      </p>
    ),
  },
];

export const DoctorBnQuestionData = [
  {
    key: 1,
    label: (
      <span className="my-3 font-medium text-base ">
        আমি কীভাবে একটি ২৪/৭ অনলাইন ডাক্তার পরিসেবার মাধ্যমে তাৎক্ষণিক অনলাইনে
        চিকিৎসার পরামর্শ (online medical doctor consultation) পেতে পারি বা একটি
        অনলাইন ডাক্তারের অ্যাপয়েন্টমেন্ট নিতে পারি?
      </span>
    ),
    children: (
      <>
        <p className="text-sm font-[450]">
          প্রথমে, Clinicall অ্যাপটি ({" "}
          <Link
            href={
              "https://play.google.com/store/apps/details?id=com.clinicall.clinicallapp"
            }
            className="text-blue-500 underline"
          >
            Play Store
          </Link>{" "}
          বা{" "}
          <Link
            href={
              "https://apps.apple.com/us/app/clinicall-online-doctor-app/id6743645786"
            }
            className="text-blue-500 underline"
          >
            App Store
          </Link>{" "}
          )- থেকে ডাউনলোড করুন। আপনার ফোন নম্বর দিয়ে রেজিস্ট্রেশন করুন। এরপর,
          “ডাক্তার কল করুন ২৪/৭” বা “Call Doctor 24/7” অপশনে ক্লিক করুন এবং কিছু
          সেকেন্ডের মধ্যেই আপনি একজন অভিজ্ঞ ডাক্তার সাথে কথা বলে আপনার সমস্যার
          সমাধান করতে পারবেন।
        </p>
      </>
    ),
  },
  {
    key: 2,
    label: (
      <span className="my-3 text-base font-medium ">
        আমার কোন বিশেষ সমস্যার জন্য সেরা অনলাইন ডাক্তার (Online doctor BD) বেছে
        নিতে অথবা ওই বিষয়ক বিশেষজ্ঞ ডাক্তারের তালিকা (specialized doctor list)
        কোথায় পেতে পারি?
      </span>
    ),
    children: (
      <p className="text-sm font-[450]">
        আপনি এটি Clinicall অ্যাপ অথবা ওয়েবসাইটে খুঁজে নিতে পারেন। আপনাকে অ্যাপ
        থেকে “Book Appointment” থেকে বিশেষজ্ঞ ডাক্তারের ক্যাটাগরি বেছে নিতে হবে,
        অথবা আপনি “Book Appointment”-এ ডিপার্টমেন্ট অনুযায়ী ডাক্তার নির্বাচন
        করতে পারেন। ওয়েবসাইটের ক্ষেত্রে “ডাক্তার অ্যাপয়েন্টমেন্ট” বা “Online
        Doctor Appointment” থেকে বিশেষজ্ঞ ডাক্তার নির্বাচন করতে পারেন।
      </p>
    ),
  },
  {
    key: 3,
    label: (
      <span className="my-3 font-medium text-base ">
        বাংলাদেশে "অনলাইন চিকিৎসা পরামর্শ" (online medical doctor consultation)
        কি নিরাপদ এবং কার্যকর?
      </span>
    ),
    children: (
      <>
        <p className="text-sm">
          {" "}
          মানুষের মধ্যে অনলাইন স্বাস্থ্যসেবা নিয়ে ক্রমবর্ধমান উদ্বেগের কারণে,
          Clinicall HIPAA-এর মতো গোপনীয়তা নিশ্চিত করে এবং DGHS-এর মান অনুসরণ
          করে। ক্লিনিকল, বাংলাদেশে ২৪/৭ অনলাইন ডাক্তার পরিসেবাসহ অন্যান্য সকল
          টেলিমেডিসিন সেবা, এমনকি দীর্ঘস্থায়ী রোগ ব্যবস্থাপনার জন্যও উপযুক্ত।
        </p>
      </>
    ),
  },
  {
    key: 4,
    label: (
      <span className="my-3 font-medium text-base ">
        সাধারণ স্বাস্থ্য পরীক্ষার জন্য আমি বাংলাদেশে একজন নির্ভরযোগ্য অনলাইন
        ডাক্তার (online doctor) কীভাবে খুঁজে পেতে পারি?
      </span>
    ),
    children: (
      <p className="text-sm">
        সাধারণ স্বাস্থ্য পরীক্ষার জন্য একজন নির্ভরযোগ্য অনলাইন ডাক্তার খুঁজে
        নিতে, Clinicall ভিজিট করুন। আমাদের প্ল্যাটফর্ম আপনাকে বোর্ড-সার্টিফায়েড
        চিকিৎসকদের সাথে সংযুক্ত করে, যারা কর্মব্যস্ত জীবনধারার জন্য উপযুক্ত
        নিরাপদ ও উচ্চ-মানের অনলাইন স্বাস্থ্য পরিসেবা প্রদান করেন। Clinicall-এর
        নিরবচ্ছিন্ন ও নির্ভরযোগ্য টেলিহেলথ অভিজ্ঞতার মাধ্যমে আপনি সহজে
        অ্যাপয়েন্টমেন্ট বুক করতে, বিশেষজ্ঞের পরামর্শ নিতে এবং প্রেসক্রিপশন
        ডেলিভারি পেতে পারেন।
      </p>
    ),
  },
];


export const isPastTimeSlot = (date: string, timeSlot: string) => {
  const today = moment().format("YYYY-MM-DD");
  const slotDate = moment(date).format("YYYY-MM-DD");

  // Future dates: show all slots
  if (slotDate !== today) {
    return false;
  }

  // Example:
  // "07:30 AM - 08:00 AM"
  const startTime = timeSlot.split("-")[0]?.trim();

  if (!startTime) return false;

  const slotStart = moment(
    `${slotDate} ${startTime}`,
    "YYYY-MM-DD hh:mm A"
  );

  // Current time + 3 hours
  const minimumAvailableTime = moment().add(3, "hours");

  // Hide slots that start before the minimum available time
  return slotStart.isBefore(minimumAvailableTime);
};