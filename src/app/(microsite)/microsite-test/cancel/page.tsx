import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="min-h-[70vh] xl:container xl:mx-auto flex flex-col items-center justify-center">
      <div className="p-16 border rounded-full flex items-center justify-center">
        <Image
          src={"/MediServices/paymentFailed.svg"}
          alt="Payment Failed"
          width={90}
          height={90}
        />
      </div>
      <p className="text-2xl font-medium"> Your Payment Cancel </p>
      <p className="text-sm">Please try Again </p>
    </section>
  );
};

export default page;
