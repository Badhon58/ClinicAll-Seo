"use client";
import React, { useEffect, useState } from "react";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useRouter } from "next/navigation";
import { CareGiverInterface } from "../Interface";
import PageLoading from "@/components/Seo/PageLoading";

const SelectService = ({ slug }: { slug: string }) => {
  const [service, setService] = useState<string>();
  const [services, setServices] = useState<CareGiverInterface[]>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const init = async () => {
    try {
      setLoading(true);
      const { data } = await apiCall(Methods.GET, EndPoint.CARE_GIVER_GET_ALL);
      setServices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // e.preventDefault();
    const value = e.target.value;
    setService(value);
    router.replace(`/allservices/${value.toLowerCase()}`);
  };

  useEffect(() => {
    init();
    setService(slug);
  }, []);
  return loading ? (
    <PageLoading />
  ) : (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="flex flex-col border py-4 px-5 rounded-lg shadow-[-6px_6px_37.4px_0px_#10285130]">
        <label htmlFor="selectservice" className="pb-2">
          Chose your service
        </label>
        <select
          name="selectservice"
          id="#selectservice"
          value={service}
          onChange={handleSelect}
          className="outline-none border p-2"
        >
          {services &&
            services.map((item, index) => {
              return (
                <option
                  // className={`${item.name === service && "text-pink-500"}`}
                  value={item.name}
                  key={index}
                >
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic,
        doloremque.
      </div>
    </div>
  );
};

export default SelectService;
