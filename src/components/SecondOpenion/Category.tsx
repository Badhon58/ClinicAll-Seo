"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { apiCall } from '@/lib/axios-client'
import Image from 'next/image'
import { useAppSelector } from '@/redux/Hooks'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import "./style.css"
import { category } from './interface'
import { EndPoint, Methods } from '@/api/config'
const Category = () => {
  const { t } = useTranslation()
  const [categoryList, setCategoryList] = useState<category[]>([])
  const [loading, setLoading] = useState(false)
  const language = useAppSelector((state) => state.languageSlice.language);
  const router = useRouter()

  const handleClick = (cid: string) => {
    router.push(`/secondopenion?catagoryid=${cid}`);
  };

  const init = async () => {
    try {
      setLoading(true)
      const { data } = await apiCall(
        Methods.GET,
        EndPoint.CATEGORY_OF_DOCTOR_FIND_ALL_INFO
      );
      setCategoryList(data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <div className=' p-2'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-semibold'>{t("browseByCategory")}</p>
      </div>
      <div className='grid grid-cols-5 gap-5 mt-3 shadow-lg p-4 rounded-md'>
        {loading
          ? [...Array(6)].map((_, index) => (
            <div key={index} className="category-skeleton">
              <div className="skel-circle"></div>
              <div className="skel-line"></div>
            </div>
          ))
          : categoryList.map((data, index) => {
            const name =
              language !== "English" && data?.bnName
                ? data.bnName
                : data.name;

            return (
              <div
                onClick={() => handleClick(data?._id)}
                key={index}
                className="flex flex-col items-center min-w-[65px] cursor-pointer"
              >
                <div className='bg-[#fff4f4] rounded-full p-4 hover:scale-105 transition'>
                  <Image
                    width={65}
                    height={40}
                    src={data?.image ? data?.image : "/other/familyDoctor.svg"}
                    alt={data?.name}
                    className="object-contain"
                  />
                </div>

                <p className="text-center text-[10px] font-medium mt-1 leading-tight line-clamp-2 max-w-[70px]">
                  {name}
                </p>
              </div>
            );
          })}
      </div>

    </div>
  )
}

export default Category