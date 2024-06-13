"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "public/assests/jacinhomes (3).png";
import { ChevronDownIcon } from "@/components/icons";
import HamburgerIcon from "@/components/icons/Hamburger";

const Navbar = () => {
  const [bg, setBg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setBg(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isHomePage = pathname === "/";

  
  return (
    <header
    className={`fixed top-0 left-0 w-full z-30 transition-all font-bold ${
      isHomePage
        ? bg
          ? "bg-black shadow-lg lg:h-[8rem] h-[5rem]"
          : "bg-transparent"
        : "bg-black"
    }`}
    >
      <div className="max-w-[90%] mx-auto px-4 sm:px-6  lg:px-8 flex items-center justify-between lg:gap-[12rem] xl:justify-start lg:h-32 h-[5rem]">
        <Link href="/" className="hidden lg:block">
          <div className="flex-shrink-0">
            <Image src={Logo} alt="Jacinhomes Logo" width={129.73} height={40} />
          </div>
        </Link>
        <Link href="/" className="lg:hidden block">
          <div className="flex-shrink-0">
            <Image src={Logo} alt="Jacinhomes Logo" width={100} height={100} />
          </div>
        </Link>
        <nav className="hidden xl:flex gap-6 items-center  text-light">
          <Link href="/" className={`link ${pathname === "/" ? "active text-red-600" : ""}`}>
            Home
          </Link>
          <div className="relative group">
            <button
              className={`flex items-center ${
                pathname.startsWith("/aboutus") ? "active text-red-500" : ""
              }`}
            >
              About us <ChevronDownIcon className="ml-2" />
            </button>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 py-2 w-[150px] mt-1 rounded-md shadow-lg">
              <Link href="/aboutus/" className={`block px-4 py-2 text-sm ${pathname === "/gallery/images" ? "active text-red-500" : ""}`}>
                Who we are
              </Link>
              <Link href="/gallery/videos" className={`block px-4 py-2 text-sm ${pathname === "/gallery/videos" ? "active text-red-500" : ""}`}>
                Board of Directors
              </Link>
            </div>
          </div>
          <Link href="/services" className={`link ${pathname === "/services" ? "active text-red-500" : ""}`}>
            Our Services
          </Link>
          <Link href="/estates" className={`link ${pathname === "/estates" ? "active text-red-500" : ""}`}>
            Estates
          </Link>
          <div className="relative group">
            <button
              className={`flex items-center ${
                pathname.startsWith("/gallery") ? "active text-red-500" : ""
              }`}
            >
              Gallery <ChevronDownIcon className="ml-2" />
            </button>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 py-2 mt-1 rounded-md shadow-lg">
              <Link href="/gallery/images" className={`block px-4 py-2 text-sm ${pathname === "/gallery/images" ? "active text-red-500" : ""}`}>
                Images
              </Link>
              <Link href="/gallery/videos" className={`block px-4 py-2 text-sm ${pathname === "/gallery/videos" ? "active text-red-500" : ""}`}>
                Videos
              </Link>
            </div>
          </div>
          <Link href="/flyers-promos" className={`link ${pathname === "/flyers-promos" ? "active text-red-500" : ""}`}>
            Flyers & Promos
          </Link>
          <Link href="/blog" className={`link ${pathname === "/blog" ? "active text-red-500" : ""}`}>
            Blog
          </Link>
          <Link href="/career" className={`link ${pathname === "/career" ? "active text-red-500" : ""}`}>
            Careers
          </Link>
          <Link href="/contactus" className={`link bg-white rounded-full px-6 py-3 font-semibold text-black ${pathname === "/contact-us" ? "active text-red-500" : ""}`}>
            Contact
          </Link>
          <Link href="https://portal.pbonetwork.com/ref/edeh" target="_blank" className={`link bg-white rounded-full px-6 py-3 font-semibold text-black ${pathname === "https://portal.pbonetwork.com/ref/edeh" ? "active text-red-500" : ""}`}>
            Become a PBO
          </Link>
        </nav>
        <div className="xl:hidden">
          <button onClick={toggleMenu}>
            <HamburgerIcon />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="xl:hidden flex flex-col justify-center items-center text-center bg-white text-black  p-4">
          <Link href="/" className={`block py-2 ${pathname === "/" ? "active text-red-600" : ""}`}>
            Home
          </Link>
          <div className="relative group">
            <button
              className={`flex items-center ${
                pathname.startsWith("/aboutus") ? "active text-red-500" : ""
              }`}
            >
              About us <ChevronDownIcon className="ml-2" />
            </button>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 py-2 w-[150px] mt-1 rounded-md shadow-lg">
              <Link href="/aboutus/" className={`block px-4 py-2 text-sm ${pathname === "/gallery/images" ? "active text-red-500" : ""}`}>
                Who we are
              </Link>
              <Link href="/gallery/videos" className={`block px-4 py-2 text-sm ${pathname === "/gallery/videos" ? "active text-red-500" : ""}`}>
                Board of Directors
              </Link>
            </div>
          </div>
          <Link href="/services" className={`block py-2 ${pathname === "/services" ? "active text-red-500" : ""}`}>
            Our Services
          </Link>
          <Link href="/estates" className={`block py-2 ${pathname === "/estates" ? "active text-red-500" : ""}`}>
            Estates
          </Link>
          <div className="relative group">
            <button
              className={`flex items-center ${
                pathname.startsWith("/gallery") ? "active text-red-500" : ""
              }`}
            >
              Gallery <ChevronDownIcon className="ml-2" />
            </button>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 py-2 mt-1 rounded-md shadow-lg">
              <Link href="/gallery/images" className={`block px-4 py-2 text-sm ${pathname === "/gallery/images" ? "active text-red-500" : ""}`}>
                Images
              </Link>
              <Link href="/gallery/videos" className={`block px-4 py-2 text-sm ${pathname === "/gallery/videos" ? "active text-red-500" : ""}`}>
                Videos
              </Link>
            </div>
          </div>
          <Link href="/flyers-promos" className={`block py-2 ${pathname === "/flyers-promos" ? "active text-red-500" : ""}`}>
            Flyers & Promos
          </Link>
          <Link href="/blog" className={`block py-2 ${pathname === "/blog" ? "active text-red-500" : ""}`}>
            Blog
          </Link>
          <Link href="/career" className={`link ${pathname === "/career" ? "active text-red-500" : ""}`}>
            Careers
          </Link>
          <Link href="/contactus" className={`block  bg-black rounded-full px-6 py-3 font-semibold text-white ${pathname === "/contact-us" ? "active text-red-500" : ""}`}>
            Contact
          </Link>
          <Link href="https://portal.pbonetwork.com/ref/edeh" target="_blank" className={`link bg-black text-white rounded-full px-6 py-3 font-semibold mt-2 ${pathname === "https://portal.pbonetwork.com/ref/edeh" ? "active text-red-500" : ""}`}>
            Become a PBO
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
