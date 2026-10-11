"use client";
import { useAppSelector } from "@/redux/Hooks";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import LabTestCart from "./LabTestCart";
import { Badge, Drawer } from "rsuite";
import { useTranslation } from "react-i18next";

const LabAmount = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [cartMenu, setCartMenu] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const insideDhaka = useAppSelector((state) => state.LabSlicer.insideDhaka);
  const outSideDhaka = useAppSelector((state) => state.LabSlicer.outsideDhaka);
  const provider = useAppSelector((state) => state.LabSlicer.provider);
  const language = useAppSelector((state) => state.languageSlice.language);
  const labTotalQuantity = useAppSelector(
    (state) => state.LabSlicer.labTotalQuantity
  );

  // ✅ derive labProduct directly from Redux
  const labProduct = provider === "insidedhaka" ? insideDhaka : outSideDhaka;

  // ✅ compute values instead of storing them
  const checkedLength = useMemo(
    () => labProduct.reduce((acc, item) => (item.checked ? acc + 1 : acc), 0),
    [labProduct]
  );
  const total = useMemo(
    () =>
      labProduct.reduce((acc, item) => {
        return item.checked ? acc + (item.itemCost || 0) : acc;
      }, 0),
    [labProduct]
  );

  const handleLabModelOpen = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (labTotalQuantity > 0) setCartMenu(!cartMenu);
  };

  const handleLabModelClose = (e: any) => {
    e.preventDefault();
    setCartMenu(!cartMenu);
  };

  const handleRoute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/lab/checkout");
    setCartMenu(false);
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <section className={`${labProduct.length > 0 ? "block" : "hidden"}`}>
      <Drawer
        placement={"right"}
        open={cartMenu}
        onClose={handleLabModelClose}
        className="responsive-drawer"
      >
        <Drawer.Header>
         
           <div className="w-full flex items-center justify-center">
            <div className="relative">
              <p className="font-semibold 2xl:text-xl text-center mt-2">
                {t("Lab Cart")}
              </p>
              {/* <span className="absolute flex items-center justify-center top-1 -right-1 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white size-5 text-xs rounded-full">
                {t("numberconvert", { count: labProduct.length })}
              </span> */}
            </div>
          </div>
        </Drawer.Header>

        {/* Cart Items */}
        <LabTestCart
          isHydrated={isHydrated}
          language={language}
          setCartMenu={setCartMenu}
        />
        <div className="absolute bottom-0 w-full bg-white">
          <p className="flex justify-between text-base  p-2 2xl:p-4 text-[#EB148C] font-semibold border-t">
            <span>{t("product_price")}</span>
            <span>{t("moneyCount", { count: total })}</span>
          </p>
          {/* Checkout */}
          <button
            onClick={handleRoute}
            disabled={checkedLength == 0 && true}
            className=" z-20 w-full p-2 bg-[#EB148C] text-white mb-1 2xl:text-xl text-center border rounded-lg 2xl:p-4"
          >
            {t("Checkout")}
          </button>
        </div>
      </Drawer>

      {/* Floating Cart Button */}
      <div
        onClick={handleLabModelOpen}
        className="fixed left-[83%] sm:left-[91%] md:left-[93%] lg:left-[95%] cursor-pointer rounded-md bg-[#fff4f4] w-[64px] h-[62px] 2xl:left-[96%] z-20 top-[62%] bg-opacity-95"
      >
        <div className="bg-[#fbd2e6] p-2.5 h-[46px] flex flex-col space-y-1 items-center justify-center rounded-t-[5px]">
          <Image
            src={"/services/labtest.svg"}
            width={19}
            height={19}
            alt="Lab Item Logo"
          />
          {isHydrated && (
            <p className="text-[9px] font-semibold">
              {t("numberconvert", { count: checkedLength })} ITEMS
            </p>
          )}
        </div>

        {isHydrated && (
          <p className="text-[9px] text-center font-semibold py-0.5">
            {t("moneyCount", { count: total })}
          </p>
        )}
      </div>
    </section>
  );
};

export default LabAmount;
