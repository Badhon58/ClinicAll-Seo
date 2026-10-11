"use client";

import { Trans, useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-[70vh]">
      <div className="flex flex-col pt-4 space-y-4 xl:container xl:mx-auto lg:px-10">
        {/* Title + Intro */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.title")}</p>
          <p className="text-base italic ">{t("tac.lastUpdated")}</p>
          <p>{t("tac.intro")}</p>
        </div>
        <hr />

        {/* Section 1 */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.section1Title")}</p>
          <p>{t("tac.section1Desc")}</p>
        </div>
        <hr />

        {/* Section 2 */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.section2Title")}</p>
          <p>{t("tac.section2Intro")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li className="mt-3">
              <span className="font-[550]">
                {t("tac.telemedicineTitle")}{" "}
              </span>
              {t("tac.telemedicineDesc")}
            </li>
            <li>
              <span className="font-[550]">{t("tac.cashbackTitle")} </span>
              {t("tac.cashbackDesc")}
            </li>
            <li>
              <span className="font-[550]">
                {t("tac.documentationTitle")}{" "}
              </span>
              {t("tac.documentationDesc")}
            </li>
            <li>
              <span className="font-[550]">
                {t("tac.agetitle")}{" "}
              </span>
              {t("tac.agedesc")}
            </li>
          </ul>
          <p className="mt-2">{t("tac.section2Note")}</p>
        </div>
        <hr />

        {/* Section 3 */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.section3Title")}</p>
          <p>{t("tac.section3Intro")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li>
              <span className="font-[550]">
                {t("tac.responsibility1Title")}{" "}
              </span>
              {t("tac.responsibility1Desc")}
            </li>
            <li>
              <span className="font-[550]">
                {t("tac.responsibility2Title")}{" "}
              </span>
              {t("tac.responsibility2Desc")}
            </li>
            <li>
              <span className="font-[550]">
                {t("tac.responsibility3Title")}{" "}
              </span>
              {t("tac.responsibility3Desc")}
            </li>
          </ul>
          <p className="mt-2">{t("tac.section3Note")}</p>
        </div>
        <hr />

        {/* Section 4 */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.section4Title")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li>
              <span className="font-[550]">{t("tac.payment1Title")} </span>
              {t("tac.payment1Desc")}
            </li>
            <li>
              <span className="font-[550]">{t("tac.payment2Title")} </span>
              {t("tac.payment2Desc")}
            </li>
            <li>
              <span className="font-[550]">{t("tac.payment3Title")} </span>
              {t("tac.payment3Desc")}
            </li>
          </ul>
        </div>
        <hr />

        {/* Section 5 */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.section5Title")}</p>
          <p>{t("tac.section5Intro")}</p>
          <ol className="list-none list-inside ">
            <li>
              <span className="font-[550]">{t("tac.privacy1Title")}</span>{" "}
              {t("tac.privacy1Desc")}
            </li>
            <li>
              <span className="font-[550]">{t("tac.privacy2Title")}</span>
              <ul className="ml-6 list-disc list-inside">
                <li>{t("tac.privacy2a")}</li>
                <li>{t("tac.privacy2b")}</li>
                <li>{t("tac.privacy2c")}</li>
              </ul>
            </li>
            <li>
              <span className="font-[550]">{t("tac.privacy3Title")}</span>{" "}
              {t("tac.privacy3Desc")}
            </li>
          </ol>
        </div>
        <hr />

        {/* Section 6 */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.section6Title")}</p>
          <p>{t("tac.section6Intro")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li>{t("tac.section6a")}</li>
            <li>{t("tac.section6b")}</li>
            <li>{t("tac.section6c")}</li>
          </ul>
          <p>{t("tac.section6Note")}</p>
        </div>
        <hr />

        {/* Section 7 */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.section7Title")}</p>
          <p>{t("tac.section7Intro")}</p>
          <ul className="ml-6 list-disc list-inside">
            <li>{t("tac.section7a")}</li>
            <li>{t("tac.section7b")}</li>
            <li>{t("tac.section7c")}</li>
          </ul>
        </div>
        <hr />
        <div>
          <p className="text-lg font-[550] ">{t("tac.section8Title")}</p>
          <ul className="mt-2 ml-6 list-disc list-inside">
            <li>{t("tac.section8a")}</li>
            <li>{t("tac.section8b")}</li>
            <li>{t("tac.section8c")}</li>
          </ul>
        </div>
        <hr />

        {/* section 9 */}
        <div>
          <p className="text-lg font-[550]">{t("tac.section9Title")}</p>
          {/* <p>{t("tac.section10Intro")}</p> */}
          <ul className="mt-2 ml-6 list-disc list-inside">
            <li>{t("tac.section9a")} </li>
            <li>{t("tac.section9b")} </li>
            <li>{t("tac.section9c")} </li>
            <li>{t("tac.section9d")} </li>
          </ul>
        </div>
        <hr />
        {/* Section 10 */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.section10.title")}</p>
          <Trans
            i18nKey="tac.section10.description"
            components={{
              br: <br className="" />,
            }}
          />
          {/* <p>{t("tac.section10.description")}</p> */}
        </div>
        <hr />
        <p className="text-lg font-semibold ">{t("sotac.title")}</p>
        <div className="ml-3">
          <div className="">
            <p className="text-lg font-[550]">{t("sotac.section1.title")}</p>
            <p>{t("sotac.section1.description")}</p>
          </div>
          {/* <hr /> */}
          <div className="mt-2">
            <p className="text-lg font-[550]">{t("sotac.section2.title")}</p>
            <p>{t("sotac.section2.description")}</p>
          </div>
          <div className="mt-2">
            <p className="text-lg font-[550]">{t("sotac.section3.title")}</p>
            <p>{t("sotac.section3.description")}</p>
            <ul className="ml-6 list-disc list-inside">
              <li>
                {t("sotac.section3.points.1")}{" "}
              </li>
              <li>
                {t("sotac.section3.points.2")}{" "}
              </li>
              <li>
                {t("sotac.section3.points.3")}{" "}
              </li>

            </ul>
            <p className="mt-2 ">{t("sotac.section3.limitationtitle")}</p>
            <ul className="ml-6 list-disc list-inside">
              <li>
                {t("sotac.section3.limitations.1")}{" "}
              </li>
              <li>
                {t("sotac.section3.limitations.2")}{" "}
              </li>
              <li>
                {t("sotac.section3.limitations.3")}{" "}
              </li>

            </ul>
          </div>
          <div className="mt-2">
            <p className="text-lg font-[550]">{t("sotac.section4.title")}</p>
            <p>{t("sotac.section4.description")}</p>
          </div>

          <div className="mt-2">
            <p className="text-lg font-[550]">{t("sotac.section5.title")}</p>
            <p>{t("sotac.section5.description")}</p>
            <ul className="ml-6 list-disc list-inside">
              <li>
                {t("sotac.section5.points.1")}{" "}
              </li>
              <li>
                {t("sotac.section5.points.2")}{" "}
              </li>
            </ul>
          </div>
          <div className="mt-2">
            <p className="text-lg font-[550]">{t("sotac.section6.title")}</p>
            <p>{t("sotac.section6.description")}</p>
          </div>
          <div className="mt-2">
            <p className="text-lg font-[550]">{t("sotac.section7.title")}</p>
            <p>{t("sotac.section7.description")}</p>
          </div>
          <div className="mt-2">
            <p className="text-lg font-[550]">{t("sotac.section8.title")}</p>
            <p>{t("sotac.section8.description")}</p>
          </div>
          <div className="mt-2">
            <p className="text-lg font-[550]">{t("sotac.section9.title")}</p>
            <p>{t("sotac.section9.description")}</p>
          </div>
        </div>
        <hr />
        {/* Section 11 */}
        <div>
          <p className="text-lg font-[550] ">{t("tac.section11Title")}</p>
          <p>{t("tac.section11Desc")}</p>
        </div>
        <div>
          {/* Section 12 */}
          <p className="text-lg font-[550]">{t("tac.section12Title")}</p>
          <p>{t("tac.section12Intro")}</p>
          <ul className="mt-2 ml-6 list-disc list-inside">
            <li>
              <span className="font-[550]">
                {t("tac.contactEmailTitle")}{" "}
              </span>
              info@theclinicall.com
            </li>
            <li>
              <span className="font-[550]">
                {t("tac.contactHotlineTitle")}{" "}
              </span>
              {t("phone")}
            </li>
          </ul>
        </div>
        <hr />
        <div className="mb-8 border-b pb-6">
          <h1 className="text-lg font-semibold">
            {t("insuranceTerms.title")}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t("insuranceTerms.lastUpdated")}
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-7 ">

          {/* Introduction */}
          <div>
            <p className="text-lg">
              {t("insuranceTerms.intro")}
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <p className="text-lg font-[550] ">
              {t("insuranceTerms.section1Title")}
            </p>
            <p className="mt-2 leading-7">
              {t("insuranceTerms.section1Desc")}
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <p className="text-lg font-[550] ">
              {t("insuranceTerms.section2Title")}
            </p>
            <p className="mt-2 leading-7">
              {t("insuranceTerms.section2Desc")}
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <p className="text-lg font-[550] ">
              {t("insuranceTerms.section3Title")}
            </p>
            <p className="mt-2 leading-7">
              {t("insuranceTerms.section3Desc")}
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <p className="text-lg font-[550] ">
              {t("insuranceTerms.section4Title")}
            </p>
            <p className="mt-2 leading-7">
              {t("insuranceTerms.section4Desc")}
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <p className="text-lg font-[550] ">
              {t("insuranceTerms.section5Title")}
            </p>
            <p className="mt-2 leading-7">
              {t("insuranceTerms.section5Desc")}
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <p className="text-lg font-[550] ">
              {t("insuranceTerms.section6Title")}
            </p>
            <p className="mt-2 leading-7">
              {t("insuranceTerms.section6Desc")}
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <p className="text-lg font-[550] ">
              {t("insuranceTerms.section7Title")}
            </p>
            <p className="mt-2 leading-7">
              {t("insuranceTerms.section7Desc")}
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <p className="text-lg font-[550] ">
              {t("insuranceTerms.section8Title")}
            </p>
            <p className="mt-2 leading-7">
              {t("insuranceTerms.section8Desc")}
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <p className="text-lg font-[550] ">
              {t("insuranceTerms.section9Title")}
            </p>
            <p className="mt-2 leading-7">
              {t("insuranceTerms.section9Desc")}
            </p>
          </div>

        </div>
        {/* Closing */}
        <p className="font-[550]">{t("tac.closing")}</p>
      </div>
    </section>
  );
};

export default Page;
