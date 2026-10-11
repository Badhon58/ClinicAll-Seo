// "use client";
// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import {
//   DateSlot,
//   TimeSlot,
//   groupedOptions,
//   initialState,
//   timeRange,
// } from "./interface";
// import { getDoctorId } from "@/lib/authHandler";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { apiCall } from "@/lib/axios-client";
// import { EndPoint, FormDataHeader, Methods } from "@/api/config";
// import PageLoading from "../Seo/PageLoading";
// import { Modal } from "rsuite";
// import { IoWarning } from "react-icons/io5";
// const VisitingHour = () => {
//   const [DoctorInfo, setDoctorInfo] = useState<initialState>();
//   const [doc_ID_, setDoc_ID] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [AddNewSchedule, setAddNewSchedule] = useState(false);
//   const [CancelModelOpen, setCancelModelOpen] = useState(false);
//   const [rangeNumber, setRangeNumber] = useState<number>(30);

//   //Button State
//   const [Saturday, setSaturday] = useState(false);
//   const [Sunday, setSunday] = useState(false);
//   const [Monday, setMonday] = useState(false);
//   const [Tuesday, setTuesday] = useState(false);
//   const [Wednesday, setWednesday] = useState(false);
//   const [Thursday, setThursday] = useState(false);
//   const [Friday, setFriday] = useState(false);

//   //Time Collection
//   const [saturdayTimeCollection, setSaturdayTimeCollection] =
//     useState<DateSlot[]>();
//   const [sundayTimeCollection, setSundayTimeCollection] =
//     useState<DateSlot[]>();
//   const [mondayTimeCollection, setMondayTimeCollection] =
//     useState<DateSlot[]>();
//   const [thesdayTimeCollection, setThesdayTimeCollection] =
//     useState<DateSlot[]>();
//   const [WednesdayTimeCollection, setWednesdayTimeCollection] =
//     useState<DateSlot[]>();
//   const [ThursdayTimeCollection, setThursdayTimeCollection] =
//     useState<DateSlot[]>();
//   const [fridayTimeCollection, setFridayTimeCollection] =
//     useState<DateSlot[]>();

//   const router = useRouter();
//   //Button handle Change
//   const handleSaturday = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setSaturday(!Saturday);
//   };
//   const handleSunday = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setSunday(!Sunday);
//   };
//   const handleMonday = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setMonday(!Monday);
//   };
//   const handleTuesday = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setTuesday(!Tuesday);
//   };
//   const handleWednesday = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setWednesday(!Wednesday);
//   };
//   const handleThursday = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setThursday(!Thursday);
//   };
//   const handleFriday = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setFriday(!Friday);
//   };

//   // initFunction
//   const init = async () => {
//     try {
//       setLoading(true);
//       const doctorId = await getDoctorId();
//       setDoc_ID(doctorId || "");
//       // const { data } = await getsingleDoctors(doctorId);
//       const { data } = await apiCall(
//         Methods.GET,
//         `${EndPoint.DOCTOR_FIND_BY_ID}/${doctorId}`
//       );
//       setDoctorInfo(data);
//       return data;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // day and time collection for Saturday
//   const handleSaturdayTimeSlot = (selectedOptions: any) => {
//     const timeSlots: TimeSlot[] = selectedOptions.map((option: any) => {
//       const [time, period] = option.value.split(" & ");
//       return { time, period };
//     });
//     const newDateSlot: DateSlot = {
//       date: "Saturday",
//       timeSlots,
//     };
//     setSaturdayTimeCollection([newDateSlot]);
//   };

//   // day and time collection for Sunday
//   const handleSundaytimeSlot = (selectedOptions: any) => {
//     const timeSlots: TimeSlot[] = selectedOptions.map((option: any) => {
//       const [time, period] = option.value.split(" & ");
//       return { time, period };
//     });
//     const newDateSlot: DateSlot = {
//       date: "Sunday",
//       timeSlots,
//     };
//     setSundayTimeCollection([newDateSlot]);
//   };

