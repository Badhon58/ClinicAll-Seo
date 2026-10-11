"use client";
import React, { useEffect, useState } from "react";
import { addressDetails } from "./Interface";
import { useAppSelector } from "@/redux/Hooks";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import ProcessOrder from "@/lib/ProcessOrder";
import { useAppDispatch } from "@/redux/Hooks";
import { useRouter } from "next/navigation";
import moment from "moment";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import Image from "next/image";
import { CiHome } from "react-icons/ci";
import { Modal } from "rsuite";
import { clearLab } from "@/redux/Slices/LabSlice";
import { useTranslation } from "react-i18next";
// import AuthLib from "../common/AuthLib";
import Loading from "@/app/loading";
import "./Style.css";
import { toast } from "react-toastify";
import SignIn from "../Auth/SignIn";
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
  });
  const [allAddress, setAllAddress] = useState<addressDetails[]>();
  const [selectAddress, setSelectAddress] = useState<addressDetails>();
  const [deliveryOption, setDeliveryOption] = useState<string>("cod");
  const [onlinePayment, setOnlinePayment] = useState<string>("bkash");
  const [onlineDiv, setOnlineDiv] = useState(false);
  const productItem = useAppSelector((state) => state.CartSlicer.cartitems);
  const producttotalCost = useAppSelector(
    (state) => state.CartSlicer.cartTotalAmount
  );
  const [loading, setloading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formModal, setFormModal] = useState(false);
  const [ishaveaddress, setIshaveaddress] = useState(false);
  const [addressId, setAddressId] = useState<string>();
  const [haveaddressid, setHaveaddressid] = useState<boolean>(false);
  const { t } = useTranslation();
  const [signInPage, setSignInPage] = useState(false);
  const [deliveryCharge, setdeliveryCharge] = useState<string>("60");
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
    setDeliveryOption(values);
  };

  const handleOnlinePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value;
    setOnlinePayment(values);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setBtnLoading(true);
      if (Number(producttotalCost) < 300) {
        toast.dismiss("min-order-toast");
        toast.warning(
          "Minimum order amount is ৳300. Add more items to proceed.",
          {
            toastId: "min-order-toast",
          }
        );
        return;
      }
      const userAuthentication = await isAuthenticate();
      if (!userAuthentication) {
        setSignInPage(true);
        return;
      }
      const response = await ProcessOrder(
        addressDetails,
        productItem,
        deliveryOption,
        onlinePayment,
        producttotalCost,
        userId,
        dispatch,
        router,
        addressId,
        selectAddress,
        haveaddressid,
        deliveryCharge
      );
      // invoiceNumber
      if (response.success == true) {
        const today = moment().format("dddd, MMMM D, YYYY");
        dispatch(clearLab());
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
      setBtnLoading(false);
    }
  };

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
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
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

  // model Show
  const showModal: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignInPage(!signInPage);
  };

  const handleselectdeliveryoption = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setdeliveryCharge(e.target.value);
  };

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <section className="mt-2 xl:container xl:mx-auto lg:pt-4 xl:pt-6 2xl:pt-10 min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Address Section  */}
        <div className=" lg:col-span-2 lg:row-span-3">
          <div className="bg-white sticky top-[10%] p-3 lg:p-8 rounded-lg shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] ">
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
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="sm:w-1/2">
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
                  <div className="sm:w-1/2">
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
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  {/* Email  */}
                  <div className="sm:w-1/2">
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
                  <div className="sm:w-1/2">
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
                  />{" "}
                </div>
                {/* Distick and Thana  */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="sm:w-1/2">
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
                  <div className="sm:w-1/2">
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
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                      <div className="sm:w-1/2">
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
                      <div className="sm:w-1/2">
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
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                      <div className="sm:w-1/2">
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
                      <div className="sm:w-1/2">
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
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                      <div className="sm:w-1/2">
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
                      <div className="sm:w-1/2">
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
        </div>
        {/* Choose_Payment_Option */}
        <div className={`checkoutBox col-span-2 lg:col-span-1 `}>
          <h2 className="mb-4 text-lg font-medium">
            {t("choose_payment_option")}
          </h2>
          <div className="space-y-4 ">
            <div className="flex items-center">
              <input
                type="radio"
                id="homeDelivery"
                name="deliveryOption"
                value="cod"
                className="accent-pink-500 cursor-pointer"
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
                className="accent-pink-500 cursor-pointer"
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
        {/* Choose_Delivery_Option */}
        <div className="checkoutBox h-full w-full ">
          <h2 className=" text-lg font-medium mb-4">
            {t("choose_delivery_option")}
          </h2>
          <div className="flex flex-col space-y-3 mt-1">
            <div className="flex items-center">
              <input
                type="radio"
                id="insideDhaka"
                name="insideDhaka"
                value="60"
                className="accent-pink-500 cursor-pointer"
                checked={deliveryCharge === "60"}
                onChange={handleselectdeliveryoption}
              />
              <label
                htmlFor="insideDhaka"
                className="ml-2 text-sm font-medium text-[#16020B] cursor-pointer  w-full"
              >
                {t("insideDhaka")}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="outsideDhaka"
                name="outsideDhaka"
                value="120"
                className="accent-pink-500 cursor-pointer"
                checked={deliveryCharge === "120"}
                onChange={handleselectdeliveryoption}
              />
              <label
                htmlFor="outsideDhaka"
                className="ml-2 text-sm font-medium text-[#16020B] cursor-pointer  w-full"
              >
                {t("outsideDhaka")}
              </label>
            </div>
          </div>
        </div>
        {/* Choose_Online_Payment */}
        {onlineDiv && (
          <div className="p-6 border col-span-2 rounded-lg shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] h-full w-full ">
            <h2 className=" text-lg font-medium">
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
        {/* Product Summary */}
        <div className="checkoutBox col-span-2">
          <p className="mb-4 text-lg font-bold">{t("product_summary")} </p>
          <div className="">
            {productItem.length > 0 &&
              productItem.map((item: any, index) => (
                <div
                  className={`flex justify-between p-2 ${
                    index % 2 == 0 && "bg-gray-100"
                  }`}
                  key={index}
                >
                  <p className="w-[65%]">
                    {" "}
                    {item.product_name} {"("}
                    {t("numberconvert", {
                      count: Number(item?.price?.toString()),
                    })}{" "}
                    *{" "}
                    {t("numberconvert", {
                      count: item?.quantity?.toString(),
                    })}
                    {")"}
                  </p>
                  <p className="text-start w-[23%]">
                    {t("moneyCount", {
                      count: parseFloat(
                        Number(item.itemCost.toString()).toFixed(2)
                      ),
                    })}
                  </p>
                </div>
              ))}
          </div>
          <p
            className={`pt-1 ${
              producttotalCost < 300 ? "text-red-300 text-[11px]" : "hidden"
            }`}
          >
            {t("checkoutCondition")}
          </p>
          <hr className="my-2 border" />
          <p className="flex justify-between p-1 font-medium text-base leading-6">
            <span>{t("product_price")}</span>
            <span className="w-[23%]">
              {t("moneyCount", {
                count: Number(producttotalCost.toFixed(2)),
              })}
            </span>
          </p>
          <p className="flex justify-between p-1 font-medium text-base leading-6">
            {" "}
            <span>{t("home_delivery_Checkout")}</span>
            <span className="w-[23%]">
              {t("moneyCount", {
                count: parseInt(deliveryCharge),
              })}
            </span>
          </p>
          <hr className="my-2 border" />
          <div className="flex justify-between text-lg font-medium">
            <span>{t("total_price")}</span>
            <span className="w-[23%]">
              {/* {t("moneyCount", {
                count: producttotalCost + parseInt(deliveryCharge),
              })} */}
              {t("moneyCount", {
                count: parseFloat(
                  (
                    Math.ceil(producttotalCost) + Number(deliveryCharge)
                  ).toFixed(2)
                ),
              })}
            </span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={btnLoading}
            className="py-3 w-full mt-3 rounded-md bg-[#EB148C] text-center text-white text-base font-medium"
          >
            {btnLoading ? t("payment.loading") : t("Continue to Payment")}
          </button>
        </div>
      </div>
      <Modal size="sm" open={signInPage} onClose={showModal}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minWidth: "30rem" }}>
          <SignIn />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default CheckOut;
