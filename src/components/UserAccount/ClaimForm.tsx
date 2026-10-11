"use client";
import React, { useState } from "react";
import { ClaimData, englishtobangla } from "./Interface";
import Image from "next/image";
import { toast } from "react-toastify";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, FormDataHeader, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation";
const ClaimForm = ({
  package_Id,
  packageTitle,
  userId,
  language,
  isHydrated,
  phone,
}: {
  package_Id: string;
  packageTitle: string;
  userId: string;
  language: string;
  isHydrated: boolean;
  phone: string;
}) => {
  const [claimInfo, setClaimInfo] = useState<ClaimData>({
    user: userId,
    bookedPackage: package_Id,
    accountType: "Bank",
    phone: `0${phone}`,
  });
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Bank");
  const [showmodel, setShowmodel] = useState(false);
  const [link, setlink] = useState<string>();
  const [submit, setSubmit] = useState(false);
  const { t } = useTranslation();
  // handle Input Change
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: string
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (type == "All") {
      setClaimInfo((prev: any) => ({ ...prev, [name]: e.target.value || "" }));
    } else if (type === "Bank") {
      setClaimInfo((prevclaimInfo) => ({
        ...prevclaimInfo,
        bank: {
          ...prevclaimInfo?.bank,
          [name]: value,
        },
      }));
    } else if (type === "Mfs") {
      setClaimInfo((prevclaimInfo) => ({
        ...prevclaimInfo,
        mfs: {
          ...prevclaimInfo?.mfs,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const response = await claimSubmition(claimInfo);
      const response = await apiCall(
        Methods.POST,
        EndPoint.ADMIN_CLAIM_SUBMITION,
        claimInfo
      );

      if (response.success) {
        toast.success(response.message);
        // if (typeof window !== "undefined") {
        //   window.location.reload();
        // }
        setSubmit(true);
        setClaimInfo({});
      } else {
        toast.error(response.message);
        // console.log("Error");
      }
    } catch (error) {
      toast.error("Something went wrong", { hideProgressBar: true });
    } finally {
      setLoading(false);
    }
  };

  // handle File Upload
  const handleFileUploaded = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    e.preventDefault();
    const files: any = e.target.files;
    const form = new FormData();
    form.append("file", files[0]);
    try {
      // const response = await fileUpload(form);
      const response = await apiCall(
        Methods.POST,
        EndPoint.ADMIN_FILE_UPLOAD,
        form,
        FormDataHeader
      );
      const Url = response?.data;
      if (Url) {
        setClaimInfo((prev: any) => {
          if (!prev) return prev;
          const updatedLinks = (prev[type] as string[] | undefined) ?? [];
          return {
            ...prev,
            [type]: [...updatedLinks, Url],
          };
        });
      }
    } catch (error) {
      console.log("File upload failed:", error);
    }
  };

  const handleAccountTypeChange = (type: string) => {
    setSelectedOption(type);
    if (type === "Bank") {
      setClaimInfo((prevValues) => ({
        ...prevValues,
        mfs: {},
      }));
      setClaimInfo((prev) => ({
        ...prev,
        accountType: "Bank",
      }));
    } else if (type === "MFS") {
      setClaimInfo((prevValues) => ({
        ...prevValues,
        bank: {},
      }));
      setClaimInfo((prev) => ({
        ...prev,
        accountType: "MFS",
      }));
    }
  };

  const handleDeleteImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: keyof ClaimData,
    index: number
  ) => {
    e.preventDefault();
    const selectedArray = claimInfo[type] as string[] | undefined;
    if (Array.isArray(selectedArray)) {
      const updatedArray = [...selectedArray];
      updatedArray.splice(index, 1);
      setClaimInfo((prev) => ({
        ...prev,
        [type]: updatedArray,
      }));
    }
  };

  const showPdf = (e: React.MouseEvent<HTMLButtonElement>, item: string) => {
    e.preventDefault();
    setShowmodel(!showmodel);
    setlink(item);
  };

  if (submit) {
    return "Your Claim has been Submited";
  }

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          {/* Basic Information  */}
          <div className="py-3">
            <h2 className="text-xl font-semibold text-[#3A3A3C] mb-4">
              {t("basicInformation")}
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="relative block text-sm text-gray-700">
                  {t("organizationName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("enterOrganizationName")}
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                  name="nameofOrganization"
                  onChange={(e) => handleChange(e, "All")}
                  value={claimInfo?.nameofOrganization || ""}
                  required
                />
              </div>

              <div>
                <label className="relative block text-sm text-gray-700">
                  {t("patientName")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("enterPatientName")}
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                  name="nameofPatient"
                  onChange={(e) => handleChange(e, "All")}
                  value={claimInfo?.nameofPatient || ""}
                  required
                />
              </div>

              <div>
                <label className="relative block text-sm text-gray-700">
                  {t("relationshipWithEmployee")}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                  name="employeeStatus"
                  onChange={(e) => handleChange(e, "All")}
                  value={claimInfo?.employeeStatus || ""}
                  required
                >
                  <option value="" disabled>
                    {t("select_relationship")}
                  </option>
                  <option value="myself">{t("myself")}</option>
                  <option value="spouse">{t("spouse")}</option>
                  <option value="parents">{t("parents")}</option>
                  <option value="children">{t("children")}</option>
                </select>
              </div>

              <div>
                <label className="relative block text-sm text-gray-700">
                  {t("phoneNumber")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder={t("phonePlaceholder")}
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none appearance-none no-spin"
                  name="phone"
                  onChange={(e) => handleChange(e, "All")}
                  value={claimInfo?.phone || ""}
                  required
                  disabled
                />
              </div>

              <div className="col-span-1">
                <label className="relative block text-sm text-gray-700">
                  {isHydrated
                    ? language == "bn"
                      ? "ঠিকানা"
                      : "Address "
                    : null}

                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    isHydrated
                      ? language == "bn"
                        ? " ঠিকানা লিখুন "
                        : "Enter Address"
                      : undefined
                  }
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                  name="address"
                  value={claimInfo?.address || ""}
                  onChange={(e) => handleChange(e, "All")}
                  required
                />
              </div>
            </div>
          </div>
          <div className="py-4">
            <p className="text-xl font-semibold text-[#3A3A3C]">
              {isHydrated
                ? language == "bn"
                  ? "অর্গানিজশন এর কো-অর্ডিনেটর অথবা নিজে পূরণ করুন : "
                  : "To be filled in by the plan Coordinator of the Organization or Individual :"
                : null}
            </p>
            <p className="text-[#3A3A3C] text-sm font-normal opacity-70">
              {" "}
              {isHydrated
                ? language == "bn"
                  ? "ক্লেইম রিইমবার্সমেন্ট জমা দেওয়ার জন্য প্রয়োজনীয় ডকুমেন্ট প্রদান করুন"
                  : " Documents required During Submission of Claim for Reimbursement"
                : null}
            </p>
          </div>

          <div className="mt-3">
            <div className="grid gap-4 py-3 lg:grid-cols-2">
              <div className="">
                <p className="relative pb-1 text-sm">
                  {isHydrated
                    ? language == "bn"
                      ? "১. ডাক্তারের প্রেসক্রিপশন"
                      : "1. Doctor’s Prescription "
                    : null}
                  <span className="text-red-500">*</span>
                </p>
                <div className="grid gap-2 grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                  {claimInfo?.doctorPrescription?.map((item, index) => (
                    <div key={index} className="relative group">
                      {item.endsWith("pdf") ? (
                        <>
                          <iframe
                            src={item}
                            className="w-20 -z-10 h-20 border rounded-md object-cover overflow-hidden  bg-scroll"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                            width={20}
                            height={20}
                          />
                          <div className="box">
                            <button
                              className="badge"
                              type="button"
                              onClick={(e) => {
                                showPdf(e, item);
                              }}
                            >
                              👁
                            </button>
                            <button
                              onClick={(e) =>
                                handleDeleteImage(
                                  e,
                                  "doctorPrescription",
                                  index
                                )
                              }
                              type="button"
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Image
                            src={item}
                            alt="doctorPrescription"
                            width={80}
                            height={30}
                            className="w-20 h-20 border rounded-md object-cover"
                          />
                          <div className="box1">
                            <button
                              onClick={(e) =>
                                handleDeleteImage(
                                  e,
                                  "doctorPrescription",
                                  index
                                )
                              }
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <label
                    htmlFor="doctorPrescription"
                    className={`px-3 py-1 bg-gray-200 grid place-items-center rounded-lg`}
                  >
                    <Image
                      src="/other/upload.svg"
                      alt="doctorPrescription"
                      width={30}
                      height={40}
                    />
                    {isHydrated ? (
                      <>
                        <span className="text-[9px]">
                          {englishtobangla("Upload", language)}
                        </span>
                        <span className="text-[9px]">
                          {englishtobangla("Document", language)}
                        </span>
                      </>
                    ) : null}
                    <input
                      type="file"
                      id="doctorPrescription"
                      className="hidden"
                      name="doctorPrescription"
                      onChange={(e) =>
                        handleFileUploaded(e, "doctorPrescription")
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="">
                <p className="relative pb-1 text-sm">
                  {isHydrated
                    ? language == "bn"
                      ? " ২. ডিসচার্জ সার্টিফিকেট"
                      : " 2. Discharge Certificate "
                    : null}
                </p>
                <div className="grid gap-2 grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 ">
                  {claimInfo?.dischargeCertificate?.map((item, index) => (
                    <div key={index} className="relative group">
                      {item.endsWith("pdf") ? (
                        <>
                          <iframe
                            src={item}
                            className="w-20 -z-10 h-20 border rounded-md object-cover overflow-hidden  bg-scroll"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                            width={20}
                            height={20}
                          />
                          <div className="box">
                            <button
                              className="badge"
                              type="button"
                              onClick={(e) => {
                                showPdf(e, item);
                              }}
                            >
                              👁
                            </button>
                            <button
                              onClick={(e) =>
                                handleDeleteImage(
                                  e,
                                  "dischargeCertificate",
                                  index
                                )
                              }
                              type="button"
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Image
                            src={item}
                            alt="dischargeCertificate"
                            width={80}
                            height={20}
                            className="w-20 h-20 border rounded-md object-contain"
                          />
                          <div className="box1">
                            <button
                              onClick={(e) =>
                                handleDeleteImage(
                                  e,
                                  "dischargeCertificate",
                                  index
                                )
                              }
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <label
                    htmlFor="dischargeCertificate"
                    className={`px-3 py-1 bg-gray-200 grid place-items-center rounded-lg`}
                  >
                    <Image
                      src="/other/upload.svg"
                      alt="dischargeCertificate"
                      width={30}
                      height={30}
                    />

                    {isHydrated ? (
                      <>
                        <span className="text-[9px]">
                          {englishtobangla("Upload", language)}
                        </span>
                        <span className="text-[9px]">
                          {englishtobangla("Document", language)}
                        </span>
                      </>
                    ) : null}
                    <input
                      type="file"
                      id="dischargeCertificate"
                      className="hidden"
                      name="dischargeCertificate"
                      onChange={(e) =>
                        handleFileUploaded(e, "dischargeCertificate")
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="">
                <p className="relative pb-1 text-sm">
                  {isHydrated
                    ? language == "bn"
                      ? "৩. হাসপাতালের বিল/রসিদ"
                      : " 3. Hospital Bill / Receipt"
                    : null}{" "}
                </p>

                <div className="grid gap-2 grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 ">
                  {claimInfo?.hospitalBillReceipt?.map((item, index) => (
                    <div className="relative group" key={index}>
                      {item.endsWith("pdf") ? (
                        <>
                          <iframe
                            src={item}
                            className="w-20 -z-10 h-20 border rounded-md object-cover overflow-hidden  bg-scroll"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                            width={20}
                            height={20}
                          />
                          <div className="box">
                            <button
                              className="badge"
                              type="button"
                              onClick={(e) => {
                                showPdf(e, item);
                              }}
                            >
                              👁
                            </button>
                            <button
                              onClick={(e) =>
                                handleDeleteImage(
                                  e,
                                  "hospitalBillReceipt",
                                  index
                                )
                              }
                              type="button"
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <Image
                            key={index}
                            src={item}
                            alt="hospitalBillReceipt"
                            width={80}
                            height={20}
                            className="w-20 h-20 border rounded-md"
                          />
                          <div className="box1">
                            <button
                              onClick={(e) =>
                                handleDeleteImage(
                                  e,
                                  "hospitalBillReceipt",
                                  index
                                )
                              }
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <label
                    htmlFor="hospitalBillReceipt"
                    className={`px-3 py-1 bg-gray-200 grid place-items-center rounded-lg cursor-pointer `}
                  >
                    <Image
                      src="/other/upload.svg"
                      alt="dischargeCertificate"
                      width={30}
                      height={40}
                    />

                    {isHydrated ? (
                      <>
                        <span className="text-[9px]">
                          {englishtobangla("Upload", language)}
                        </span>
                        <span className="text-[9px]">
                          {englishtobangla("Document", language)}
                        </span>
                      </>
                    ) : null}
                    <input
                      type="file"
                      id="hospitalBillReceipt"
                      className="hidden"
                      name="hospitalBillReceipt"
                      onChange={(e) =>
                        handleFileUploaded(e, "hospitalBillReceipt")
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:mt-6">
            <p className="text-xl text-[#3A3A3C] font-semibold">
              {isHydrated
                ? language == "bn"
                  ? "রিপোর্ট/ডায়াগনস্টিক"
                  : " Report/ Diagnostic"
                : null}{" "}
            </p>
            <div className="grid gap-4 py-3 lg:grid-cols-2">
              <div className="">
                <p className="relative pb-1 text-sm">
                  {isHydrated
                    ? language == "bn"
                      ? "১. ডায়াগনস্টিক টেস্ট রিপোর্ট"
                      : " 1. Diagnostic Test Report"
                    : null}{" "}
                </p>
                <div className="grid gap-2 grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 ">
                  {claimInfo?.diagnosticTestReport?.map((item, index) => (
                    <div key={index} className="relative group">
                      {item.endsWith("pdf") ? (
                        <>
                          <iframe
                            src={item}
                            className="w-20 -z-10 h-20 border rounded-md object-cover overflow-hidden  bg-scroll"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                            width={20}
                            height={20}
                          />
                          <div className="box">
                            <button
                              className="badge"
                              type="button"
                              onClick={(e) => {
                                showPdf(e, item);
                              }}
                            >
                              👁
                            </button>
                            <button
                              onClick={(e) =>
                                handleDeleteImage(
                                  e,
                                  "diagnosticTestReport",
                                  index
                                )
                              }
                              type="button"
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Image
                            src={item}
                            alt="diagnosticTestReport"
                            width={80}
                            height={30}
                            className="w-20 h-20 border rounded-md object-contain"
                          />
                          <div className="box1">
                            <button
                              onClick={(e) =>
                                handleDeleteImage(
                                  e,
                                  "diagnosticTestReport",
                                  index
                                )
                              }
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <label
                    htmlFor="diagnosticTestReport"
                    className={`px-3 py-1 bg-gray-200 grid place-items-center rounded-lg `}
                  >
                    <Image
                      src="/other/upload.svg"
                      alt="diagnosticTestReport"
                      width={30}
                      height={40}
                    />

                    {isHydrated ? (
                      <>
                        <span className="text-[9px]">
                          {englishtobangla("Upload", language)}
                        </span>
                        <span className="text-[9px]">
                          {englishtobangla("Document", language)}
                        </span>
                      </>
                    ) : null}
                    <input
                      type="file"
                      id="diagnosticTestReport"
                      className="hidden"
                      name="diagnosticTestReport"
                      onChange={(e) =>
                        handleFileUploaded(e, "diagnosticTestReport")
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="">
                <p className="relative pb-1 text-sm">
                  {isHydrated
                    ? language == "bn"
                      ? "২. অন্যান্য"
                      : " 2. Others "
                    : null}
                </p>
                <div className="grid gap-2 grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 ">
                  {claimInfo?.otherDocuments?.map((item, index) => (
                    <div className="relative group" key={index}>
                      {item.endsWith("pdf") ? (
                        <>
                          <iframe
                            src={item}
                            className="w-20 -z-10 h-20 border rounded-md object-cover overflow-hidden  bg-scroll"
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                            width={20}
                            height={20}
                          />
                          <div className="box">
                            <button
                              className="badge"
                              type="button"
                              onClick={(e) => {
                                showPdf(e, item);
                              }}
                            >
                              👁
                            </button>
                            <button
                              onClick={(e) =>
                                handleDeleteImage(e, "otherDocuments", index)
                              }
                              type="button"
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Image
                            src={item}
                            alt="otherDocuments"
                            width={80}
                            height={30}
                            className="w-20 h-20 border rounded-md object-contain"
                          />
                          <div className="box1">
                            <button
                              onClick={(e) =>
                                handleDeleteImage(e, "otherDocuments", index)
                              }
                              className="badge"
                            >
                              ✖
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  <label
                    htmlFor="otherDocuments"
                    className={`px-3 py-1 bg-gray-200 grid place-items-center rounded-lg`}
                  >
                    <Image
                      src="/other/upload.svg"
                      alt="otherDocuments"
                      width={30}
                      height={40}
                    />

                    {isHydrated ? (
                      <>
                        <span className="text-[9px]">
                          {englishtobangla("Upload", language)}
                        </span>
                        <span className="text-[9px]">
                          {englishtobangla("Document", language)}
                        </span>
                      </>
                    ) : null}
                    <input
                      type="file"
                      id="otherDocuments"
                      className="hidden"
                      name="otherDocuments"
                      onChange={(e) => handleFileUploaded(e, "otherDocuments")}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:mt-6">
            <p className="text-xl text-[#3A3A3C] font-semibold">
              {isHydrated ? (language == "bn" ? "পরিমাণ" : "Amount") : null}{" "}
            </p>
            <div className="grid gap-4 py-3 lg:grid-cols-2">
              <div>
                <label className="relative block text-sm text-gray-700">
                  {isHydrated
                    ? language == "bn"
                      ? "ডাক্তার পরামর্শ ফি"
                      : " Doctor  Consultant Fee "
                    : null}
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    isHydrated
                      ? language == "bn"
                        ? "পরামর্শ ফি লিখুন "
                        : "Enter Consultant Fee"
                      : undefined
                  }
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                  name="consultantFee"
                  onChange={(e) => handleChange(e, "All")}
                  value={claimInfo?.consultantFee || ""}
                  required
                />
              </div>
              <div>
                <label className="relative block text-sm text-gray-700">
                  {isHydrated
                    ? language == "bn"
                      ? "ক্লেইমের পরিমাণ"
                      : "  Claim Amount "
                    : null}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    isHydrated
                      ? language == "bn"
                        ? "ক্লেইমের পরিমাণ লিখুন "
                        : "Enter Claim Amount"
                      : undefined
                  }
                  className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                  name="claimAmount"
                  onChange={(e) => handleChange(e, "All")}
                  value={claimInfo?.claimAmount || ""}
                  required
                />
              </div>
              <div>
                <label className="relative block text-sm text-gray-700">
                  {isHydrated
                    ? language == "bn"
                      ? "হেলথ প্যাকেজ টাইপ"
                      : " Health Package Type"
                    : null}
                </label>

                <p className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none">
                  {packageTitle}
                </p>
              </div>
            </div>
          </div>

          <div className="py-3">
            <p className="text-xl font-semibold text-[#3A3A3C] mb-4">
              {isHydrated
                ? language == "bn"
                  ? "সেটেলমেন্ট অ্যাকাউন্ট"
                  : " Settlement Account"
                : null}
            </p>
            <div className="flex space-x-5">
              <div className="flex items-center space-x-1">
                <input
                  type="radio"
                  id="bank"
                  name="paymentOption"
                  value="Bank"
                  checked={selectedOption === "Bank"}
                  onChange={() => handleAccountTypeChange("Bank")}
                  className="accent-pink-500"
                />
                <label htmlFor="bank" className="cursor-pointer">
                  {isHydrated ? (language == "bn" ? "ব্যাংক" : "Bank") : null}{" "}
                </label>
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="paymentOption"
                  value="MFS"
                  checked={selectedOption === "MFS"}
                  onChange={() => handleAccountTypeChange("MFS")}
                  id="mfs"
                  className="accent-pink-500"
                />
                <label htmlFor="mfs" className="cursor-pointer">
                  {" "}
                  {isHydrated
                    ? language == "bn"
                      ? "মোবাইল ফাইন্যান্সিয়াল সার্ভিস"
                      : "MFS"
                    : null}{" "}
                </label>
              </div>
            </div>
            {selectedOption === "Bank" ? (
              <div className="grid gap-4 mt-3 lg:grid-cols-2">
                <div>
                  <label className="relative block text-sm text-gray-700">
                    {isHydrated
                      ? language == "bn"
                        ? "অ্যাকাউন্ট এর নাম"
                        : " Account Name"
                      : null}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      isHydrated
                        ? language == "bn"
                          ? "তথ্য দিন . . ."
                          : "Enter Account Name"
                        : undefined
                    }
                    className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                    name="accountName"
                    onChange={(e) => handleChange(e, "Bank")}
                    value={claimInfo?.bank?.accountName || ""}
                    required
                  />
                </div>
                <div>
                  <label className="relative block text-sm text-gray-700">
                    {isHydrated
                      ? language == "bn"
                        ? "অ্যাকাউন্ট নম্বর"
                        : " Account Number "
                      : null}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      isHydrated
                        ? language == "bn"
                          ? "তথ্য দিন . . ."
                          : "Enter Account Name"
                        : undefined
                    }
                    className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                    name="accountNumber"
                    onChange={(e) => handleChange(e, "Bank")}
                    value={claimInfo?.bank?.accountNumber || ""}
                    required
                  />
                </div>
                <div>
                  <label className="relative block text-sm text-gray-700">
                    {isHydrated
                      ? language == "bn"
                        ? "ব্যাংকের নাম"
                        : "  Bank Name "
                      : null}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      isHydrated
                        ? language == "bn"
                          ? "তথ্য দিন . . ."
                          : "Enter Account Name"
                        : undefined
                    }
                    className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                    value={claimInfo?.bank?.bankName || ""}
                    onChange={(e) => handleChange(e, "Bank")}
                    required
                    name="bankName"
                  />
                </div>
                <div>
                  <label className="relative block text-sm text-gray-700">
                    {isHydrated
                      ? language == "bn"
                        ? "শাখা"
                        : " Branch "
                      : null}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      isHydrated
                        ? language == "bn"
                          ? "তথ্য দিন . . ."
                          : "Enter Account Name"
                        : undefined
                    }
                    className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                    onChange={(e) => handleChange(e, "Bank")}
                    value={claimInfo?.bank?.branch || ""}
                    name="branch"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">
                    {isHydrated
                      ? language == "bn"
                        ? "রাউটিং নম্বর"
                        : " Routing Number "
                      : null}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      isHydrated
                        ? language == "bn"
                          ? "তথ্য দিন . . ."
                          : "Enter Account Name"
                        : undefined
                    }
                    className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                    value={claimInfo?.bank?.routingNumber || ""}
                    name="routingNumber"
                    onChange={(e) => handleChange(e, "Bank")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">
                    {isHydrated
                      ? language == "bn"
                        ? "জেলা"
                        : "District"
                      : null}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      isHydrated
                        ? language == "bn"
                          ? "তথ্য দিন . . ."
                          : "Enter Account Name"
                        : undefined
                    }
                    className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                    value={claimInfo?.bank?.district || ""}
                    name="district"
                    onChange={(e) => handleChange(e, "Bank")}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-4 mt-3 lg:grid-cols-2">
                <div>
                  <label className="block text-sm text-gray-700">
                    {isHydrated
                      ? language == "bn"
                        ? "অ্যাকাউন্ট এর নাম"
                        : " Account Name"
                      : null}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      isHydrated
                        ? language == "bn"
                          ? "তথ্য দিন . . ."
                          : "Enter Account Name"
                        : undefined
                    }
                    className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none"
                    name="accountName"
                    onChange={(e) => handleChange(e, "Mfs")}
                    value={claimInfo?.mfs?.accountName || ""}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">
                    {isHydrated
                      ? language == "bn"
                        ? "মোবাইল নম্বর"
                        : " Mobile Number "
                      : null}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder={
                      isHydrated
                        ? language == "bn"
                          ? "তথ্য দিন . . ."
                          : "Enter Mobile Number"
                        : undefined
                    }
                    className="w-full p-2 mt-2 text-sm border border-gray-300 rounded outline-none no-spin"
                    name="phone"
                    onChange={(e) => handleChange(e, "Mfs")}
                    value={claimInfo?.mfs?.phone || ""}
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <div>
                    <input
                      type="radio"
                      name="mfsOperator"
                      value="BKash"
                      id="BKash"
                      onChange={(e) => handleChange(e, "Mfs")}
                      className="accent-pink-500"
                    />
                    <label htmlFor="BKash" className="ml-1 cursor-pointer">
                      {isHydrated
                        ? language == "bn"
                          ? "বিকাশ "
                          : "BKash"
                        : null}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="radio"
                      name="mfsOperator"
                      value="nagad"
                      id="nagad"
                      onChange={(e) => handleChange(e, "Mfs")}
                      className="ml-3 accent-pink-500"
                    />
                    <label htmlFor="nagad" className="ml-1 cursor-pointer">
                      {isHydrated
                        ? language == "bn"
                          ? "নগদ"
                          : " Nagad "
                        : null}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="radio"
                      name="mfsOperator"
                      value="rocket"
                      id="rocket"
                      onChange={(e) => handleChange(e, "Mfs")}
                      className="ml-3 accent-pink-500"
                    />
                    <label htmlFor="rocket" className="ml-1 cursor-pointer">
                      {isHydrated
                        ? language == "bn"
                          ? "রকেট"
                          : "Rocket "
                        : null}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#E2136E] mt-4 w-64 h-8 text-center  text-xs  text-white rounded-full"
            >
              {loading ? "Loading.." : "Submit Claim"}
            </button>
          </div>
        </form>
      </section>
      {showmodel && (
        <div
          onClick={() => setShowmodel(!showmodel)}
          className="fixed inset-0 z-40 flex items-center justify-center transition duration-500 delay-1000 bg-black bg-opacity-15 backdrop-blur-sm"
        >
          <div className=" container w-[55%] max-h-[80vh] overflow-y-auto min-h-[70vh]  rounded-2xl">
            <iframe
              src={link}
              width="800"
              height="700"
              style={{ border: "none" }}
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimForm;
