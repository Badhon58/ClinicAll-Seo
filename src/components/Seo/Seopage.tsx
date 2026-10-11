"use client";
import Link from "next/link";
import { Trans, useTranslation } from "react-i18next";
const Seopage = () => {
  const { t } = useTranslation();
  return (
    <section className=" bg-[#16020B] p-2 md:p-0">
      <div className="xl:container flex flex-col  border-b border-gray-600  space-y-4 xl:mx-auto  text-gray-300 pt-4">
        <hr className="border-b border-gray-600 " />
        <div className="">
          <h1 className="text-base font-semibold text-white text-start ">{t("cliniCall.title")}</h1>
          <p className="pt-2 text-justify text-sm">
            {/* {t("cliniCall.description")} */}
            <Trans
              i18nKey="cliniCall.description"
              components={{ bold: <span className="text-sm font-semibold" /> }}
            />
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-white text-start">
            {" "}
            {t("doctorConsultation.title")}
          </h2>

          <p className="text-sm pt-1">{t("doctorConsultation.description")}</p>

          <ul className="list-disc pl-5 pt-2 text-sm">
            <li>
              <span className="text-sm font-semibold">
                {t("consultation.immediateConsultations.title")}
              </span>{" "}
              {t("consultation.immediateConsultations.description")}
            </li>
            <li>
              <span className="text-sm font-semibold">
                {t("consultation.specializedAppointments.title")}
              </span>{" "}
              {t("consultation.specializedAppointments.description")}
            </li>
          </ul>

          <p className="text-sm pt-3 ">
            <Trans
              i18nKey="cliniCallDescription.text"
              components={{ bold: <span className="text-sm font-semibold" /> }}
            />
          </p>

          <ul className="list-disc pl-5 pt-2 text-sm">
            <li className="text-sm font-semibold">
              {t("services.onlineDoctorAppointments")}
            </li>
            <li className="text-sm font-semibold">
              {t("services.healthPackages")}
            </li>
          </ul>
        </div>
        {/* <hr /> */}
        <div>
          <h2 className="text-base font-semibold text-white text-start">
            {t("healthPackage.title")}
          </h2>
          <p className="text-sm">
            <Trans
              i18nKey="healthPackage.description"
              components={{ bold: <span className="text-sm font-semibold" /> }}
            />
          </p>

          <ul className="list-disc pl-5 pt-2.5 text-sm">
            <li>
              <span className="font-semibold">
                {t("healthPackage.hospitalCashback.title")}
              </span>
              {t("healthPackage.hospitalCashback.description")}
            </li>
            <li>
              <span className="font-semibold">
                {t("healthPackage.opdServices.title")}
              </span>
              {t("healthPackage.opdServices.description")}
            </li>
            <li>
              <span className="font-semibold">
                {t("healthPackage.learnMore.title")}
              </span>
              {t("healthPackage.learnMore.description")}
            </li>
          </ul>
        </div>

        <div>
          <Link
            href={"/healthPackage"}
            className="text-base font-semibold hover:underline"
          >
            {t("telemedicine1.title")}
          </Link>
          <p className="text-justify text-sm pt-0.5">
            {/* {t("telemedicine.description")} */}
            <Trans
              i18nKey="telemedicine1.description"
              components={{ bold: <span className="text-sm font-semibold" /> }}
            />
          </p>
        </div>
        <hr />
        <div>
          <h2 className="text-base font-semibold text-white text-start">
            {t("whyChooseCliniCall.title")}
          </h2>

          <p className="text-justify text-sm pt-0.5">
            {t("whyChooseCliniCall.description")}
          </p>

          <p className="pt-1 text-sm">{t("whyChooseCliniCall.followUp")}</p>
          <p className="pt-1 text-sm">
            <span className="font-semibold">
              {t("whyChooseCliniCall.learnMore")}
            </span>
            {t("whyChooseCliniCall.contactInfo")}
          </p>
        </div>

        <div className="pb-3">
          <h2 className="text-base font-semibold text-white text-start">{t("Conclusion")}</h2>
          <p className="text-justify text-sm pt-0.5">
            <Trans
              i18nKey="clinicallhomeDescription"
              components={{ bold: <span className="text-sm font-semibold" /> }}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Seopage;
