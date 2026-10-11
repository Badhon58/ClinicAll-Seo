"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import {
  UndpImage1,
  UndpImage2,
  UndpImage3,
  UndpImage4,
  UndpImage5,
  UndpImage6,
  UndpImage7,
} from "./UndpImage";
import { Carousel } from "rsuite";

const WhoweareSlider = () => {
  const [numbertoshow, setNumbertoshow] = useState<number>(0);
  // const [activeIndex, setActiveIndex] = React.useState(2);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const settings = {
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => {
      setNumbertoshow(next);
    },
  };
  const handleSlideChange = (slideNumber: number) => {
    setNumbertoshow(slideNumber);
    if (sliderRef) {
      sliderRef.slickGoTo(slideNumber);
    }
  };
  return (
    <div className="">
      <Slider {...settings} ref={(slider) => setSliderRef(slider)}>
        <UndpImage1 />
        <UndpImage2 />
        {/* <UndpImage3 />
        <UndpImage4 /> */}
        <UndpImage5 />
        {/* <UndpImage6 />
        <UndpImage7 /> */}
      </Slider>
      <div className="flex items-center space-x-2 justify-center mt-3 lg:pt-2">
        {[...Array(3)].map((_, index) => (
          <input
            key={index}
            type="radio"
            name="slideRadio"
            onChange={() => handleSlideChange(index)}
            checked={numbertoshow === index}
            className="accent-pink-500 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default WhoweareSlider;
