import { DoctorProfile } from "../Doctor/Interface";
import { labCart } from "../Lab/Interface";
import { NewProduct } from "../MediMart/Interface";
import { Package } from "../Package/Interface";

interface category {
  bnName?: string;
  image?: string;
  name?: string;
}

export interface search {
  doctorCategories: category[];
  doctors: DoctorProfile[];
  healthPackages: Package[];
  labTests: labCart[];
  medicines: NewProduct[];
}
