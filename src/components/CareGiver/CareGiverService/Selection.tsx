// "use client"
// import React, { useEffect, useState } from "react";
// import { CareGiverInterface, isServiceKey, service_key_Value_pair } from "../Interface";
// import { apiCall } from "@/lib/axios-client";
// import { EndPoint, Methods } from "@/api/config";
// import { useTranslation } from "react-i18next";
// import { useRouter, useSearchParams } from "next/navigation";

// const Selection = () => {
//   const [servicesCategory, setServicesCategory] = useState<CareGiverInterface[]>();
//   const [selectedCategory, setSelectedCategory] = useState<string>('')
//   const [subcategory, setSubcategory] = useState<string>('')
//   const [loading, setLoading] = useState(true);
//   const [categoryIdSelect, setCategoryIdSelect] = useState<string>()
//   const { t } = useTranslation();
//   const searchParams = useSearchParams()
//   const type = searchParams.get("type")
//   const router = useRouter()
//   const init = async () => {
//     try {
//       setLoading(true);
//       const { data } = await apiCall(Methods.GET, EndPoint.CARE_GIVER_CATEGORY_GET_ALL);
//       // console.log(data);

//       setServicesCategory(data);
//       setSelectedCategory(type?.toString() || "babysitter")
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleSelectChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const id = e.target.value;
//     setCategoryIdSelect(id)
//     const selectedItem = servicesCategory?.find(item => item._id === id);
//     const key = selectedItem?.name.toLowerCase();

//     if (!key || !isServiceKey(key)) return;

//     setSelectedCategory(key);

//     router.push(`/allservices/caregiver?type=${key}&careGiverId=${id}`);
//   }

//   const handleSubCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const name = e.target.value
//     setSubcategory(name)
//     if (!categoryIdSelect) {
//       router.push(`/allservices/caregiver?type=${selectedCategory}&subtype=${name}`)
//       return
//     }
//   }
//   useEffect(() => {
//     init();
//   }, []);

//   return loading ? "" : (
//     <div className="p-4 flex flex-col shadow-[-6px_6px_17.5px_1px_#10285130] rounded-md">

//       <div>
//         <label htmlFor="">Chose your service</label>
//         <select
//           name="category"
//           id=""
//           className="p-2 outline-none border rounded-md mt-2 w-full cursor-pointer"
//           value={selectedCategory}
//           onChange={handleSelectChanged}

//         >
//           {servicesCategory && servicesCategory.map((item, index) => {
//             const key = item.name.toLowerCase();

//             if (!isServiceKey(key)) return null;
//             return (
//               <option key={index} value={item._id}>
//                 {t(service_key_Value_pair[key])}
//               </option>
//             );
//           })}

//         </select>
//       </div>

//       <div>
//         {type === "nurse" &&
//           <select
//             name="subcategory"
//             id="subcategory"
//             className="p-2 outline-none border rounded-md mt-2 w-full cursor-pointer"
//             value={subcategory}
//             onChange={handleSubCategory}
//           >
//             <option value="normal">Normal patient</option>
//             <option value="critical">Critical patient</option>
//           </select>
//         }
//       </div>
//     </div>
//   );
// };

// export default Selection;


"use client";
import React, { useEffect, useState } from "react";
import {
  CareGiverInterface,
  isServiceKey,
  service_key_Value_pair,
} from "../Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

const Selection = () => {
  const [servicesCategory, setServicesCategory] = useState<
    CareGiverInterface[]
  >([]);
  const [selectedId, setSelectedId] = useState<string>(""); // 🔥 main source of truth
  const [subcategory, setSubcategory] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const { t, i18n } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get("type");

  // 🔹 Fetch data
  const init = async () => {
    try {
      setLoading(true);
      const { data } = await apiCall(
        Methods.GET,
        EndPoint.CARE_GIVER_CATEGORY_GET_ALL
      );

      setServicesCategory(data);

      // 🔥 set initial selected id from URL
      if (type) {
        setSelectedId(type);
      } else if (data?.length) {
        setSelectedId(data[0]._id); // fallback
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  // 🔹 Handle category change
  const handleSelectChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);

    const selectedItem = servicesCategory.find(
      (item) => item.name === id
    );

    const key = selectedItem?.name;

    // if (!key || !isServiceKey(key)) return;
    // console.log(key);

    router.push(
      `/allservices/caregiver?type=${key}`
    );
  };

  // 🔹 Handle subcategory
  // const handleSubCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const name = e.target.value;
  //   setSubcategory(name);

  //   const selectedItem = servicesCategory.find(
  //     (item) => item._id === selectedId
  //   );

  //   const key = selectedItem?.name.toLowerCase();

  //   if (!key || !isServiceKey(key)) return;

  //   router.push(
  //     `/allservices/caregiver?type=${key}&subtype=${name}&careGiverId=${selectedId}`
  //   );
  // };

  return (
    <div className="p-4 flex flex-col shadow-[-6px_6px_17.5px_1px_#10285130] rounded-md">
      {/* Category */}
      <div>
        <label className="text-[17px] font-[550] py-2">{t("caregiver.serviceHeadline")}</label>
        <select
          className="p-2 outline-none border rounded-md mt-2 w-full cursor-pointer"
          value={selectedId} // ✅ correct binding
          onChange={handleSelectChanged}
        >
          {loading ?
            <option value="Loading..">Loading...</option>
            :
            servicesCategory && servicesCategory.map((item) => {
              const key = item.name;
              // if (!isServiceKey(key)) return null;

              return (
                <option key={item._id} value={item.name} >
                  {i18n.language === "bn" ? item.bnName : item.name}
                </option>
              );
            })
          }

        </select>
      </div>

      {/* Subcategory */}
      {/* {type === "nurse" && (
        <div>
          <select
            className="p-2 outline-none border rounded-md mt-2 w-full cursor-pointer"
            value={subcategory}
            onChange={handleSubCategory}
          >
            <option value="normal">Normal patient</option>
            <option value="critical">Critical patient</option>
          </select>
        </div>
      )} */}
    </div>
  );
};

export default Selection;