"use client"
import React, { useState, useEffect } from "react";
import { Header, Sidebar } from "@/components/common";
import Image from "next/image";
import Logo from "/public/assests/jacinhomes (3).png"

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

const AdminLayoutClient: React.FC<AdminLayoutClientProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clickedTitle, setClickedTitle] = useState("");

  const handleTitleClick = (title: string) => {
    setClickedTitle(title);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen font-opensans bg-white flex">
        <aside className="w-[232px] hidden lg:block text-center mx-auto text-secondary bg-white border-r border-solid 2xl:w-[263px]">
          <Image
            src={Logo}
            width={170}
            height={0}
            alt="logo"
            className=""
          />
          <Sidebar onTitleClick={handleTitleClick} />
        </aside>
        <main className="flex-1 mt-2 lg:mt-8 px-4 lg:px-6 flex flex-col">
          <Header clickedTitle={clickedTitle} />
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayoutClient;
