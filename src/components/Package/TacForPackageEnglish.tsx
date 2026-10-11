"use client";
import React, { useState } from "react";
import PackageTable from "./PackageTable";
import { Modal } from "rsuite";
import { IoMdArrowDropright } from "react-icons/io";

const TacForPackageEnglish = () => {
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
        <IoMdArrowDropright size={17} /> COVERAGE LIMITS IN CASE MONTHLY PAYMENT
      </button>

      <Modal open={modelOpen} onClose={handleClose} size={"lg"}>
        <Modal.Header>
          <Modal.Title className="text-center pt-1 font-semibold">
            COVERAGE LIMITS IN CASE MONTHLY PAYMENT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2">
            <p className="text-xs">
              The annual limit for In-patient Hospitalization per policy year is
              shared amongst all the people covered under the plan. There is no
              individual limit applied to the amount for which any one
              individual covered under a shared policy may claim.{" "}
            </p>
            <p className="text-xs my-0.5">
              The annual coverage limit availability is subject to the following
              rules, except for the B2B Coverage Plan
            </p>
            <ul className="text-xs list-disc list-inside ps-4">
              <li>
                Subscribers paying for the policy for 12 months/1 year upfront
                shall have access to 100% of the annual limit for the in-patient
                hospitalization coverage immediately, subject to the applicable
                waiting periods.
              </li>
              <li>
                For subscribers paying for the policy on monthly basis, the
                annual limit for the in-patient hospitalization benefit will be
                distributed as follow:
              </li>
            </ul>
            <div className="mb-2 text-xs list-disc list-inside ps-4">
              <li>
                Coverage will be allocated based on the number of payments made
                till the last payment cycle.
              </li>
              <li>
                At any given time, coverage is calculated as: “number of
                payments made” divided by “number of expected payments for the
                year” multiplied by annual limit.{" "}
              </li>
              <div className="flex items-center justify-center p-3 space-x-4">
                <p className="flex flex-col text-center">
                  <span className="italic border-b border-black">
                    Number of Payments made
                  </span>
                  <span className="italic">
                    Number of expected payments for the year
                  </span>
                </p>
                <span>X</span>
                <p className="italic"> Annual limit</p>
                <span>=</span>
                <p className="italic"> Coverage for the month</p>
              </div>
              <li>
                For example, a subscriber claiming in M4, and having paid in,
                M1, M2, M3 & M4 would have a coverage limit of 4/12*Annual limit
                in M4.
              </li>
            </div>
            <PackageTable />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TacForPackageEnglish;
