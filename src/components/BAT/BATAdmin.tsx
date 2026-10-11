"use client";
import { EndPoint, FormDataHeader, JsonHeader, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { AutoComplete } from "rsuite";
import { CiSearch } from "react-icons/ci";
import { Child, defaultFormData, distributors, toFormData } from "./Interface";
const BATAdmin = () => {
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    empId: "",
    subOrganization: "",
    familyIndividual: "individual",
    familyMembers: [
      { relation: "spouse", firstName: "", lastName: "", phone: "", nID: "" },
      { relation: "child", firstName: "", lastName: "" },
      { relation: "child", firstName: "", lastName: "" },
    ],
    consent: false,
    nid: "",
  });
  const [Loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const isValidBDNumber = (num: string) => /^01[3-9][0-9]{8}$/.test(num);
  const autoCompleteRef = useRef<any>(null);

  const handleFocus = () => {
    if (autoCompleteRef.current) {
      // Open the dropdown manually
      autoCompleteRef.current.open();
    }
  };

  const formatEmpId = (value: string) => {
    // Remove existing dashes only
    const cleanValue = value.replace(/-/g, "").slice(0, 10);

    const part1 = cleanValue.slice(0, 3).toUpperCase();
    const part2 = cleanValue.slice(3, 6).toUpperCase();
    const part3 = cleanValue.slice(6, 10).toUpperCase();

    if (cleanValue.length <= 3) return part1;
    if (cleanValue.length <= 6) return `${part1}-${part2}`;
    return `${part1}-${part2}-${part3}`;
  };

  // Handle input changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let newValue: any = type === "checkbox" ? checked : value;

    // Format empId
    if (name === "empId") {
      newValue = formatEmpId(value);
    }

    // Phone validation
    if (name === "phone") {
      const isValid = isValidBDNumber(value);
      setPhoneError(value.length > 10 && !isValid);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  //Search Button
  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()
      const empId = formData.empId.trim();
      if (!empId) {
        toast.warn("অনুগ্রহ করে এমপ্লয়ি আইডি লিখুন");
        return;
      }
      const response = await apiCall(Methods.GET, `${EndPoint.BAT_GET_BY_EMP_ID}/${empId}`)
      console.log(response);
      if (response.success) {
        if (response.success) {
          setFormData({
            ...defaultFormData,
            ...response.data,
            familyMembers: response.data.familyMembers?.map((m: any, index: number) => ({
              ...defaultFormData.familyMembers[index],
              ...m,
            })) || defaultFormData.familyMembers,
            familyIndividual: response.data.familyMembers.length > 0 ? "family" : "individual"
          });
        }

      }


    } catch (error) {
      console.log(error);
      toast.error("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন");
    }
  }

  //Handle Child Change
  const handleChildChange = (
    index: number,
    field: keyof Child,
    value: string
  ) => {
    setFormData((prev) => {
      const children = [...prev.familyMembers];
      children[index] = { ...children[index], [field]: value };
      return { ...prev, familyMembers: children };
    });
  };

  // Handle radio selection
  const handleFamilySelection = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      familyIndividual: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload: any = { ...formData, nid: `${formData.nid}` };
      delete payload.consent;
      if (!distributors.includes(payload.subOrganization)) {
        toast.error(
          "দয়া করে তালিকার মধ্যে থেকে একটি ডিস্ট্রিবিউটর নির্বাচন করুন।"
        );
        return;
      }
      if (payload.familyIndividual === "individual") {
        delete payload.familyIndividual;
        delete payload.familyMembers;
      }

      if (payload.familyIndividual === "family") {
        delete payload.familyIndividual;
      }
      // const formDataPayload = toFormData(payload);
      const formDataPayload = JSON.stringify(payload);

      const response = await apiCall(
        Methods.PATCH,
        `${EndPoint.BAT_USER_UPDATE}/${formData._id}`,
        formDataPayload,
        JsonHeader
      );
      // console.log(typeof response);
      // return

      if (response.success) {
        setLoading(false);
        toast.success(response.message);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          empId: "",
          subOrganization: "",
          familyIndividual: "individual",
          familyMembers: [
            { relation: "spouse", firstName: "", lastName: "", phone: "", nID: "" },
            { relation: "child", firstName: "", lastName: "" },
            { relation: "child", firstName: "", lastName: "" },
          ],
          consent: false,
          nid: "",
          _id: ""
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] xl:container xl:mx-auto flex justify-center">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-6xl rounded-lg bg-white p-6 shadow-lg sm:p-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
                সেলস ফোর্সের তথ্য সংগ্রহ ফর্ম
              </h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                অনুগ্রহ করে ফর্মটি ন্যাশনাল আইডি কার্ডের তথ্য অনুযায়ী সতর্কভাবে
                এবং সঠিকভাবে পূরন করুন |
              </p>
            </div>
           
            <hr className="p-[1px] bg-gray-500"/>

            {/* Full Name */}
            <div className="mb-6 mt-3 grid lg:gap-5 lg:grid-cols-2">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  প্রথম অংশ *
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                  placeholder="নামের প্রথম অংশটি লিখুন"
                />{" "}
              </div>
              <div className="w-full mt-4 lg:mt-0">
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  শেষ অংশ*
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  required
                  placeholder="নামের শেষ অংশটি লিখুন"
                />{" "}
              </div>
            </div>

            {/* Id */}
             <div className="mb-3">
              <label
                htmlFor="empId"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                এমপ্লয়ি আইডি  লিখুন*
               
              </label>
              <div className="flex justify-between items-center rounded-md border">
                <input
                  type="string"
                  name="empId"
                  id="empId"
                  // disabled 
                  value={formData.empId}
                  onChange={handleChange}
                  // placeholder="এমপ্লয়ি আইডি লিখুন"
                  placeholder="XXX-XXX-XXXX"
                  className={`w-full  p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none `}
                  required
                />
                <button className="border-l h-full p-3" onClick={handleSearch}>
                  <CiSearch size={20} />
                </button>
              </div>
            </div>

            {/* Nationa Id  */}
            <div className="mb-6">
              <label
                htmlFor="nid"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                জাতীয় পরিচয়পত্র নম্বর*
              </label>
              <input
                type="text"
                name="nid"
                id="nid"
                value={formData.nid}
                onChange={handleChange}
                placeholder="জাতীয় পরিচয়পত্র নম্বর লিখুন"
                className={`w-full rounded-md border p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none `}
                required
              />
            </div>

            {/* phone no  */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                মোবাইল নম্বর*
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                disabled
                value={formData.phone}
                onChange={handleChange}
                placeholder="01712345678"
                className={`w-full rounded-md border p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${phoneError ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid Bangladeshi phone number.
                </p>
              )}
            </div>

            {/* Distribution Name */}
            <div className="mb-6">
              <label
                htmlFor="distributorName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                ডিস্ট্রিবিউটরের নাম*
              </label>
              {/* <input
                type="text"
                name="distributorName"
                id="distributorName"
                value={formData.distributorName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                required
                placeholder="ডিস্ট্রিবিউটরের নাম লিখুন"
                list="distributor-list"
              />
              <datalist
                id="distributor-list"
                className="max-h-[15vh] bg-white overflow-auto w-full"
              >
                {distributors.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist> */}
              <AutoComplete
                ref={autoCompleteRef}
                id="subOrganization"
                data={distributors}
                value={formData.subOrganization}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, subOrganization: value }))
                }
                selectOnEnter={true}
                placeholder="ডিস্ট্রিবিউটরের নাম লিখুন"
                style={{ width: "100%" }}
                onFocus={handleFocus}
                className="w-full rounded-md border border-gray-300 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Family / Individual */}
            <div className="mb-3">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ব্যক্তি/পরিবার*
              </label>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="familyIndividual"
                    value="individual"
                    checked={formData.familyIndividual === "individual"}
                    onChange={() => handleFamilySelection("individual")}
                    className="form-radio h-4 w-4 rounded border-gray-300  accent-pink-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">ব্যক্তি</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="familyIndividual"
                    value="family"
                    checked={formData.familyIndividual === "family"}
                    onChange={() => handleFamilySelection("family")}
                    className="form-radio h-4 w-4 rounded border-gray-300  accent-pink-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">পরিবার</span>
                </label>
              </div>
            </div>

            {/* Children inputs (conditionally rendered) */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${formData.familyIndividual === "family"
                ? "max-h-[800px] opacity-100 "
                : "max-h-0 opacity-0"
                }`}
            >
              <div className=" mt-2">
                <p className=" block text-sm font-medium text-gray-700">
                  {" "}
                  স্বামী/স্ত্রী
                </p>
                <div className="grid mt-2 lg:grid-cols-2 p-3 lg:gap-3 gap-1 border rounded-lg shadow-sm bg-gray-50">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      প্রথম অংশ*
                    </label>
                    <input
                      type="text"
                      placeholder="নামের প্রথম অংশটি লিখুন"
                      value={formData.familyMembers[0]?.firstName || ""}
                      onChange={(e) =>
                        handleChildChange(0, "firstName", e.target.value)
                      }
                      className="w-full rounded-md border border-gray-300 p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      শেষ অংশ*
                    </label>
                    <input
                      type="text"
                      placeholder="নামের শেষ অংশটি লিখুন"
                      value={formData.familyMembers[0]?.lastName || ""}
                      onChange={(e) =>
                        handleChildChange(0, "lastName", e.target.value)
                      }
                      className="w-full rounded-md border border-gray-300 p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="text"
                      placeholder="01712345678"
                      value={formData.familyMembers[0]?.phone || ""}
                      onChange={(e) =>
                        handleChildChange(0, "phone", e.target.value)
                      }
                      className="w-full rounded-md border border-gray-300 p-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      জাতীয় পরিচয়পত্র নম্বর*
                    </label>
                    <input
                      type="text"
                      placeholder="জাতীয় পরিচয়পত্র নম্বর লিখুন"
                      value={formData.familyMembers[0]?.nID || ""}
                      onChange={(e) =>
                        handleChildChange(0, "nID", e.target.value)
                      }
                      className="w-full rounded-md border border-gray-300 p-3 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className=" mt-4">
                <p className=" block text-sm font-medium text-gray-700">
                  {" "}
                  সন্তান সংখ্যা: ১
                </p>
                <div className="grid mt-2 lg:grid-cols-2 lg:gap-3 gap-1 p-3 border rounded-lg shadow-sm bg-gray-50">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      প্রথম অংশ
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="নামের প্রথম অংশটি লিখুন"
                      value={formData.familyMembers[1]?.firstName || ""}
                      onChange={(e) =>
                        handleChildChange(1, "firstName", e.target.value)
                      }
                      className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      শেষ অংশ
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.familyMembers[1]?.lastName || ""}
                      onChange={(e) =>
                        handleChildChange(1, "lastName", e.target.value)
                      }
                      placeholder="নামের শেষ অংশটি লিখুন"
                      className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className=" block text-sm font-medium text-gray-700">
                  {" "}
                  সন্তান সংখ্যা: ২
                </p>
                <div className="grid mt-2 lg:grid-cols-2 lg:gap-3 gap-1 rounded-lg shadow-sm bg-gray-50 p-3 border ">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      প্রথম অংশ
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.familyMembers[2]?.firstName || ""}
                      onChange={(e) =>
                        handleChildChange(2, "firstName", e.target.value)
                      }
                      placeholder="নামের প্রথম অংশটি লিখুন"
                      className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      শেষ অংশ
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.familyMembers[2]?.lastName || ""}
                      onChange={(e) =>
                        handleChildChange(2, "lastName", e.target.value)
                      }
                      placeholder="নামের শেষ অংশটি লিখুন"
                      className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="mb-6 mt-3 flex items-center">
              <input
                type="checkbox"
                name="consent"
                id="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="form-checkbox cursor-pointer h-4 w-4 rounded border-gray-300  accent-pink-500"
                required
              />
              <label
                htmlFor="consent"
                className="ml-2 cursor-pointer text-sm text-gray-600"
              >
                {/* I confirm the above availability is accurate to the best of my
                knowledge. */}
                আমি নিশ্চিত করছি যে উপরের তথ্য সঠিক।
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#EB148C] px-6 py-3 font-medium text-white shadow-sm transition duration-300 hover:bg-pink-700 focus:ring-2 focus:ring-[#EB148C] focus:ring-offset-2 focus:outline-none"
            >
              {Loading ? "অনুরোধ প্রক্রিয়াধীন…" : "সাবমিট করুন"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BATAdmin;
