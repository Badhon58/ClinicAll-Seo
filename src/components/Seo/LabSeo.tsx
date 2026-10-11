"use client";
import { Trans, useTranslation } from "react-i18next";

const LabSeo = () => {
  const { t } = useTranslation();
 
  return (
    <div className=" bg-[#16020B] pb-2.5 p-2 md:p-2">
      <section className="xl:container flex flex-col  border-b border-gray-600  space-y-4 xl:mx-auto text-gray-300 pt-4">
        <hr className="border-b border-gray-600 " />
        <div className="">
          <h2 className="text-base font-semibold mt-2 text-white text-start">
            {t("lab_test_booking")}
          </h2>
          <p className="text-sm">
            <Trans
              i18nKey={"labTestBookingdescription"}
              components={{ bold: <span className="text-sm font-semibold" /> }}
            />
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-white text-start">
            {" "}
            {t("why_choose_online_booking")}
          </h2>
          <ul className="list-disc pl-5 pt-2 text-sm">
            <li>
              <span className="text-sm font-semibold">
                {t("online_lab_test_booking.title")}
              </span>{" "}
              {t("online_lab_test_booking.description")}
            </li>
            <li>
              <span className="text-sm font-semibold">
                {t("home_office_sample_collection.title")}
              </span>{" "}
              {t("home_office_sample_collection.description")}
            </li>
            <li>
              <span className="text-sm font-semibold">
                {t("online_report_delivery.title")}
              </span>{" "}
              {t("online_report_delivery.description")}
            </li>
            <li>
              <span className="text-sm font-semibold">
                {t("affordable_tests.title")}
              </span>{" "}
              {t("affordable_tests.description")}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-white text-start">
            {t("cliniCall_advantage")}
          </h2>
          <ul className="list-disc pl-5 pt-0.5 text-sm">
            <li>
              <span className="text-sm font-semibold">
                {t("accurate_reliable.title")} :
              </span>{" "}
              {t("accurate_reliable.description")}
            </li>
            <li>
              <span className="font-semibold">
                {t("affordable_pricing.title")} :
              </span>{" "}
              {t("affordable_pricing.description")}
            </li>
            <li>
              <span className="font-semibold">
                {t("no_more_waiting.title")} :
              </span>{" "}
              {t("no_more_waiting.description")}
            </li>
          </ul>
          <p className="text-justify text-sm pt-2">{t("why_wait")}</p>
        </div>
        <p className="flex flex-col">
          {/* <span className="pt-2 text-xs">
            Powered By: {provider} Bangladesh Ltd
          </span> */}
          {/* <span className=" pb-3 text-xs">
            Note: Thyrocare Bangladesh Ltd (TBL), a franchisee of the
            international laboratory chain giant Thyrocare, received the College
            of American Pathologists (CAP), USA certification for continuous
            improvement in Quality.
          </span> */}
        </p>
      </section>
    </div>
  );
};

export default LabSeo;
