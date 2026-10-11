"use client";
import React from "react";
import "./Stepper.css";
const ClaimStatus = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    "Initiate Claim",
    "Claim Upload",
    "Claim Processing",
    "Approved",
    "Disbursement",
  ];
  return (
    <>
      <div className="flex justify-around">
        {steps?.map((item, index) => (
          <div key={index}>
            <p
              className={`${
                currentStep === index + 1 && "text-[#EB148C] font-medium"
              } ${
                index + 1 < currentStep
                  ? "text-[#EB148C] font-medium"
                  : "text-[#C7C9D9] font-medium"
              }`}
            >
              {index + 1}. {item}
            </p>
          </div>
        ))}
      </div>
      <div className="flex w-full mt-2">
        {steps?.map((item, index) => (
          <div
            key={index}
            className={`${
              index + 1 > currentStep ? "step-item1" : "step-item2"
            } ${currentStep === index + 1 && "active"} ${
              index + 1 < currentStep && "complete"
            }`}
          >
            {index + 1 > currentStep ? (
              <div className="step2"></div>
            ) : (
              <div className="step"></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ClaimStatus;