//   // day and time collection for Monday
//   const handleMondayTimeSlot = (selectedOptions: any) => {
//     const timeSlots: TimeSlot[] = selectedOptions.map((option: any) => {
//       const [time, period] = option.value.split(" & ");
//       return { time, period };
//     });
//     const newDateSlot: DateSlot = {
//       date: "Monday",
//       timeSlots,
//     };
//     setMondayTimeCollection([newDateSlot]);
//   };

//   // day and time collection for TuesDay
//   const handleTuesDayTimeSlot = (selectedOptions: any) => {
//     const timeSlots: TimeSlot[] = selectedOptions.map((option: any) => {
//       const [time, period] = option.value.split(" & ");
//       return { time, period };
//     });
//     const newDateSlot: DateSlot = {
//       date: "TuesDay",
//       timeSlots,
//     };
//     setThesdayTimeCollection([newDateSlot]);
//   };

//   // day and time collection for Wednesday
//   const handleWednesdayTimeSlot = (selectedOptions: any) => {
//     const timeSlots: TimeSlot[] = selectedOptions.map((option: any) => {
//       const [time, period] = option.value.split(" & ");
//       return { time, period };
//     });
//     const newDateSlot: DateSlot = {
//       date: "Wednesday",
//       timeSlots,
//     };
//     setWednesdayTimeCollection([newDateSlot]);
//   };

//   // day and time collection for Thursday
//   const handleThursdayTimeSlot = (selectedOptions: any) => {
//     const timeSlots: TimeSlot[] = selectedOptions.map((option: any) => {
//       const [time, period] = option.value.split(" & ");
//       return { time, period };
//     });
//     const newDateSlot: DateSlot = {
//       date: "Thursday",
//       timeSlots,
//     };
//     setThursdayTimeCollection([newDateSlot]);
//   };

//   // day and time collection for Friday
//   const handleFridayTimeSlot = (selectedOptions: any) => {
//     const timeSlots: TimeSlot[] = selectedOptions.map((option: any) => {
//       const [time, period] = option.value.split(" & ");
//       return { time, period };
//     });
//     const newDateSlot: DateSlot = {
//       date: "Friday",
//       timeSlots,
//     };
//     setFridayTimeCollection([newDateSlot]);
//   };

//   // Handle Cancel
//   const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setAddNewSchedule(false);
//     setSaturday(false);
//     setSunday(false);
//     setMonday(false);
//     setTuesday(false);
//     setWednesday(false);
//     setThursday(false);
//     setFriday(false);
//   };

//   //All Delete
//   const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const updatedDateSlots: any = [];
//       const form = new FormData();
//       form.append("dateSlot", JSON.stringify(updatedDateSlots));
//       const response = await apiCall(
//         Methods.PATCH,
//         `${EndPoint.DOCTOR_UPDATE_BY_ID}/${doc_ID_}`,
//         form,
//         FormDataHeader
//       );
//       if (response.success) {
//         setCancelModelOpen(false);
//         router.refresh();
//         toast.warning("All Date has Been Deleted");
//         init();
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Single Remove Date
//   const handleRemoveDate = async (
//     e: React.MouseEvent<HTMLButtonElement>,
//     index: any
//   ) => {
//     e.preventDefault();

//     const updatedDateSlots = [...(DoctorInfo?.dateSlot || [])];
//     updatedDateSlots.splice(index, 1);
//     const form = new FormData();
//     form.append("dateSlot", JSON.stringify(updatedDateSlots));
//     try {
//       const response = await apiCall(
//         Methods.PATCH,
//         `${EndPoint.DOCTOR_UPDATE_BY_ID}/${doc_ID_}`,
//         form,
//         FormDataHeader
//       );
//       if (response.success) {
//         toast.warning("Date Has been Deleted", {
//           position: "top-right",
//           hideProgressBar: true,
//           autoClose: 3000,
//         });
//         init();
//       } else {
//         toast.error("Something Went Wrong.", {
//           position: "top-right",
//           hideProgressBar: true,
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //Select Range
//   const handleSelectRange = (selectedOptions: any) => {
//     setRangeNumber(parseInt(selectedOptions.value.toString()));
//   };

