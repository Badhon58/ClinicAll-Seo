"use client";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

const MediMartSeo = () => {
  const { t } = useTranslation();
  return (
    <section className=" bg-[#16020B] p-2 md:p-0">
      <div className="xl:container flex flex-col  border-b border-gray-600  space-y-4 xl:mx-auto text-gray-300 pt-4">
        <hr className="border-b border-gray-600 " />
        <div>
          <h1 className="text-base font-semibold text-white text-start">
            {t("online_medicine")}
          </h1>
          <p className="mt-1">
            <Trans
              i18nKey={"cliniCall_medicine_text"}
              components={{ bold: <span className="text-sm font-semibold" /> }}
            />
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-white text-start">
            {" "}
            {t("choose_online_medicine_delivery")}
          </h2>
          <ul className="list-disc pl-5 pt-2 text-sm">
            <li>
              <Trans
                i18nKey={"ultimate_convenience"}
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey={"fast_reliable_delivery"}
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>

            <li>
              <Trans
                i18nKey={"extensive_range_of_medicines"}
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey={"affordable_prices"}
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white text-start">
            {" "}
            {t("how_it_works")}
          </h2>
          <ul className="list-disc pl-5 pt-2 text-sm">
            <li>
              <Trans
                i18nKey={"order_online"}
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey={"home_delivery"}
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>
            <li>
              <Trans
                i18nKey={"customer_support"}
                components={{
                  bold: <span className="text-sm font-semibold" />,
                }}
              />
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white text-start">
            <Trans
              i18nKey={"hassle_free_medicine"}
              components={{
                bold: <span className="text-sm font-semibold" />,
              }}
            />
          </h2>
          <p className="pt-1">
            <Trans
              i18nKey={"online_medicine_home_delivery"}
              components={{
                bold: <span className="text-sm font-semibold" />,
              }}
            />
          </p>
        </div>
        <p>
          <Trans
            i18nKey={"order_now_convenience"}
            components={{
              bold: <span className="text-sm font-semibold" />,
            }}
          />
        </p>
       
      </div>
    </section>
  );
};

export default MediMartSeo;
