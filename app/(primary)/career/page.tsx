import Link from "next/link";
import React from "react";

const Career = () => {
  return (
    <div className=" mt-[10rem]">
      <div className="text-center">
        <h1 className="text-[32px] mb-8 font-bold">
          Open <span className="text-[#FF0000]">Vacancies</span>
        </h1>
        <Link href="https://portal.pbonetwork.com/ref/edeh" target="_blank" className={`link bg-white rounded-full px-6 py-3 font-semibold text-black mt-12`}>
            Become a PBO
          </Link>
      </div>
    </div>
  );
};

export default Career;
