"use client";
import { useAppSelector } from "@/redux/Hooks";
import React, { useEffect, useState } from "react";

const page = () => {
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <section className="min-h-[70vh]">
      <main className="flex flex-col pt-4 space-y-4 xl:container xl:mx-auto lg:px-10">
        <div className="text-center">
          <h1 className="text-base font-semibold ">
            {isHydrated
              ? language == "bn"
                ? "রিফান্ড পলিসি"
                : "Refund Policy"
              : null}{" "}
          </h1>
          <p className="text-base font-medium ">
            {isHydrated ? (
              language == "bn" ? (
                <>
                  {" "}
                  <span className="font-medium"> কার্যকর তারিখ : </span> ২৮
                  নভেম্বর ২০২৪
                </>
              ) : (
                <>
                  {" "}
                  <span className="font-medium"> Effective Date : </span> 28th
                  Nov 2024
                </>
              )
            ) : null}
          </p>
        </div>
        <div>
          <p className="text-base font-normal">
            {isHydrated
              ? language == "bn"
                ? `CliniCall Limited-এ আমরা নির্ভরযোগ্য ও স্বচ্ছ সেবা প্রদানের জন্য প্রতিশ্রুতিবদ্ধ। এই রিফান্ড পলিসিতে রিফান্ড প্রযোজ্য বা অপ্রযোজ্য পরিস্থিতি এবং রিফান্ড প্রক্রিয়া সম্পর্কে বিস্তারিত উল্লেখ করা হয়েছে।`
                : ` At CliniCall Limited, we are committed to providing reliable and
            transparent services. This Refund Policy outlines the scenarios
            where refunds may or may not apply and provides a clear refund
            process for eligible cases.`
              : null}
          </p>
        </div>
        <hr />
        <div>
          <h2 className="text-base font-semibold">
            {isHydrated
              ? language == "bn"
                ? `১. রিফান্ড প্রযোজ্য নয় এমন ক্ষেত্রে`
                : `1. Non-Refundable Cases`
              : null}{" "}
          </h2>
          {isHydrated ? (
            language == "bn" ? (
              <p className="text-base font-normal">
                নিম্নলিখিত ক্ষেত্রে{" "}
                <span className="font-semibold">
                  {" "}
                  রিফান্ড প্রদান করা হবে না:
                </span>
              </p>
            ) : (
              <p className="text-base font-normal">
                Refunds are{" "}
                <span className="font-semibold"> not applicable </span> for :
              </p>
            )
          ) : null}

          <ul className="list-disc list-inside ">
            <li>
              {isHydrated ? (
                language == "bn" ? (
                  <>
                    <span className="font-semibold"> ডিজিটাল পণ্য : </span>
                    ডাক্তারের পরামর্শ এবং হাসপাতালে ক্যাশব্যাক পণ্য অন্তর্ভুক্ত।
                  </>
                ) : (
                  <>
                    {" "}
                    <span className="font-semibold">
                      {" "}
                      Digital Products:
                    </span>{" "}
                    This includes doctor consultations and hospitalisation
                    cashback products.
                  </>
                )
              ) : null}
            </li>
            <li>
              {isHydrated
                ? language == "bn"
                  ? `পরিষেবা ইতোমধ্যে ব্যবহার করা হয়েছে: কোনো সেবা যদি ব্যবহার করা হয়ে থাকে।`
                  : `Services that have already been availed or utilized.`
                : null}{" "}
            </li>
            <li>
              {isHydrated
                ? language == "bn"
                  ? `সেবার মেয়াদোত্তীর্ণ: নির্ধারিত সময়ের মধ্যে সেবা ব্যবহার না করলে।`
                  : `Failure to utilize a service within its validity period.`
                : null}{" "}
            </li>
            <li>
              {isHydrated
                ? language == "bn"
                  ? `ব্যবহারকারীর ত্রুটি: যেমন পেমেন্ট বা অ্যাক্টিভেশনের সময় ভুল তথ্য প্রদান।`
                  : ` User errors, such as incorrect information provided during payment or activation.`
                : null}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold">
            {" "}
            {isHydrated
              ? language == "bn"
                ? `২. রিফান্ড প্রযোজ্য ক্ষেত্র`
                : ` 2. Refundable Cases`
              : null}
          </h2>
          <p className="text-base font-normal">
            {isHydrated
              ? language == "bn"
                ? `নিম্নলিখিত ক্ষেত্রে রিফান্ড প্রযোজ্য:`
                : `Refunds are only applicable for the following scenarios:`
              : null}
          </p>
          <ul className="px-4 list-decimal list-inside ">
            <li>
              <span className="font-semibold">
                {" "}
                {isHydrated
                  ? language == "bn"
                    ? `মেডিমার্ট / ল্যাব টেস্ট সেকশনের পণ্য:`
                    : ` MediMart / Lab Test Section Products :`
                  : null}{" "}
              </span>{" "}
              <ol className="list-none list-inside ps-5">
                {isHydrated
                  ? language == "bn"
                    ? `যদি কোনো পণ্য ত্রুটিপূর্ণ বা ভুলভাবে ডেলিভারি করা হয় এবং রিফান্ডের জন্য প্রযোজ্য শর্ত পূরণ করে।`
                    : `Refunds may be processed for physical products purchased through
                the MediMart section, provided the request meets the applicable
                criteria (e.g., defective products or wrong items delivered).`
                  : null}
              </ol>
            </li>
            <li>
              <span className="font-semibold">
                {isHydrated
                  ? language == "bn"
                    ? `পরিষেবা অপ্রাপ্যতা : `
                    : `Service Unavailability :`
                  : null}{" "}
              </span>{" "}
              <ol className="list-none list-inside ps-5">
                {isHydrated
                  ? language == "bn"
                    ? `যদি CliniCall Limited-এর কারিগরি সমস্যার কারণে নির্ধারিত সেবা ব্যবহার করা সম্ভব না হয়।`
                    : ` If eligible services are inaccessible due to technical issues caused by CliniCall Limited.`
                  : null}
              </ol>
            </li>
            <li>
              <span className="font-semibold">
                {isHydrated
                  ? language == "bn"
                    ? `ডুপ্লিকেট পেমেন্ট : `
                    : `Duplicate Payments :`
                  : null}{" "}
              </span>{" "}
              <ol className="list-none list-inside ps-5">
                {isHydrated
                  ? language == "bn"
                    ? `একই সেবার জন্য একাধিকবার ভুলক্রমে পেমেন্ট করা হলে।`
                    : `If multiple payments are made mistakenly for the same eligible service.`
                  : null}
              </ol>
            </li>
          </ul>
        </div>
        <hr />
        <div className="space-y-1">
          <div>
            <h2 className="text-base font-semibold">
              {isHydrated
                ? language == "bn"
                  ? `৩. রিফান্ড প্রক্রিয়া`
                  : `3. Refund Process`
                : null}{" "}
            </h2>
            <p className="text-base font-semibold">
              {isHydrated
                ? language == "bn"
                  ? `ধাপ ১: রিফান্ডের জন্য আবেদন করুন`
                  : `Step 1 : Submit a Refund Request`
                : null}
            </p>
            <ul className="list-disc list-inside ps-4">
              <li>
                {isHydrated ? (
                  language == "bn" ? (
                    <>
                      আপনার রিফান্ডের আবেদন{" "}
                      <span className="font-semibold">
                        {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                      </span>
                      ইমেইল করে বা অ্যাপ/ওয়েবসাইটের কন্টাক্ট ফর্ম ব্যবহার করে
                      জমা দিন।
                    </>
                  ) : (
                    <>
                      Send your refund request via email to{" "}
                      <span className="font-semibold">
                        {" "}
                        infot@theclinicall.com{" "}
                      </span>{" "}
                      or use the contact form on the app/website.
                    </>
                  )
                ) : null}
              </li>
              <li>
                {isHydrated
                  ? language == "bn"
                    ? `নিম্নলিখিত তথ্য সংযুক্ত করুন:`
                    : `Include the following information:`
                  : null}

                <ol className="list-disc list-inside ps-5">
                  <li>
                    {isHydrated
                      ? language == "bn"
                        ? `পূর্ণ নাম`
                        : `Full Name`
                      : null}{" "}
                  </li>
                  <li>
                    {isHydrated
                      ? language == "bn"
                        ? `যোগাযোগের তথ্য`
                        : `Contact Information`
                      : null}{" "}
                  </li>
                  <li>
                    {isHydrated
                      ? language == "bn"
                        ? `পেমেন্ট ট্রানজাকশন আইডি`
                        : `Payment Transaction ID`
                      : null}{" "}
                  </li>
                  <li>
                    {isHydrated
                      ? language == "bn"
                        ? `রিফান্ডের কারণ`
                        : `Reason for Refund Request`
                      : null}{" "}
                  </li>
                  <li>
                    {isHydrated
                      ? language == "bn"
                        ? `প্রমাণপত্র (যেমন ট্রানজাকশনের স্ক্রিনশট বা সমস্যার প্রমাণ)`
                        : `Supporting Documents (e.g., screenshots of transactions or proof of issue)`
                      : null}
                  </li>
                </ol>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-base font-semibold">
              {isHydrated
                ? language == "bn"
                  ? `ধাপ ২: রিফান্ড আবেদন যাচাই`
                  : ` Step 2: Verification of Refund Request`
                : null}
            </p>
            <ul className="list-disc list-inside ps-4">
              <li>
                {isHydrated ? (
                  language == "bn" ? (
                    <>
                      আমাদের সাপোর্ট টিম আপনার আবেদন যাচাই করবে ৩ কার্যদিবসের
                      মধ্যে।
                    </>
                  ) : (
                    <>
                      Our support team will review your request within{" "}
                      <span className="font-medium"> 3 business days </span>
                      to verify eligibility.
                    </>
                  )
                ) : null}
              </li>
              <li>
                {isHydrated ? (
                  language == "bn" ? (
                    <>
                      প্রয়োজন হলে আমরা অতিরিক্ত তথ্যের জন্য আপনার সঙ্গে যোগাযোগ
                      করব।
                    </>
                  ) : (
                    <>
                      If necessary, we may contact you for additional
                      information or clarification.
                    </>
                  )
                ) : null}
              </li>
            </ul>
          </div>
          <div>
            <p className="text-base font-semibold">
              {isHydrated
                ? language == "bn"
                  ? `ধাপ ৩: অনুমোদন ও প্রক্রিয়াকরণ`
                  : `Step 3: Approval and Processing`
                : null}
            </p>
            <ul className="list-disc list-inside ps-4">
              <li>
                {isHydrated ? (
                  language == "bn" ? (
                    `অনুমোদিত আবেদন ১০-১২ কার্যদিবসের মধ্যে প্রক্রিয়া করা হবে।`
                  ) : (
                    <>
                      {" "}
                      Approved refund requests will be processed within
                      <span className="font-medium"> 10-12 business days.</span>
                    </>
                  )
                ) : null}
              </li>
              <li>
                {isHydrated
                  ? language == "bn"
                    ? `রিফান্ড মূল পেমেন্ট পদ্ধতিতে জমা হবে।`
                    : `Refunds will be credited back to the original payment method.`
                  : null}
              </li>
            </ul>
          </div>
          <div>
            <p className="text-base font-semibold">
              {isHydrated
                ? language == "bn"
                  ? `ধাপ ৪: রিফান্ডের অবস্থা জানানো`
                  : `Step 4: Notification of Refund Status`
                : null}
            </p>
            <ul className="list-disc list-inside ps-4">
              <li>
                {isHydrated
                  ? language == "bn"
                    ? `রিফান্ড আবেদন অনুমোদিত বা বাতিল হয়েছে কিনা তা ইমেইল/কলের মাধ্যমে আপনাকে জানানো হবে। বাতিল হলে তার কারণও জানানো হবে।`
                    : `You will receive an email/call confirming whether your refund
                request has been approved or denied, along with the reason if
                denied.`
                  : null}
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div>
          <h2 className="text-base font-semibold">
            {isHydrated
              ? language == "bn"
                ? `৪. মেডিমার্ট / ল্যাব রিফান্ডের শর্ত`
                : ` 4. MediMart / Lab Test Refund Criteria`
              : null}
          </h2>
          <p>
            {isHydrated
              ? language == "bn"
                ? `মেডিমার্ট / ল্যাব সেকশনের পণ্যগুলোর ক্ষেত্রে নিম্নলিখিত শর্ত প্রযোজ্য:`
                : `For purchases made in the MediMart / Lab Test section, the following criteria apply:`
              : null}
          </p>
          <ul className="list-disc list-inside ">
            <li>
              <span className="text-base font-semibold">
                {isHydrated
                  ? language == "bn"
                    ? `ত্রুটিপূর্ণ পণ্য  : `
                    : `Defective Products : `
                  : null}{" "}
              </span>
              {isHydrated
                ? language == "bn"
                  ? `ত্রুটিপূর্ণ, ক্ষতিগ্রস্ত বা মেয়াদোত্তীর্ণ পণ্য।`
                  : `Refunds are eligible if the product delivered is defective, damaged, or expired.`
                : null}
            </li>
            <li>
              <span className="text-base font-semibold">
                {isHydrated
                  ? language == "bn"
                    ? `ভুল ডেলিভারি : `
                    : `Wrong Delivery :`
                  : null}{" "}
              </span>
              {isHydrated
                ? language == "bn"
                  ? `ভুল পণ্য ডেলিভারি বা অর্ডারের সাথে মেলেনি।`
                  : `Refunds are eligible for items incorrectly delivered or not matching the order.`
                : null}
            </li>
            <li>
              <span className="text-base font-semibold">
                {isHydrated
                  ? language == "bn"
                    ? `রিটার্ন প্রক্রিয়া : `
                    : ` Return Process : `
                  : null}
              </span>
              {isHydrated ? (
                language == "bn" ? (
                  `পণ্যটি ব্যবহার না করে মূল প্যাকেজিংয়ে ৭ দিনের মধ্যে রিটার্ন করতে হবে।`
                ) : (
                  <>
                    {" "}
                    Products must be returned unused and in their original
                    packaging within{" "}
                    <span className="font-medium"> 7 days of delivery </span> to
                    qualify for a refund.
                  </>
                )
              ) : null}
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-base font-semibold">
            {isHydrated
              ? language == "bn"
                ? `৫. যোগাযোগের তথ্য`
                : `5. Contact Information`
              : null}{" "}
          </h2>
          <p>
            {isHydrated
              ? language == "bn"
                ? `রিফান্ড পলিসি নিয়ে যেকোনো প্রশ্ন বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন:`
                : `For any questions or assistance regarding this Refund Policy, you can contact us:`
              : null}
          </p>
          <ul className="list-disc list-inside ">
            <li>
              {isHydrated ? (
                language == "bn" ? (
                  <>
                    <span className="text-base font-semibold">ইমেইল : </span>
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                  </>
                ) : (
                  <>
                    <span className="text-base font-semibold">Email : </span>
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                  </>
                )
              ) : null}
            </li>
            <li>
              {isHydrated ? (
                language == "bn" ? (
                  <>
                    <span className="text-base font-semibold">ফোন:</span> ০৯৬
                    ৭৭৬ ০১০ ৫০
                  </>
                ) : (
                  <>
                    <span className="text-base font-semibold">Phone : </span>
                    096 776 010 50
                  </>
                )
              ) : null}
            </li>
            <li>
              {isHydrated ? (
                language == "bn" ? (
                  <>
                    {" "}
                    <span className="text-base font-semibold">
                      {" "}
                      ঠিকানা:
                    </span>{" "}
                    বাড়ি: ০৩, রোড: ২, বারিধারা জে ব্লক, ঢাকা।
                  </>
                ) : (
                  <>
                    <span className="text-base font-semibold">Address : </span>
                    House:03, Road:2, Baridhara J Block. Dhaka
                  </>
                )
              ) : null}
            </li>
          </ul>
        </div>
        <hr />
        <p className="font-semibold">
          {isHydrated
            ? language == "bn"
              ? `CliniCall Limited যে কোনো সময়ে পূর্বে নোটিশ ছাড়াই এই রিফান্ড নীতি পরিবর্তন বা আপডেট করার অধিকার রাখে। ব্যবহারকারীদের নিয়মিত এই নীতি পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে যাতে তারা যেকোনো পরিবর্তন সম্পর্কে সচেতন থাকতে পারেন।  `
              : `CliniCall Limited reserves the right to modify or update this Refund
          Policy at any time without prior notice. Users are advised to review
          the policy periodically to stay informed of any changes.`
            : null}
        </p>
        <p>
          {isHydrated
            ? language == "bn"
              ? `CliniCall Limited এর  সাথে থাকার  জন্য আপনাকে ধন্যবাদ।`
              : ` Thank you for choosing CliniCall Limited.`
            : null}
        </p>
      </main>
    </section>
  );
};

export default page;