//   //Submit
//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     const mapTimeCollection = (
//       timeCollection: DateSlot[],
//       startDate: string
//     ) => {
//       return timeCollection.map((slot, index) => ({
//         ...slot,
//         date: startDate,
//       }));
//     };

//     const combinedTimeCollection: DateSlot[] = [];
//     const daysOfWeek = [
//       saturdayTimeCollection,
//       sundayTimeCollection,
//       mondayTimeCollection,
//       thesdayTimeCollection,
//       WednesdayTimeCollection,
//       ThursdayTimeCollection,
//       fridayTimeCollection,
//     ];
//     for (let i = 0; i < rangeNumber; i++) {
//       const date = moment().add(i, "days");
//       const dayName = date.format("dddd");
//       const formattedDate = date.format("YYYY-MM-DD");
//       if (dayName === "Saturday") {
//         const timeCollection = daysOfWeek[0];
//         if (timeCollection) {
//           const updatedCollection = mapTimeCollection(
//             timeCollection,
//             formattedDate.toString()
//           );
//           combinedTimeCollection.push(...updatedCollection);
//         }
//       } else if (dayName === "Sunday") {
//         const timeCollection = daysOfWeek[1];
//         if (timeCollection) {
//           const updatedCollection = mapTimeCollection(
//             timeCollection,
//             formattedDate.toString()
//           );
//           combinedTimeCollection.push(...updatedCollection);
//         }
//       } else if (dayName === "Monday") {
//         const timeCollection = daysOfWeek[2];
//         if (timeCollection) {
//           const updatedCollection = mapTimeCollection(
//             timeCollection,
//             formattedDate.toString()
//           );
//           combinedTimeCollection.push(...updatedCollection);
//         }
//       } else if (dayName === "Tuesday") {
//         const timeCollection = daysOfWeek[3];
//         if (timeCollection) {
//           const updatedCollection = mapTimeCollection(
//             timeCollection,
//             formattedDate.toString()
//           );
//           combinedTimeCollection.push(...updatedCollection);
//         }
//       } else if (dayName === "Wednesday") {
//         const timeCollection = daysOfWeek[4];
//         if (timeCollection) {
//           const updatedCollection = mapTimeCollection(
//             timeCollection,
//             formattedDate.toString()
//           );
//           combinedTimeCollection.push(...updatedCollection);
//         }
//       } else if (dayName === "Thursday") {
//         const timeCollection = daysOfWeek[5];
//         if (timeCollection) {
//           const updatedCollection = mapTimeCollection(
//             timeCollection,
//             formattedDate.toString()
//           );
//           combinedTimeCollection.push(...updatedCollection);
//         }
//       } else if (dayName === "Friday") {
//         const timeCollection = daysOfWeek[6];
//         if (timeCollection) {
//           const updatedCollection = mapTimeCollection(
//             timeCollection,
//             formattedDate.toString()
//           );
//           combinedTimeCollection.push(...updatedCollection);
//         }
//       }
//     }

//     const form = new FormData();
//     const allDate = [
//       ...(DoctorInfo?.dateSlot || []),
//       ...(combinedTimeCollection || []),
//     ];
//     form.append("dateSlot", JSON.stringify(allDate));
//     // const response = await updateDoctor(doc_ID_, form);
//     const response = await apiCall(
//       Methods.PATCH,
//       `${EndPoint.DOCTOR_UPDATE_BY_ID}/${doc_ID_}`,
//       form,
//       FormDataHeader
//     );
//     // console.log(response);

//     if (response.success) {
//       toast.success(response.message);
//       init();
//       handleCancel(e);
//     } else {
//       toast.error("Something Went Wrong");
//     }
//   };

