"use client"
import { EndPoint, FormDataHeader, JsonHeader, Methods } from '@/api/config'
import { getUserID } from '@/lib/authHandler'
import { apiCall } from '@/lib/axios-client'
import moment from 'moment'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillDelete } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import { toast } from 'react-toastify'
import { Modal } from 'rsuite'
import { DoctorProfile } from '../Doctor/Interface'

const Appointment = (
  { appointment, setAppointment, singleDoctor }
    :
    { appointment: boolean, setAppointment: any, singleDoctor?: DoctorProfile }) => {
  const [document, setDocument] = useState<string[]>([])

  const [finalSubmission, setFinalSubmission] = useState(false)
  const { t } = useTranslation()
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file: any = e.target.files;
      const form = new FormData();
      form.append("file", file[0]);
      // const response = await fileUpload(form);
      const response = await apiCall(
        Methods.POST,
        EndPoint.ADMIN_FILE_UPLOAD,
        form,
        FormDataHeader
      );
      if (response.success) {
        const Url = response?.data;
        setDocument((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error);

    }
  }
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault()
    setDocument((prev) => prev.filter((_, i) => i !== index));
  }

  const handleClose = () => {
    setAppointment(false)
  }
  
  const handleSubmitAppointment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()
      const userId = await getUserID();
      const { data } = await apiCall(Methods.GET, `${EndPoint.SINGLE_USER}/${userId}`);
      const appointment = {
        date: moment().format('YYYY-M-D'),
        time: `${moment().format('hh:mm A')} - ${moment().add(30, 'minutes').format('hh:mm A')}`,
        fullName: `${data.firstName} ${data.lastName}`,
        gender: data.gender || "unknown",
        weight: data.weight || "N/A",
        countryCode: data.countryCode,
        dialCode: data.dialCode,
        phone: data.phone,
        email: data.email,
        doctor: singleDoctor?._id,
        user: data._id,
        ref: "foreign",
        documents: document || [],
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.DOCTOR_BOOK_APPOINTMENT,
        appointment,
        JsonHeader
      );
      if (response.success) {
        toast.success(response.message)
        setFinalSubmission(true)
        setAppointment(false)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Modal open={appointment} onClose={handleClose}>
        <Modal.Header>
          <div className=' flex justify-between'>
            <p className='text-base font-semibold text-[#EB148C]'>Prescription + Report (If Any)</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='min-h-[40vh] p-3 grid grid-cols-4 gap-7'>
            {document && document.map((item, index) => {
              return (
                <div className='relative w-full' key={index}>
                  <object
                    data={item}
                    className=" h-28 w-full border rounded-md object-contain"
                  />
                  <button onClick={(e) => handleDelete(e, index)} className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow">
                    <AiFillDelete className="text-[#EB148C] text-lg" />
                  </button>
                </div>
              )
            })}

            <label
              htmlFor="fileupload"
              className="h-28 w-full border border-pink-500 flex flex-col items-center justify-center rounded-md cursor-pointer"
            >
              <span className="bg-[#EB148C] size-8 rounded-lg flex items-center justify-center">
                <IoMdAdd size={24} className="text-white" />
              </span>
              <span>Add</span>
            </label>

            <input
              type="file"
              id="fileupload"
              className="hidden"
              onChange={handleUploadFile}
            />
          </div>
          <div className='flex items-center justify-between border p-3 rounded-md border-pink-500'>
            <div className='flex flex-col items-center'>
              {/* <p>BDT {singleDoctor && singleDoctor.visitFee}</p> */}
              <p>{singleDoctor && t("moneyCount", { count: singleDoctor.visitFee })}</p>
              <p>{t("consultationFee")}</p>
            </div>
            <button onClick={handleSubmitAppointment} className='bg-[#EB148C] w-[180px] text-sm font-semibold px-2 xl:px-4 2xl:px-6 py-3 rounded-lg text-white'>
              {t("submit")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        open={finalSubmission}
        onClose={() => setFinalSubmission(!finalSubmission)}
        size={"sm"}
      >
        <p>{t("appointmentSuccess")}</p>
      </Modal>
    </>
  )
}

export default Appointment