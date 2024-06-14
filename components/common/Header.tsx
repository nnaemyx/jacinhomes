import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
    clickedTitle: string;
  }

const Header: React.FC<HeaderProps> = ({ clickedTitle }) => {
  const router = useRouter();


  return (
    <div className="w-full hidden lg:block">
      <div className="flex justify-between">
        <div>
        <h1>{clickedTitle}</h1>
        </div>
        <div className="flex items-center space-x-5">
          <button
           
            className="bg-[#314484] text-gray-50 py-2 px-6 rounded hover:bg-red-500"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;