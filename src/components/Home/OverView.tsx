"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { SettingsData } from './AllInterface';
import Headertag from '../common/Headertag';
import { useTranslation } from 'react-i18next';
import "./Style.css";
import { apiCall } from '@/lib/axios-client';
import { EndPoint, Methods } from '@/api/config';
import Loading from '@/app/loading';
import Marquee from './Marquee';
const OverView = () => {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false)
    const [OverviewServices, setOverviewServices] = useState<SettingsData>()

    const init = async () => {
        try {
            setLoading(true)
            const response = await apiCall(Methods.GET, EndPoint.SETTING_FIND_ALL)
            setOverviewServices(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        init()
    }, [])

    return loading ? <Loading /> : (
        <div className="px-2 mt-5 xl:px-0  lg:mt-6 xl:mt-8 2xl:mt-10 xl:container xl:mx-auto">
            <Headertag position=" text-center">
                {t("ClinicallOverview")}
            </Headertag>
            <div
                style={{ boxShadow: "0px 4px 1.3px 7px rgba(0, 0, 0, 0.06)" }}
                className='min-h-[10vh]  mx-auto 2xl:mt-4  2xl:w-[94%] p-3 lg:p-0 lg:px-8 lg:py-5 rounded-xl mt-3 xl:mt-8'
            >
                <div className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2 md:gap-3  xl:gap-6 justify-between lg:mt-3">
                    {OverviewServices
                        && OverviewServices.clinicall_overview
                            .slice()
                            .sort((a, b) => a.order - b.order)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="relative "
                                >
                                    <div className=" p-1.5  h-full cursor-pointer  bg-white rounded-[10px]  hover:scale-105 transition hover:shadow-[0px_0px_15px_2px_rgba(0,_0,_0,_0.1)] shadow-[0px_4px_9px_7px_rgba(0,_0,_0,_0.06)] duration-150">
                                        <div className="  h-full  flex flex-col sm:flex-row items-center justify-around w-full px-2.5 py-3 bg-[#fff4f4] rounded-[10px]">
                                            <div className="w-12 h-12  flex items-center justify-center rounded-full bg-[#ffdfe5]">
                                                <Image
                                                    alt={item.entitle}
                                                    src={item.icon}
                                                    width={26}
                                                    height={26}
                                                    className="w-full h-full p-3 "
                                                />
                                            </div>
                                            <div className="w-full sm:w-[66%] text-center md:text-start mt-1">
                                                <h3 className="text-xl 2xl:text-2xl font-semibold text-[#EB148C]">
                                                    {i18n.language === "bn" ? item.bntitle : item.entitle}
                                                </h3>
                                                <p className="h-14 text-base line-clamp-3 text-[#3A3A3C]">
                                                    {i18n.language === "bn" ? item.bnsubtitle : item.ensubtitle}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="-z-10 element "></span>
                                </div>
                            ))}
                </div>

                {/* <div className=' lg:my-3 xl:my-4 2xl:my-5 my-2'>
                    <p className='text-xl text-center text-[#16020B] lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold'>
                        {t("Major Client")}
                    </p>
                    {OverviewServices?.major_client && <Marquee majorClient={OverviewServices?.major_client} />}

                </div> */}

            </div>
        </div>
    );
}

export default OverView