export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Remove the '+88' prefix if it exists
  if (phoneNumber.startsWith("+88")) {
    phoneNumber = phoneNumber.slice(3);
  }
  if (phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.slice(1);
  }

  // Check if the number starts with '01' and has exactly 11 digits
  const bdPhoneRegex = /^1[3-9]\d{8}$/; // Covers valid Bangladeshi operator prefixes
  return bdPhoneRegex.test(phoneNumber);
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("clinicallDoctorToken");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
  }
};
