"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import RightNavSection from "./RightNavSection";
import { useTranslation } from "react-i18next";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import ProgressCircle from "rsuite/esm/Progress/ProgressCircle";
// import { NextResponse } from "next/server";

const NavBar = ({ token }: { token: string | null }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // console.log("token333: ", typeof token);
  // function tokenStatus(success: boolean, message: string) {
  //   const resp = {
  //     success,
  //     message,
  //   };
  //   console.log(resp);
  //   return resp;
  // }
  const init = async () => {
    try {
      setLoading(true);
      // console.log("Navbar CALLING", token);
      const cookieUser = JSON.parse(Cookies.get("user") ?? "{}");
      if (token || Object.keys(cookieUser).length != 0) {
        const extractedToken = cookieUser.token || token;
        if (extractedToken) {
          apiCall(Methods.POST, EndPoint.VERIFY_JWT, { token: extractedToken })
            .then((resp) => {
              if (resp.success) {
                const obj = {
                  id: resp.data.id,
                  name: resp.data.firstName + " " + resp.data.lastName,
                  dialCode: resp.data.dialCode,
                  phone: resp.data.phone,
                  image: resp.data.image,
                  token: extractedToken,
                };
                // console.log("Token validated!!");

                // djfsdkfs
                let finalUser: any;
                Cookies.set("user", JSON.stringify(obj));

                console.log("Cookie User", cookieUser);
                if (Object.keys(cookieUser).length != 0) {
                  finalUser = cookieUser;
                } else {
                  finalUser = obj;
                }
                setUser(finalUser);
                // if (typeof window !== "undefined") {
                //   // window.tokenStatus?.(true, "Valid Token");
                //   window.Android?.tokenStatus(true, "Valid Token");
                //   if (
                //     window.webkit &&
                //     window.webkit.messageHandlers &&
                //     window.webkit.messageHandlers.onTokenStatus
                //   ) {
                //     window.webkit.messageHandlers.onTokenStatus.postMessage({
                //       status: true,
                //       message: "Valid Token",
                //     });
                //   } else {
                //     console.log("iOS WebView not available");
                //   }
                // }
              } else {
                console.log("Invalid Token Nav!");
                // Cookies.remove("user");
                // if (typeof window !== "undefined") {
                //   // window.tokenStatus?.(false, "Invalid Token");
                //   window.Android?.tokenStatus(false, "Invalid Token");
                //   if (
                //     window.webkit &&
                //     window.webkit.messageHandlers &&
                //     window.webkit.messageHandlers.onTokenStatus
                //   ) {
                //     window.webkit.messageHandlers.onTokenStatus.postMessage({
                //       status: false,
                //       message: "Invalid Token",
                //     });
                //   } else {
                //     console.log("iOS WebView not available");
                //   }
                // }
              }
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();

    // setTimeout(() => {
    //   const user = JSON.parse(Cookies.get("user") ?? "{}");
    //   console.log("UUUUU", user);
    // }, 5000);
  }, []);

  const { t } = useTranslation();
  return (
    <section className="sticky top-0 z-40 bg-[#fff4f4]  ">
      <div className="flex justify-between items-center px-2 py-1  ">
        <aside className=" p-2 flex items-center justify-center space-x-1">
          <Link href={"/microsite"}>
            <Image
              alt="Logo Image"
              src="/homeLogo/logo_text.svg"
              className="h-[30px] w-[110px]"
              width={200}
              height={50}
            />
            {/* <p className="text-[8px]">Complete Healthcare in One App</p> */}
            <p className="text-[8px]">{t("micrositetitle")}</p>
          </Link>
        </aside>
        <aside>
          {" "}
          {loading ? "loading..." : <RightNavSection user={user} />}
        </aside>
      </div>
    </section>
  );
};

export default NavBar;
