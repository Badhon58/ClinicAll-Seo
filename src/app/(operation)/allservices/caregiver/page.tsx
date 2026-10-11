"use client"
// import BabySitter from '@/components/CareGiver/CareGiverService/BabySitter'
// import Selection from '@/components/CareGiver/CareGiverService/Selection'
// import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import Loading from '../loading'
import AllSitter from '@/components/CareGiver/CareGiverService/AllSitter'
import { useTranslation } from 'react-i18next'
// import Nurse from '@/components/CareGiver/CareGiverService/Nurse'
// import Paramedics from '@/components/CareGiver/CareGiverService/Paramedics'
// import CaregiverCommon from '@/components/CareGiver/CareGiverService/CaregiverCommon'

const page = () => {
    // const searchParams = useSearchParams()
    // const type = searchParams.get("type")
    const { t } = useTranslation()
    return (
        <section className=" min-h-[70vh] xl:mx-auto xl:container p-2  px-4">
            <div className="p-4">
                <p className="text-2xl font-semibold ">{t("care_title")}</p>
            </div>
            {/* <div className="grid lg:grid-cols-2 gap-4 xl:gap-7 ">
                    <div>
                        <Selection />
                        <BabySitter />
                    </div>
                    <div className="shadow-[-6px_6px_17.5px_1px_#10285130] hidden lg:block rounded-md flex-1 w-full">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum,
                        nulla?
                    </div>
                </div> */}
            <Suspense fallback={<Loading />}>
                <AllSitter />
            </Suspense>
        </section>
    )
}

export default page

