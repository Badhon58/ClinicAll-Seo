"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import Link from "next/link";
import { useAppSelector } from "@/redux/Hooks";
import { toast } from "react-toastify";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, FormDataHeader, JsonHeader, Methods } from "@/api/config";
import { useRouter } from "next/navigation";
import { Modal } from "rsuite";
import { useTranslation } from "react-i18next";
import SignIn from "../Auth/SignIn";
interface Prescriptioninterface {
  fullName: string;
  phone: string;
  user?: string;
  note?: string;
  address?: string;
  prescriptionImageUrl: string;
}
const box =
  "bg-gradient-to-r flex items-center border rounded-lg justify-center flex-col  from-[#fddde9] to-[#fddde9] py-3 lg:px-[10px] lg:py-[18px]   xl:px-[20px] xl:py-[22px] 2xl:px-[42px] 2xl:py-[27px]";
const MadiServices = () => {
  const [prescriptionModel, setPrescriptionModel] = useState(false);
  const [addressDetails, setAddressDetails] = useState<Prescriptioninterface>({
    fullName: "",
    phone: "",
    note: "",
    address: "",
    prescriptionImageUrl: "",
  });
  const { t } = useTranslation();
  const [ProfileImage, setProfileImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [signInPage, setSignInPage] = useState(false);
  const handleSignIn: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignInPage(!signInPage);
  };
  const handleUploadPrescription: any = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    setPrescriptionModel(!prescriptionModel);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file: any = e.target.files;
    const form = new FormData();
    form.append("file", file[0]);
    // const response = await fileUpload(form);
    const response = await apiCall(
      Methods.POST,
      EndPoint.ADMIN_FILE_UPLOAD,
      form,
      FormDataHeader
    );
    if (response.success) {
      const Url = response?.data;
      if (Url) {
        setProfileImage(Url);
        setAddressDetails((prev) => ({
          ...prev,
          prescriptionImageUrl: Url,
        }));
      }
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!addressDetails.prescriptionImageUrl) {
        toast.warning("Please upload a prescription before proceeding.");
        return;
      }
      const response = await apiCall(
        Methods.POST,
        EndPoint.ADDPRESCRIPTION,
        addressDetails,
        JsonHeader
      );
      if (response.success) {
        toast.success("📄 Prescription Uploaded Successfully!");
        setPrescriptionModel(!prescriptionModel);
        setAddressDetails({
          fullName: "",
          phone: "",
          user: "",
          note: "",
          address: "",
          prescriptionImageUrl: "",
        });
        setProfileImage("");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const init = async () => {
    const userId = await getUserID();

    if (userId) {
      setAddressDetails((prev) => ({
        ...prev,
        user: userId,
      }));
    }
  };

  const handleCall = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      if (userId && userAuthentication) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.GET_BOOK_PACKAGE}/${userId}`
        );
        if (response.success) {
          toast.success("Download App");
        } else {
          toast.warn("You didn't buy any package");
          router.replace("/healthPackage");
        }
      } else {
        toast.warning("Login First");
        setSignInPage(!signInPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <div className="min-h-[30vh]">loading...</div>
  ) : (
    <div className="mt-1 2xl:mt-9 xl:mt-5 lg:mt-3">
      <div className="grid grid-cols-2 gap-3 lg:px-3 2xl:px-0 xl:gap-5 2xl:gap-7 lg:grid-cols-4">
        <div
          className={`${box} cursor-pointer`}
          onClick={handleUploadPrescription}
        >
          <Image
            src={"/MediServices/Prescription.svg"}
            alt="This is an Prescription Image"
            width={54}
            height={54}
            className=""
          />
          <span className="text-base text-center font-semibold 2xl:mt-1 2xl:text-2xl xl:text-xl lg:text-lg text-[#16020B] ">
            {t("uploadPrescription")}
          </span>
        </div>

        <a
          className={`${box}`}
          href="https://wa.me/8801711633519"
          target="_blank"
        >
          <Image
            src={"/MediServices/whatsapp.svg"}
            alt="This is an Prescription Image"
            width={54}
            height={54}
            className="p-1 bg-[#feeaee] rounded-full"
          />
          <span className="text-base text-center font-semibold 2xl:mt-1 2xl:text-2xl xl:text-xl lg:text-lg text-[#16020B] ">
            {t("orderViaWhatsapp")}
          </span>
        </a>
        {/* <div className={`${box}`}> */}
        <Link className={`${box}`} href={"/mediMart/offer"}>
          <Image
            src={"/MediServices/Offer.svg"}
            alt="This is an Prescription Image"
            width={54}
            height={54}
            className=""
          />
          <span className="text-base font-semibold 2xl:mt-1 2xl:text-2xl xl:text-xl lg:text-lg text-[#16020B]">
            {t("offers")}
          </span>
        </Link>
        <div className={`${box} cursor-pointer`} onClick={handleCall}>
          <Image
            src={"/MediServices/Doctor.svg"}
            alt="This is an Prescription Image"
            width={54}
            height={54}
            className=""
          />
          <span className="text-base font-semibold 2xl:mt-1 2xl:text-2xl xl:text-xl lg:text-lg text-[#16020B]">
            {t("callDoctor")}
          </span>
        </div>
      </div>
      <Modal
        size={"lg"}
        open={prescriptionModel}
        onClose={handleUploadPrescription}
      >
        <Modal.Header>
          <Modal.Title>
            <p className="text-xl font-semibold">
              {t("order_via_prescription")}
            </p>
          </Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center ">
            <div className="relative grid p-4 rounded-lg place-content-center px-3 lg:px-0">
              {ProfileImage.endsWith("pdf") ? (
                <iframe
                  width={250}
                  height={200}
                  src={
                    ProfileImage ? `${ProfileImage}` : "other/prescription.svg"
                  }
                  className="object-fill w-50 2xl:w-56 h-60"
                />
              ) : (
                <Image
                  width={250}
                  height={200}
                  alt="Profile Image"
                  src={
                    ProfileImage ? `${ProfileImage}` : "other/prescription.svg"
                  }
                  className="object-fill w-60 2xl:w-56 h-60"
                />
              )}

              <label
                id="profileImage"
                className="absolute bottom-0 right-0 w-12 h-12 text-lg text-white bg-gray-200 rounded-full"
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  id="profileImage"
                />
                <img
                  src="other/camera.svg"
                  alt="Camera Icon"
                  className="p-2 rounded-full"
                />
              </label>
            </div>
          </div>
          <form className="mt-5  pr-4 lg:pr-0 " onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2 md:space-y-0 sm:flex-row md:space-x-4">
              <div className="md:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  {t("fullName")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  // placeholder=""
                  placeholder={t("enterFullName")}
                  className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C]  sm:text-sm"
                  value={addressDetails.fullName}
                  onChange={handleChange}
                  required
                  name="fullName"
                />
              </div>
              <div className="md:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  {t("phoneNumber")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("phonePlaceholder")}
                  className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                  onChange={handleChange}
                  required
                  value={addressDetails.phone}
                  name="phone"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                {t("address")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={t("addressPlaceholder")}
                className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                onChange={handleChange}
                value={addressDetails.address}
                name="address"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                {t("note")}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder={t("notePlaceholder")}
                className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                onChange={handleChange}
                value={addressDetails.note}
                name="note"
              />
            </div>{" "}
            <div className="flex justify-end ">
              <button
                type="submit"
                className="px-5 py-2.5  text-xs font-medium  text-white bg-[#EB148C] rounded mt-2"
              >
                {t("submit")}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal open={signInPage} onClose={handleSignIn} size="sm">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignIn />  
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MadiServices;
