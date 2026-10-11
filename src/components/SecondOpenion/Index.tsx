"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import Headertag from '../common/Headertag'
import Category from './Category'
import SecondOpinionDoctorList from './SecondOpinionDoctorList'

const Index = () => {
  const { t } = useTranslation()
  return (
    <section className="min-h-screen  mt-3 mb-10 xl:container xl:mx-auto lg:px-4">
      <div className="pt-4 lg:px-4 xl:px-5 2xl:px-10">
        {/* <Headertag position="text-center">{t("secondOpenionTitle")}</Headertag> */}
        <p className='text-xl text-[#16020B] text-center lg:text-3xl font-semibold'>{t("secondOpenionTitle")}</p>
      </div>
      <div className='grid lg:grid-cols-3 gap-4'>
        <aside className='col-span-2'>
          <SecondOpinionDoctorList />
        </aside>
        <aside className='col-span-1 sticky lg:top-20 xl:top-28 self-start'>
          <Category />
        </aside>
      </div>
    </section>
  )
}

export default Index