"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { toast } from "react-toastify";

const Download = () => {
  const { t } = useTranslation();
  return (
    <section className="xl:my-[50px] my-5  bg-cover bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T104059-bg1.png')]">
      <div className="xl:container xl:mx-auto">
        <div className="flex flex-col items-center justify-between lg:flex-row ">
          <video
            autoPlay
            loop
            muted
            playsInline
            className=" bg-gray-500 rounded-none lg:w-1/2"
          >
            <source
              src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-12032025T112347-download-recovered-recovered-1.mp4"
              type="video/mp4"
            />
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
          <div className="mx-auto">
            <div className="relative mt-4 2xl:ml-10 lg:mt-0">
              <div className="flex items-center md:items-start  space-x-3">
                <div>
                  <h3 className=" text-[22px] 2xl:text-4xl text-center lg:text-start lg:text-2xl xl:text-3xl font-semibold text-[#16020B] ">
                    {t("Download the")} <br />
                    {t("Clinicall App")}
                  </h3>
                </div>
                <Image
                  src={
                    "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-22062025T153221-clinicallappqr.png"
                  }
                  alt="This is single product image"
                  width={85}
                  height={30}
                  className="w-32 h-28 rounded"
                />
              </div>

              <div className="absolute hidden md:flex left-6 lg:-left-9 xl:flex top-2 lg:top-16 text-[#16020B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="71"
                  viewBox="0 0 49 111"
                  fill="none"
                >
                  <path
                    opacity="0.8"
                    d="M35.1632 84.1106C38.5231 92.0256 42.318 97.5901 48.0105 105.937C49.908 108.719 47.1403 110.638 44.8078 110.206C40.1426 109.342 37.3749 111.261 32.7097 110.398C28.0446 109.534 25.2769 111.453 20.6117 110.589C18.2792 110.157 18.7143 107.807 21.4819 105.888C24.2496 103.969 28.9148 104.833 33.5799 105.697L35.9125 106.128C33.5799 105.697 31.2473 105.265 29.3498 102.483C25.1198 99.2685 18.5571 95.6227 14.3271 92.4087C6.30201 83.6302 1.04463 72.9329 0.887517 60.7488C0.730406 48.5647 8.00614 35.3254 14.4117 26.7871C17.6145 22.518 23.5849 16.3301 29.1202 12.4928C31.8879 10.5741 34.6556 8.65538 37.4233 6.7367C40.191 4.81801 42.9586 2.89932 45.7263 0.980634C48.0589 1.41242 50.3915 1.8442 47.6238 3.76289C44.8561 5.68157 42.0884 7.60027 41.6533 9.95073C38.8857 11.8694 36.118 13.7881 33.3503 15.7068C27.815 19.5442 24.6122 23.8133 21.4094 28.0825C13.1064 33.8385 8.59836 45.1591 6.42289 56.9114C6.58 69.0956 9.50479 79.361 17.9649 85.7891C22.195 89.0031 26.4251 92.2171 30.6551 95.4312C32.9877 95.863 35.3203 96.2948 34.8852 98.6452C32.9877 95.863 29.1927 90.2985 27.2952 87.5162C28.1654 82.8153 33.2657 81.3284 35.1632 84.1106Z"
                    fill="#564146"
                  />
                </svg>
              </div>
              <p className="text-lg mb-6  mt-5 text-[#3A3A3C] font-semibold">
                {t("downloadlink")}
              </p>
              <div className="flex justify-center lg:space-x-9 items-centers lg:items-start lg:justify-start">
                <Link
                  href={
                    process.env.NEXT_APPLE_PLAY_STORE ??
                    "https://apps.apple.com/us/app/clinicall-online-doctor-app/id6743645786"
                  }
                  className=" flex text-base h-[50px] font-semibold rounded-[5px] border border-[#E2136E] bg-[#E2136E] text-white cursor-pointer w-[147px] justify-center items-center space-x-[9px]"
                >
                  <FaApple className="text-white" size={24} />
                  <span> {t("App store")}</span>
                </Link>
                <Link
                  href={
                    process.env.NEXT_GOOGLE_APP_PLAY_STORE ??
                    "https://play.google.com/store/apps/details?id=com.clinicall.clinicallapp"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 flex text-base  space-x-1  rounded-[5px] border border-[#E2136E] bg-[#E2136E] text-white font-medium cursor-pointer  justify-center items-center h-[50px] w-[147px]"
                >
                  <FaGooglePlay className="text-white" size={20} />
                  <span> {t("Play Store")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
