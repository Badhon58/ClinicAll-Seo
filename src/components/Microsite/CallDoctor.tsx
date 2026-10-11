"use client";
import { EndPoint, Methods } from "@/api/config";
import { useSocket } from "@/context/SocketContext";
import { getUserID } from "@/lib/authHandler";
import { apiCall } from "@/lib/axios-client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCall } from "react-icons/io";
import { PurchasedPackage } from "./Interface";
import PageLoading from "../Seo/PageLoading";
import moment from "moment";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/UseUser";
import { Modal, Placeholder } from "rsuite";
import { FaVideo } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Link from "next/link";
import "./style.css";
import { toast } from "react-toastify";
import Auth from "./Auth";
const CallDoctor = ({ token }: { token: string | null }) => {
  const { t } = useTranslation();
  // const { user } = useUser();
  const {
    ongoingCall,
    makeMicroAgoraCall,
    setAvailableDrInfo,
    // cancellCall,
    // isRinging,
    // isAnswered,
    // isRejected,
    // isEnded,
  } = useSocket();
  const [packageInfo, setPackageInfo] = useState<PurchasedPackage>();
  const [loading, setLoading] = useState(false);
  const [noPkg, setNoPkg] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  const router = useRouter();

  const init = async () => {
    try {
      setLoading(true);
      const cookieUser = JSON.parse(Cookies.get("user") ?? "{}");
      if (token || Object.keys(cookieUser).length != 0) {
        const extractedToken = cookieUser.token || token;
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
              console.log("Token validated!!");
              let finalUser: any;
              Cookies.set("user", JSON.stringify(obj));
              if (Object.keys(cookieUser).length != 0) {
                finalUser = cookieUser;
              } else {
                finalUser = obj;
              }
              setUser(finalUser);

              console.log("Final User", finalUser);
              apiCall(
                Methods.GET,
                `${EndPoint.GET_BOOK_PACKAGE}/${finalUser.id}`
              )
                .then((response) => {
                  setPackageInfo(response.data);
                  // console.log(response.data);
                })
                .catch((err) => {
                  console.log(err);
                });

              if (typeof window !== "undefined") {
                // window.tokenStatus?.(true, "Valid Token");
                window.Android?.tokenStatus(true, "Valid Token");
                if (
                  window.webkit &&
                  window.webkit.messageHandlers &&
                  window.webkit.messageHandlers.onTokenStatus
                ) {
                  window.webkit.messageHandlers.onTokenStatus.postMessage({
                    status: true,
                    message: "Valid Token",
                  });
                } else {
                  console.log("iOS WebView not available");
                }
              }
            } else {
              console.log("Invalid Token Call Doctor!");
              Cookies.remove("user");
              if (typeof window !== "undefined") {
                // window.tokenStatus?.(false, "Invalid Token");
                window.Android?.tokenStatus(false, "Invalid Token");
                if (
                  window.webkit &&
                  window.webkit.messageHandlers &&
                  window.webkit.messageHandlers.onTokenStatus
                ) {
                  window.webkit.messageHandlers.onTokenStatus.postMessage({
                    status: false,
                    message: "Invalid Token",
                  });
                } else {
                  console.log("iOS WebView not available");
                }
              }
            }
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      } else {
        console.log("Empty Token Call Doctor");
        if (typeof window !== "undefined") {
          window.Android?.tokenStatus(
            false,
            "Token should not be empty string"
          );
          if (
            window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.onTokenStatus
          ) {
            window.webkit.messageHandlers.onTokenStatus.postMessage({
              status: false,
              message: "Token should not be empty string",
            });
          } else {
            console.log("iOS WebView not available");
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("UUUU EEFF CALL");
    setAvailableDrInfo(null);
    init();
  }, []);

  const selectCallType = () => {
    let userId;
    const cookieUser = JSON.parse(Cookies.get("user") ?? "{}");
    if (Object.keys(cookieUser).length != 0) {
      userId = cookieUser.id;
    }
    // console.log(cookieUser);

    if (!userId) {
      window.tokenStatus?.(false, "Invalid Token");
      if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.onTokenStatus
      ) {
        window.webkit.messageHandlers.onTokenStatus.postMessage({
          status: false,
          message: "Invalid Token",
        });
      } else {
        console.log("iOS WebView not available");
      }
    } else {
      setModalOpen(true);
    }
  };

  const callDoctor = async (isVideo: boolean) => {
    let userId;
    const cookieUser = JSON.parse(Cookies.get("user") ?? "{}");
    if (Object.keys(cookieUser).length != 0) {
      userId = cookieUser.id;
    }
    if (!cookieUser) {
      toast.warning("Login First");
    }
    const bookPkg = await apiCall(
      Methods.GET,
      EndPoint.GET_BOOK_PACKAGE_BY_UID + "/" + userId
    );
    if (!bookPkg.success) {
      setNoPkg(true);
      return;
    }

    const availableDoctor = await apiCall(
      Methods.GET,
      EndPoint.AVAILABLE_DOCTOR
    );
    // console.log("Doctor666666666666666", availableDoctor);
    if (availableDoctor.success) {
      apiCall(Methods.POST, EndPoint.CALL_HISTORY_CREATE, {
        doctor: availableDoctor.data._id,
        user: userId,
      }).then((resp) => {
        if (resp.success) {
          // console.log("Avlblb drrrr", availableDoctor);
          setAvailableDrInfo(availableDoctor.data);
          // console.log("YYYY", cookieUser);
          // return;
          Promise.resolve(
            makeMicroAgoraCall(
              cookieUser.id,
              cookieUser.name,
              cookieUser.image,
              cookieUser.phone,
              availableDoctor.data._id,
              resp.data._id,
              true
            )
          ).then((resp) => {
            // console.log("ress", resp);
            router.push(
              `/microsite/consultation?channel=${resp}&isVideo=${isVideo}`
            );
          });
        } else {
          return;
        }
      });
    } else {
      // console.log("Waiting");
      let userId: any;
      const cookieUser = JSON.parse(Cookies.get("user") ?? "{}");
      if (Object.keys(cookieUser).length != 0) {
        userId = cookieUser.id;
      }
      apiCall(Methods.POST, EndPoint.CALL_HISTORY_CREATE, {
        // doctor: availableDoctor.data._id,
        user: userId,
      }).then((resp) => {
        router.push(
          `/microsite/call-waiting?callId=${resp.data._id}&userId=${userId}&isVideo=${isVideo}`
        );
      });
    }
  };

  return loading ? (
    // <PageLoading />
    <div className="grid grid-cols-2 gap-3">
      <div className="card">
        <div className="header">
          <div className="img"></div>
          <div className="details">
            <span className="name"></span>
            <span className="about"></span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="header">
          <div className="img"></div>
          <div className="details">
            <span className="name"></span>
            <span className="about"></span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <section className="p-2 bg-[#fff4f4] rounded m-2">
      <div className="grid grid-cols-2 gap-2 ">
        <div className=" rounded flex flex-col items-center py-6 justify-center border-2 overflow-hidden border-white  bg-white bg-opacity-35">
          <div
            onClick={selectCallType}
            className="relative inline-flex items-center justify-center"
          >
            <span className="absolute w-9 h-9 rounded-full bg-pink-400 opacity-75 animate-[ping_2s_ease-in-out_infinite]"></span>

            <button className="relative p-2 bg-white rounded-full shadow-md">
              <IoMdCall size={25} className="text-green-500" />
            </button>
          </div>

          {/* <p className="text-xs mt-1">Call Doctor 24/7</p> */}
          <p className="text-xs mt-1 font-[530]">{t("calldoctor")}</p>
        </div>
        <div className=" rounded flex flex-col items-center justify-center border-2 border-white bg-white bg-opacity-35">
          {packageInfo ? (
            <p className="text-[11.5px] text-center">
              {t("active.healthpackage")} <br />
              <span className="font-medium capitalize">
                {t(`${packageInfo?.packageTitle}`)}
              </span>
              &nbsp; /&nbsp;
              {t(
                `${packageInfo.packageId.packageVariation?.[0].duration}`
              )}{" "}
              <br />
              {t("valid")} &nbsp;:&nbsp;{" "}
              {moment(packageInfo?.packageExpiredDate).format("YYYY-MM-DD")}
            </p>
          ) : (
            <Link
              href={"/microsite/package"}
              className="text-[11.5px] text-center px-[14px]"
            >
              <span className="text-sm font-medium">{t("packagetitle")}</span>{" "}
              <br />{" "}
              <span className="text-[10px] text-gray-500 font-[450]">
                {" "}
                {t("packagedesc")}
              </span>
            </Link>
          )}
        </div>
      </div>
      <Modal open={noPkg} onClose={() => setNoPkg(false)}>
        <Modal.Header>
          <p className="text-center text-lg font-semibold">No Package!</p>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">You didn't buy any package yet</p>
        </Modal.Body>
      </Modal>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size={300}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="relative custom-red-modal "
        backdropClassName="backdrop-blur-sm bg-black/30"
      >
        <Modal.Body className=" relative bg-[#eb148c] bg-opacity-10 rounded-lg p-3 overflow-hidden">
          <div className="absolute blur-3xl -top-3 right-16 size-32 bg-[#eb148c] bg-opacity-25 border-[#eb148c] rounded-full border-[50px]  "></div>
          <div className="relative min-w-72 py-5 ">
            {/* <span className="absolute w-9 h-9 rounded-full bg-pink-400 opacity-75 animate-[ping_2s_ease-in-out_infinite]"></span> */}

            <div className="flex flex-col items-center justify-center mb-8">
              <p className="font-medium text-lg">{t("calldoctor")}</p>
              {/* <p className="font-normal text-sm">Audio and Video</p> */}
            </div>
            <div className="flex items-center justify-center">
              {/* <button
                className="flex justify-center font-semibold text-pink-500 items-center gap-2 border border-gray-600 rounded-md p-2"
                onClick={() => callDoctor(false)}
              >
                Audio
                <MdCall size={20} />
              </button> */}
              <button
                className="flex justify-center font-semibold text-pink-500 items-center gap-2 border border-gray-600 rounded-md p-2 w-1/2 shadow-sm"
                onClick={() => callDoctor(true)}
              >
                {t("video")}
                <FaVideo size={20} />
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal open={auth} onClose={() => setAuth(false)} size="sm">
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <Auth />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default CallDoctor;
