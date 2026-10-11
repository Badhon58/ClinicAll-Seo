import React from "react";
import { labCart } from "./Interface";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { addToLab } from "@/redux/Slices/LabSlice";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa6";
interface LabCartProps {
  item: labCart;
}
// {isHydrated ? PriceConv(product?.price!, language) : null}
const LabCart: React.FC<LabCartProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const labitems = useAppSelector((state) => state.LabSlicer.labitems);
  const added = labitems.some((lab) => lab._id == item._id);
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
    // e.preventDefault();
    if (labItem) {
      dispatch(addToLab(labItem));
    }
  };
  return (
    <div className="p-3 lg:p-3 2xl:p-4 bg-[#FFF4F4] flex flex-col rounded-md min-h-40">

      {/* Truncated text with full visibility on hover */}
      <p className="bg-white p-2 rounded text-[12px] sm:text-xs lg:text-sm font-[650] leading-5 text-[#3A3A3C] text-center h-full">
        {item.name}
      </p>

      <div className="grid grid-cols-4 md:h-10 items-center mt-2">
        <div className="col-span-3">
          {item.discountPrice ? (
            <p className="text-sm md:text-base flex flex-col  font-medium  text-[#3A3A3C]">
              <span>{t("moneyCount", { count: item.discountPrice })}</span>
              <span className="line-through">
                {t("moneyCount", { count: item.mrp })}
              </span>
            </p>
          ) : (
            <p className="text-sm  font-[550]  text-[#3A3A3C]">
              {" "}
              {t("moneyCount", { count: item.mrp })}
            </p>
          )}
        </div>
        <button
          onClick={handleClick}
          className={` border cursor-pointer group col-span-1 size-10 items-center flex justify-center rounded-md 
              ${
                added
                  ? "bg-[#E2136E] text-white"
                  : "hover:text-black hover:border-[#E2136E]"
              }`}
          disabled={added}
        >
          <FaPlus
            size={20}
            className={` ${
              added ? "text-white" : "group-hover:text-[#E2136E]"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default LabCart;
