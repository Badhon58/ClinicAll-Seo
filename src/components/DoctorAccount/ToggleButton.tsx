"use client";
import { EndPoint, FormDataHeader, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Toggle } from "rsuite";

const ToggleButton = ({
  data,
  doctorId,
  Checked,
}: {
  data: string;
  doctorId: string;
  Checked: boolean;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(Checked);
  const handleActive = async (value: boolean) => {
    setIsChecked(value);
    try {
      const form = new FormData();
      if (value === false) {
        // console.log("False Value");
        form.append("isAvailable", JSON.stringify(false));
        const response = await apiCall(
          Methods.PATCH,
          `${EndPoint.DOCTOR_UPDATE_BY_ID}/${doctorId}`,
          form,
          FormDataHeader
        );
        // toast.warn("Unavailable")
      } else {
        // console.log("true Value");
        form.append("isAvailable", JSON.stringify(true));
        const response = await apiCall(
          Methods.PATCH,
          `${EndPoint.DOCTOR_UPDATE_BY_ID}/${doctorId}`,
          form,
          FormDataHeader
        );
        // toast.success("Available");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {data === "inhouse_doctor" && (
        <Toggle
          checkedChildren="Available"
          unCheckedChildren="Unavailable"
          checked={isChecked}
          onChange={(value) => handleActive(value)}
          color="blue"
        />
      )}
    </>
  );
};

export default ToggleButton;
