"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import RightNavSection from "./RightNavSection";
import { useTranslation } from "react-i18next";

const NavBar = ({ name }: { name?: string }) => {
  const { t } = useTranslation();
  return (
    <section className="sticky top-0 z-40 bg-[#fff4f4]  ">
      <div className="flex justify-between items-center px-2 py-1  ">
        <aside className=" p-2 flex items-center justify-center space-x-1">
          <Link href={"/microsite-test"}>
            <Image
              alt="Logo Image"
              src="/homeLogo/logo_text.svg"
              className="h-[30px] w-[110px]"
              width={200}
              height={50}
            />
            {/* <p className="text-[8px]">Complete Healthcare in One App</p> */}
            <p className="text-[8px]">{t("micrositetitle")}</p>
          </Link>
        </aside>
        <aside>
          <RightNavSection />
        </aside>
      </div>
    </section>
  );
};

export default NavBar;
