"use client";
import React, { useState } from "react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import {
  AiOutlineAppstore,
  AiOutlineFileImage,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function EditUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E8F1F2] flex flex-col relative">
      {/* Top Navbar */}
      <nav className="bg-[#91C8C4] text-white flex justify-between items-center h-16 px-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <button onClick={() => setSidebarOpen(true)} className="focus:outline-none">
            <FiMenu className="text-3xl text-[#145C5B] hover:scale-110 transition-transform" />
          </button>
          <h1 className="text-xl font-bold text-[#145C5B]">ConneQ</h1>
        </div>
        <div>
          <img src="/Q.png" alt="Q Logo" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
        </div>
      </nav>

      {/* Slide-out Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#B7E0DA] p-6 shadow-lg transition-transform duration-500 z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-2">
          <img src="/dp.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
          <h2 className="text-lg font-bold text-gray-700">Erika Faller</h2>
          <p className="text-sm text-gray-600">ojt_fallere@dnl.com.ph</p>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 space-y-4 text-gray-700">
          {["DASHBOARD", "CONNEQ-Biz", "CONNEQ-Page", "CONNEQ-Tag", "CONNEQ-Visit"].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 cursor-pointer hover:text-[#145C5B] transition-all">
              <AiOutlineAppstore className="text-xl" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 flex items-center space-x-3 cursor-pointer text-red-500">
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-500"></div>
      )}

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Vertical Small Sidebar */}
        <aside className="w-16 bg-[#D7F0ED] text-[#145C5B] flex flex-col items-center py-8 space-y-6 border-r border-gray-300 shadow-xl">
          <SidebarIcon><AiOutlineAppstore className="text-lg" /></SidebarIcon>
          <SidebarIcon><AiOutlineFileImage className="text-lg" /></SidebarIcon>
          <SidebarIcon><HiOutlineDocumentText className="text-lg" /></SidebarIcon>
          <SidebarIcon><AiOutlineFileText className="text-lg" /></SidebarIcon>
          <SidebarIcon><AiOutlineUser className="text-lg" /></SidebarIcon>
        </aside>

        {/* Main Form Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-4xl font-extrabold text-[#145C5B] mb-6">MY INFORMATION</h1>

          {/* Tabs */}
          <div className="flex space-x-10 border-b-2 border-gray-300 mb-8">
            {["PERSONAL INFORMATION", "CONTACT INFORMATION", "OFFICE ADDRESS", "SOCIAL MEDIA ACCOUNTS", "OTHERS"].map((tab, idx) => (
              <span
                key={idx}
                className={`relative pb-3 font-medium text-sm cursor-pointer transition-all ${
                  idx === 0
                    ? "text-[#145C5B] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#145C5B] after:rounded-full"
                    : "text-gray-500 hover:text-[#145C5B]"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* --- Your form and preview content goes here --- */}
        </main>
      </div>
    </div>
  );
}

// Sidebar Icon Wrapper with modern hover effect
const SidebarIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 rounded-full hover:bg-[#145C5B] hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-sm">
    {children}
  </div>
);