//   //Handle Delete Model
//   const deleteModel: any = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setCancelModelOpen(!CancelModelOpen);
//   };

//   const dataRecurring = async (doctorData: initialState) => {
//     try {
//       setLoading(true);

//       let firstDateSlot = doctorData?.dateSlot?.at(0);
//       let lastDateSlot = doctorData?.dateSlot?.at(-1);

//       const isTheDatePast = moment(lastDateSlot?.date).isBefore(
//         moment(),
//         "day"
//       );

//       if (!isTheDatePast) {
//         return false;
//       }

//       const doctorId = await getDoctorId();
//       if (!doctorId) {
//         toast.error("No Id Found");
//         return;
//       }
//       const firstOccurrenceOfEachDay = new Map<string, DateSlot>();
//       doctorData.dateSlot?.forEach((item) => {
//         if (!item.date) return;
//         const dayName = moment(item.date).format("dddd");
//         if (!firstOccurrenceOfEachDay.has(dayName)) {
//           firstOccurrenceOfEachDay.set(dayName, item);
//         }
//       });
//       const uniqueDateSlots: DateSlot[] = Array.from(
//         firstOccurrenceOfEachDay.values()
//       );
//       const tempState: Record<string, DateSlot> = {};
//       uniqueDateSlots.forEach((item) => {
//         const dayName = moment(item.date).format("dddd");
//         tempState[dayName.toLowerCase()] = item;
//       });

//       const startDate = moment(firstDateSlot?.date);
//       const lastDate = moment(lastDateSlot?.date);
//       const diffInDays = lastDate.diff(startDate, "days");
//       const thresholds = [7, 15, 30, 45];
//       const nextValue = thresholds.find((threshold) => threshold >= diffInDays);
//       const combinedTimeCollection: DateSlot[] = [];

//       for (let i = 0; i < nextValue!; i++) {
//         const date = moment().add(i, "days");
//         const dayName = date.format("dddd");
//         const formattedDate = date.format("YYYY-MM-DD");
//         if (tempState[dayName.toLowerCase()]?.timeSlots) {
//           combinedTimeCollection.push({
//             date: formattedDate,
//             timeSlots: tempState[dayName.toLowerCase()].timeSlots,
//           });
//         }
//       }
//       return;
//       const form = new FormData();
//       form.append("dateSlot", JSON.stringify(combinedTimeCollection));
//       const response = await apiCall(
//         Methods.PATCH,
//         `${EndPoint.DOCTOR_UPDATE_BY_ID}/${doctorId}`,
//         form,
//         FormDataHeader
//       );
//       if (response.success) {
//         init();
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const doctorData = await init();
//       if (doctorData) {
//         await dataRecurring(doctorData);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleShowtime = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     let newValue: DateSlot[] = [
//       ...(saturdayTimeCollection || []),
//       ...(sundayTimeCollection || []),
//     ];
//     console.log(newValue);
//   };

