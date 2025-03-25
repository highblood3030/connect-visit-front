"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUsers, FiMenu, FiLogOut } from "react-icons/fi";
import { MdSpaceDashboard, MdOutlineSell } from "react-icons/md";
import { HiOutlineCreditCard } from "react-icons/hi";
import { RiFileSearchLine } from "react-icons/ri";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";

// Define the type for Layout props
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bizDropdownOpen, setBizDropdownOpen] = useState(false);

  const sidebarItems = [
    { label: "DASHBOARD", icon: MdSpaceDashboard, path: "/dashboard" },
    {
      label: "CONNEQ-Biz",
      icon: HiOutlineCreditCard,
      path: "#",
      dropdown: [
        { label: "My Cards", path: "/conneq-biz" },
        { label: "Edit Information", path: "/edit_user" },
      ],
    },
    { label: "CONNEQ-Page", icon: FiUsers, path: "/conneq-page" },
    { label: "CONNEQ-Tag", icon: MdOutlineSell, path: "/conneq-tag" },
    { label: "CONNEQ-Visit", icon: RiFileSearchLine, path: "/conneq-visit" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAE7C9] to-[#b4f6ff] flex relative">
      {/* Navbar */}
      <nav className="bg-[#91C8C4] text-white flex items-center h-16 px-6 shadow-md fixed top-0 left-0 w-full z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-3xl text-white focus:outline-none"
        >
          <FiMenu />
        </button>
        <div className="ml-auto flex items-center">
          <img
            src="/QR-Logo.png"
            alt="QR-Logo Logo"
            className="w-16 h-12 object-contain shadow-md"
          />
        </div>
      </nav>

      {/* Full-Screen Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-[#D7F0ED] shadow-xl transform transition-transform duration-500 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-[#A9DCD6]">
            <h2 className="text-lg font-bold text-gray-700">Navigation</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-3xl text-gray-700 focus:outline-none"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Sidebar Items */}
          <div className="flex-grow mt-4 space-y-1 text-gray-700 px-6">
            {sidebarItems.map((item, idx) => (
              <div key={idx} className="relative">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.dropdown) {
                      setBizDropdownOpen(!bizDropdownOpen);
                    } else {
                      router.push(item.path);
                      setSidebarOpen(false);
                    }
                  }}
                  className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition"
                >
                  <item.icon className="text-2xl" />
                  <span>{item.label}</span>
                  {item.dropdown && <IoIosArrowDown />}
                </div>

                {/* Dropdown for Conneq-Biz */}
                {item.dropdown && bizDropdownOpen && (
                  <div className="pl-10 space-y-1">
                    {item.dropdown.map((subItem, subIdx) => (
                      <div
                        key={subIdx}
                        onClick={() => {
                          router.push(subItem.path);
                          setSidebarOpen(false);
                        }}
                        className="cursor-pointer px-3 py-2 hover:bg-gray-200 rounded"
                      >
                        {subItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="px-6 py-4">
            <button
              onClick={() => router.push("/logout")}
              className="flex items-center space-x-3 px-4 py-3 cursor-pointer text-red-600 hover:bg-red-100 rounded-lg transition w-full"
            >
              <FiLogOut className="text-2xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-8">{children}</main>
    </div>
  );
}
