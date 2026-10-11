import DoctorList from '@/components/Doctor/DoctorList'
import React, { Suspense } from 'react'
import Loading from './loading'

const page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <DoctorList />
        </Suspense>
    )
}

export default page