//   return loading ? (
//     <PageLoading />
//   ) : (
//     <section className="xl:container xl:mx-auto min-h-[80vh] shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]  px-5 py-2 ">
//       <p className="text-lg font-semibold lg:text-xl xl:text-2xl">
//         Visiting Hours
//       </p>
//       {DoctorInfo?.dateSlot?.length == 0 && <p>Add your Schedule</p>}
//       <>
//         <div>
//           {DoctorInfo?.dateSlot?.map((item: DateSlot, index) => {
//             const groupedSlots = item.timeSlots?.reduce(
//               (acc: Record<string, string[]>, timeSlot) => {
//                 if (timeSlot.period) {
//                   if (!acc[timeSlot.period]) {
//                     acc[timeSlot.period] = [];
//                   }
//                   acc[timeSlot.period].push(timeSlot.time || "");
//                 }
//                 return acc;
//               },
//               {}
//             );
//             return (
//               <div key={index} className="my-3 rounded shadow ">
//                 <div className="flex justify-between text-lg font-medium border rounded-sm shadow-sm">
//                   <p className="px-6 py-2 ">
//                     {moment(item.date).format("DD MMM YYYY (dddd)")}
//                   </p>
//                   <button
//                     onClick={(e) => handleRemoveDate(e, index)}
//                     className="bg-[#EB148C] text-white px-4 text-2xl rounded-sm"
//                   >
//                     ⨉
//                   </button>
//                 </div>
//                 <div className="grid px-6">
//                   {groupedSlots &&
//                     Object.entries(groupedSlots).map(([period, times]) => {
//                       return (
//                         <div
//                           key={period}
//                           className={`py-2 ${
//                             period === "afternoon" ? "py-2 border-b" : ""
//                           } ${period === "morning" ? "py-2 border-b" : ""}`}
//                         >
//                           <p className=" capitalize font-">{period}</p>
//                           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
//                             {times.map((item, index) => (
//                               <p
//                                 className="border p-2 rounded text-center"
//                                 key={index}
//                               >
//                                 {item}
//                               </p>
//                             ))}
//                           </div>
//                         </div>
//                       );
//                     })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         {!AddNewSchedule && (
//           <div className="flex justify-end my-3 space-x-4">
//             <button
//               onClick={deleteModel}
//               className="px-3 py-2 bg-[#EB148C] text-xs font-semibold text-white rounded-md"
//             >
//               Delete All
//             </button>
//             <button
//               onClick={() => {
//                 setAddNewSchedule(!AddNewSchedule);
//               }}
//               className="px-3 py-2 bg-[#EB148C] text-xs font-semibold text-white rounded-md"
//             >
//               Add New Schedule
//             </button>
//           </div>
//         )}
//       </>
//       {/* Button  */}
//       {AddNewSchedule && (
//         <div className="border-t border-black">
//           {/* <p className="text-lg font-semibold lg:text-xl xl:text-2xl mt-2">
//               Add New Schedule
//             </p> */}
//           <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 gap-4 my-3 ">
//             <button
//               className={`p-2 border rounded-lg border-[#EB148C] font-medium text-[#EB148C] ${
//                 Saturday && "bg-[#EB148C] text-white"
//               } `}
//               onClick={handleSaturday}
//             >
//               Saturday
//             </button>
//             <button
//               className={`p-2 border rounded-lg border-[#EB148C] font-medium text-[#EB148C] ${
//                 Sunday && "bg-[#EB148C] text-white"
//               } `}
//               onClick={handleSunday}
//             >
//               Sunday
//             </button>
//             <button
//               className={`p-2 border rounded-lg border-[#EB148C] font-medium text-[#EB148C] ${
//                 Monday && "bg-[#EB148C] text-white"
//               } `}
//               onClick={handleMonday}
//             >
//               Monday
//             </button>
//             <button
//               className={`p-2 border rounded-lg border-[#EB148C] font-medium text-[#EB148C] ${
//                 Tuesday && "bg-[#EB148C] text-white"
//               } `}
//               onClick={handleTuesday}
//             >
//               Tuesday
//             </button>
//             <button
//               className={`p-2 border rounded-lg border-[#EB148C] font-medium text-[#EB148C] ${
//                 Wednesday && "bg-[#EB148C] text-white"
//               } `}
//               onClick={handleWednesday}
//             >
//               Wednesday
//             </button>
//             <button
//               className={`p-2 border rounded-lg border-[#EB148C] font-medium text-[#EB148C] ${
//                 Thursday && "bg-[#EB148C] text-white"
//               } `}
//               onClick={handleThursday}
//             >
//               Thursday
//             </button>
//             <button
//               className={`p-2 border rounded-lg border-[#EB148C] font-medium text-[#EB148C] ${
//                 Friday && "bg-[#EB148C] text-white"
//               } `}
//               onClick={handleFriday}
//             >
//               Friday
//             </button>
//           </div>
//           {/* Day and Time collect  */}
//           {/* SaturDay  */}
//           {Saturday && (
//             <div className="shadow-md min-h-[30vh] p-2">
//               <div className="flex justify-between text-lg font-medium border rounded-sm my-3 shadow">
//                 <p className="px-6 py-2 ">Saturday</p>
//                 <button
//                   onClick={handleSaturday}
//                   className="bg-[#EB148C] text-white px-4 text-2xl rounded-sm"
//                 >
//                   ⨉
//                 </button>
//               </div>
//               <p className="text-base font-medium pb-2">All Slot</p>
//               <Select
//                 name="select"
//                 options={groupedOptions}
//                 isMulti
//                 getOptionLabel={(option) => option.label}
//                 getOptionValue={(option: any) => option.value}
//                 onChange={handleSaturdayTimeSlot}
//                 closeMenuOnSelect={false}
//               />
//             </div>
//           )}
//           {/* Sunday  */}
//           {Sunday && (
//             <div className="shadow-md min-h-[30vh] p-2">
//               <div className="flex justify-between text-lg font-medium border rounded-sm my-3 shadow">
//                 <p className="px-6 py-2 ">Sunday</p>
//                 <button
//                   onClick={handleSunday}
//                   className="bg-[#EB148C] text-white px-4 text-2xl rounded-sm"
//                 >
//                   ⨉
//                 </button>
//               </div>
//               <p className="text-base font-medium pb-2">All Slot</p>
//               <Select
//                 name="select"
//                 options={groupedOptions}
//                 isMulti
//                 getOptionLabel={(option) => option.label}
//                 getOptionValue={(option: any) => option.value}
//                 onChange={handleSundaytimeSlot}
//                 closeMenuOnSelect={false}
//               />
//             </div>
//           )}
//           {/* Monday  */}
//           {Monday && (
//             <div className="shadow-md min-h-[30vh] p-2">
//               <div className="flex justify-between text-lg font-medium border rounded-sm my-3 shadow">
//                 <p className="px-6 py-2 ">Monday</p>
//                 <button
//                   onClick={handleMonday}
//                   className="bg-[#EB148C] text-white px-4 text-2xl rounded-sm"
//                 >
//                   ⨉
//                 </button>
//               </div>
//               <p className="text-base font-medium pb-2">All Slot</p>
//               <Select
//                 name="select"
//                 options={groupedOptions}
//                 isMulti
//                 getOptionLabel={(option) => option.label}
//                 getOptionValue={(option: any) => option.value}
//                 onChange={handleMondayTimeSlot}
//                 closeMenuOnSelect={false}
//               />
//             </div>
//           )}
//           {/* TuesDay  */}
//           {Tuesday && (
//             <div className="shadow-md min-h-[30vh] p-2">
//               <div className="flex justify-between text-lg font-medium border rounded-sm my-3 shadow">
//                 <p className="px-6 py-2 ">Tuesday</p>
//                 <button
//                   onClick={handleTuesday}
//                   className="bg-[#EB148C] text-white px-4 text-2xl rounded-sm"
//                 >
//                   ⨉
//                 </button>
//               </div>
//               <Select
//                 name="select"
//                 options={groupedOptions}
//                 isMulti
//                 getOptionLabel={(option) => option.label}
//                 getOptionValue={(option: any) => option.value}
//                 onChange={handleTuesDayTimeSlot}
//                 closeMenuOnSelect={false}
//               />
//             </div>
//           )}
//           {/* Wednesday */}
//           {Wednesday && (
//             <div className="shadow-md min-h-[30vh] p-2">
//               <div className="flex justify-between text-lg font-medium border rounded-sm my-3 shadow">
//                 <p className="px-6 py-2 ">Wednesday</p>
//                 <button
//                   onClick={handleWednesday}
//                   className="bg-[#EB148C] text-white px-4 text-2xl rounded-sm"
//                 >
//                   ⨉
//                 </button>
//               </div>
//               <Select
//                 name="select"
//                 options={groupedOptions}
//                 isMulti
//                 getOptionLabel={(option) => option.label}
//                 getOptionValue={(option: any) => option.value}
//                 onChange={handleWednesdayTimeSlot}
//                 closeMenuOnSelect={false}
//               />
//             </div>
//           )}
//           {/* Thursday */}
//           {Thursday && (
//             <div className="shadow-md min-h-[30vh] p-2">
//               <div className="flex justify-between text-lg font-medium border rounded-sm my-3 shadow">
//                 <p className="px-6 py-2 ">Thursday</p>
//                 <button
//                   onClick={handleThursday}
//                   className="bg-[#EB148C] text-white px-4 text-2xl rounded-sm"
//                 >
//                   ⨉
//                 </button>
//               </div>
//               <Select
//                 name="select"
//                 options={groupedOptions}
//                 isMulti
//                 getOptionLabel={(option) => option.label}
//                 getOptionValue={(option: any) => option.value}
//                 onChange={handleThursdayTimeSlot}
//                 closeMenuOnSelect={false}
//               />
//             </div>
//           )}
//           {/* Friday  */}
//           {Friday && (
//             <div className="shadow-md min-h-[30vh] p-2">
//               <div className="flex justify-between text-lg font-medium border rounded-sm my-3 shadow">
//                 <p className="px-6 py-2 ">Friday</p>
//                 <button
//                   onClick={handleFriday}
//                   className="bg-[#EB148C] text-white px-4 text-2xl rounded-sm"
//                 >
//                   ⨉
//                 </button>
//               </div>
//               <Select
//                 name="select"
//                 options={groupedOptions}
//                 isMulti
//                 getOptionLabel={(option) => option.label}
//                 getOptionValue={(option: any) => option.value}
//                 onChange={handleFridayTimeSlot}
//                 closeMenuOnSelect={false}
//               />
//             </div>
//           )}

