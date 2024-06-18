import { HeroSection } from "./_components";
import VisionICon from "/public/assests/vision.svg";
import MissionICon from "/public/assests/mission.svg";
import AccountabilityImage from "/public/assests/accountability.png";
import ServiceImgae from "/public/assests/service.png";
import ResponsibilityImage from "/public/assests/responsibility.png";
import IntegrityImage from "/public/assests/integrigy.png";
import ExcellenceImage from "/public/assests/excellence.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-light">
      <HeroSection />
      <div className="text-center mx-auto px-3 mt-8 lg:mt-[6rem]">
        <h1 className="text-[36px] font-[700] my-[15px]">
          About <span className="text-red-600">Us</span>
        </h1>
        <div className="text-left text-[1rem] xl:px-[10rem] 2xl:px-[21rem]">
          Welcome to Jacin Homes, your trusted partner in land acquisition and
          investment! At Jacin Homes, we bridge the gap between individuals
          seeking to own land and reputable real estate companies, providing a
          seamless and secure experience.{" "}
          <p className="mt-2">
            Our mission is to make land ownership a reality for everyone,
            regardless of budget or location. Through strategic partnerships
            with industry leaders like Pwan group, Brost Global, and others, we
            offer a diverse portfolio of genuine and affordable land options
            across Nigeria
          </p>{" "}
          <p className="mt-2">
            Our extensive network covers key locations, including: - Lagos -
            Abuja - Asaba - Enugu - Orlu - Ebonyi - Ogun - Warri - Agbo - Imo -
            Aba - Abia - Akwa Ibom - Warri - Nnewi - Awka Our commitment to
            excellence ensures: - Transparent transactions - Efficient land
            acquisition processes - Secure investments - Exceptional customer
            service
          </p>{" "}
          <p className="mt-2">
          At Jacin Homes, we prioritize our clients' satisfaction, striving to
          build long-term relationships and provide services that exceed
          expectations. Whether you're an individual or organization, we're
          dedicated to making land ownership accessible, stress-free, and
          rewarding.
          </p>
          
        </div>
      </div>
      <div className="flex md:flex-row justify-center px-3 md:w-full gap-6 lg:w-[800px] mx-auto  items-center text-center flex-col mt-12 lg:mt-[6rem]">
        <div className="bg-white shadow-md rounded-md mx-auto  flex flex-col items-center text-center py-[60px] px-[30px] leading-[1.5rem] lg:w-[300px] md:h-[400px] md:w-[300px] lg:h-[400px]">
          <Image src={VisionICon} alt="visionicon" />
          <h4 className="text-[18px] font-bold mt-6">Our Vision</h4>
          <p className="text-[15px] mt-6">
            Our vision is to be the leading land acquisition and investment
            partner in Nigeria, bridging the gap between individuals and
            reputable real estate companies, and making land ownership
            accessible, stress-free, and rewarding for all
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md mx-auto  flex flex-col justify-center items-center text-center py-[60px] px-[30px] leading-[1.5rem] md:h-[400px] md:w-[300px] lg:w-[300px] lg:h-[400px]">
          <Image src={MissionICon} alt="missionicon" />
          <h4 className="text-[18px] font-bold mt-6">Our Mission</h4>
          <p className="text-[15px] mt-6">
            Our mission is to make land ownership a reality for everyone,
            regardless of budget or location, by providing a seamless and secure
            experience through strategic partnerships and exceptional customer
            service
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
        <div className="absolute inset-0 flex flex-col gap-8 items-center lg:text-left text-center justify-center z-20">
          <h1 className="text-[28px] font-bold text-white">
            Our Core <span className="text-[#FF0000]">Values</span>
          </h1>
          <div className="flex lg:flex-row flex-col justify-center gap-12 items-center mx-auto">
            <div className="flex gap-3 items-center">
              <Image
                src={AccountabilityImage}
                width={35}
                height={35}
                alt="accountabilty image"
              />
              <h3 className="text-white">A - Accountability</h3>
            </div>

            <div className="flex gap-3 items-center">
              <Image
                src={ResponsibilityImage}
                width={35}
                height={35}
                alt="responsibility image"
              />
              <h3 className="text-white">R - Responsibility</h3>
            </div>

            <div className="flex gap-3 items-center">
              <Image
                src={IntegrityImage}
                width={35}
                height={35}
                alt="integrity image"
              />
              <h3 className="text-white">I - Integrity</h3>
            </div>

            <div className="flex gap-3 items-center">
              <Image
                src={ServiceImgae}
                width={35}
                height={35}
                alt="service image"
              />
              <h3 className="text-white">S - Service</h3>
            </div>

            <div className="flex gap-3 items-center">
              <Image
                src={ExcellenceImage}
                width={35}
                height={35}
                alt="excellence image"
              />
              <h3 className="text-white">E - Excellence</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
