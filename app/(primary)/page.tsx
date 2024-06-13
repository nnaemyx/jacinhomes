import { HeroSection } from "./_components";
import VisionICon from "/public/assests/vision.svg";
import MissionICon from "/public/assests/mission.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-light">
      <HeroSection />
      <div className="text-center mx-auto px-3 mt-8 lg:mt-[6rem]">
        <h1 className="text-[36px] font-[700] my-[15px]">
          About <span className="text-red-600">Us</span>
        </h1>
        <p className="text-left text-[1rem] xl:px-[21rem]">
          We are the first Real Estate Network marketing company in the world
          with more than a decade of experience in the real estate industry. Our
          driving purpose is not just to make homeownership dream a reality for
          everyone, but to also make the process as easy as possible. We provide
          consistent, reliable services, and stand by our commitment to quality.
          We discover the best lands in fast-developing areas and make these
          known to you and also show you ways to conveniently finance your
          private properties in budget-friendly manners. We are focused on
          making home ownership the easiest thing you have ever done.
        </p>
      </div>
      <div className="flex md:flex-row justify-center px-3 md:w-full gap-6 lg:w-[800px] mx-auto  items-center text-center flex-col mt-12 lg:mt-[6rem]">
        <div className="bg-white shadow-md rounded-md mx-auto  flex flex-col items-center text-center py-[60px] px-[30px] leading-[1.5rem] lg:w-[300px] md:h-[400px] md:w-[300px] lg:h-[400px]">
          <Image src={VisionICon} alt="visionicon" />
          <h4 className="text-[18px] font-bold mt-6">Our Vision</h4>
          <p className="text-[15px] mt-6">
            To make home ownership dream a reality to as many people as possible
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md mx-auto  flex flex-col justify-center items-center text-center py-[60px] px-[30px] leading-[1.5rem] md:h-[400px] md:w-[300px] lg:w-[300px] lg:h-[400px]">
          <Image src={MissionICon} alt="missionicon" />
          <h4 className="text-[18px] font-bold mt-6">Our Mission</h4>
          <p className="text-[15px] mt-6">
            To discover lands everywhere and make these known to you and also
            show how you can make money to buy land and build your own home
          </p>
        </div>
      </div>
      <div className="relative h-screen lg:h-auto mt-12 lg:mt-[6rem]">
        <div className="relative z-10">
          <div>
            <img
              src="https://res.cloudinary.com/dgms1mpbw/image/upload/v1717100105/jacinhomes/webaliser-_TPTXZd9mOo-unsplash_tmlphj.jpg"
              alt="Slider Image 1"
              className="w-full h-screen lg:h-[16rem] object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-80 z-10"></div>
        <div className="absolute inset-0 flex items-center lg:text-left text-center justify-center z-20"></div>
      </div>
    </main>
  );
}
