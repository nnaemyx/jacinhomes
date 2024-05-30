import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/assests/jacinhomeslogo-removebg-preview.png";
import HeroSection from "./HeroSection";

const Navbar = () => {

  return (
    <div className="relative h-screen bg-black">
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex-shrink-0">
                  <Image
                    src={Logo}
                    alt="Jacinhomes Logo"
                    width={50}
                    height={50}
                  />
                </div>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/about-us">
                    <div className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      About Us
                    </div>
                  </Link>
                  <Link href="/services">
                    <div className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Our Services
                    </div>
                  </Link>
                  <Link href="/estates">
                    <div className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Estates
                    </div>
                  </Link>
                  <div className="relative group">
                    <button className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Gallery
                    </button>
                    <div className="absolute hidden group-hover:block bg-white text-gray-800 py-2 mt-1 rounded-md shadow-lg">
                      <Link href="/gallery/images">
                        <div className="block px-4 py-2 text-sm">Images</div>
                      </Link>
                      <Link href="/gallery/videos">
                        <div className="block px-4 py-2 text-sm">Videos</div>
                      </Link>
                    </div>
                  </div>
                  <Link href="/flyers-promos">
                    <div className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Flyers & Promos
                    </div>
                  </Link>
                  <Link href="/blog">
                    <div className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Blog
                    </div>
                  </Link>
                  <Link href="/contact-us">
                    <div className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Contact Us
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {/* Heroicon menu icon */}
              </button>
            </div>
          </div>
        </div>
      </nav>
        <HeroSection/>
    </div>
  );
};

export default Navbar;
