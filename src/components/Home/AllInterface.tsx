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
const ClientBlogData = [
  {
    id: 1,
    video:
      "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-24122024T171443-dr.-tamanna-.mp4",
  },
  {
    id: 2,
    video:
      "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-24122024T174655-clinicall-video-raisa1.mp4",
  },
  {
    id: 3,
    video:
      "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-24122024T174934-clinicall-videos.mp4",
  },
];
const enQuestionData = [
  {
    key: 1,
    label: (
      <span className="my-3 font-medium text-base ">What is CliniCall</span>
    ),
    children: (
      <>
        <p className="text-sm">
          CliniCall Limited is a pioneering health tech company committed to
          making health care more affordable and accessible through innovative
          24/7 telemedicine solutions. We specialize in providing remote medical
          consultations and services to ensure that quality health care reaches
          every corner of the community, regardless of geographic location.
        </p>
        <p className="text-sm font-medium">Services</p>
        <ul className="ml-10 font-medium text-sm">
          <li>1. Telemedicine Consultations</li>
          <li>2. Health Packages</li>
          <li>3. Insurance Integration</li>
          <li>4. Specialist Referrals</li>
          <li>5. Health Monitoring</li>
        </ul>
      </>
    ),
  },
  {
    key: 2,
    label: (
      <span className="my-3 text-base font-medium ">
        How do I get started with CliniCall?
      </span>
    ),
    children: (
      <ul className="text-sm">
        <li>
          <span className=" font-[550]"> 1. Download the App:</span> Search for
          "CliniCall" on the App Store (iOS) or Google Play Store (Android) and
          install the app on your smartphone.
        </li>
        <li>
          <span className=" font-[550]">2. Create an Account :</span> Open the
          app, follow the setup instructions to create a new account, and
          provide your name, contact details, and preferred language.
        </li>
        <li>
          <span className=" font-[550]">3. Purchase a Health Package:</span>{" "}
          Browse the range of health packages available in the app, select one
          that meets your needs, and complete your purchase using various
          payment options.
        </li>
        <li>
          <span className=" font-[550]">4. Start Using Services:</span> Once
          you've purchased a package, you can immediately use CliniCall to book
          for doctor consultations and more.
        </li>
      </ul>
    ),
  },
  {
    key: 3,
    label: (
      <span className="my-3 font-medium text-base ">
        How does online medical doctor consultation work with CliniCall?
      </span>
    ),
    children: (
      <>
        <p className="text-sm">
          {" "}
          <span className=" font-medium">Purchase a Health Package:</span> All
          CliniCall packages include 24/7 online doctor consultations. Select
          and purchase a package through the CliniCall app or website.
        </p>
        <p className="text-sm">
          <span className=" font-[550]">Consultation Options:</span> You can
          choose between
        </p>
        <ul className="mt-2 list-disc list-inside text-sm">
          <li>
            <span className="font-[550]">Direct Call:</span> Call for an
            immediate consultation without the need to book an appointment.
          </li>
          <li className="mt-1">
            <span className="font-[550]">Scheduled Appointment:</span> Book a
            consultation with a specialized doctor at a convenient time.
          </li>
        </ul>
        <p className="text-sm">
          <span className=" font-[550]">Consult with the Doctor:</span> You can
          opt for either a video or audio call during your consultation. Connect
          with your doctor through the app to discuss your symptoms, medical
          history, and concerns
        </p>
      </>
    ),
  },
  {
    key: 4,
    label: (
      <span className="my-3 font-medium text-base ">
        Can I consult with specialists through CliniCall?
      </span>
    ),
    children: (
      <p className="text-sm">
        Yes, ClinicCall offers consultations with a variety of specialists. You
        can choose from our network of specialists based on your specific
        medical needs.
      </p>
    ),
  },
  {
    key: 5,
    label: (
      <span className="my-3 font-medium text-base ">
        Are online doctor consultations covered by a health package?
      </span>
    ),
    children: (
      <p className="text-sm">
        Yes, at CliniCall, all of our health packages come with unlimited online
        doctor consultations. We also offer packages specifically designed for
        doctor consultations. By purchasing one of these packages, you can
        consult with our doctors as often as needed, Choose the package that
        best fits your needs and enjoy the convenience of unlimited access to
        medical care.
      </p>
    ),
  },
  {
    key: 6,
    label: (
      <span className="my-3 font-medium text-base ">
        Can I get a prescription through an online consultation?
      </span>
    ),
    children: (
      <p className="text-sm">
        Yes, our licensed doctors can prescribe medications during your online
        consultation. Prescriptions will be sent electronically, and you can{" "}
        <span className=" font-[550]">use them at your local pharmacy.</span>
      </p>
    ),
  },
  {
    key: 7,
    label: (
      <span className="my-3 font-medium text-base ">
        How do I buy a health package from CliniCall?
      </span>
    ),
    children: (
      <>
        Purchasing a health package from CliniCall is simple and
        straightforward. Follow these steps to get started:
        <ul className="text-sm">
          <li>
            <span className=" font-[550]">1. Visit Our Website : </span>
            Go to CliniCall's website and navigate to the “Health Packages”
            section.
          </li>
          <li>
            <span className=" font-[550]">2 . Browse Packages : </span> Review
            the available health packages to find the one that best suits your
            needs. Each package includes detailed information about the
            services, insurance coverage, and pricing.
          </li>
          <li>
            <span className=" font-[550]">3 . Select a Package :</span>Choose
            the health package you wish to purchase by clicking on the “Select”
            or “Buy Now” button next to your chosen option.
          </li>
          <li>
            <span className=" font-[550]">
              4 . Create an Account or Log In :
            </span>
            If you’re a new user, you will need to create an account by
            providing your personal details. If you already have an account,
            simply log in.
          </li>
          <li>
            <span className=" font-[550]">5 . Enter Payment Information :</span>
            Fill in your payment details to complete the purchase. We accept
            various payment methods for your convenience.
          </li>
          <li>
            <span className=" font-[550]">6 . Confirm Your Purchase : </span>{" "}
            Review your order and payment details, then confirm your purchase.
            You will receive a confirmation email with your purchase details and
            next steps.
          </li>
          <li>
            <span className=" font-[550]">7 . Access Your Package : </span>
            Once your purchase is confirmed, you can start using your health
            package immediately. Log in to your account to access telemedicine
            services, insurance details, and other features included in your
            package.
          </li>
          <li>
            <span className=" font-[550]">8 . Contact Support : </span>If you
            have any questions or need assistance, our customer support team is
            here to help. Reach out to us via email or phone, and we’ll be happy
            to assist you.
          </li>
        </ul>
      </>
    ),
  },
];

