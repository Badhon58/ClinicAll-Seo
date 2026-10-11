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
import { Modal } from "rsuite";
import { FaVideo } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import "./style.css";
const CallDoctor = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const {
    ongoingCall,
    makeMicroAgoraCall,
    setAvailableDrInfo,
    cancellCall,
    isRinging,
    isAnswered,
    isRejected,
    isEnded,
  } = useSocket();
  const [packageInfo, setPackageInfo] = useState<PurchasedPackage>();
  const [loading, setLoading] = useState(false);
  const [noPkg, setNoPkg] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const init = async () => {
    try {
      setLoading(true);
      const userId = await getUserID();
      await apiCall(Methods.GET, `${EndPoint.GET_BOOK_PACKAGE}/${userId}`)
        .then((response) => {
          setPackageInfo(response.data);
          // console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAvailableDrInfo(null);
    init();
  }, []);

  const selectCallType = () => {
    setModalOpen(true);
  };

  const callDoctor = async (isVideo: boolean) => {
    const bookPkg = await apiCall(
      Methods.GET,
      EndPoint.GET_BOOK_PACKAGE_BY_UID + "/" + user._id
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
        user: user._id,
      }).then((resp) => {
        if (resp.success) {
          // console.log("Avlblb drrrr", availableDoctor);
          setAvailableDrInfo(availableDoctor.data);
          // Promise.resolve(
          //   makeMicroAgoraCall(availableDoctor.data._id, resp.data._id, true)
          // ).then((resp) => {
          //   // console.log("ress", resp);
          //   router.push(
          //     `/microsite-test/consultation?channel=${resp}&isVideo=${isVideo}`
          //   );
          // });
        } else {
          return;
        }
      });
    } else {
      // console.log("Waiting");
      apiCall(Methods.POST, EndPoint.CALL_HISTORY_CREATE, {
        // doctor: availableDoctor.data._id,
        user: user._id,
      }).then((resp) => {
        router.push(
          `/microsite-test/call-waiting?callId=${resp.data._id}&userId=${user._id}&isVideo=${isVideo}`
        );
      });
    }
  };

  return loading ? (
    <PageLoading />
  ) : (
    <section className="p-2 bg-[#fff4f4] rounded m-2">
      <div className="grid grid-cols-2 gap-2 min-h-[13vh]">
        <div className=" rounded flex flex-col items-center justify-center border-2 overflow-hidden border-white  bg-white bg-opacity-35">
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
              href={"/microsite-test/package"}
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
    </section>
  );
};

export default CallDoctor;
