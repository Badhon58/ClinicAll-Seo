"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DoctorProfile } from '../Doctor/Interface'
import { useSearchParams } from 'next/navigation'
import { apiCall } from '@/lib/axios-client'
import { EndPoint, Methods } from '@/api/config'
import DoctorListProfile from '../Doctor/DoctorListProfile'
import { Modal, Pagination } from 'rsuite'
import Loading from '@/app/loading'
import { getUserID, isAuthenticate } from '@/lib/authHandler'
import SignIn from '../Auth/SignIn'
import Appointment from './Appointment'

const SecondOpinionDoctorList = () => {
  const { t } = useTranslation()
  const [pageNum, setPageNum] = useState<number>(1);
  const [DoctorProfile, setDoctorProfile] = useState<DoctorProfile[]>([])
  const [singleDoctor, setSingleDoctor] = useState<DoctorProfile>()
  const [allDoctorCount, setAllDoctorCount] = useState<number>(0);
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams();
  const [appointment, setAppointment] = useState(false)
  const categoryId = searchParams.get("catagoryid")

  const [signInPage, setSignInPage] = useState(false)
  const init = async (page: number = 1) => {
    try {
      setLoading(true)
      if (categoryId) {
        let value = {
          category: categoryId,
          page: 1,
          role: "foreign_doctor"
        }
        const response = await apiCall(
          Methods.POST,
          EndPoint.SEARCH_DOCTOR,
          value
        )
        // console.log(response);

        if (response.success) {
          setDoctorProfile(response?.data);
          setAllDoctorCount(response?.data?.length);
        }
      } else {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.DOCTOR_FIND_ALL_INFO}/${page}?role=foreign_doctor&isApproved=true`
        );
        // console.log(response);

        if (response.success) {
          setDoctorProfile(response?.data?.doctorInfo);
          setAllDoctorCount(response?.data?.count);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  const handlePageChange: any = async (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPageNum(page); // ✅ Update state first
    try {
      setLoading(true);
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_FIND_ALL_INFO}/${page}?role=foreign_doctor&isApproved=true`
      );
      setDoctorProfile(response.data.doctorInfo);
      setAllDoctorCount(response?.data?.count);
    } catch (error) {
      console.error("Error changing page:", error);
    } finally {
      setLoading(false);
    }

  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, data: DoctorProfile) => {
    try {
      e.preventDefault()
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      if (!userId && !userAuthentication) {
        setSignInPage(!signInPage)
        return
      }
      setAppointment(true)
      setSingleDoctor(data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    init(pageNum)
  }, [pageNum, searchParams])

  return loading ? <Loading /> : (
    <div className=' p-2'>
      <p className='text-lg font-semibold'>{t("browseByCategory")}</p>
      <div className='flex flex-col gap-5 mt-3 min-h-[80vh] '>
        {DoctorProfile && DoctorProfile.length > 0 ? DoctorProfile.map((data, index) => {
          return (
            <div className="flex  px-6 py-5 rounded-xl bg-white hover:bg-[#FFF4F4] hover:bg-opacity-40 shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] w-full" key={index}>
              <DoctorListProfile data={data} />
              <div className='flex items-end justify-end'>
                <button
                  onClick={(e) => handleSubmit(e, data)}
                  className="bg-[#EB148C] w-[180px] text-sm font-semibold px-2 xl:px-4 2xl:px-6 py-3 rounded-lg text-white"
                >
                  {t("bookNow")}
                </button>
              </div>
            </div>
          )
        }) : <div className="min-h-[40vh] text-2xl shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)] flex items-center justify-center">
          {t("noDoctorFound")}
        </div>
        }
      </div>
      {allDoctorCount > 3 && (
        <div className="flex items-center justify-center w-full rounded-lg py-3 mx-auto shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">
          <Pagination
            prev
            next
            size="lg"
            total={allDoctorCount}
            limit={10}
            activePage={pageNum}
            onSelect={handlePageChange}
          />
        </div>
      )}

      {appointment
        && <Appointment
          appointment={appointment}
          setAppointment={setAppointment}
          singleDoctor={singleDoctor}
        />}

      <Modal
        size="sm"
        open={signInPage}
        onClose={() => setSignInPage(!signInPage)}
      >
        {/* <Modal.Header>
          <Modal.Title></Modal.Title>{" "}
        </Modal.Header> */}
        <Modal.Body>
          <SignIn />
        </Modal.Body>
      </Modal>
    </div >
  )
}

export default SecondOpinionDoctorList