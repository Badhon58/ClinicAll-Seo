"use client";
import { useAppSelector } from "@/redux/Hooks";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HealthSeo = () => {
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const { t } = useTranslation();
  return (
    <section className=" bg-[#16020B] pb-2.5 p-2 md:p-0">
      <div className="xl:container flex flex-col  border-b border-gray-600  space-y-4 xl:mx-auto text-gray-300 pt-4">
        <hr className="border-b border-gray-600 " />

        {isHydrated ? (
          language == "bn" ? (
            <>
              <div>
                <p className="text-base font-semibold mt-2">
                  {t("healthpackagetitle")}
                </p>
                <p className="my-2">কেন হেলথ প্যাকেজ বেছে নেবেন?</p>
                <p>
                  স্বাস্থ্য বিমা মূলত বড় চিকিৎসা খরচ বা হাসপাতালে ভর্তি হওয়ার
                  সময় কাজে লাগে। কিন্তু হেলথ প্যাকেজ আপনাকে আরও অনেক বেশি
                  সুবিধা দেয়, যেমন নিয়মিত ডাক্তারের সাথে পরামর্শ থেকে শুরু করে
                  হাসপাতাল ক্যাশব্যাক পর্যন্ত।
                </p>
              </div>
              <div>
                <h2 className="text-base font-semibold mb-1.5">
                  হেলথ ইন্স্যুরেন্স ও হেলথ প্যাকেজের মধ্যে পার্থক্য
                </h2>
                <p className="text-sm">
                  <span className="text-base font-semibold">
                    বাংলাদেশে স্বাস্থ্য বিমা{" "}
                  </span>
                  মূলত মেডিক্যাল খরচের নিরাপত্তা দেয়, কিন্তু আমাদের হেলথ
                  প্যাকেজগুলো মেডিক্যাল খরচের নিরাপত্তার পাশাপাশি আপনাকে
                  দৈনন্দিন স্বাস্থ্য সেবার সকল সুবিধা প্রদান করে থাকে। আমাদের
                  হেলথ প্যাকেজে গুলো সাশ্রয়ী মূল্যে আপনার স্বাস্থ্য সেবা
                  নিশ্চিত করে।
                </p>
              </div>
              <div>
                <h2 className="text-base font-semibold">
                  আমাদের হেলথ প্যাকেজগুলোতে পাবেন:
                </h2>
                <ul className="list-disc pl-9 pt-2 text-sm">
                  <li>
                    <span className="text-sm font-semibold">
                      অনলাইন ডাক্তার পরামর্শ:
                    </span>{" "}
                    যখনই প্রয়োজন, সরাসরি ডাক্তারের সাথে কথা বলতে পারবেন, ঘরে
                    বসেই।
                  </li>
                  <li>
                    <span className="text-sm font-semibold">
                      বিশেষজ্ঞ ডাক্তার অ্যাপয়েন্টমেন্ট :
                    </span>{" "}
                    সহজেই বিশেষজ্ঞ ডাক্তারদের পরামর্শ নিন অনলাইন
                    অ্যাপয়েন্টমেন্ট এর মাধ্যমে, কোন ঝামেলা ছাড়াই।
                  </li>
                  <li>
                    <span className="text-sm font-semibold">
                      হাসপাতাল ক্যাশব্যাক সুবিধা :
                    </span>{" "}
                    হাসপাতাল খরচের উপর -{" "}
                    <span className="text-sm font-semibold">
                      ২,০০,০০০ টাকা{" "}
                    </span>{" "}
                    পর্যন্ত ক্যাশব্যাক সুবিধা পাবেন, যেটি নিরাপদ করবে আপনার
                    চিকিৎসা সেবা ।
                  </li>
                  <li>
                    <span className="text-sm font-semibold">
                      ওপিডি (আউটপেশেন্ট) সেবা :
                    </span>{" "}
                    হাসপাতাল ক্যাশব্যাক ছাড়াও আপনার বাহিরে ডাক্তার দেখানোর মত
                    খরচও গুলোও কভার করা হয় ক্লিনিকল হেলথ প্যাকেজ এর মাধ্যমে।
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-base font-semibold my-1">
                  সাশ্রয়ী এবং ব্যাপক স্বাস্থ্যসেবা
                </h2>
                <p>
                  <span className="text-base font-semibold">CliniCall</span> এর
                  হেলথ প্যাকেজগুলো এমনভাবে তৈরি করা হয়েছে যাতে আপনি{" "}
                  <span className="text-base font-semibold">
                    {" "}
                    সাশ্রয়ী মূল্যে
                  </span>{" "}
                  সর্বোচ্চ স্বাস্থ্যসেবার সুবিধা পাবেন। ডাক্তার পরামর্শ থেকে
                  শুরু করে হাসপাতাল ক্যাশব্যাক পর্যন্ত আমরা নিশ্চিত করছি
                  স্বাস্থ্যসেবার সকল সমাধান।
                </p>
              </div>
              <div>
                <h2 className="text-base font-semibold my-1">
                  আজই আপনার স্বাস্থ্য সুরক্ষা নিশ্চিত করুন
                </h2>
                <p>
                  আমাদের হেলথ প্যাকেজগুলো আপনাকে আরো সহজে এবং কম খরচে সেরা
                  স্বাস্থ্য সেবা দিচ্ছে। আজই আমাদের হেলথ প্যাকেজ নিয়ে আপনার
                  স্বাস্থ্য সুরুক্ষা নিশ্চিত করুন এবং সব ধরনের স্বাস্থ্যসেবা
                  উপভোগ করুন, আরও সহজে এবং সাশ্রয়ী মূল্যে!
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="">
                <p className="text-base text-start text-white font-semibold mt-2">
                  Health Insurance in Bangladesh : Discover Affordable Digital
                  Health Solutions with Extra Benefits
                </p>
                <p className="pt-2 text-justify text-sm">
                  When it comes to{" "}
                  <span className="text-sm font-semibold">
                    best health insurance in Bangladesh
                  </span>{" "}
                  , many people think of protection against unexpected medical
                  expenses. However, online health services (Package) offer a
                  more comprehensive and accessible solution that not only
                  covers emergency needs but also provides regular access to
                  health care services. At CliniCall Limited, we provide
                  tailored online health services designed to give you the best
                  care at an affordable price.
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold  text-white">
                  {" "}
                  Why Choose a Digital Health Solution?
                </h2>
                <p className="text-sm pt-1">
                  Digital healthcare solutions are a convenient way to ensure
                  your health is taken care of without the high costs usually
                  associated with best health insurance in Bangladesh. While
                  traditional{" "}
                  <span className="text-sm font-semibold">
                    {" "}
                    health insurance in Bangladesh{" "}
                  </span>
                  primarily focuses on financial coverage during hospitalization
                  or major medical procedures, health packages go beyond that by
                  offering more immediate and practical benefits like
                  <span className="text-sm font-semibold">
                    {" "}
                    online medical doctor consultations,
                  </span>{" "}
                  online{" "}
                  <span className="text-sm font-semibold">
                    {" "}
                    online appointments from specialized doctor list,
                  </span>{" "}
                  and even{" "}
                  <span className="text-sm font-semibold">
                    {" "}
                    hospital cashback.
                  </span>
                </p>
                <p className="text-sm pt-1">
                  At <span className="text-sm font-semibold">CliniCall </span> ,
                  our health packages provide all the essential health care
                  services you need, such as:
                </p>
                <ul className="list-disc pl-5 pt-2 text-sm">
                  <li>
                    <span className="text-sm font-semibold">
                      Direct Access to Doctors
                    </span>{" "}
                    Consult 24/7 online doctor in Bangladesh from specialized
                    doctor list through our platform, saving you the hassle of
                    long waits at the clinic.
                  </li>
                  <li>
                    <span className="text-sm font-semibold">
                      {" "}
                      Specialist Appointments
                    </span>{" "}
                    : Book appointments with top specialists easily through our
                    app or website.
                  </li>
                  <li>
                    <span className="text-sm font-semibold">
                      {" "}
                      Hospital Cashback
                    </span>{" "}
                    : Enjoy up to{" "}
                    <span className="text-sm font-semibold">
                      2,00,000 taka{" "}
                    </span>{" "}
                    in cashback on hospital expenses, ensuring you're financial
                    coverage of your medical expenses.
                  </li>
                  <li>
                    <span className="text-sm font-semibold"> OPD Services</span>{" "}
                    : Get coverage for outpatient services, including
                    diagnostics and treatments, ensuring you don’t have to worry
                    about regular medical costs.
                  </li>
                </ul>
              </div>
              <div className="">
                <h2 className="text-base font-semibold mt-2  text-white">
                  How Our Health Package Differs from Traditional Health
                  Insurance
                </h2>
                <p className="pt-2 text-justify text-sm">
                  While{" "}
                  <span className="text-sm font-semibold">
                    health insurance in Bangladesh
                  </span>
                  , is essential for major medical expenses, our health packages
                  are designed to give you everyday health care access, helping
                  you stay on top of your health without waiting for a crisis.
                  With our packages, you get affordable health care solutions
                  that include consultations, hospital cashback, and additional
                  coverage for OPD services.
                </p>
                <p className="pt-2 text-justify text-sm">
                  This means you can stay healthier for less, using our
                  comprehensive Digital Health Solutions to cover your daily
                  health care needs. Our packages provide financial peace of
                  mind while ensuring you have direct access to the best
                  doctors, both general and specialist.
                </p>
              </div>
              <div className="">
                <h2 className="text-base font-semibold mt-2  text-white">
                  Affordable and Comprehensive Care
                </h2>
                <p className="pt-2 text-justify text-sm">
                  At <span className="text-sm font-semibold">CliniCall</span>,
                  our health packages are designed to provide
                  <span className="text-sm font-semibold">
                    {" "}
                    comprehensive care{" "}
                  </span>
                  at a price that suits your budget whether you’re looking for
                  the essential health care services you require, while also
                  providing the financial benefits of
                  <span className="text-sm font-semibold">
                    {" "}
                    hospital cashback
                  </span>{" "}
                  and <span className="text-sm font-semibold"> OPD </span>
                  coverage
                </p>
              </div>
              <div className="pb-3">
                <h2 className="text-base font-semibold  text-white">
                  Ready to Secure Your Health?
                </h2>
                <p className="text-justify text-sm pt-0.5">
                  Instead of relying solely on traditional{" "}
                  <span className="font-semibold">
                    {" "}
                    health insurance in Bangladesh
                  </span>{" "}
                  health insurance in Bangladesh, explore the more immediate and
                  accessible benefits of our Digital Health Solutions. These packages
                  ensure you're covered not just for emergencies but for
                  everyday health needs too, giving you peace of mind and better
                  access to care.
                </p>
              </div>
            </>
          )
        ) : null}
      </div>
    </section>
  );
};

export default HealthSeo;
