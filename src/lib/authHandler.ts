import { clearLocalStorage } from "@/components/Auth/AuthLib";
import jwt from "jsonwebtoken";
import { apiCall } from "./axios-client";
import { EndPoint, Methods } from "@/api/config";
import Cookies from "js-cookie";
//User Section
export const signout = async () => {
  return await new Promise((resolve: any, reject) => {
    if (typeof window !== "undefined") {
      try {
        clearLocalStorage();
        resolve();
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error("Window is undefined"));
    }
  });
};

export const isAuthenticate = async () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("userToken");
  if (!token) return false;
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (e) {
    console.error("Invalid JSON in localStorage:", e);
    return false;
  }
};

export const getUserID = async () => {
  if (typeof window === "undefined") return false;
  try {
    const userID = localStorage.getItem("userID");
    return userID ? userID : false;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return false;
  }
};

//Doctor Section
export const doctorIsAuthenticate = () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("clinicallDoctorToken");
  if (!token) return false;
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (e) {
    console.error("Invalid JSON in localStorage:", e);
    return false;
  }
};

export const doctorSignout = async () => {
  return await new Promise((resolve: any, reject) => {
    if (typeof window !== "undefined") {
      try {
        const doctorId = localStorage.getItem("userID");
        // console.log("Doctor ID", doctorId);
        apiCall(Methods.PATCH, EndPoint.DOCTOR_UPDATE_BY_ID + "/" + doctorId, {
          isAvailable: false,
        })
          .then((resp: any) => {
            console.log("resp77 ", resp);
          })
          .catch((err: any) => {
            console.log("err77", err);
          });

        localStorage.removeItem("clinicallDoctorToken");
        localStorage.removeItem("userID");
        localStorage.removeItem("role");
        localStorage.removeItem("image");

        resolve();
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error("Window is undefined"));
    }
  });
};

export const getDoctorId = async () => {
  if (typeof window === "undefined") return false;
  try {
    const userID = localStorage.getItem("userID");
    return userID ? userID : false;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return false;
  }
};

export const getToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") return "Hello";

  try {
    const doctorToken = localStorage.getItem("clinicallDoctorToken");
    const userToken = localStorage.getItem("userToken");

    // Return the token if it exists, prioritizing `doctorToken` over `userToken`
    return doctorToken || userToken;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return "";
  }
};

export const getCookiesToken = async () => {
  try {
    const cookieUser = JSON.parse(Cookies.get("user") ?? "{}");
    if (Object.keys(cookieUser).length != 0) {
      const token = cookieUser.token;
      return token;
    }
  } catch (error) {
    console.log(error);
  }
};
