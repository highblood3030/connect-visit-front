"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiUsers,
  FiMenu,
  FiLogOut
} from "react-icons/fi";
import {
  MdSpaceDashboard,
  MdOutlineSell
} from "react-icons/md";
import { HiOutlineCreditCard } from "react-icons/hi";
import { RiFileSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";

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
        { label: "Edit Information", path: "/edit_user" }
      ],
    },
    { label: "CONNEQ-Page", icon: FiUsers, path: "/conneq-page" },
    { label: "CONNEQ-Tag", icon: MdOutlineSell, path: "/conneq-tag" },
    { label: "CONNEQ-Visit", icon: RiFileSearchLine, path: "/conneq-visit" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAE7C9] to-[#b4f6ff] flex relative">
      {/* Top Navbar */}
      <nav className="bg-[#91C8C4] text-white flex items-center h-16 px-6 shadow-md fixed top-0 left-0 w-full z-50">
        {/* Hamburger Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(true);
          }}
          className="md:hidden p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-transform focus:outline-none"
        >
          <FiMenu className="text-xl text-[#145C5B]" />
        </button>

        <div className="ml-auto flex items-center">
          <img src="/QR-Logo.png" alt="QR-Logo" className="w-16 h-12 object-contain shadow-md" />
        </div>
      </nav>

      {/* Mini Sidebar (Desktop) */}
      <aside
        className="hidden md:flex w-16 h-screen bg-[#D7F0ED] text-[#145C5B] flex-col items-center py-6 space-y-6 border-r border-gray-300 shadow-xl fixed top-0 left-0 z-40 mt-16"
      >
        {sidebarItems.map((item, idx) => (
          <div key={idx} className="relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (item.dropdown) {
                  setBizDropdownOpen(!bizDropdownOpen);
                } else {
                  router.push(item.path);
                }
              }}
              className="p-3 rounded-full hover:bg-[#145C5B] hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-sm"
            >
              <item.icon className="text-2xl font-bold" />
            </div>
            {item.dropdown && bizDropdownOpen && (
              <div className="absolute left-16 top-0 w-40 bg-white shadow-md rounded-md p-2 space-y-1">
                {item.dropdown.map((subItem, subIdx) => (
                  <div
                    key={subIdx}
                    onClick={() => router.push(subItem.path)}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-200 rounded"
                  >
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* Floating Sidebar (Mobile) */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-screen w-72 bg-[#D7F0ED] shadow-xl transition-transform duration-500 z-50 md:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center p-6 mt-16">
          <img
            src="/profile-placeholder.jpeg"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#145C5B] shadow-md"
          />
          <h2 className="text-lg font-bold text-gray-700 mt-2">Erika Faller</h2>
          <p className="text-sm text-gray-600">ojt_fallere@dnl.com.ph</p>
        </div>

        <div className="mt-4 space-y-1 text-gray-700">
          {sidebarItems.map((item, idx) => (
            <div key={idx} className="relative">
              <div
                onClick={() => {
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

        {/* Logout */}
        <div className="absolute bottom-4 left-4">
          <button
            onClick={() => {
              router.push("/logout");
              setSidebarOpen(false);
            }}
            className="flex items-center space-x-3 px-4 py-3 cursor-pointer text-red-600 hover:bg-red-100 rounded-lg transition"
          >
            <FiLogOut className="text-2xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        />
      )}

      {/* Main Content */}
      <main
        className={`flex-grow transition-all duration-300 p-6 md:p-8 ${
          sidebarOpen ? "blur-sm pointer-events-none select-none" : ""
        } mt-16 ml-0 md:ml-16`}
      >
        {children}
      </main>
    </div>
  );
}
