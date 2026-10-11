// import React from "react";

// const BATNewAdmin = () => {
//   return (
//     <section className="xl:container xl:mx-auto pt-3">
//       <header>
//         <div className="mt-5 text-center">
//           <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
//             Field Force Information
//           </h2>
//           <p className="mt-2 text-sm text-gray-600 sm:text-base">
//             Please fill out the form to provide your Information
//           </p>
//         </div>
//       </header>
//       <div className="grid lg:grid-cols-4 gap-3">

//       </div>
//     </section>
//   );
// };

// export default BATNewAdmin;
import React from "react";

const BATNewAdmin = () => {
  return (
    <section className="xl:container xl:mx-auto pt-3">
      <div className="text-center bg-green-50">
        <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
          Field Force Information
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Please fill out the form to provide your Information
        </p>
      </div>
      <div className="border min-h-[70vh] p-5">
        <div className="grid lg:grid-cols-2 gap-5 items-center">
          <div>
            <label
              htmlFor="empId"
              className="block text-sm font-medium text-gray-700"
            >
              Employee Id* :
            </label>
            <input
              type="string"
              name="empId"
              id="empId"
              // value={formData.empId}
              // onChange={handleChange}
              placeholder="xxxxxxxx"
              className={`w-full rounded-md border p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none `}
              required
            />
          </div>
          <div>
            <label
              htmlFor="nId"
              className="block text-sm font-medium text-gray-700"
            >
             National Id*
            </label>
            <input
              type="string"
              name="nId"
              id="nId"
              // value={formData.empId}
              // onChange={handleChange}
              placeholder="xxxxxxxx"
              className={`w-full rounded-md border p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none `}
              required
            />
          </div>
          {/* <div className="col-span-2">
            <input
              type="string"
              name="empId"
              id="empId"
              // value={formData.empId}
              // onChange={handleChange}
              placeholder="xxxxxxxx"
              className={`w-full rounded-md border p-3 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none `}
              required
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default BATNewAdmin;
