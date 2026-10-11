"use client";
import React, { useState } from "react";
import PackageBangla from "./PackageBangla";
import { Modal } from "rsuite";
import { IoMdArrowDropright } from "react-icons/io";

const TacForPackageBangla = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const handleModelOpen = () => {
    setModelOpen(!modelOpen);
  };
  const handleClose = () => {
    setModelOpen(false);
  };
  return (
    <div className="w-full ">
      <button
        className="text-sm font-medium cursor-pointer flex items-center"
        onClick={handleModelOpen}
      >
        <IoMdArrowDropright size={17} /> মাসিক পেমেন্টের ক্ষেত্রে কভারেজ বীমা |
      </button>
      <Modal open={modelOpen} onClose={handleClose} size={"lg"}>
        <Modal.Header>
          <Modal.Title className="text-center pt-1">
            মাসিক পেমেন্টের ক্ষেত্রে কভারেজ বীমা |
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2">
            <p className="text-xs">
              প্রতি পলিসি বছরে ইন-পেশেন্ট হাসপাতালাইজেশনের জন্য বার্ষিক সীমা
              পরিকল্পনার অধীনে থাকা সকল ব্যক্তির মধ্যে ভাগ করা হয়। একক পলিসিতে
              অন্তর্ভুক্ত কোনো ব্যক্তির দাবির জন্য কোনো ব্যক্তিগত সীমা প্রযোজ্য
              নয়।{" "}
            </p>
            <p className="text-xs my-0.5">
              বার্ষিক কভারেজ সীমার প্রাপ্যতা নিম্নলিখিত নিয়মের অধীন, তবে B2B
              কভারেজ পরিকল্পনার ক্ষেত্রে এটি প্রযোজ্য নয়।
            </p>
            <ul className="text-xs list-disc list-inside ps-4">
              <li>
                যারা একবারে ১২ মাস/১ বছরের জন্য পলিসি পেমেন্ট সম্পূর্ণ করবেন,
                তারা ইন-পেশেন্ট হাসপাতালাইজেশন কভারেজের বার্ষিক সীমার ১০০%
                অবিলম্বে অ্যাক্সেস পাবেন, তবে প্রযোজ্য অপেক্ষার সময়সীমার শর্ত
                প্রযোজ্য।
              </li>
              <li>
                যারা মাসিক ভিত্তিতে পলিসি পেমেন্ট করবেন, তাদের জন্য ইন-পেশেন্ট
                হাসপাতালাইজেশন সুবিধার বার্ষিক সীমা নিম্নলিখিতভাবে বিতরণ করা
                হবে:
              </li>
            </ul>

            <div className="mb-2 text-xs list-disc list-inside ps-4">
              <li>
                কভারেজ সর্বশেষ পেমেন্ট চক্র পর্যন্ত করা পেমেন্টের সংখ্যার
                ভিত্তিতে বরাদ্দ করা হবে।
              </li>
              <li>
                যেকোনো সময়ে কভারেজ হিসাব করা হয়: “করা পেমেন্টের সংখ্যা” ভাগ
                করা “বছরের জন্য প্রত্যাশিত পেমেন্টের সংখ্যা” দিয়ে এবং তা বার্ষিক
                সীমার সঙ্গে গুণ করা।{" "}
              </li>
              <div className="flex items-center justify-center pt-3 space-x-4">
                <p className="flex flex-col text-center">
                  <span className="italic border-b border-black">
                    করা পেমেন্টের সংখ্যা
                  </span>
                  <span className="italic">
                    বছরের জন্য প্রত্যাশিত পেমেন্টের সংখ্যা
                  </span>
                </p>
                <span>X</span>
                <p className="italic"> বার্ষিক সীমা</p>
                <span>=</span>
                <p className="italic"> মাসের জন্য কভারেজ</p>
              </div>
              <li>
                উদাহরণস্বরূপ, একজন গ্রাহক যদি M4-এ দাবি করেন এবং M1, M2, M3 এবং
                M4-এ পেমেন্ট করে থাকেন, তবে M4-এ তার কভারেজ সীমা হবে 4/12*
                বার্ষিক বীমা বিস্তারিত ।
              </li>
            </div>

            <PackageBangla />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TacForPackageBangla;
