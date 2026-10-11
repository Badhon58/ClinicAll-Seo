import React, { Suspense } from 'react'
import Loading from '../loading'
import Gears from '@/components/DoctorAccount/Gears'

const page = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Gears />
        </Suspense>
    )
}

export default page