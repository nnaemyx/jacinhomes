import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "public/assests/jacinhomes (3).png";

function Footer() {
  return (
    <>
      {/* Newsletter */}
      <div className="bg-[#0A1229] py-[100px] 2xl:px-[260px]  mt-24 text-white">
        <div className="flex justify-between xl:flex-row flex-col xl:items-center">
          <div className="px-[60px]">
            <h1 className="text-[22px] font-bold">
              Subscribe to get our newsletter
            </h1>
            <p className="text-[12px]">
              Be the first to know about our releases and industry news
              insights.
            </p>
          </div>
          <div className="px-4">
            <form className="flex  mt-16 xl:mt-0 gap-2 ">
              <input
                type="email"
                placeholder="Enter your email"
                className="py-[6px] px-[12px] focus:outline-none xl:w-[523px] h-[44px] w-full text-black rounded-md"
              />
              <button
                type="submit"
                className="rounded-md bg-white h-[44px] px-4 font-bold  text-black xl:w-[109px]"
              >
                Subscribe
              </button>
            </form>
            <p className="text-[12px] mt-4">
              We care about your data in our{" "}
              <span className="text-[#FF0000] underline">privacy policy</span>
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-white px-[60px] ">
        <div className="flex lg:flex-row flex-col">
          <div>
            <Link href="/" className="">
              <div className="flex-shrink-0">
                <Image
                  src={Logo}
                  alt="Jacinhomes Logo"
                  width={240}
                  height={74}
                />
              </div>
            </Link>
          </div>
          <div>
            <h1>Our Offices</h1>
            <p>Floor 1 to 5, Km 42, Puri mall building, Oko Ado, Lekki Epe Express way, Lagos State</p>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Footer;
