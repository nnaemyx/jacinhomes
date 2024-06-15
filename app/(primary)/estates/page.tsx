"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Estate {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const Estates: React.FC = () => {
  const [estates, setEstates] = useState<Estate[]>([]);

  useEffect(() => {
    const fetchEstates = async () => {
      const res = await fetch("/api/estate");
      const data = await res.json();
      setEstates(data);
    };

    fetchEstates();
  }, []);

  return (
    <div className="min-h-screen mt-[5rem] lg:mt-[10rem] lg:px-[6rem] px-4 flex flex-col items-center">
      <h1 className="text-4xl my-8 font-bold">Our <span className="text-[#FF0000]">Estates</span></h1>
      <div className="Flex flex-col w-full gap-8 space-y-[2rem]">
        {estates.map((estate) => (
          <div
            key={estate._id}
            className="border p-4 rounded flex xl:flex-row flex-col gap-8 shadow-md"
          >
            <div className="">
              <img
                src={estate.image}
                alt={estate.title}
                className="mb-4 lg:w-[746px] max-w-auto object-cover w-[401.33px] h-[328.87px] lg:h-[611.29px]"
              />
            </div>
            <div className="flex-1 flex justify-between py-4 flex-col">
              <div>
                <h2 className="text-2xl font-bold mb-2">{estate.title}</h2>
                <p className="mb-12">{estate.description}</p>
              </div>
              <div className="space-y-8">
                <a
                  href={estate.image}
                  download
                  className="block mb-2 text-center  bg-red-600 py-2 rounded-md text-white font-bold text-[20px]"
                >
                  Download Flyers
                </a>
                <a
                  href="/subscription-form.pdf"
                  download
                   className="block mb-2 text-center  border border-red-600 bg-white py-2 rounded-md text-red-600 font-bold text-[20px]"
                >
                  Download Subscription Form
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Estates;