const bnQuestionData = [
  {
    key: 1,
    label: <span className="my-3 font-[550]  text-base ">ক্লিনিকল কী?</span>,
    children: (
      <>
        <p className="text-justify text-sm">
          ক্লিনিকল লিমিটেড দেশের একটি অন্যতম হেলথ টেক কোম্পানি, ক্লিনিকল ২৪/৭
          টেলিমেডিসিন সেবার মাধ্যমে স্বাস্থ্যসেবা আরও সহজলভ্য ও সাশ্রয়ী করে
          তুলতে প্রতিশ্রুতিবদ্ধ। আমরা প্রত্যন্ত অঞ্চলে ডাক্তার পরামর্শ এবং
          মেডিকেল সেবা প্রদানের মাধ্যমে অঞ্চলগত সীমাবদ্ধতা পেড়িয়ে দেশের প্রতিটি
          প্রান্তে মানসম্মত স্বাস্থসেবা পৌঁছে দিতে বদ্ধপরিকর
        </p>
        <p className="text-sm font-medium">সেবাসমূহ:</p>
        <ul className="ml-10 font-medium text-sm">
          <li>১. টেলিমেডিসিন সেবা </li>
          <li>২. হেলথ প্যাকেজ</li>
          <li>৩. ইন্স্যুরেন্স ইন্টিগ্রেশন</li>
          <li>৪. বিশেষজ্ঞ ডাক্তার এর পরামর্শ</li>
          <li>৫. স্বাস্থ্য পর্যবেক্ষণ</li>
        </ul>
      </>
    ),
  },
  {
    key: 2,
    label: (
      <span className="my-3 font-[550] text-base ">
        আমি কীভাবে ক্লিনিকল থেকে সেবা নিব?
      </span>
    ),
    children: (
      <ul className="text-sm">
        <li>
          <span className=" font-[550]"> ১. অ্যাপ ডাউনলোড করুন: </span>প্রথমেই
          আপনার স্মার্টফোনে অ্যাপ স্টোর (iOS) অথবা গুগল প্লে স্টোর (Android)
          থেকে "CliniCall" ক্লিনিকল অ্যাপ ইনস্টল করুন।
        </li>
        <li>
          <span className=" font-[550]">২. একাউন্ট তৈরি করুন : </span> অ্যাপটি
          খুলুন, সেটআপ নির্দেশনা অনুসারে আপনার নাম, যোগাযোগের তথ্য ও পাসওয়ার্ড
          প্রদান করে নতুন একাউন্ট তৈরি করুন।
        </li>
        <li>
          <span className=" font-[550]">৩. হেলথ প্যাকেজ ক্রয় করুন : </span>{" "}
          আপনার প্রয়োজন অনুযায়ী একটি হেলথ প্যাকেজ নির্বাচন করুন এবং আমাদের
          নিরাপদ পেমেন্ট অপশন ব্যবহার করে ক্রয় করুন।
        </li>
        <li>
          <span className=" font-[550]">৪. আমাদের সেবা গুলো উপভোগ করুন : </span>
          প্যাকেজ ক্রয় করার সাথে সাথেই ক্লিনিকলের মাধ্যমে ডাক্তারের পরামর্শসহ
          অন্যান্য সেবা ব্যবহার করতে পারবেন।
        </li>
      </ul>
    ),
  },
  {
    key: 3,
    label: (
      <span className="my-3 font-[550] text-base ">
        ক্লিনিকলের মাধ্যমে অনলাইন ডাক্তার পরামর্শ কীভাবে কাজ করে?
      </span>
    ),
    children: (
      <>
        <p className="text-sm">
          {" "}
          <span className=" font-[550]">
            স্বাস্থ্য প্যাকেজ ক্রয় করুন:
          </span>{" "}
          ক্লিনিকলের প্রতিটি প্যাকেজে ২৪/৭ অনলাইন ডাক্তার পরামর্শ অন্তর্ভুক্ত
          থাকে। অ্যাপ বা ওয়েবসাইটের মাধ্যমে প্যাকেজ ক্রয় করুন।
        </p>
        <p className="text-sm">
          <span className=" font-[550]">
            আপনার প্রয়োজনীয়তা অনুযায়ী সেবা বেছে নিন….
          </span>
        </p>
        <ul className="my-2 list-disc list-inside">
          <li className="text-sm">
            <span className="font-[550]">ডাইরেক্ট কল :   </span> কোনো
            অ্যাপয়েন্টমেন্ট ছাড়াই সরাসরি ডাক্তারকে কল করে পরামর্শ নিতে পারবেন।
          </li>
          <li className="mt-1 text-sm">
            <span className="font-[550]">নির্ধারিত অ্যাপয়েন্টমেন্ট : </span>{" "}
            বিশেষ প্রয়োজনে বিশেষজ্ঞ ডাক্তারের সাথে পরামর্শের জন্য
            অ্যাপয়েন্টমেন্ট বুক করুন।
          </li>
        </ul>
        <p className="text-sm">
          <span className=" font-[550]">ডাক্তারের সাথে পরামর্শ করুন :</span>
          ভিডিও বা অডিও কলের মাধ্যমে ডাক্তার পরামর্শ গ্রহণ করতে পারবেন, ডাক্তার
          এর কাছে আপনার সমস্যা তুলে ধরুন।
        </p>
      </>
    ),
  },
  {
    key: 4,
    label: (
      <span className="my-3 font-[550] text-base">
        আমি কী ক্লিনিকলের মাধ্যমে বিশেষজ্ঞ ডাক্তারদের সাথে পরামর্শ করতে পারব?
      </span>
    ),
    children: (
      <p className="text-sm">
        হ্যাঁ, অ্যাপয়েন্টমেন্ট বুক করার মাধ্যমে ক্লিনিকলে আপনি আপনার নির্দিষ্ট
        চিকিৎসা সেবার প্রয়োজন অনুযায়ী আমাদের বিভিন্ন বিশেষজ্ঞ ডাক্তারদের সাথে
        পরামর্শ করতে পারবেন।
      </p>
    ),
  },
  {
    key: 5,
    label: (
      <span className="my-3 font-[550] text-base">
        অনলাইন ডাক্তার পরামর্শ কি স্বাস্থ্য প্যাকেজের অন্তর্ভুক্ত?
      </span>
    ),
    children: (
      <p className="text-sm">
        হ্যাঁ, ক্লিনিকলের প্রতিটি স্বাস্থ্য প্যাকেজে ২৪/৭আনলিমিটেড অনলাইন
        ডাক্তার পরামর্শ অন্তর্ভুক্ত রয়েছে। এছাড়াও, আমাদের শুধুমাত্র ডাক্তার
        পরামর্শের জন্য বিশেষ প্যাকেজও রয়েছে। এসব প্যাকেজ ক্রয় করে, আপনি যতবার
        ইচ্ছা আমাদের ডাক্তারদের পরামর্শ গ্রহণ করতে পারবেন। আপনার প্রয়োজন
        অনুযায়ী ক্লিনিকল হেলথ প্যাকেজ ক্রয় করুন এবং আনলিমিটেড চিকিৎসা সেবার
        সুবিধা উপভোগ করুন।
      </p>
    ),
  },
  {
    key: 6,
    label: (
      <span className="my-3 font-[550] text-base">
        আমি কি অনলাইন পরামর্শের মাধ্যমে প্রেসক্রিপশন পেতে পারি?
      </span>
    ),
    children: (
      <p className="text-sm">
        হ্যাঁ, আমাদের লাইসেন্সপ্রাপ্ত ডাক্তাররা আপনার অনলাইন পরামর্শের সময়
        ওষুধের প্রেসক্রিপশন প্রদান করবেন। প্রেসক্রিপশনটি ক্লিনিকল অ্যাপ এবং
        এসএমএস এর মাধ্যমে পাঠানো হবে এবং
        <span className=" font-[550]">
          আপনি স্থানীয় ফার্মেসিতে এটি ব্যবহার করে ঔষধ কিনতে পারবেন।
        </span>
      </p>
    ),
  },
  {
    key: 7,
    label: (
      <span className="my-3 font-[550] text-base">
        আমি কীভাবে ক্লিনিকল থেকে স্বাস্থ্য প্যাকেজ ক্রয় করব?
      </span>
    ),
    children: (
      <>
        ক্লিনিকল থেকে স্বাস্থ্য প্যাকেজ ক্রয় করা খুবই সহজ। নিম্নলিখিত ধাপগুলো
        অনুসরণ করুন:
        <ul className="text-sm">
          <li>
            <span className=" font-[550]">
              ১. আমাদের অ্যাপ বা ওয়েবসাইটে যান:{" "}
            </span>
            ক্লিনিকলের অ্যাপ বা ওয়েবসাইটে গিয়ে "Health Packages" সেকশনে যান।
          </li>
          <li>
            <span className=" font-[550]">২. প্যাকেজ গুলো দেখুন : </span> আপনার
            প্রয়োজন অনুযায়ী স্বাস্থ্য প্যাকেজগুলো দেখুন এবং প্রতিটির বিস্তারিত
            তথ্য, যেমন সেবা, হাসপাতাল ক্যাশব্যাক এবং মূল্য সম্পর্কে জানুন।
          </li>
          <li>
            <span className=" font-[550]">৩. একটি প্যাকেজ নির্বাচন করুন</span>
            আপনার পছন্দমতো স্বাস্থ্য প্যাকেজ নির্বাচন করে "Buy Now" বাটনে ক্লিক
            করুন।
          </li>
          <li>
            <span className=" font-[550]">৪. একাউন্ট তৈরি বা লগইন করুন:</span>
            যদি আপনি নতুন ব্যবহারকারী হন, তাহলে আপনার ব্যক্তিগত তথ্য দিয়ে একটি
            একাউন্ট তৈরি করুন। আগের ব্যবহারকারীরা সহজেই লগইন করতে পারবেন।
          </li>
          <li>
            <span className=" font-[550]">৫. পেমেন্ট করুন: </span>
            পেমেন্টের বিস্তারিত তথ্য পূরণ করে ক্রয় সম্পন্ন করুন। আমরা বিভিন্ন
            পেমেন্ট মেথড এর মাধ্যে পেমেন্ট গ্রহণ করি, আপনার সুবিধা মত পেমেন্ট
            মেথডটি বেছেনিন।
          </li>
          <li>
            <span className=" font-[550]">৬. আপনার ক্রয় নিশ্চিত করুন : </span>{" "}
            অর্ডার ও পেমেন্টের তথ্য পর্যালোচনা করুন এবং আপনার ক্রয় সম্পূর্ণ
            করুন। আপনি একটি কনফার্মেশন ইমেল পাবেন, যেখানে আপনার ক্রয়ের
            বিস্তারিত তথ্য এবং পরবর্তী পদক্ষেপগুলো উল্লেখ থাকবে।
          </li>
          <li>
            <span className=" font-[550]">
              ৭. আপনার প্যাকেজ অ্যাক্সেস করুন :{" "}
            </span>
            ক্রয় নিশ্চিত হলে, সাথে সাথেই আপনার হেলথ প্যাকেজটি ব্যবহারযোগ্য হয়ে
            যাবে। টেলিমেডিসিন সেবা, ইন্স্যুরেন্স তথ্য এবং অন্যান্য সুবিধা পেতে
            আপনার একাউন্টে লগইন করুন।
          </li>
          <li>
            <span className=" font-[550]">৮. সাপোর্টে যোগাযোগ করুন: </span>যদি
            আপনার কোনো প্রশ্ন থাকে বা সাহায্যের প্রয়োজন হয়, আমাদের কাস্টমার
            সাপোর্ট টিম সবসময় সাহায্যের জন্য প্রস্তুত। ইমেইল বা ফোনের মাধ্যমে
            আমাদের সাথে যোগাযোগ করুন ধূতমত সময়ের মধ্যে আপনার সমস্যাটি সমাধান করা
            হবে।
          </li>
        </ul>
      </>
    ),
  },
];

