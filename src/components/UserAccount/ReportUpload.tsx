"use client";
import React, { useEffect, useState } from "react";
import { reportUpload } from "./Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, FormDataHeader, JsonHeader, Methods } from "@/api/config";
import { toast } from "react-toastify";
import { getUserID } from "@/lib/authHandler";
import { Modal } from "rsuite";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import { IoMdEye } from "react-icons/io";
import "./Stepper.css";
import { useTranslation } from "react-i18next";
const ReportUpload = () => {
  const { t } = useTranslation();
  const [addreport, setAddreport] = useState(false);
  const [reportvalue, setReportvalue] = useState<reportUpload>({
    userId: "",
    title: "",
    desc: "",
    reportFile: [],
  });
  const [allReportValue, setAllReportValue] = useState<reportUpload[]>();
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [imageShow, setImageShow] = useState(false);

  const handleClose: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddreport(!addreport);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file: any = e.target.files;
    const form = new FormData();
    form.append("file", file[0]);
    const response = await apiCall(
      Methods.POST,
      EndPoint.ADMIN_FILE_UPLOAD,
      form,
      FormDataHeader
    );
    if (response.success) {
      const Url = response?.data;
      if (Url) {
        setReportvalue((prev) => ({
          ...prev,
          reportFile: [...prev.reportFile, Url],
        }));
      }
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setReportvalue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (indexToDelete: number) => {
    setReportvalue((prev) => ({
      ...prev,
      reportFile: prev.reportFile.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setBtnLoading(true);
      e.preventDefault();
      const response = await apiCall(
        Methods.POST,
        EndPoint.REPORTUPLOAD,
        reportvalue,
        JsonHeader
      );
      if (response.success) {
        toast.success(response.message);
        setAddreport(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
      init();
    }
  };

  const init = async () => {
    try {
      setLoading(true);
      const userid: any = await getUserID();
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.GETREPORTBYID}?userId=${userid}&page=1`
      );
      // console.log(response);
      setAllReportValue(response.data);
      setReportvalue((prev) => ({
        ...prev,
        userId: userid,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);

  const handleOpenReport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddreport(!addreport);
  };

  const handleShowLink = (
    e: React.MouseEvent<HTMLButtonElement>,
    fileLink: string
  ) => {
    // e.preventDefault();
    setFileUrl(fileLink);
    setImageShow(!imageShow);
  };

  const handleCloseLink: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImageShow(!imageShow);
  };

  return loading ? (
    "Loading..."
  ) : (
    <section className="min-h-full xl:container xl:mx-auto px-2 lg:pt-3 xl:pt-6  lg:px-2 xl:px-4 2xl:px-8 shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <div className="flex  items-center justify-between">
        <p className="2xl:text-2xl text-xl font-semibold">{t("Report")}</p>
        <button
          onClick={handleOpenReport}
          className="bg-[#EB148C] rounded-md text-white text-sm 2xl:text-base px-4 py-1.5"
        >
          {t("Upload Report")}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        {allReportValue?.map((item, index) => {
          return (
            <div
              key={index}
              className=" text-gray-700 p-3 bg-white shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.1)] bg-clip-border rounded-xl"
            >
              <div className="grid grid-cols-3 h-[200px] overflow-y-auto  text-gray-700  bg-clip-border rounded-xl">
                {item.reportFile.map((fileUrl, index) => (
                  <div key={index} className="px-2">
                    {fileUrl.endsWith(".pdf") ? (
                      <div className="relative group cursor-pointer">
                        <button
                          onClick={(e) => handleShowLink(e, fileUrl)}
                          className="eyebutton"
                        >
                          <IoMdEye size={20} className="text-white" />
                        </button>
                        <iframe
                          src={fileUrl}
                          className="w-20 h-20 border rounded-md object-cover "
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                          width={80}
                          height={80}
                          title={`PDF-${index}`}
                        />
                      </div>
                    ) : (
                      <div className="relative group cursor-pointer">
                        <button
                          onClick={(e) => handleShowLink(e, fileUrl)}
                          className="eyebutton"
                        >
                          <IoMdEye size={20} className="text-white" />
                        </button>
                        <Image
                          src={fileUrl}
                          alt={`Uploaded file ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-20 h-20 border rounded-md object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.title}
                  </p>
                </div>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Modal open={addreport} onClose={handleClose} size={"lg"}>
        <Modal.Header>
          <Modal.Title style={{ textAlign: "center", fontWeight: "600" }}>
            <p className="pt-2">{t("Upload Report")}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" min-h-[60vh] md:min-w-[600px]">
            <div className="grid grid-cols-2 md:grid-cols-3 max-h-[40vh] overflow-auto lg:grid-cols-4 xl:grid-cols-5 gap-3  min-h-[30vh]">
              {reportvalue.reportFile.map((item, index) => (
                <div key={index}>
                  <div className="relative">
                    <embed
                      src={item}
                      width={80}
                      height={30}
                      className="w-[170px] h-[135px] border rounded-md object-cover"
                    />
                    <button
                      onClick={() => handleDelete(index)}
                      className="absolute top-1 right-2 bg-gray-200 z-20 p-0.5 rounded-md"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))}
              <label className="custum-file-upload" form="file">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill=""
                    viewBox="0 0 20 20"
                  >
                    <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                    <g
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      id="SVGRepo_tracerCarrier"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill=""
                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="text">
                  <span className="text-xs">Click to upload image</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  id="reportUpload"
                  accept="image/*,application/pdf"
                />
              </label>
            </div>
            <div className="mt-4">
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  {t("upload.title")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  // placeholder=""
                  placeholder={t("upload.entrytitle")}
                  className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C]  sm:text-sm"
                  value={reportvalue.title}
                  onChange={handleChange}
                  required
                  name="title"
                />
              </div>
              <div className=" mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  {t("upload.description")}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  // placeholder=""
                  placeholder={t("upload.entrydescription")}
                  className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C]  sm:text-sm"
                  value={reportvalue.desc}
                  onChange={handleChange}
                  required
                  name="desc"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleSubmit}
            className="bg-[#EB148C] rounded-md text-white text-sm 2xl:text-base px-4 py-1.5"
          >
            {btnLoading ? "Loading..." : "Submit"}
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        open={imageShow}
        onClose={handleCloseLink}
        size={"lg"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          {fileUrl && (
            <embed
              src={fileUrl}
              width={400}
              height={500}
              className="min-w-[45rem] min-h-[45rem] border rounded-md "
            />
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default ReportUpload;
