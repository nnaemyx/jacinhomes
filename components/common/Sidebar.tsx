import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { menuItems } from "../common"; // Ensure this import has type definitions for menuItems
import { ChevronDownIcon } from "../icons";
import DropUpIcon from "../icons/DropUp";

interface SidebarProps {
  onTitleClick: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTitleClick }) => {
  const [activeDropdowns, setActiveDropdowns] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();
  const pathname = usePathname();

  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  const isSubItemActive = (subItem: menuItems, dropdownId: string): boolean => {
    return subItem.href === pathname && !!activeDropdowns[dropdownId];
  };

  return (
    <nav className="text-center">
      <ul className="mt-8 space-y-12 leading-[4rem]">
        {menuItems.map(({ href, title, subItems }: menuItems) => (
          <li className="text-sm md:text-[14px] font-gilmerregular" key={title}>
            {subItems ? (
              <div className="relative">
                <div
                  className="px-4 md:px-6 w-full cursor-pointer"
                  onClick={() => {
                    onTitleClick(title);
                    toggleDropdown(title);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{title}</span>
                    </div>
                    <span className="ml-2">
                      {activeDropdowns[title] ? (
                        <DropUpIcon className="fill-black" />
                      ) : (
                        <ChevronDownIcon className="fill-black" />
                      )}
                    </span>
                  </div>
                </div>
                {activeDropdowns[title] && (
                  <ul className="bg-white  py-4 space-y-4">
                    {subItems.map(({ href: subHref, title: subTitle }: menuItems) => (
                      <li key={subTitle}>
                        <Link href={subHref ?? "#"}>
                          <div
                            className={`flex items-center justify-start gap-2 px-10 md:px-14 w-full cursor-pointer ${
                              isSubItemActive({ href: subHref, title: subTitle }, title)
                                ? "bg-primary py-4 text-white"
                                : ""
                            }`}
                          >
                            {subTitle}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link href={href ?? "#"}>
                <p
                  className={`flex items-center gap-2 px-4 md:px-6 w-full cursor-pointer ${
                    pathname === href && "bg-primary py-4 fill-white text-white"
                  }`}
                  onClick={() => onTitleClick(title)}
                >
                  {title}
                </p>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
