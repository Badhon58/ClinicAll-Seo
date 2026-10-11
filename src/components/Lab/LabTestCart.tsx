import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { LabCart, removeFromLab, toggleChecked } from "@/redux/Slices/LabSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const LabTestCart = ({
  isHydrated,
  language,
  setCartMenu,
}: {
  isHydrated: boolean;
  language: string;
  setCartMenu: any;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const insideDhaka = useAppSelector((state) => state.LabSlicer.insideDhaka);
  const outSideDhaka = useAppSelector((state) => state.LabSlicer.outsideDhaka);
  const provider = useAppSelector((state) => state.LabSlicer.provider);
  const RemoveFromCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: string
  ) => {
    e.preventDefault();
    dispatch(removeFromLab(item));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: LabCart
  ) => {
    // e.preventDefault();
    dispatch(toggleChecked(item._id!));
  };
  const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCartMenu(false);
    router.replace("/lab");
  };

  const labProduct = provider === "insidedhaka" ? insideDhaka : outSideDhaka;
  return (
    <div className="h-full p-4 overflow-y-auto max-h-[80vh] lg:min-h-[65vh] 2xl:min-h-[75vh] lg:max-h-[76vh] bg-scroll">
      {isHydrated ? (
        labProduct && labProduct.length > 0 ? (
          <>
            {labProduct.map((item, index) => (
              <div
                key={index}
                className="border mb-2 p-2 rounded-md shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] grid grid-cols-11  justify-center "
              >
                <div className="col-span-3 lg:col-span-2 rounded-md bg-[#FFF4F4] flex items-center">
                  <Image
                    src={
                      item?.image ??
                      "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T104903-drop.png"
                    }
                    alt={`${item.name}`}
                    width={100}
                    height={90}
                    className=" p-1.5 2xl:p-2.5"
                  />
                </div>
                <div className=" mx-2 col-span-7 lg:col-span-8 space-y-0.5 justify-center flex flex-col">
                  <h4 className="text-[15px] font-medium 2xl:text-base line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-xs font-medium 2xl:text-sm">
                    {t("moneyCount", { count: item.mrp })}
                  </p>
                  <div className=" flex items-center justify-between space-x-2 w-full lg:w-4/6 2xl:w-3/6 ">
                    <p className="text-xs font-medium 2xl:text-sm">
                      Quantity : 1
                    </p>
                  </div>
                </div>

                <div className="grid  place-items-end col-span-1">
                  <div className="flex flex-col items-center justify-between h-full">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      value={item._id}
                      onChange={(e) => handleCheckboxChange(e, item)}
                      className="accent-pink-500 cursor-pointer"
                    />
                    <button
                      className=""
                      onClick={(e) => item._id && RemoveFromCart(e, item._id)}
                    >
                      <Image
                        src="/other/trash.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-xl font-medium"> {t("Your Cart is Empty")}</p>
            <button
              onClick={handleCart}
              className=" px-2 py-1.5  text-base font-medium  text-white bg-[#EB148C] rounded"
            >
              {t("AddLabTest")}
            </button>
          </div>
        )
      ) : null}
    </div>
  );
};

export default LabTestCart;
