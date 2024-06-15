"use client";
import React, { useState, useEffect, useRef } from "react";
import { Header, Sidebar } from "@/components/common";
import Image from "next/image";
import Logo from "/public/assests/jacinhomes (3).png";
import { useRouter } from "next/navigation";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

const AdminLayoutClient: React.FC<AdminLayoutClientProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clickedTitle, setClickedTitle] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleTitleClick = (title: string) => {
    setClickedTitle(title);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

   useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleSignOut = () => {
    // Assuming you're using localStorage to store the token
    localStorage.removeItem("token"); // Remove the token from localStorage

    // Redirect to the login page or homepage after sign out
    router.push("/login"); // Replace with your login page route
  };

  return (
    <>
      <div className=" font-opensans bg-white flex flex-col md:flex-row">
        <header className="flex justify-between items-center px-4 md:hidden">
          {!isSidebarOpen && (
            <Image
              src={Logo}
              width={150}
              height={0}
              alt="logo"
            />
          )}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar}>
              {isSidebarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path>
                </svg>
              )}
            </button>
            <button
            onClick={handleSignOut}
            className="bg-[#314484] text-gray-50 py-2 px-6 rounded hover:bg-red-500"
          >
            Sign out
          </button>
          </div>
        </header>
        <aside
         ref={sidebarRef}
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 h-screen w-[232px] 2xl:w-[263px] bg-white text-center text-secondary border-r border-solid transition-transform  py-4 space-y-6  duration-300 md:relative md:translate-x-0 z-50`}
        >
          <Sidebar onTitleClick={handleTitleClick} />
        </aside>
        <main className="flex-1 mt-2 md:mt-8 px-4 md:px-6 flex flex-col">
          <Header clickedTitle={clickedTitle} />
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayoutClient;
