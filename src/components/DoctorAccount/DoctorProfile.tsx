"use client";
import { doctorIsAuthenticate, getDoctorId } from "@/lib/authHandler";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { initialState } from "./interface";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { toast } from "react-toastify";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, FormDataHeader, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import { Toggle } from "rsuite";
interface catagory {
  value: string;
  label: string;
}
interface Showcatagory {
  _id: string;
  name: string;
}
const DoctorProfile = () => {
  const [doctorinfo, setDoctorInfo] = useState<initialState>({
    firstName: "",
    lastName: "",
    category: [],
    hospital: "",
    degree: "",
    yearsOfExperience: "",
    bmdc: "",
    visitFee: "",
    phone: "",
    email: "",
    workDetails: [
      {
        organization: "",
        designation: "",
        startMonth: "",
        startYear: 0,
        endMonth: "",
        endYear: 0,
        isCurrentlyWorking: false,
      },
    ],
    personalDetails: "",
    bmdcRegistered: true,
    role: "",
  });
  const [doctorcategory, setDoctorcategory] = useState<catagory[]>([]);
  const [showCategory, setshowCategory] = useState<Showcatagory[]>([]);
  const [Uid, setUid] = useState<string>("");
  const [ProfileImage, setProfileImage] = useState<String | null>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [buttonloading, setButtonloading] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>();

  const init = async () => {
    try {
      setLoading(true);
      const doctorId: any = await getDoctorId();
      const doctorAuthentication = await doctorIsAuthenticate();
      setUid(doctorId);
      if (doctorId && doctorAuthentication) {
        // const { data }: any = await getsingleDoctors(doctorId);
        const { data }: any = await apiCall(
          Methods.GET,
          `${EndPoint.DOCTOR_FIND_BY_ID}/${doctorId}`
        );
        // console.log(data);

        setIsChecked(data.isAvailable);
        setDoctorInfo(data);
        const transformedCategory = (data.category || []).map(
          (cat: any) => cat._id
        );
        setDoctorInfo({ ...data, category: transformedCategory });
        setshowCategory(data.category);
        setProfileImage(data?.image ?? "");
      }
      await apiCall(
        Methods.GET,
        EndPoint.CATEGORY_OF_DOCTOR_FIND_ALL_NAME
      ).then((response) => {
        setDoctorcategory(response.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDoctorInfo({ ...doctorinfo, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setDoctorInfo((prev) => ({
        ...prev,
        image: file,
      }));
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setButtonloading(true);
      const { dateSlot, ...rest } = doctorinfo;
      const response = await apiCall(
        Methods.PATCH,
        `${EndPoint.DOCTOR_UPDATE_BY_ID}/${Uid}`,
        rest,
        FormDataHeader
      );

      // console.log(response);

      if (response.success) {
        toast.success("successfully updated");
        router.refresh();
      } else {
        toast.error(response.message);
      }
      // console.log(rest);

      // console.log(doctorinfo);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonloading(false);
    }
  };

  const handleCategoryChange = (selectedOptions: any) => {
    const transformedCategory = (selectedOptions || []).map(
      (cat: any) => cat.value
    );
    setDoctorInfo((prevState: any) => ({
      ...prevState,
      category: Array.from(
        new Set([...prevState.category, ...transformedCategory])
      ),
    }));

    // For show
    const Showcatagorys = (selectedOptions || []).map((cat: any) => ({
      _id: cat.value,
      name: cat.label,
    }));
    setshowCategory((prev) => {
      const newCategories = Showcatagorys.filter(
        (newCat: any) => !prev.some((prevCat) => prevCat._id === newCat._id)
      );
      return [...prev, ...newCategories];
    });
  };

  const handleSingleRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Showcatagory
  ) => {
    e.preventDefault();
    setDoctorInfo((prevState: any) => ({
      ...prevState,
      category: prevState.category.filter((catId: any) => catId !== item._id),
    }));
    setshowCategory((prevState) =>
      prevState.filter((cat) => cat._id !== item._id)
    );
  };

  const handleWorkDetails = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    const updatedWorkDetails = [...(doctorinfo.workDetails || [])];
    updatedWorkDetails[index] = {
      ...updatedWorkDetails[index],
      [name]: value,
    };
    setDoctorInfo((prev) => ({
      ...prev,
      workDetails: updatedWorkDetails,
    }));
  };

  const handleRemoveWorkDetail = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    // Filter out the work detail at the given index
    const updatedWorkDetails = doctorinfo?.workDetails?.filter(
      (_, i) => i !== index
    );

    setDoctorInfo((prev) => ({
      ...prev,
      workDetails: updatedWorkDetails,
    }));
  };

  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <section className="xl:container xl:mx-auto min-h-[85vh]   shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">
      <form action="" onSubmit={handleSubmit} className="  px-5 py-2 ">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-3 2xl:gap-5">
          <aside className="flex-1 w-full bg-white rounded-lg lg:order-2 mt-3 md:mt-0">
            <div className=" justify-between items-center  hidden md:flex">
              <h2 className="mb-6 text-2xl font-semibold">My Profile</h2>
            </div>
            <div className="flex w-full space-x-2">
              {/* first Name  */}
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="firstName"
                >
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  onChange={handleChange}
                  value={doctorinfo.firstName}
                  name="firstName"
                  placeholder="Enter First Name"
                />
              </div>
              {/* last Name  */}
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="lastName"
                >
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  onChange={handleChange}
                  value={doctorinfo.lastName}
                  name="lastName"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
            {/* Speciality */}
            <div className="w-full mb-4">
              <label
                className="block mb-2 text-sm font-normal text-gray-700"
                htmlFor="Speciality"
              >
                Speciality
              </label>
              <Select
                name="select"
                options={doctorcategory}
                isMulti
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                onChange={handleCategoryChange}
              />
              <div className="grid gap-3 p-1 grid-cols-2  2xl:grid-cols-3">
                {showCategory?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-gray-100 p-1.5 rounded-md flex justify-between"
                    >
                      <p>{item?.name}</p>
                      <button
                        type="button"
                        onClick={(e) => handleSingleRemove(e, item)}
                      >
                        ✖
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* hospital  */}
            <div className="w-full mb-4">
              <label
                className="block mb-2 text-sm font-normal text-gray-700"
                htmlFor="hospital"
              >
                Hospital
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                id="hospital"
                type="text"
                onChange={handleChange}
                value={doctorinfo.hospital || ""}
                name="hospital"
                placeholder="Enter Hospital Name"
              />
            </div>

            <div className="flex w-full space-x-2">
              {/* Degree  */}
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="firstName"
                >
                  Degree
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  onChange={handleChange}
                  value={doctorinfo.degree}
                  name="degree"
                  placeholder="Enter Your degree"
                />
              </div>
              {/* Years of Experience  */}
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="yearsOfExperience"
                >
                  Year of Experience
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="yearsOfExperience"
                  type="text"
                  onChange={handleChange}
                  value={doctorinfo.yearsOfExperience}
                  name="yearsOfExperience"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
            <div className="flex w-full space-x-2">
              {/* BMDC Number  */}
              {doctorinfo.bmdcRegistered && (
                <div
                  className={`w-full mb-4
                } `}
                >
                  <label
                    className="block mb-2 text-sm font-normal text-gray-700"
                    htmlFor="bmdc"
                  >
                    BMDC Number
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="bmdc"
                    type="text"
                    onChange={handleChange}
                    value={doctorinfo.bmdc}
                    name="bmdc"
                    placeholder="Enter Your bmdc Number"
                    disabled
                  />
                </div>
              )}

              {/* visite Fee  */}
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="visitFee"
                >
                  Visit Fee
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="visitFee"
                  type="text"
                  onChange={handleChange}
                  value={doctorinfo.visitFee}
                  name="visitFee"
                  placeholder="Enter Your visitFee"
                />
              </div>
            </div>
            <div className="flex w-full space-x-2">
              {/* Mobile Number  */}
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="phone"
                >
                  Mobile Number
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  onChange={handleChange}
                  value={doctorinfo.phone}
                  name="phone"
                  placeholder="Enter Your Mobile Number"
                  disabled
                />
              </div>
              {/* Email  */}
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  onChange={handleChange}
                  value={doctorinfo.email}
                  name="email"
                  placeholder="Enter Your email"
                />
              </div>
            </div>
            {/* personalDetails */}
            <div className="flex w-full space-x-2">
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="personalDetails"
                >
                  Professional Summary
                </label>
                <textarea
                  rows={6}
                  className="w-full px-3 text-xs md:text-base py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="personalDetails"
                  onChange={handleChange}
                  value={doctorinfo.personalDetails}
                  name="personalDetails"
                  placeholder="Provide a brief summary of your professional background, qualifications, and expertise."
                />
              </div>
            </div>
          </aside>
          <aside className="flex-1 w-full bg-white rounded-lg lg:order-2">
            <div className="md:hidden flex justify-between items-center">
              <h2 className=" text-2xl font-semibold ">My Profile</h2>
            </div>
            <div className=" relative border border-[#8F90A6] p-4 lg:p-6 2xl:p-10 grid place-content-center rounded-lg mt-3 lg:mt-[75px]">
              <Image
                src={ProfileImage ? `${ProfileImage}` : "other/userprofile.svg"}
                alt={`${doctorinfo?.firstName}`}
                width={250}
                height={250}
                className="object-cover rounded-full w-60 2xl:w-56 h-60 "
              />
              <label
                htmlFor="docimage"
                className="absolute bottom-10 right-20 2xl:bottom-12 2xl:right-24 lg:bottom-10 lg:right-16"
              >
                <img
                  src="other/camera.svg"
                  alt="Camera Icon"
                  className="w-10 h-10 p-2 bg-gray-300 rounded-full cursor-pointer"
                />
                <input
                  type="file"
                  id="docimage"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </aside>
        </div>
        <p className="text-sm md:text-xl font-semibold text-gray-700">
          Work Details
        </p>

        <div className="grid w-full  grid-cols-7 border-y col-span-2">
          <p className="flex items-center justify-center text-[8px] md:text-sm font-medium ">
            Organization
          </p>
          <p className="flex items-center justify-center text-[8px] md:text-sm font-medium ">
            Designation{" "}
          </p>
          <p className="flex items-center justify-center text-[8px] md:text-sm font-medium ">
            StartMonth{" "}
          </p>
          <p className="flex items-center justify-center text-[8px] md:text-sm font-medium ">
            StartYear{" "}
          </p>
          <p className="flex items-center justify-center text-[8px] md:text-sm font-medium ">
            EndMonth{" "}
          </p>
          <p className="flex items-center justify-center text-[8px] md:text-sm font-medium ">
            EndYear{" "}
          </p>
          <button
            type="button"
            onClick={() => {
              setDoctorInfo((prev) => ({
                ...prev,
                workDetails: [
                  ...(prev.workDetails || []),
                  {
                    organization: "",
                    designation: "",
                    startMonth: "",
                    startYear: 0,
                    endMonth: "",
                    endYear: 0,
                    isCurrentlyWorking: false,
                  },
                ],
              }));
            }}
            className=" text-center text-[9px] lg:text-xs md:py-1 font-medium border bg-[#EB148C] border-[#EB148C] text-white rounded md:my-1"
          >
            {" "}
            Add/Edit <br /> WorkSpace
          </button>
        </div>

        {doctorinfo?.workDetails?.map((item, index) => (
          <div className="grid p-1 border-b grid-cols-7 col-span-2" key={index}>
            <input
              type="text"
              placeholder="Add Organization"
              value={item.organization}
              name="organization"
              className="p-1 outline-none text-xs text-center"
              onChange={(e) => handleWorkDetails(e, index)}
            />
            <input
              type="text"
              placeholder="Add Designation"
              value={item.designation}
              name="designation"
              className="p-1 outline-none text-xs text-center"
              onChange={(e) => handleWorkDetails(e, index)}
            />
            <input
              type="text"
              placeholder="Add Start Month"
              value={item.startMonth}
              name="startMonth"
              className="p-1 outline-none text-xs text-center"
              onChange={(e) => handleWorkDetails(e, index)}
            />
            <input
              type="number"
              placeholder="Add Start Year"
              value={item.startYear}
              name="startYear"
              className="p-1 outline-none text-xs text-center no-spin"
              onChange={(e) => handleWorkDetails(e, index)}
            />
            <input
              type="text"
              placeholder="Add End Month"
              value={item.endMonth}
              name="endMonth"
              className="p-1 outline-none text-xs text-center "
              onChange={(e) => handleWorkDetails(e, index)}
            />
            <input
              type="number"
              placeholder="Add End Year"
              value={item.endYear}
              name="endYear"
              className="p-1 outline-none text-xs text-center no-spin"
              onChange={(e) => handleWorkDetails(e, index)}
            />
            <button
              onClick={(e) => handleRemoveWorkDetail(e, index)}
              className=" text-center text-xs md:text-base font-medium border bg-[#EB148C] border-[#EB148C] text-white rounded md:my-1 md:mx-8 2xl:mx-14"
            >
              ✖
            </button>
          </div>
        ))}

        <div className="flex justify-end gap-3 my-5 ">
          <button
            type="submit"
            disabled={buttonloading}
            className="px-3 py-2 bg-[#EB148C] text-xs font-semibold text-white rounded-md"
          >
            {buttonloading ? "Loading.." : "Update Profile"}
          </button>
          {/* <button className="px-3 py-2 bg-[#EB148C] text-xs font-semibold text-white rounded-md">
            Changed Password
          </button> */}
        </div>
      </form>
    </section>
  );
};

export default DoctorProfile;