//           <div className="flex justify-between items-centerspace-x-8 mt-3">
//             <div className="flex items-center space-x-3">
//               <p className="text-lg font-medium ">Select Date Range</p>
//               <Select
//                 name="select"
//                 options={timeRange}
//                 getOptionLabel={(option) => option.label}
//                 getOptionValue={(option) => option.value}
//                 onChange={handleSelectRange}
//                 defaultInputValue="30"
//               />
//             </div>
//             <div className="flex space-x-6">
//               <button
//                 className={`px-8 py-2 bg-[#EB148C] text-xs font-semibold text-white rounded-md`}
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>
//               <button
//                 className={`px-8 py-2 bg-[#EB148C] text-xs font-semibold text-white rounded-md`}
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//               <button onClick={handleShowtime}>Show Weak Time </button>
//             </div>
//           </div>
//         </div>
//       )}{" "}
//       <Modal open={CancelModelOpen} onClose={deleteModel} size={"sm"}>
//         <Modal.Header>
//           <p className=" w-full text-4xl text-center flex items-center justify-center ">
//             <span className="text-red-500 border-red-500 mt-4  p-4  border rounded-full">
//               <IoWarning className="text-3xl text-red-600" />
//             </span>
//           </p>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="flex flex-col items-center justify-center  min-h-[10vh] px-4">
//             <p className="text-xl font-medium">Confirm Schedule Deletion</p>
//             <p className="text-center text-gray-600">
//               You are about to delete all scheduled appointments for this date.
//               This action will permanently remove the schedule and cannot be
//               undone. Please confirm your decision.
//             </p>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <div className="grid grid-cols-2 gap-5">
//             <button
//               onClick={deleteModel}
//               className="bg-white py-3 w-full text-lg  font-semibold shadow-[0px_0px_5px_2px_rgba(0,_0,_0,_0.1)] rounded-md "
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleDelete}
//               className=" py-3 w-full text-lg bg-[#EB148C] font-semibold text-white rounded-md"
//             >
//               Delete
//             </button>
//           </div>
//         </Modal.Footer>
//       </Modal>
//     </section>
//   );
// };

// export default VisitingHour;
