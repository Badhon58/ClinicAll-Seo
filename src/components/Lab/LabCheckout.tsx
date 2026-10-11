"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import { DatePicker, Modal } from "rsuite";
import labOrder from "@/lib/LabOrder";
import Empty from "@/components/common/Empty";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import Image from "next/image";
import { addressDetails } from "../MediMart/Interface";
import { CiHome } from "react-icons/ci";
import { useTranslation } from "react-i18next";
// import AuthLib from "../common/AuthLib";
import SignIn from "../Auth/SignIn";

const LabCheckout = () => {
  const [userId, setuserId] = useState<string>("");
  const [addressDetails, setAddressDetails] = useState<addressDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    thana: "",
    postalCode: "",
    isDefault: true,
    isHome: true,
    user: userId,
  });
  const { t } = useTranslation();
  const [allAddress, setAllAddress] = useState<addressDetails[]>();
  const [selectAddress, setSelectAddress] = useState<addressDetails>();
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<string>("cod");
  const [onlinePayment, setOnlinePayment] = useState<string>("bkash");
  const [onlineDiv, setOnlineDiv] = useState(false);
  // const labItems: any = useAppSelector(
  //   (state: any) => state.LabSlicer.labitems
  // );
  // const labtotalCost = useAppSelector(
  //   (state) => state.LabSlicer.labTotalAmount
  // );
  // ----------------------------------
  const insideDhaka = useAppSelector((state) => state.LabSlicer.insideDhaka);
  const outSideDhaka = useAppSelector((state) => state.LabSlicer.outsideDhaka);
  const provider = useAppSelector((state) => state.LabSlicer.provider);
  const labProduct = provider === "insidedhaka" ? insideDhaka : outSideDhaka;
  const deliveryCharged = provider === "insidedhaka" ? 500 : 250;
  const total = useMemo(
    () =>
      labProduct.reduce((acc, item) => {
        return item.checked ? acc + (item.itemCost || 0) : acc;
      }, 0),
    [labProduct]
  );
  const location =
    typeof window !== "undefined"
      ? localStorage.getItem("District") || "Dhaka"
      : "Dhaka";
  // ---------------------------------
  const [loading, setloading] = useState(false);
  const [buttonloading, setButtonloading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [ishaveaddress, setIshaveaddress] = useState(false);
  const [addressId, setAddressId] = useState<string>();
  const [haveaddressid, setHaveaddressid] = useState<boolean>(false);
  const [formModal, setFormModal] = useState(false);
  const [signInPage, setSignInPage] = useState(false);
  const [sampleCollectionTime, setSampleCollectionTime] =
    useState<Date | null>();
  const [sampleCollectionDate, setSampleCollectionDate] =
    useState<Date | null>();

  // Address handle Changed
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value;
    if (values === "online") {
      setOnlineDiv(true);
    } else {
      // setOnlinePayment("bank");
      setOnlineDiv(false);
    }
    setDeliveryOption(e.target.value);
  };

  // handle Submit
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const userAuthentication = await isAuthenticate();
      if (!userAuthentication) {
        setSignInPage(true);
        return;
      }

      setButtonloading(true);
      // console.log(sampleCollectionTime);

      // return;
      const response = await labOrder(
        addressDetails,
        labProduct,
        deliveryOption,
        onlinePayment,
        total,
        userId,
        sampleCollectionDate,
        sampleCollectionTime,
        dispatch,
        router,
        addressId,
        haveaddressid,
        deliveryCharged,
        location
      );
      // return;
      if (response.success == true) {
        const today = moment().format("dddd, MMMM D, YYYY");
        router.push(
          `/receipt?auth_time=${today}&req_reference_number=${
            response.data.invoiceNumber
          }&auth_amount=${response.data.totalCost}&firstName=${
            response.data.currentAddress.firstName
          }&lastName=${response.data.currentAddress.lastName}&address_line1=${
            response.data.currentAddress.address
          }&address_city=${
            response.data.currentAddress.thana
          }&country=${"Bangladesh"}&phone_no=${
            response.data.currentAddress.phone
          }&email=${response.data.currentAddress.email}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonloading(false);
    }
  };

  // initial Function
  const init = async () => {
    try {
      setloading(true);
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      if (userId && userAuthentication) {
        setuserId(userId);
        setAddressDetails((prev) => ({
          ...prev,
          user: userId,
        }));
        if (userId) {
          const addressresponse = await apiCall(
            Methods.GET,
            `${EndPoint.GETALLADDRESSBYUSERID}/${userId}`
          );

          if (addressresponse?.data?.length >= 1) {
            setIshaveaddress(true);
            setHaveaddressid(true);
            setAllAddress(addressresponse.data);
            setAddressDetails(addressresponse?.data[0]);
            setSelectAddress(addressresponse?.data[0]);
            setAddressId(addressresponse?.data[0]?._id);
            // console.log(addressresponse.data.length);
          }
          setAddressDetails((prev) => ({
            ...prev,
            user: userId,
          }));

          if (addressresponse.success === false) {
            await apiCall(
              Methods.GET,
              `${EndPoint.SINGLE_USER}/${userId}`
            ).then((response) => {
              const data = response?.data || {};
              setAddressDetails(data);
              setAddressDetails((prev) => ({
                ...prev,
                user: userId,
              }));
              // console.log(data);
            });

            console.log("Calling");
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  //handle Date Changed
  const handleDateChange = (value: Date | null) => {
    if (value) {
      // const formattedDate = moment(value).format("YYYY-MM-DD");
      setSampleCollectionDate(value);
    } else {
      setSampleCollectionDate(null);
    }
  };

  // handle Time Changed
  const handleTimeChange = (value: Date | null) => {
    if (value) {
      // const formattedTime = moment(value).format("hh:mm A");
      setSampleCollectionTime(value);
    } else {
      setSampleCollectionDate(null);
    }
  };

  const handleOnlinePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value;
    setOnlinePayment(values);
  };
  const handleFormModal: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormModal(!formModal);
  };

  const handleSelectAddress = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: addressDetails
  ) => {
    // console.log(item);
    setSelectAddress(item);
    setAddressDetails(item);
    setHaveaddressid(true);
    setAddressId(item._id);
  };

  const addNewAdress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormModal(!formModal);
    setSelectAddress(undefined);
    setHaveaddressid(false);
    setAddressId("");
  };
  useEffect(() => {
    setIsHydrated(true);
    init();
  }, []);

  const disablePreviousDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today
    return date < today; // Disable dates before today
  };
  const showModal: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignInPage(!signInPage);
  };

  if (loading) {
    return <PageLoading />;
  }
  if (!labProduct) {
    return <Empty link="/lab" />;
  }
  return (
    <section className="mt-2 xl:container xl:mx-auto lg:mt-4 xl:mt-6 2xl:mt-10 min-h-[70vh]">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:grid-rows-1 lg:gap-5 lg:px-7 px-2 ">
        <aside className=" lg:col-span-5 lg:row-span-5 ">
          <div className="bg-white sticky top-[11%] p-3 lg:p-8 rounded-lg shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] w-full">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xl font-medium">
                {" "}
                {t("customer_information")}
              </p>
              {allAddress && allAddress.length >= 0 && (
                <button
                  className="py-2 rounded-md bg-[#EB148C] text-center text-white text-xs font-medium px-3"
                  onClick={handleFormModal}
                >
                  {t("add_new_address")}
                </button>
              )}
            </div>
            <div className="grid gap-3 mb-2">
              {allAddress &&
                allAddress?.length >= 1 &&
                allAddress?.map((item, index) => (
                  <div
                    className="border rounded-lg grid grid-cols-12 bg-white  p-3 2xl:gap-3 gap-2"
                    id={`select-${index}`}
                    key={index}
                  >
                    <div className=" col-span-1" id={`select-${index}`}>
                      <div className="flex justify-center items-center">
                        <span className="p-1 bg-[#EB148C] rounded-full ">
                          <CiHome className="text-2xl text-white " />
                        </span>
                      </div>
                    </div>
                    <div className="col-span-10 " id={`select-${index}`}>
                      <div className="font-semibold text-lg">
                        Delivery to {item.firstName}
                      </div>
                      <div className="text-gray-600">+88 {item.phone}</div>
                      <div className="text-gray-500 capitalize line-clamp-3">
                        {item.address}, {item.thana}, {item.district}
                      </div>
                    </div>
                    <div className="col-span-1 items-center justify-center flex">
                      <input
                        type="radio"
                        onChange={(e) => handleSelectAddress(e, item)}
                        name="select"
                        id={`select-${index}`}
                        checked={selectAddress?._id === item._id}
                        className="cursor-pointer accent-pink-500"
                      />
                    </div>
                  </div>
                ))}
              <form className="space-y-4 mt-4">
                {/* First & Last Name  */}
                <div className="flex flex-col sm:flex-row md:space-x-4">
                  <div className="md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      {t("firstName")}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("enterFirstName")}
                      className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C]  sm:text-sm"
                      value={addressDetails.firstName}
                      onChange={handleChange}
                      required
                      name="firstName"
                      disabled={ishaveaddress}
                    />
                  </div>
                  <div className="md:w-1/2 mt-2 lg:mt-0">
                    <label className="block text-sm font-medium text-gray-700">
                      {t("lastName")}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("enterLastName")}
                      className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                      onChange={handleChange}
                      required
                      value={addressDetails.lastName}
                      name="lastName"
                      disabled={ishaveaddress}
                    />
                  </div>
                </div>
                {/* Email & Mobile  */}
                <div className="flex flex-col sm:flex-row md:space-x-4">
                  {/* Email  */}
                  <div className="md:w-1/2  mt-2 lg:mt-0">
                    <label className="block text-sm font-medium text-gray-700">
                      {t("email")}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                      onChange={handleChange}
                      required
                      value={addressDetails.email}
                      name="email"
                      disabled={ishaveaddress}
                    />
                  </div>
                  {/* Mobile  */}
                  <div className="md:w-1/2  mt-2 lg:mt-0">
                    <label className="block text-sm font-medium text-gray-700">
                      {t("phoneNumber")}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      // placeholder="Enter your Mobile Number
                      placeholder={t("phonePlaceholder")}
                      className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                      onChange={handleChange}
                      required
                      value={addressDetails.phone}
                      name="phone"
                      disabled={ishaveaddress}
                    />
                  </div>
                </div>
                {/* Address  */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("address")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder={t("addressPlaceholder")}
                    className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                    onChange={handleChange}
                    required
                    value={addressDetails.address}
                    name="address"
                    disabled={ishaveaddress}
                  />
                </div>
                {/* Distick and Thana  */}
                <div className="flex flex-col sm:flex-row md:space-x-4">
                  <div className="md:w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      {t("district")}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("district_placeholder")}
                      className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                      onChange={handleChange}
                      required
                      value={addressDetails.district}
                      name="district"
                      disabled={ishaveaddress}
                    />
                  </div>
                  {/* Thana  */}
                  <div className="md:w-1/2  mt-2 lg:mt-0">
                    <label className="block text-sm font-medium text-gray-700">
                      {t("thana")}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("thana_placeholder")}
                      className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                      onChange={handleChange}
                      required
                      value={addressDetails.thana}
                      name="thana"
                      disabled={ishaveaddress}
                    />
                  </div>
                </div>
                {/* postal Code  */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("postal_code")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder={t("postal_code_placeholder")}
                    className="mt-1 block w-full  no-spin outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                    onChange={handleChange}
                    required
                    value={addressDetails.postalCode}
                    name="postalCode"
                    disabled={ishaveaddress}
                  />
                </div>
              </form>
              <Modal open={formModal} onClose={handleFormModal} size={"lg"}>
                <Modal.Header>
                  <p className="text-xl font-semibold text-center">
                    Add Address
                  </p>
                </Modal.Header>
                <Modal.Body>
                  <form className="space-y-4 mt-4">
                    {/* First & Last Name  */}
                    <div className="flex flex-col sm:flex-row md:space-x-4">
                      <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                          {t("firstName")}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder={t("enterFirstName")}
                          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C]  sm:text-sm"
                          value={addressDetails.firstName}
                          onChange={handleChange}
                          required
                          name="firstName"
                        />
                      </div>
                      <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                          {t("lastName")}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder={t("enterLastName")}
                          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                          onChange={handleChange}
                          required
                          value={addressDetails.lastName}
                          name="lastName"
                        />
                      </div>
                    </div>
                    {/* Email & Mobile  */}
                    <div className="flex flex-col sm:flex-row md:space-x-4">
                      <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                          {t("email")}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder={t("emailPlaceholder")}
                          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                          onChange={handleChange}
                          required
                          value={addressDetails.email}
                          name="email"
                        />
                      </div>
                      <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                          {t("phoneNumber")}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          // placeholder="Enter your Mobile Number
                          placeholder={t("phonePlaceholder")}
                          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                          onChange={handleChange}
                          required
                          value={addressDetails.phone}
                          name="phone"
                        />
                      </div>
                    </div>
                    {/* Address  */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("address")}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={t("addressPlaceholder")}
                        className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                        onChange={handleChange}
                        required
                        value={addressDetails.address}
                        name="address"
                      />
                    </div>
                    {/* Distick and Thana  */}
                    <div className="flex flex-col sm:flex-row md:space-x-4">
                      <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                          {t("district")}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder={t("district_placeholder")}
                          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                          onChange={handleChange}
                          required
                          value={addressDetails.district}
                          name="district"
                        />
                      </div>
                      <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700">
                          {t("thana")}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder={t("thana_placeholder")}
                          className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                          onChange={handleChange}
                          required
                          value={addressDetails.thana}
                          name="thana"
                        />
                      </div>
                    </div>
                    {/* postal Code  */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("postal_code")}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder={t("phonePlaceholder")}
                        className="mt-1 block w-full  no-spin outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C] sm:text-sm"
                        onChange={handleChange}
                        required
                        value={addressDetails.postalCode}
                        name="postalCode"
                      />
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    onClick={handleFormModal}
                    className="py-2 rounded-md text-center  border text-[#EB148C] text-sm font-medium px-5 mr-4"
                  >
                    Close
                  </button>
                  <button
                    onClick={addNewAdress}
                    className="py-2 rounded-md bg-[#EB148C] text-center text-white text-sm font-medium px-5"
                  >
                    {t("submit")}
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </aside>

        <aside className="grid  2xl:col-span-3 lg:col-span-7 lg:grid-cols-6 2xl:grid-cols-none lg:gap-3 gap-2 ">
          {/* collectiontime */}
          <div className="p-6 block h-full col-span-6 w-full border rounded-lg shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] lg:col-span-3 2xl:col-span-6 ">
            <h2 className="mb-2 text-lg font-medium">
              {t("sample_collection")}
              <span className="text-red-500">*</span>
            </h2>
            <div className="flex gap-2 pt-2">
              <div>
                <label htmlFor="">
                  {t("collection_Date")}
                  {/* <span className="text-red-500">*</span> */}
                </label>
                <DatePicker
                  format="MM/dd/yyyy"
                  className="w-full"
                  placeholder="00-00-00"
                  onChange={handleDateChange}
                  shouldDisableDate={disablePreviousDates}
                  value={sampleCollectionDate}
                />
              </div>
              <div>
                <label htmlFor="">
                  {t("collection_time")}
                  {/* <span className="text-red-500">*</span> */}
                </label>
                <DatePicker
                  format="hh:mm aa"
                  showMeridiem
                  className="w-full"
                  placeholder="00:00"
                  onChange={handleTimeChange}
                  value={sampleCollectionTime}
                />
              </div>
            </div>
          </div>
          {/* Choose Payment Option  */}
          <div className="p-2 lg:p-6 h-full col-span-6 w-full border rounded-lg shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] lg:col-span-3 2xl:col-span-6 ">
            <h2 className="mb-4 text-lg font-medium">
              {t("choose_payment_option")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="homeDelivery"
                  name="deliveryOption"
                  value="cod"
                  className="cursor-pointer accent-pink-500"
                  checked={deliveryOption === "cod"}
                  onChange={handleDeliveryChange}
                />
                <label
                  htmlFor="homeDelivery"
                  className="ml-2 text-sm font-medium cursor-pointer"
                >
                  {t("cash_on_delivery")}
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="StorePickup"
                  name="deliveryOption"
                  value="online"
                  className="cursor-pointer accent-pink-500"
                  checked={deliveryOption === "online"}
                  onChange={handleDeliveryChange}
                />
                <label
                  htmlFor="StorePickup"
                  className="ml-2 text-sm font-medium cursor-pointer"
                >
                  {t("online_payment")}
                </label>
              </div>
            </div>
          </div>
          {/* Choose Online payment */}
          <div className="h-full w-full col-span-6 ">
            {onlineDiv && (
              <div className="p-6 w-full border rounded-lg shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] ">
                <h2 className="mb-4 text-lg font-medium">
                  {t("choose_online_payment")}
                </h2>

                <label
                  htmlFor="bkash"
                  className="border cursor-pointer rounded-lg p-2 mb-3 mt-2 flex items-center justify-between "
                >
                  <div className="flex items-center w-full">
                    <input
                      type="radio"
                      id="bkash"
                      name="onlinepayment"
                      value="bkash"
                      className="accent-pink-500 cursor-pointer"
                      checked={onlinePayment === "bkash"}
                      onChange={handleOnlinePayment}
                    />
                    <span className="ml-2 text-sm font-medium text-[#16020B] cursor-pointer  w-full">
                      {t("bkash_payment")}
                    </span>
                  </div>
                  <Image
                    src="/services/Bkash.svg"
                    alt="bKash logo"
                    className="h-8 w-14"
                    width={56}
                    height={32}
                  />
                </label>
                <label
                  htmlFor="card"
                  className="border rounded-lg p-2 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center w-[80%] ">
                    <input
                      type="radio"
                      id="card"
                      name="onlinepayment"
                      value="card"
                      className="accent-pink-500 cursor-pointer"
                      checked={onlinePayment === "card"}
                      onChange={handleOnlinePayment}
                    />
                    <span className="ml-2 text-sm font-medium text-[#16020B] cursor-pointer  w-full">
                      {t("card_payment")}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Image
                      src="/services/Card.svg"
                      alt="MasterCard logo"
                      className="h-8 w-24"
                      width={70}
                      height={42}
                    />
                  </div>
                </label>
              </div>
            )}
          </div>
        </aside>

        <aside className=" 2xl:col-span-4 lg:col-span-7 lg:row-span-1  ">
          <div className="p-6 border rounded-lg shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">
            <p className="mb-2 text-lg font-medium"> {t("product_summary")}</p>

            {isHydrated &&
              labProduct &&
              labProduct
                .filter((item) => item.checked)
                .map((item: any, index: any) => (
                  <p
                    className={`flex justify-between p-2 rounded ${
                      index % 2 == 0 ? "bg-gray-100" : ""
                    }`}
                    key={index}
                  >
                    <span className="line-clamp-1 w-[80%]">{item.name}</span>
                    <span className="w-[20%] text-center ">
                      {t("moneyCount", { count: item.mrp.toString() })}
                    </span>
                  </p>
                ))}

            <hr className="my-2 border" />
            <p className="flex justify-between p-1 text-base font-medium leading-6">
              {/* <span> পণ্যের খরচ</span> */}
              <span> {t("product_price")}</span>
              <span className="w-[20%] text-center">
                {t("moneyCount", { count: total ?? "0" })}
              </span>
            </p>
            <p className="flex justify-between p-1 text-base font-medium leading-6">
              <span>
                {t("home_sample_collection_fee")} {"("}
                {location} {")"}
              </span>

              <span className="w-[20%] text-center">
                {t("moneyCount", { count: deliveryCharged })}
              </span>
            </p>
            <hr className="my-2 border" />
            <div className="flex justify-between text-lg font-medium">
              <span>{t("total_price")}</span>
              <span className="w-[30%] text-right">
                {t("moneyCount", { count: total + deliveryCharged })}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={buttonloading}
              className="py-3 w-full mt-3 rounded-md bg-[#EB148C] text-center text-white text-base font-medium"
            >
              {buttonloading ? t("payment.loading") : t("Continue to Payment")}
            </button>
          </div>
        </aside>
      </div>
      <Modal size="sm" open={signInPage} onClose={showModal}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignIn />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default LabCheckout;
