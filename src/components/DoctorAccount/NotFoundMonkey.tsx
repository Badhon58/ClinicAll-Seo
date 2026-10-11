import React from 'react'
// import "./Style.css";
import Image from 'next/image';
const NotFoundMonkey = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[70vh]'>
            <p className='text-2xl font-semibold pb-7 text-center'>204 Error</p>
            <div >
                <Image
                    src="http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-28042026T145236-204-no-content-1.png"
                    alt='Not FOund'
                    width={500}
                    height={500}
                    className='h-[300px] w-[300px] animate-bounce'
                />
            </div>
            <p className='text-xl font-semibold text-center -mt-7'>OOPS! Content Not Found ...</p>
        </div>
    )
}

export default NotFoundMonkey