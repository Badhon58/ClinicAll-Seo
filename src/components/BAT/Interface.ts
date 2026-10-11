export const distributors = [
  "A. Rahman & Sons",
  "Abdul Latif Chowdhury",
  "M/S. Abdul Latif Chowdhury, Chandpur",
  "ADL B.BARIA",
  "ADL Habiganj",
  "Asiatic Distributions Limited, Kurigram",
  "Asiatic Distributions Limited – Lalmonirhat",
  "Agrani Trading Company Ltd, Jamalpur",
  "Agrani Trading Company Ltd, Savar",
  "Agrani Trading Company Ltd, Tangail",
  "Agrani Trading Corporation, Gulshan",
  "Agrani Trading Corporation, Mirpur",
  "Agrani Trading Corporation, Mogbazar",
  "Akhter Enterprise",
  "Akram Enterprise",
  "Alam Corporation Ltd.",
  "Amin Distribution Company Ltd.",
  "Arafa Store",
  "Azahar Trading Ltd.",
  "Channa & Brothers",
  "Daffodils",
  "Desh Trade Link",
  "Hajee & Sons",
  "Hajee & Sons, Barguna",
  "J R Corporation Limited, Bhairab",
  "J R Corporation Limited, Narsingdi",
  "Joarder Traders",
  "Kazi Sayed Ali",
  "M. Islam Trade Co. Ltd.",
  "M/S Abul Hossain",
  "M/S Al-Amin Store",
  "M/S Azizur Rahman",
  "M/S BARISHAL J AHMED & CO.",
  "M/S Haque & Co.",
  "M/S Rupali Traders",
  "M/S Sanjib Mazumder",
  "M/S Sheikh Brothers",
  "M/S Tarik Ahmed Dipu (Madaripur)",
  "M/S Tarik Ahmed Dipu (Rajbari)",
  "M/S. A.M.I & Company",
  "M/S. Momin Store",
  "M/S. Spectrum Trading Corporation",
  "MAQ Distribution",
  "MBKB Ltd (Moulvibazar)",
  "Moula Baksh Karim Boksh Ltd.",
  "Moula Baksh Karim Boksh",
  "Moulovi Brothers",
  "Mr Brothers",
  "Noor Sons",
  "Rafiq Enterprise",
  "Rokeya & Sons",
  "Sales Connect Limited",
  "Sales Promotion Service",
  "SPS Shariatpur",
  "Sanaullah Traders",
  "Shaireen Enterprise, Nilphamary",
  "Shaireen Enterprise, Rangpur",
  "Shashi Mohan Roy",
  "Sumon Trading Corporation",
  "The Jamal & Co - Dhanmondi",
  "The Jamal & Co - Narayanganj",
  "Zawad Enterprise",
];

export interface Child {
  firstName: string;
  lastName: string;
  relation: string;
  phone: string;
  nID?: string;
}
export const defaultFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  empId: "",
  distributorName: "",
  familyIndividual: "individual",
  familyMembers: [
    { relation: "spouse", firstName: "", lastName: "", phone: "", nID: "" },
    { relation: "child", firstName: "", lastName: "" },
    { relation: "child", firstName: "", lastName: "" },
  ] as Child[],
  consent: false,
  nid: "",
  _id: "",
};

export const toFormData = (data: any) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    // Handle array (familyMembers)
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        Object.keys(item).forEach((subKey) => {
          if (item[subKey] !== undefined && item[subKey] !== "") {
            formData.append(`familyMembers[${index}][${subKey}]`, item[subKey]);
          }
        });
      });
    }
    // Handle boolean
    else if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
    }
    // Handle normal fields
    else if (value !== undefined && value !== "") {
      formData.append(key, value);
    }
  });

  return formData;
};
