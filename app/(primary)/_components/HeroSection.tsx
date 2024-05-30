import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative h-screen bg-black">
      <div className="absolute inset-0 flex items-center justify-center text-center z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Welcome to Jacinhomes
        </h1>
      </div>
      <div className="absolute inset-0 z-10">
        <Slider {...settings}>
          <div>
            <video className="w-full h-screen object-cover" autoPlay loop muted>
              <source src="/videos/slider1.mp4" type="video/mp4" />
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
          <div>
            <img
              src="https://res.cloudinary.com/dgms1mpbw/image/upload/v1717100145/jacinhomes/digital-marketing-agency-ntwrk-g39p1kDjvSY-unsplash_gqw1bv.jpg"
              alt="Slider Image 3"
              className="w-full h-screen object-cover"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HeroSection;
