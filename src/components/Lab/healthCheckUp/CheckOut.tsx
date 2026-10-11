"use client";
import { EndPoint, Methods } from "@/api/config";
import SignIn from "@/components/Auth/SignIn";
import { addressDetails } from "@/components/MediMart/Interface";
import PageLoading from "@/components/Seo/PageLoading";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import { apiCall } from "@/lib/axios-client";
import labOrder from "@/lib/LabOrder";
import moment from "moment";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CiHome } from "react-icons/ci";
import { DatePicker, Modal } from "rsuite";
import { DiscountInfo, LabPackage } from "../Interface";
import { HealthCheckUp } from "@/lib/HealthCheckUp";
import "../style.css";
import { toast } from "react-toastify";
const CheckOut = () => {
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
  const searchQuery = useSearchParams();
  const query = searchQuery.get("query");
  const { t } = useTranslation();
  const [allAddress, setAllAddress] = useState<addressDetails[]>();
  const [selectAddress, setSelectAddress] = useState<addressDetails>();

  const [deliveryOption, setDeliveryOption] = useState<string>("cod");
  const [onlinePayment, setOnlinePayment] = useState<string>("bkash");
  const [onlineDiv, setOnlineDiv] = useState(false);

  const [loading, setloading] = useState(false);
  const [buttonloading, setButtonloading] = useState(false);
  const router = useRouter();
  const [ishaveaddress, setIshaveaddress] = useState(false);
  const [addressId, setAddressId] = useState<string>();
  const [haveaddressid, setHaveaddressid] = useState<boolean>(false);
  const [formModal, setFormModal] = useState(false);
  const [signInPage, setSignInPage] = useState(false);
  const [labPackage, setLabPackage] = useState<LabPackage>();
  const [braccard, setBraccard] = useState<boolean>(false);
  const [bracCardNumber, setBracCardNumber] = useState<string>("");
  const [sampleCollectionTime, setSampleCollectionTime] = useState<Date | null>(
    null
  );
  const [sampleCollectionDate, setSampleCollectionDate] = useState<Date | null>(
    null
  );
  const [packagePrice, setPackagePrice] = useState<number>();
  const [discount, setDiscount] = useState<DiscountInfo>();
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

      const response = await HealthCheckUp(
        addressDetails,
        addressId,
        haveaddressid,
        userId,
        query,
        deliveryOption,
        onlinePayment,
        sampleCollectionDate,
        sampleCollectionTime,
        router,
        labPackage,
        discount,
        packagePrice
      );
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
      // console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonloading(false);
    }
  };

  const init = async () => {
    try {
      setloading(true);
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      const labpackageresponse = await apiCall(
        Methods.GET,
        `${EndPoint.LAB_SINGLE_PACKAGE}/${query}`
      );
      setLabPackage(labpackageresponse.data);
      setPackagePrice(labpackageresponse.data.price);
      // console.log(labpackageresponse.data);

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

  const handleDateChange = (value: Date | null) => {
    if (value) {
      // const formattedDate = moment(value).format("YYYY-MM-DD");

      setSampleCollectionDate(value);
    } else {
      setSampleCollectionDate(null);
    }
  };

  const handleTimeChange = (value: Date | null) => {
    if (value) {
      // const formattedTime = moment(value).format("hh:mm A");
      setSampleCollectionTime(value);
    } else {
      setSampleCollectionTime(null);
    }
  };

  const handleOnlinePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value;
    setOnlinePayment(values);
    // if(values==="bkash"){

    // }
    if (values === "bkash") {
      setPackagePrice(labPackage?.price);
    } else {
      if (discount && braccard) {
        const discounts = discount.discountPercent;
        let originalPrice = Number(labPackage?.price);
        let discountedAmount = originalPrice * (1 - discounts / 100);
        let value = Math.min(Number(discountedAmount), originalPrice);
        setPackagePrice(value);
      } else {
        setPackagePrice(labPackage?.price);
      }
    }
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
  const handleBracCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBraccard(!braccard);
    setBracCardNumber("");
    setPackagePrice(labPackage?.price);
  };
  const handleBracCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (braccard) {
      setBracCardNumber(e.target.value);
    }
  };
  const handleApplyBracCard = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      e.preventDefault();
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      if (!userAuthentication && !userId) {
        setSignInPage(true);
        return;
      }
      const value = {
        code: bracCardNumber,
        variationId: labPackage?._id,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.CARD_DICOUNT_CHECK,
        value
      );
      // console.log(response);
      if (response.success) {
        setDiscount(response.data);
        toast.success(
          `${response.data.discountPercent}% Discount in the Package`
        );
        const discount = response.data.discountPercent;
        let originalPrice = Number(labPackage?.price);
        let discountedAmount = originalPrice * (1 - discount / 100);
        let value = Math.min(Number(discountedAmount), originalPrice);
        setPackagePrice(value);
      } else {
        setPackagePrice(labPackage?.price);
        toast.info("Invalid Number");
        setDiscount(undefined);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return loading ? (
    <PageLoading />
  ) : (
    <section className="mt-2 xl:container xl:mx-auto lg:mt-4 xl:mt-6 2xl:mt-10 min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
        <aside className="lg:col-span-2 lg:row-span-3 ">
          <div className="bg-white sticky top-[10%] p-3 lg:p-8 rounded-lg shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] w-full">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xl font-semibold">
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

        {/* <aside className="checkoutBox col-span-2 lg:col-span-1  "> */}
        {/* collectiontime */}
        <div className="checkoutBox col-span-2 lg:col-span-1 ">
          <h2 className="mb-2 text-lg font-medium">
            {t("sample_collection")}
            <span className="text-red-500">*</span>
          </h2>
          <div className="flex flex-col gap-2 pt-2">
            <div>
              <label htmlFor="">
                {t("collection_Date")}
                {/* <span className="text-red-500">*</span> */}
              </label>
              <DatePicker
                format="dd/MM/yyyy"
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
        <div className="checkoutBox h-full w-full">
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
        {/* <div className="p-2 lg:p-0 col-span-6 h-full w-full "> */}
        {onlineDiv && (
          <div className="checkoutBox h-full col-span-2 w-full">
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

            {onlinePayment === "card" && (
              <div className="flex flex-col p-2 mt-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <label htmlFor="braccard" className="w-full cursor-pointer">
                    <Trans
                      i18nKey="braccard"
                      components={{
                        span: <span className="font-semibold text-[#EB148C]" />,
                      }}
                    />
                  </label>
                  <input
                    type="checkbox"
                    name="braccard"
                    id="braccard"
                    checked={braccard}
                    className="cursor-pointer accent-pink-500 size-4"
                    onChange={handleBracCard}
                  />
                </div>
                {braccard && (
                  <div className="flex items-center justify-between mt-2.5 ">
                    <input
                      type="text"
                      className="p-2 outline-none md:w-[70%]  border-2 rounded-[4px] "
                      placeholder={t("cardplaceholder")}
                      value={bracCardNumber}
                      onChange={handleBracCardNumber}
                      name="braccard"
                    />

                    <button
                      onClick={handleApplyBracCard}
                      className="p-2 bg-[#EB148C] rounded-[4px] text-white font-medium"
                    >
                      {t("GetDiscount")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {/* </div> */}
        {/* </aside> */}

        <aside className=" checkoutBox col-span-2  ">
          <div className="">
            <p className="mb-2 text-lg font-medium"> {t("product_summary")}</p>
            {labPackage && (
              <div>
                <div className="flex justify-between items-center  p-2 bg-gray-100 ">
                  <p className="font-medium">{labPackage.title}</p>
                  <p>{t("moneyCount", { count: packagePrice })}</p>
                </div>
                <hr className="my-2 border" />
                <p className="flex justify-between p-1 text-base font-[450]  leading-6">
                  <span> {t("product_price")}</span>
                  <span className="w-[20%] text-right">
                    {t("moneyCount", { count: packagePrice ?? 0 })}
                  </span>
                </p>
              </div>
            )}

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

export default CheckOut;
