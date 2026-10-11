"use client";
import React, { useEffect, useState } from "react";
import { labCart } from "./Interface";
import LabCart from "./LabCart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import { Modal, Pagination } from "rsuite";
import { useTranslation } from "react-i18next";
import { IoLocationOutline, IoLocationSharp } from "react-icons/io5";
import { useAppDispatch } from "@/redux/Hooks";
import { chagedProdived } from "@/redux/Slices/LabSlice";
import { toast } from "react-toastify";
const districts = [
  "Khulna",
  "Barishal",
  "Pirojpur",
  "Faridpur",
  "Kushtia ",
  "Chattogram",
  "Bagura ",
  "Rangpur",
  "Mymensingh",
  "Kisorganj",
];
const AllLabTest = () => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [allLabtest, setAllLabtest] = useState<labCart[]>();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(1);
  const [num, setNum] = useState(1);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [Location, setLocation] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Dhaka");
  const [selectDistrict, setSelectDistrict] = useState<string>("Dhaka");
  const dispatch = useAppDispatch();
  const [provider, setProvider] = useState<string>("Thyrocare");

  const handleOpen = () => setOpen(true);
  const handleClose = async () => setOpen(false);

  // handle Location Search
  const handleLocationSearch = async () => {
    try {
      // console.log(Location);
      setOpen(false);
      localStorage.setItem("location", Location);
      if (selectDistrict !== "Dhaka") {
        localStorage.setItem("District", selectDistrict);
      }
      setSelectedDistrict(selectDistrict);
      let url = "";
      const location =
        Location || localStorage.getItem("location") || "insidedhaka";
      // console.log(location);
      if (location === "insidedhaka") {
        url = `${EndPoint.LAB_TEST_FIND_ALL}/${1}`;
        // setSelectedDistrict("insidedhaka");
        localStorage.setItem("District", "Dhaka");
        setSelectedDistrict("Dhaka");
        setSelectDistrict("Dhaka");
        setProvider("Thyrocare");
      } else {
        url = `${EndPoint.LAB_TEST_FIND_ALL}/${1}?provider=Probe`;
        setProvider("Probe");
      }
      const response = await apiCall(Methods.GET, url);
      if (response.success) {
        setAllLabtest(response.data.testData);
        setTotal(response.data.testCount);
      } else {
        toast.warn("Something Went Wrong");
      }
      setNum(1);
      router.replace(`?page=1#lab`);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(chagedProdived(Location));
    }
  };

  // initial function
  const labname = searchParams.get("name");

  const init = async () => {
    try {
      setLoading(true);
      let url = "";
      console.log(labname);

      const pageNumber = Number(searchParams.get("page")) || 1;
      // ✅ Sync location with localStorage
      const location =
        Location || localStorage.getItem("location") || "insidedhaka";
      // console.log(location);
      // ✅ Sync district with localStorage
      if (location === "insidedhaka") {
        url = labname
          ? `${EndPoint.LAB_TEST_FIND_ALL}/${pageNumber}?name=${labname}&provider=Thyrocare`
          : `${EndPoint.LAB_TEST_FIND_ALL}/${pageNumber}?provider=Thyrocare`;
        setProvider("Thyrocare");
      } else {
        url = labname
          ? `${EndPoint.LAB_TEST_FIND_ALL}/${pageNumber}?name=${labname}&provider=Probe`
          : `${EndPoint.LAB_TEST_FIND_ALL}/${pageNumber}?provider=Probe`;
        setProvider("Probe");
      }
      const response = await apiCall(Methods.GET, url);
      if (response.success) {
        if (labname) {
          setAllLabtest(response.data.testData);
          setTotal(response.data.testCount);
        } else {
          setAllLabtest(response.data.testData);
          setTotal(response.data.testCount);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePage = async (num: any) => {
    try {
      setLoading(true);
      setNum(num);
      let url = "";
      const location =
        Location || localStorage.getItem("location") || "insidedhaka";
      if (location === "insidedhaka") {
        url = `${EndPoint.LAB_TEST_FIND_ALL}/${num}`;
      } else {
        url = `${EndPoint.LAB_TEST_FIND_ALL}/${num}?provider=Probe`;
      }
      const response = await apiCall(Methods.GET, url);
      if (response.success) {
        setAllLabtest(response.data.testData);
        setTotal(response.data.testCount);
      }
      router.replace(`?page=${num}#lab`); // Use router.push instead of router.replace
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setLocation(name);
    if (name === "insidedhaka") {
      setLocation("insidedhaka");
      setSelectDistrict("Dhaka");
      // setProvider("Thyrocare");
      // localStorage.setItem("location", "insidedhaka");
    } else {
      setLocation("outsidedhaka");
      setSelectDistrict("Khulna");
      // setProvider("Probe");
      // localStorage.setItem("location", "outsidedhaka");
    }
  };

  useEffect(() => {
    init();
    const savedLocation = localStorage.getItem("location");
    const savedDistrict = localStorage.getItem("District");

    if (savedLocation) {
      setLocation(savedLocation);
    } else {
      setLocation("insidedhaka");
    }

    if (savedDistrict) {
      setSelectedDistrict(savedDistrict);
      setSelectDistrict(savedDistrict);
    } else {
      setOpen(true);
    }
  }, [labname]);



  return loading ? (
    <PageLoading />
  ) : (
    <>
      {/* <span id="lab"></span> */}
      <section className="xl:container xl:mx-auto 2xl:pt-10 lg:pt-5  pt-3">
        <div className="grid grid-cols-5">
          <h1 className="text-xl col-span-3 text-end text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
            {t("LabTestHeader")}
          </h1>
          <div className="col-span-2 flex items-center justify-end">
            <div
              className="bg-[#E2136E] min-w-24 cursor-pointer flex items-center justify-around text-white px-3 py-2 rounded-md"
              onClick={handleOpen}
            >
              <p>
                {/* <SlLocationPin size={16} className="" /> */}
                <IoLocationSharp size={18} className="text-white" />
              </p>
              <p>{selectedDistrict}</p>
            </div>
          </div>
        </div>

        <aside className=" min-h-[40vh]">
          <div className="grid grid-cols-2 gap-2  mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 lg:gap-4 xl:gap-6 2xl:gap-7 lg:mt-4 lg:mx-3 xl:mx-6 2xl:mx-0">
            {allLabtest &&
              allLabtest.map((item, index) => (
                <React.Fragment key={index}>
                  <LabCart item={item} />
                </React.Fragment>
              ))}
          </div>
        </aside>
     
        <aside className="flex items-center justify-center w-full mx-auto mt-5 ">
          <div className="flex items-center justify-center p-3 lg:w-[60%] rounded-lg py-3 mx-auto shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">
            <div className="block lg:hidden">
              <Pagination
                prev
                next
                size="lg"
                total={total}
                activePage={num}
                onSelect={handlePage}
                maxButtons={5}
              />
            </div>
            <div className="hidden lg:block">
              <Pagination
                prev
                next
                size="lg"
                total={total}
                activePage={num}
                onSelect={handlePage}
                maxButtons={10}
              />
            </div>
          </div>
        </aside>
        <span className="pt-2 text-xs">
          {" "}
          *Powered By: {provider} Bangladesh Ltd
        </span>
      </section>
      
      <Modal
        open={open}
        onClose={handleClose}
        size={"md"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="flex flex-col space-y-3 items-center min-h-[250px] min-w-[400px] relative">
            <span className="absolute size-36 rounded-[240px] blur-[147.25px] "></span>
            <div className=" mt-2">
              <IoLocationOutline
                className="ring-8 p-1 rounded-full opacity-70 text-black bg-[#EB148C] ring-pink-400"
                size={39}
              />
            </div>
            <p className="text-2xl font-medium">Choose Your District</p>
            <div className="flex items-center justify-center space-x-3">
              {/* Inside Dhaka */}
              <div className="flex space-x-2 items-center justify-center p-2 border rounded-md">
                <input
                  type="radio"
                  name="location" // important: same name for grouping
                  id="inside-dhaka"
                  value="insidedhaka"
                  checked={Location === "insidedhaka"}
                  onChange={handleChanged}
                  className="accent-pink-500 cursor-pointer"
                />
                <label htmlFor="inside-dhaka" className="cursor-pointer">
                  Inside Dhaka
                </label>
              </div>

              {/* Outside Dhaka */}
              <div className="flex space-x-2 items-center justify-center p-2 border rounded-md">
                <input
                  type="radio"
                  name="location"
                  id="outside-dhaka"
                  value="outsidedhaka"
                  checked={Location === "outsidedhaka"}
                  onChange={handleChanged}
                  className="accent-pink-500 cursor-pointer"
                />
                <label htmlFor="outside-dhaka" className="cursor-pointer">
                  Outside Dhaka
                </label>
              </div>
            </div>

            {Location === "outsidedhaka" && (
              <div className="w-[80%] lg:mx-auto">
                <select
                  className="outline-none p-2 border rounded-md w-full"
                  value={selectDistrict} // controlled
                  onChange={(e) => setSelectDistrict(e.target.value)}
                >
                  {/* default option */}
                  {districts.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleLocationSearch}
            className="bg-[#E2136E] text-white px-4 py-1.5 rounded-[5px] text-sm font-medium"
          >
            Search
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllLabTest;
