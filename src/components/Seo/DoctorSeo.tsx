"use client";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

const DoctorSeo = () => {
  const { t } = useTranslation();
  return (
    <section className=" bg-[#16020B] pb-2.5 p-2 md:p-0">
      <div className="xl:container flex flex-col  border-b border-gray-600  space-y-4 xl:mx-auto  text-white pt-4">
        <hr className="border-b border-gray-600 " />
        <div className="">
          <h1 className="text-base font-semibold text-white text-start">
            {t("doctorConsultationText")}
          </h1>
          <Trans
            i18nKey="doctorDescription"
            components={{ bold: <span className="text-sm font-semibold" /> }}
          />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white text-start">{t("directDoctorAccess")}</h2>
          <Trans
            i18nKey="healthPackageDescription"
            components={{ bold: <span className="text-sm font-semibold" /> }}
          />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white text-start">
            {t("specialistAppointment")}
          </h2>
          <Trans
            i18nKey="specialist_info"
            components={{ bold: <span className="text-sm font-semibold" /> }}
          />
        </div>

        <div>
          <h2 className="text-base font-semibold text-white text-start">
            {" "}
            {t("whyChooseCliniCall.title")}
          </h2>
          <ul className="list-disc pl-5 pt-1 text-sm">
            <li>
              <Trans
                i18nKey="instantDoctorAccess"
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>

            <li>
              <Trans
                i18nKey="specialist_booking"
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey="convenience"
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey="affordable_packages"
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>
          </ul>
          <hr />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white text-start">
            {t("how_to_get_started_title")}
          </h2>
          <Trans
            i18nKey="how_to_get_started_description"
            components={{
              bold: <span className="text-sm font-semibold" />,
            }}
          />
        </div>
        <p className="text-sm tracking-wider">
          <Trans
            i18nKey="clinicall_promise"
            components={{
              bold: <span className="text-sm font-semibold" />,
            }}
          />
        </p>
      </div>
    </section>
  );
};

export default DoctorSeo;
