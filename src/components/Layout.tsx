"use client"; // Enables Next.js Client Component mode

import { ReactNode, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FiUsers,
  FiMenu,
  FiLogOut,
} from "react-icons/fi"; // Icons for UI from Feather Icons
import {
  MdSpaceDashboard,
  MdOutlineSell,
} from "react-icons/md"; // Material Design Icons
import { HiOutlineCreditCard } from "react-icons/hi";
import { RiFileSearchLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";

// Type definition for expected user data stored in localStorage
interface UserData {
  profileImage?: string;
  firstname?: string;
  lastname?: string;
  workemail?: string;
}

// Props type for layout component
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bizDropdownOpen, setBizDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null); // Used for click-outside detection

  // On route change or initial load, try to read user data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("userFormData");
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, [pathname]);

  // Close sidebar when clicking outside it
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  // Apply different background gradient depending on current route
  const isDashboard = pathname === "/dashboard";
  const wrapperBackground = isDashboard
    ? "bg-gradient-to-br from-[#ece0cd] to-[#d8f8fd]"
    : "bg-gradient-to-br from-white to-gray-100";

  return (
    <div className={`h-screen flex ${wrapperBackground}`}>
      {/* Sidebar Container */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 sm:w-80 bg-[#D7F0ED] shadow-xl overflow-y-auto transform transition-transform duration-500 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header - User Info Section */}
        <div className="flex flex-col justify-center items-center px-6 py-6 text-center">
          <Image
            src={userData?.profileImage || "/profile-placeholder.jpeg"}
            alt="Profile"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full border-4 border-primary shadow-md object-cover"
          />
          <h2 className="text-lg text-primary">
            {userData?.firstname || "Your Name"} {userData?.lastname || ""}
          </h2>
          <p className="text-sm opacity-80">
            {userData?.workemail || "your.email@example.com"}
          </p>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-grow mt-4 space-y-1 sm:space-y-2 text-primary px-6">
          {[
            { label: "DASHBOARD", icon: MdSpaceDashboard, path: "/dashboard" },
            {
              label: "CONNEQ-Biz",
              icon: HiOutlineCreditCard,
              dropdown: [
                { label: "My Cards", path: "/conneq-biz" },
                { label: "Edit Information", path: "/edit_user" },
              ],
            },
            { label: "CONNEQ-Page", icon: FiUsers, path: "/conneq-page" },
            { label: "CONNEQ-Tag", icon: MdOutlineSell, path: "/conneq-tag" },
            {
              label: "CONNEQ-Visit",
              icon: RiFileSearchLine,
              path: "/conneq-visit",
            },
          ].map((item, idx) => (
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
                className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-200 rounded-lg transition"
              >
                <item.icon className="text-2xl" />
                <span>{item.label}</span>
                {item.dropdown && <IoIosArrowDown />}
              </div>

              {/* Dropdown Menu for "Conneq-Biz" */}
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
            onClick={() => router.push("/Log-in")}
            className="flex items-center space-x-3 px-4 py-3 cursor-pointer text-red-600 hover:bg-red-100 rounded-lg transition w-full"
          >
            <FiLogOut className="text-2xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main App Container */}
      <div className="flex flex-col flex-grow h-screen overflow-auto">
        {/* Top Navbar */}
        <nav className="bg-[#00ada7] text-white flex items-center h-16 px-6 fixed top-0 left-0 w-full z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-3xl text-white focus:outline-none cursor-pointer hover:bg-[#D7F0ED]"
          >
            <FiMenu />
          </button>
          <div className="ml-auto sm:mr-4">
            <Image
              src="/QR-Logo.png"
              alt="QR-Logo Logo"
              width={64}
              height={48}
              className="w-16 h-12 object-contain"
            />
          </div>
        </nav>

        {/* Children Content */}
        <main className="flex-grow p-4 sm:p-8 mt-16 sm:mt-0">{children}</main>
      </div>
    </div>
  );
}
