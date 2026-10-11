"use client";
import { useEffect, useState } from "react";
import RingToneConcent from "./RingToneConcent";

const ConcentWraper = () => {
  const [role, setRole] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = localStorage.getItem("role");
      setRole(userRole);
      // console.log("RRRRRRRR2", role);
    }
  }, []);

  return role && role == "inhouse_doctor" && <RingToneConcent />;
};

export default ConcentWraper;
