export interface labCart {
  _id: string;
  name: string;
  category: string;
  mrp: number;
  discount: number;
  discountPrice: number;
  image: string;
  provider?: string;
  checked?: boolean;
}

const LabBlogdata = [
  {
    id: "trustedLabs",
    image:
      // "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28102024T144702-1.png",
      "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-10092025T130304-1.png",
  },
  {
    id: "homeVisit",
    image:
      // "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28102024T144737-2.png",
      "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-10092025T130351-2.png",
  },
  {
    id: "timelyReports",
    image:
      // "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28102024T144754-3.png",
      "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-10092025T130425-3.png",
  },
  {
    id: "discount",
    image:
      // "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28102024T144808-4.png",
      "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-10092025T130501-4.png",
  },
];
export interface addressDetailsforLab {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  district?: string;
  thana?: string;
  postalCode: string;
  isDefault?: boolean;
  isHome?: boolean;
  user?: string;
}

export interface LabPackageItem {
  _id: string;
  title: string;
  subItems: string[];
}

export interface LabPackage {
  _id: string;
  title: string;
  price: number;
  labPackageItems: LabPackageItem[];
  image: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  emiAvailable: boolean;
}

export { LabBlogdata };
export interface DiscountInfo {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minExpense: number;
  bankName: string;
}