const HomeServices = [
  {
    icon: "/homeLogo/callDoctor.svg",
    slug: "callDoctor",
    entitle: "Call Doctor",
    ensubtitle: "health care Whenever You need",
  },
  {
    icon: "/homeLogo/HealthPackage.svg",
    slug: "healthPackage",
    entitle: "Health Package",
    ensubtitle: "Purchase Your Package",
  },
  {
    icon: "/homeLogo/medicine.svg",
    entitle: "MediMart",
    ensubtitle: "Order Now",
    slug: "mediMart",
  },
  {
    icon: "/homeLogo/bookappoitment.svg",
    slug: "doctorlist#doctor",
    entitle: "Book Appointment",
    // entitle: "Online Doctor Appointment",
    ensubtitle: "Find Your Specialist Doctors",
  },
];
const services = [
  {
    icon: "/servicesImage/labtest.svg",
    entitle: "Book Lab Test",
    ensubtitle: "health care whenever you need",
    slug: "lab",
  },

  {
    icon: "/servicesImage/MentalHealth.svg",
    slug: "doctorlist?_catagory_name_=clinical-psychologist#doctor",
    entitle: "Mental Health",
    ensubtitle: "Affordable Mental Health Services at Your Fingertips!",
  },
  // {
  //   icon: "/servicesImage/DiscountCenter.svg",
  //   entitle: "Discount Center",
  //   ensubtitle: "Unlock exclusive discounts and save more",
  //   slug: "discount",
  // },
  {
    icon: "/servicesImage/2ndopenion.svg",
    entitle: "secondOpenion",
    ensubtitle: "secondOpeniondescription",
    slug: "secondopenion",
  },

  {
    icon: "/servicesImage/HealthCheckup.svg",
    entitle: "Health Checkup",
    ensubtitle: "Annual Health Checkup",
    slug: "lab#HealthCheckup",
  },
  {
    icon: "/servicesImage/giftpackage.svg",
    entitle: "Package Gift",
    ensubtitle: "Gift a health package to your favorite person",
    slug: "healthPackage?sendgift=true",
  },
  {
    icon: "/servicesImage/OtherServices.svg",
    entitle: "Other Services",
    ensubtitle: "health care whenever you needs",
    slug: "allservices",
  },
];

