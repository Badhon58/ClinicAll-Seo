"use client";
import { EndPoint, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import React, { useEffect, useState } from "react";
import { DatePicker, DateRangePicker, Modal, Pagination } from "rsuite";
import { formatDate, MetaData, User } from "./interface";
import moment from "moment";
import PageLoading from "../Seo/PageLoading";
import { toast } from "react-toastify";
import NotFoundMonkey from "./NotFoundMonkey";
// import "./Style.css";

const G_D_Iplane = () => {
    const [modelOpen, setModelOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [allUser, setAllUser] = useState<User[]>([]);
    const [singleUser, setSingleUser] = useState<User | null>(null);
    const [secondModel, setSecondModel] = useState(false);
    const [status, setStatus] = useState<string>("");
    const [sampleCollectionTime, setSampleCollectionTime] = useState<Date | null>(
        new Date()
    );
    const [note, setNote] = useState<string>("")
    const [sampleCollectionDate, setSampleCollectionDate] = useState<Date | null>(
        new Date()
    );
    const [buttonloading, setButtonloading] = useState(false);
    const [greenDelta, setGreenDelta] = useState<MetaData[]>();
    const [activePage, setActivePage] = React.useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const [dateRange, setDateRange] = useState<[Date, Date] | null>([
        new Date(),
        new Date(),
    ]);

    const init = async () => {
        try {
            setInitialLoading(true);
            const response = await apiCall(
                Methods.GET,
                `${EndPoint.GEARS_I_CALL_GET}?page=1
        &startDate=${moment().format("YYYY-MM-DD")}
        &endDate=${moment().format("YYYY-MM-DD")}`
            );
            if (response.success) {
                setGreenDelta(response.data.data);
                setTotalPage(response.data.count)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setInitialLoading(false);
        }
    };
    const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        setNote(e.target.value)
    }

    const handleModelOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setModelOpen(!modelOpen);
    };

    const handleClose = (e: any) => {
        setModelOpen(!modelOpen);
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target;
        setInputValue(value);
        try {
            setLoading(true);
            const response = await apiCall(
                Methods.GET,
                `${EndPoint.USER_GETALL}?phone=${value}&page=1&organization=RMG`
            );
            if (response.success) {
                setAllUser(response.data.userData);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, item: User) => {
        e.preventDefault();
        setSingleUser(item);
        setSecondModel(!secondModel);
    };

    const handleSecoundmodel = () => {
        setSecondModel(!secondModel);
    };

    const handleDateChange = (value: Date | null) => {
        if (value) {
            // const formattedDate = moment(value).format("YYYY-MM-DD");
            setSampleCollectionDate(value);
        } else {
            setSampleCollectionDate(null);
        }
    };

    // handle Time Changed
    const handleTimeChange = (value: Date | null) => {
        if (value) {
            // const formattedTime = moment(value).format("hh:mm A");
            setSampleCollectionTime(value);
        } else {
            setSampleCollectionTime(null);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            setButtonloading(true);
            if (!status) {
                toast.warning("Status Is required");
                return;
            }
            let newDate = moment(sampleCollectionDate).format("YYYY-MM-DD");
            let newTime = moment(sampleCollectionTime).format("HH:mm:ss");
            console.log(newTime);

            let dateTime = `${newDate}T${newTime}`;
            let finaldata = {
                patientId: singleUser?._id,
                status: status,
                dateTime: dateTime,
                note
            };
            const response = await apiCall(
                Methods.POST,
                `${EndPoint.GEARS_I_CALL_POST}`,
                finaldata
            );
            if (response.success) {
                setModelOpen(!modelOpen);
                setSecondModel(!secondModel);
                setSingleUser(null);
                setAllUser([]);
                init();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setButtonloading(false);
        }
    };

    useEffect(() => {
        init();
    }, []);

    const handleSearchButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            setInitialLoading(true);
            const firstDate = dateRange?.[0]
                ? moment(dateRange[0]).format("YYYY-MM-DD")
                : null;

            const lastDate = dateRange?.[1]
                ? moment(dateRange[1]).format("YYYY-MM-DD")
                : null;

            const searchQuery = new URLSearchParams()
            searchQuery.append("page", "1")
            if (firstDate) {
                searchQuery.append("startDate", firstDate)
            }
            if (lastDate) {
                searchQuery.append("endDate", lastDate)
            }
            const response = await apiCall(
                Methods.GET,
                `${EndPoint.GEARS_I_CALL_GET}?${searchQuery.toString()}`
            )
            if (response.success) {
                setGreenDelta(response.data.data);
                setTotalPage(response.data.count)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setInitialLoading(false);
        }
    }

    const fetchGreenDelta = async (page: number, range?: [Date, Date] | any) => {
        setInitialLoading(true);

        try {
            const firstDate = range?.[0]
                ? moment(range[0]).format("YYYY-MM-DD")
                : null;

            const lastDate = range?.[1]
                ? moment(range[1]).format("YYYY-MM-DD")
                : null;

            const searchQuery = new URLSearchParams();

            searchQuery.append("page", String(page));

            if (firstDate) searchQuery.append("startDate", firstDate);
            if (lastDate) searchQuery.append("endDate", lastDate);

            const response = await apiCall(
                Methods.GET,
                `${EndPoint.GEARS_I_CALL_GET}?${searchQuery.toString()}`
            );

            if (response.success) {
                setGreenDelta(response.data.data);
                setTotalPage(response.data.count);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setInitialLoading(false);
        }
    };

    return initialLoading ? (
        <PageLoading />
    ) : (
        <section className="xl:container xl:mx-auto min-h-[85vh] p-6 shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">

            <p className="text-lg font-medium">Gears Groups IPlane</p>
            <div className="grid grid-cols-2 py-3 ">

                <div className=" flex flex-col rounded-md">
                    <label htmlFor="" className="text-lg font-normal">Select a DateRange : </label>

                    <div className="flex items-center space-x-2">
                        <DateRangePicker
                            value={dateRange}
                            onChange={(range) => {
                                setDateRange(range);
                            }}
                            format="yyyy-MM-dd"
                        />
                        <button onClick={handleSearchButton} className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm ">Search</button>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button
                        onClick={handleModelOpen}
                        className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm "
                    >
                        Create
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <div className="grid grid-cols-7 place-content-center gap-3 text-center divide-x divide-gray-300 bg-gray-100 border rounded-md">
                    <p className="p-3">Serial</p>
                    <p className="p-3">User</p>
                    <p className="p-3">Doctor</p>
                    <p className="p-3">Date</p>
                    <p className="p-3">Time</p>
                    <p className="p-3">Status</p>
                    <p className="p-3">Note</p>
                </div>
                {greenDelta && greenDelta?.length > 0 ? (
                    <>
                        {greenDelta.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="grid grid-cols-7 place-content-center gap-3 text-center divide-x  border"
                                >
                                    <p className="p-3">{(index + 1) + (activePage - 1) * 20}</p>
                                    <div className="p-3 text-sm">
                                        <p>
                                            {item?.patientId?.firstName} {item?.patientId?.lastName}
                                        </p>
                                        <p>{item?.patientId?.phone}</p>
                                    </div>
                                    <p className="p-3">
                                        {" "}
                                        {item?.doctorId?.firstName} {item?.doctorId?.lastName}
                                    </p>
                                    <p className="p-3">
                                        {/* {formatTime(new Date(item?.dateTime))} */}
                                        {/* {new Date(item?.dateTime)?.toDateString()} */}
                                        {formatDate(item?.dateTime)}
                                        {/* {new Date(item?.dateTime)?.toDateString()} */}
                                    </p>
                                    <p className="p-3">
                                        {/* {moment(item?.dateTime)?.format("DD-mm-yyyy")} */}
                                        {moment.utc(item?.dateTime)?.format("hh:mm:ss A")}
                                    </p>
                                    <p className="p-3">{item?.status}</p>
                                    <p className="p-3">{item?.note}</p>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <div className="flex items-center justify-center">
                        <NotFoundMonkey />
                    </div>
                )}
            </div>

            {greenDelta && greenDelta?.length > 0 &&
                <div className="mt-3 border p-2 rounded-md flex items-end justify-center">
                    <Pagination
                        total={totalPage}
                        limit={20}
                        activePage={activePage}
                        onChangePage={(page) => {
                            setActivePage(page);
                            fetchGreenDelta(page, dateRange);
                        }}
                    />
                </div>
            }

            <Modal open={modelOpen} onClose={handleClose} size={"lg"}>
                <Modal.Header>Gears Group Create</Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="">Search User</label>
                            <input
                                type="text"
                                className="outline-none p-2 border rounded-lg"
                                value={inputValue}
                                onChange={handleChange}
                                name="user"
                                placeholder="Enter Mobile Number"
                            />
                        </div>
                        <p className="text-lg font-medium">User Info</p>
                        <div className=" col-span-2 max-h-[40vh] overflow-auto w-full ">
                            <div className="grid grid-cols-4 bg-gray-100 text-center">
                                <p className=" p-3">Full Name</p>
                                <p className="border-x  p-3">Phone </p>
                                <p className=" p-3">Organigation</p>
                                <p className="border-l  p-3">Option</p>
                            </div>
                            {loading
                                ? "Loading..."
                                : allUser?.map((item, index) => {
                                    return (
                                        <div
                                            className="grid grid-cols-4 text-center border-b border-x"
                                            key={index}
                                        >
                                            <p className="p-3">
                                                {item.firstName} {item.lastName}
                                            </p>
                                            <p className="border-x p-3 ">{item.phone} </p>
                                            <p className="p-3 border-r">{item.organization}</p>
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={(e) => handleEdit(e, item)}
                                                    className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm "
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal open={secondModel} onClose={handleSecoundmodel} size={"lg"}>
                <Modal.Header>Gears Group Plane Edit</Modal.Header>
                <Modal.Body>
                    <label htmlFor="" className=" font-medium text-lg pt-5 ">
                        Patient Info
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className=" w-full">
                            <label htmlFor="">First Name</label>
                            <p className="p-2 border rounded-md">{singleUser?.firstName}</p>
                        </div>

                        <div className=" w-full">
                            <label htmlFor="">Last Name</label>
                            <p className="p-2 border rounded-md">{singleUser?.lastName}</p>
                        </div>

                        <div className=" w-full">
                            <label htmlFor="">Selete Date</label>
                            <DatePicker
                                format="MM/dd/yyyy"
                                className="w-full"
                                placeholder="00-00-00"
                                onChange={handleDateChange}
                                value={sampleCollectionDate}
                            />
                        </div>
                        <div className=" w-full">
                            <label htmlFor="">Selete Time</label>
                            <DatePicker
                                format="HH:mm"
                                showMeridiem
                                className="w-full"
                                placeholder="00:00"
                                onChange={handleTimeChange}
                                value={sampleCollectionTime}
                            />
                        </div>
                        <div className=" w-full">
                            <label htmlFor="">Organigation</label>
                            <p className="p-2 border rounded-md">
                                {singleUser?.organization}
                            </p>
                        </div>
                        <div>
                            <label htmlFor="note">Status: </label>
                            <select
                                className="w-full p-2 outline-none border rounded-md"
                                name="note"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="Consulted">Consulted</option>
                                <option value="Not Received">Not Received</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="col-span-2 w-full">
                            <label htmlFor="" className=" font-medium text-sm pt-5 ">
                                Enter Note <span className="text-xs"> (Optional)</span>
                            </label>
                            <textarea
                                name="note"
                                onChange={handleChangeNote}
                                value={note}
                                className="w-full p-2 outline-none border rounded-md"
                                id=""
                                cols={2}
                                rows={5} placeholder="Enter Note Here"
                            />

                        </div>
                        <div className="col-span-2 flex justify-end items-center">
                            <button
                                onClick={handleSubmit}
                                disabled={buttonloading}
                                className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm "
                            >
                                {buttonloading ? "Loading.." : " Submit"}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default G_D_Iplane;
