"use client"
import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

const ScrollButton = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight
            if (scrollPosition > pageHeight / 4) {
                setVisible(true)
            } else {
                setVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!visible) return null
    return (
        <div className='fixed 2xl:bottom-10 2xl:right-10 z-50 hidden lg:block lg:bottom-5 lg:right-5 bg-opacity-70 '>
            <button onClick={scrollToTop} className='upbutton rounded-full text-sm'>
                <FaArrowUp />
            </button>
        </div>
    )
}

export default ScrollButton