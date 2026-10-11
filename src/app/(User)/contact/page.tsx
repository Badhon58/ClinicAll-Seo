"use client";
import Services from "@/components/Home/Services";
import React, { Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";
import Headertag from "@/components/common/Headertag";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
const info = [
  {
    image: <MdAccessTime size={24} />,
    titleKey: "office_timings",
    subtitleKey: "office_hours",
  },
  {
    image: <FiMapPin size={24} />,
    titleKey: "email_address",
    subtitleKey: "emailcont",
  },
  {
    image: <FiPhone size={24} />,
    titleKey: "phone_number",
    subtitleKey: "phone",
  },
  {
    image: <IoChatbubblesOutline size={24} />,
    titleKey: "live_chat",
    subtitleKey: "chat",
  },
];

const ContactUs = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <section className="mt-5 lg:mt-3 xl:mt-5  xl:container xl:mx-auto">
      <div>
        <Image
          src={
            "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28072025T185915-maskgroup.svg"
          }
          alt="This is an image"
          width={100}
          height={240}
          className="mx-auto 2xl:w-full lg:w-[1000px] xl:w-[1200px] w-[360px] sm:w-[500px] md:w-[700px] "
        />
        <div className="mt-4">
          <Headertag position="text-center"> {t("get_in_touch")}</Headertag>
        </div>
        <div className="px-2 lg:px-0 grid grid-cols-1 lg:grid-cols-2 2xl:gap-10 gap-5  mx-auto mb-4 mt-2">
          <aside className=" flex flex-col justify-center gap-4 2xl:gap-5 ">
            {info.map((item, index) => (
              <div
                key={index}
                className="shadow-[0px_5px_50px_0px_rgba(0,_0,_0,_0.08)] bg-white rounded-xl flex space-x-3 py-4 2xl:py-5"
              >
                <div className="2xl:w-[54px] w-11 lg:w-12 lg:h-12 h-11 2xl:h-[53px] ml-4 lg:ml-9 bg-[#EB148C] rounded-full  text-white flex items-center justify-center">
                  {item.image}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg text-[#3A3A3C] font-normal">
                    {t(item.titleKey)}
                  </p>
                  <p
                    className="text-sm text-[#6B7588] font-normal"
                    dangerouslySetInnerHTML={{ __html: t(item.subtitleKey) }}
                  ></p>
                </div>
              </div>
            ))}
          </aside>
          <aside className="relative">
            <div className=" w-full max-w-[600px] h-[400px] text-right">
              <div className="overflow-hidden w-full h-full bg-transparent">
                <iframe
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  // marginHeight="0"
                  // marginWidth="0"
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=8th Floor, house 3, road 2 Baridhara J Block, Dhaka 1212&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  title="Google Map"
                ></iframe>
              </div>
            </div>

            <div className="px-6 py-2 rounded-lg flex items-center space-x-3 bg-white w-[80%] lg:w-[50%] absolute shadow-[0px_5px_50px_0px_rgba(0,_0,_0,_0.08)] bottom-8 lg:bottom-16 left-10 lg:left-28">
              <div className="w-10 h-10  bg-[#EB148C] rounded-full  text-white flex items-center justify-center">
                <FiMapPin size={24} />
              </div>
              <div className="flex flex-col">
                <p className="text-lg text-[#3A3A3C] font-normal">
                  {t("office_address")}
                </p>
                <p className="text-sm text-[#6B7588] font-normal">
                  {t("Oraddress")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {pathname.startsWith("/microsite") ? null : (
        <div>
          <Suspense fallback={<Loading />}>
            <Services />
          </Suspense>
        </div>
      )}
    </section>
  );
};

export default ContactUs;
