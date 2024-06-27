"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InspectionIcon from "@/components/icons/Inspection";
import Link from "next/link";


const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slider */}
      <Slider {...settings} className="relative z-10">
        <div>
          <video className="w-full h-screen object-cover" autoPlay loop muted>
            <source
              src="https://res.cloudinary.com/dgms1mpbw/video/upload/v1717083029/jacinhomes/JacinHomes_video_qtszln.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dgms1mpbw/image/upload/v1717100105/jacinhomes/webaliser-_TPTXZd9mOo-unsplash_tmlphj.jpg"
            alt="Slider Image 1"
            className="w-full h-screen object-cover"
          />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dgms1mpbw/image/upload/v1717100112/jacinhomes/francesca-tosolini-tHkJAMcO3QE-unsplash_arsl47.jpg"
            alt="Slider Image 2"
            className="w-full h-screen object-cover"
          />
        </div>
      </Slider>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
 px-0
      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center xl:px-12 2xl:px-0 xl:text-left text-center justify-center z-20">
        <div className=" text-light lg:leading-[3rem]">
          <h3 className=" lg:tracking-[.1rem] tracking-[-.01rem] font-[700] leading-[1.2rem]">A Home For Everyone</h3>
          <h1 className="text-4xl mt-2 lg:mt-0 lg:tracking-[.2rem] leading-[36px] lg:leading-0 tracking-[3px] text- lg:text-6xl lg:w-[80%] lg:px-0 px-8 font-bold text-white">
            Home <span className="text-red-500 ">Ownership</span> Made Easy For
            Everyone
          </h1>
          <h3 className="lg:text-[20px] lg:px-0 mt-4 lg:mt-0 px-8 ">
            We give access to more than a million people worldwide in the real
            estate market
          </h3>
          <div className="relative flex lg:justify-start justify-center items-center gap-4">
            <div className="absolute lg:top-11 md:left-[19rem] 375:left-[6.7rem] top-[2.6rem] left-[8.5rem] lg:left-6">
              <InspectionIcon />
            </div>
            <Link href="https://forms.gle/gAtbp38JMEozDt3q6" className="border border-solid mt-7 text-[16px] text-center border-light rounded-full px-10 py-2 lg:py-0 lg:px-12 ">
              Book Inspection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
