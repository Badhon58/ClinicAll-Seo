import moment from "moment";
import Image from "next/image";
import React from "react";

const PrescriptionHeader = ({ data }: { data: any }) => {
  // console.log(data);

  return (
    <>
      <div className="flex ">
        <div className="grid w-full place-items-center ">
          <Image
            src={"/other/logo.svg"}
            alt="Clicnicall Logo"
            width={150}
            height={70}
          />
        </div>
      </div>
      {/* doctor info  */}
      <div className="flex items-center justify-between my-3">
        <div>
          <p className="text-lg font-medium">
            {data?.doctor?.firstName} {data?.doctor?.lastName} (
            {data?.doctor?.degree})
          </p>
          <p>BMDC Number : {data?.doctor?.bmdc}</p>
        </div>
        <p className="font-medium">
          Date : {moment(data?.updatedAt).format("DD/MM/YYYY")}
        </p>
      </div>
      {/* Patient info  */}
    </>
  );
};

export default PrescriptionHeader;
