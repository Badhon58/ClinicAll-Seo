import React, { Suspense } from 'react'
import Loading from './loading'
import Index from '@/components/SecondOpenion/Index'

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Index />
    </Suspense>
  )
}

export default page