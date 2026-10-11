import React from "react";
import { labCart } from "../Lab/Interface";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { addToLab } from "@/redux/Slices/LabSlice";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa6";

const LabCart = ({ item }: { item: labCart }) => {
  const dispatch = useAppDispatch();
  const labItem = {
    _id: item._id ?? "",
    name: item.name ?? "",
    category: item.category ?? "",
    mrp: item.discountPrice ? item.discountPrice : item.mrp,
    image:
      "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T104903-drop.png",
    provider: item.provider === "Probe" ? "Probe" : "thyrocare",
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (item) {
      dispatch(addToLab(labItem));
    }
  };
  const labitems = useAppSelector((state) => state.LabSlicer.labitems);
  const added = labitems.some((lab) => lab._id == item._id);
  const { t } = useTranslation();
  return (
    <>
      <Image
        src={
          "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T104903-drop.png"
        }
        alt={item.name || "Lab Image"}
        width={120}
        height={120}
        className="h-20 col-span-2 p-2 border rounded-md w-28"
      />
      <div className="col-span-7 pl-3">
        <p>{item.name}</p>
        <div className="flex items-center justify-between h-10 ">
          {item.discountPrice ? (
            <p className="text-sm flex flex-col  font-[550]  text-[#3A3A3C]">
              <span>{t("moneyCount", { count: item.discountPrice })}</span>
              <span className="line-through">
                {t("moneyCount", { count: item.mrp })}
              </span>
            </p>
          ) : (
            <p className="text-sm  font-[550]  text-[#3A3A3C]">
              {t("moneyCount", { count: item.mrp })}
            </p>
          )}
        </div>
      </div>
      <div className="grid col-span-2 p-3 place-content-end">
        <button
          onClick={handleClick}
          className={`text-[16px] border px-4 py-2 cursor-pointer rounded-md border-solid lg:text-sm xl:text-sm 2xl:text-base font-semibold  ${
            added
              ? "bg-[#E2136E] text-white"
              : "hover:text-[#E2136E] hover:border-[#E2136E]"
          } `}
          disabled={added}
        >
          <FaPlus size={20} />
        </button>
      </div>
    </>
  );
};

export default LabCart;