export {
  ClientBlogData,
  enQuestionData,
  bnQuestionData,
  HomeServices,
  services,
};

export const desiredOrder = [
  "Internal Medicine",
  "General Surgery",
  "Obstetrics & Gynecology",
  "Pediatrics",
  "Dermatology & Venerology",
  "Gastroenterology",
  "Neurology",
  "Endocrinology",
  "Hematology",
  "Pulmonology",
  "Rheumatology",
  "Cardiology",
  "Nephrology",
  "Orthopedic Surgery",
  "Otolaryngology (ENT)",
  "Critical Care Medicine",
  "Emergency Medicine",
  "Ophthalmology",
];
export interface PlatformData {
  _id: string;
  platformCharge: number;
  banner: BannerItem[];
  sdk_banner: string;
  card_discount: number;
  bkash_discount: number;
}
export interface BannerItem {
  image: string;
  resimage?: string;
  order: number;
  url?: string;
  isActive: boolean;
  name: string;
  data?: {
    button?: boolean;
  };
}



export interface SettingsData {
  _id: string;
  platformCharge: number;
  sdk_banner: string;
  card_discount: number;
  bkash_discount: number;
  has_gp_star: boolean;
  appDownload: string;
  pharmacyNetwork: string;
  major_client: MajorClient[];
  clinicall_overview: ClinicallOverview[];
  totalUser: number;
  totalHospitalTestCenter: number;
}

export interface MajorClient {
  image: string;
  name: string;
  serial: string;
}

export interface ClinicallOverview {
  icon: string;
  order: number;
  entitle: string;
  bntitle: string;
  ensubtitle: string;
  bnsubtitle: string;
}