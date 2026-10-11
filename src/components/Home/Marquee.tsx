import React from 'react'
import { MajorClient } from './AllInterface'
import Image from 'next/image'
import Slider from 'react-slick';

const Marquee = ({ majorClient }: { majorClient: MajorClient[] }) => {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 5,
        autoplay: true,
        speed: 20000,
        autoplaySpeed: 1,
        cssEase: "linear",
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1180,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    dots: false,
                },
            },
        ],
    };
    return (
        <div>
            <Slider {...settings}>
                {majorClient.map((item, index) => (
                    <div key={index} className="p-3">
                        <div className="flex items-center justify-center">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={50}
                                className="object-contain h-[67px] w-[87px]"
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Marquee