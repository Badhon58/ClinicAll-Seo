"use client";
import { getUserID, isAuthenticate, signout } from "@/lib/authHandler";
import { EndPoint, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import { useAppDispatch } from "@/redux/Hooks";
import { clearCart } from "@/redux/Slices/CartSlicer";
import { clearLab } from "@/redux/Slices/LabSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { Avatar, Modal } from "rsuite";
import { clearLocalStorage } from "../Auth/AuthLib";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface userinfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  phone?: string;
  dialCode?: string;
}

const LeftSideBar = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<userinfo>({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    phone: "",
    dialCode: "",
  });
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { handleSocketLogout } = useSocket();
  const { t } = useTranslation();
  const [deleteaccount, setDeleteaccount] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const init = async () => {
    const userId = await getUserID();
    const userAuthentication = await isAuthenticate();
    try {
      setLoading(true);
      if (userId && userAuthentication) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.SINGLE_USER}/${userId}`
        );
        setUserInfo(response.data);
      } else {
        try {
          clearLocalStorage();
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user_id = localStorage.getItem("userID");
    // console.log("When Logout", user_id);
    if (user_id) {
      handleSocketLogout(user_id);
    }

    await signout().then((response) => {
      dispatch(clearCart());
      dispatch(clearLab());
      router.push("/");
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDeleteaccount(!deleteaccount);
  };

  const accountDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setButtonLoading(true);
      const userId = await getUserID();
      const deleteresponse = await apiCall(
        Methods.DELETE,
        `${EndPoint.DELETE_ACCOUNT}/${userId}`
      );
      if (deleteresponse.success) {
        // toast.success(
        //   "Your account has been deleted successfully. We're sad to see you go! 😢"
        // );
        toast.success(deleteresponse.message);
        await signout()
          .then((response) => {
            router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    "Loading.."
  ) : (
    <aside className="px-2 lg:mb-10 sticky lg:top-16 2xl:top-32 hidden lg:flex flex-col  min-h-[80vh] shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">
      {/* Profile  */}
      <div className="flex items-center px-3 py-3 space-x-4 ">
        <Avatar
          src={userInfo?.image ? `${userInfo?.image}` : "/User/Group.png"}
          alt="Profile Image1"
          className="bg-gray-200 rounded-full"
          size="md"
          circle
          aria-label="User profile picture"
        />
        <div>
          <p className="font-medium">
            {userInfo?.firstName ?? "Hello"} {userInfo?.lastName ?? "User"}
          </p>
          <p className="text-sm text-gray-600 line-clamp-1 w-[80%] lg:w-full">
            {userInfo?.dialCode} {userInfo?.phone}
          </p>
        </div>
      </div>
      <div className="flex flex-col ">
        <Link href={"/account"} className="px-3 py-3 border-y ">
          {t("My Profile")}
        </Link>
        <Link href={"/account/healthcard"} className="px-3 py-3 border-b ">
          {t("Health Card")}
        </Link>
        <Link href={"/account/claim"} className="px-3 py-3 border-b ">
          {t("Claim")}
        </Link>
        <Link href={"/account/claimHistory"} className="px-3 py-3 border-b ">
          {t("Claim History")}
        </Link>
        <Link href={"/account/prevappointment"} className="px-3 py-3 border-b ">
          {t("Previous Appointments")}
        </Link>
        <Link href={"/account/report"} className="px-3 py-3 border-b ">
          {t("Report")}
        </Link>
        <Link href={"/account/orders"} className="px-3 py-3 border-b ">
          {t("Orders")}
        </Link>
        <button
          onClick={handleLogout}
          className="flex justify-start px-3 py-3 border-b"
        >
          {t("Log Out")}
        </button>

        <Link href="/Auth/remove" className="px-3 py-3 border-b text-start">
          <h3>{t("Account Delete")}</h3>
        </Link>
      </div>
      <Modal
        open={deleteaccount}
        onClose={() => setDeleteaccount(!deleteaccount)}
        className="rounded-lg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Header>
          <p className="mb-2 text-xl font-semibold text-center">
            {t("accountDeletion")}
          </p>
          <p className="mb-6 text-center text-gray-600">
            {t("accountDeletionProcess")}
          </p>
        </Modal.Header>
        <div className="py-8 flex justify-between p-3">
          <button
            className="px-5 py-3 bg-[#EB148C] text-sm font-medium text-white rounded-md"
            onClick={() => setDeleteaccount(!deleteaccount)}
          >
            {t("Cancel")}
          </button>
          <button
            onClick={accountDelete}
            className="px-5 py-3 bg-[#EB148C] text-sm font-medium text-white rounded-md"
          >
            {" "}
            {buttonLoading ? "Loading.." : t("Confirm")}
          </button>
        </div>
      </Modal>
    </aside>
  );
};

export default LeftSideBar;
