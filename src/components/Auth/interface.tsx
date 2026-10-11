export interface initialState {
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  category?: string[];
  hospital?: string;
  degree?: string;
  bmdc?: string;
  visitFee?: string;
  yearsOfExperience?: string;
  email?: string;
  isActive: boolean;
  isApproved: boolean;
  showHome: boolean;
  bmdcRegistered: boolean;
}
export interface catagory {
  value: string;
  label: string;
}

export const AllNumner = [
  { value: "+93 & AFG", label: "Afghanistan" },
  { value: "+355 & ALB", label: "Albania" },
  { value: "+213 & DZA", label: "Algeria" },
  { value: "+1-684 & ASM", label: "American Samoa" },
  { value: "+376 & AND", label: "Andorra" },
  { value: "+244 & AGO", label: "Angola" },
  { value: "+1-264 & AIA", label: "Anguilla" },
  { value: "+672 & ATA", label: "Antarctica" },
  { value: "+1-268 & ATG", label: "Antigua and Barbuda" },
  { value: "+54 & ARG", label: "Argentina" },
  { value: "+374 & ARM", label: "Armenia" },
  { value: "+61 & AUS", label: "Australia" },
  { value: "+43 & AUT", label: "Austria" },
  { value: "+994 & AZE", label: "Azerbaijan" },
  { value: "+973 & BHR", label: "Bahrain" },
  { value: "+880 & BDT", label: "Bangladesh" },
  { value: "+1-246 & BRB", label: "Barbados" },
  { value: "+375 & BLR", label: "Belarus" },
  { value: "+32 & BEL", label: "Belgium" },
  { value: "+501 & BLZ", label: "Belize" },
  { value: "+229 & BEN", label: "Benin" },
  { value: "+975 & BTN", label: "Bhutan" },
  { value: "+591 & BOL", label: "Bolivia" },
  { value: "+267 & BWA", label: "Botswana" },
  { value: "+55 & BRA", label: "Brazil" },
  { value: "+673 & BRN", label: "Brunei" },
  { value: "+359 & BGR", label: "Bulgaria" },
  { value: "+226 & BFA", label: "Burkina Faso" },
  { value: "+257 & BDI", label: "Burundi" },
  { value: "+237 & CMR", label: "Cameroon" },
  { value: "+1 & CAN", label: "Canada" },
  { value: "+86 & CHN", label: "China" },
  { value: "+49 & DEU", label: "Germany" },
  { value: "+91 & IND", label: "India" },
  { value: "+81 & JPN", label: "Japan" },
  { value: "+92 & PAK", label: "Pakistan" },
  { value: "+7 & RUS", label: "Russia" },
  { value: "+966 & SAU", label: "Saudi Arabia" },
  { value: "+27 & ZAF", label: "South Africa" },
  { value: "+34 & ESP", label: "Spain" },
  { value: "+44 & GBR", label: "United Kingdom" },
  { value: "+1 & USA", label: "United States" },
];
