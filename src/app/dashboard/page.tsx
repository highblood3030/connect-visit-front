"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiLogOut, FiTag, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiOutlineAppstore, AiOutlineUser } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsBuildings, BsCreditCard } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";

export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conneqBizOpen, setConneqBizOpen] = useState(false); // Dropdown state

  const sidebarItems = [
    { label: "DASHBOARD", icon: <AiOutlineAppstore className="text-2xl" />, path: "/dashboard" },
    { label: "CONNEQ-Biz", icon: <BsBuildings className="text-2xl" />, isSidebarTrigger: true },
    { label: "CONNEQ-Page", icon: <AiOutlineUser className="text-2xl" />, path: "/conneq-page" },
    { label: "CONNEQ-Tag", icon: <FiTag className="text-2xl" />, path: "/conneq-tag" },
    { label: "CONNEQ-Visit", icon: <HiOutlineDocumentText className="text-2xl" />, path: "/conneq-visit" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="bg-[#91C8C4] text-white flex justify-between items-center h-16 px-6 shadow-md">
        <button onClick={() => setSidebarOpen(true)} className="focus:outline-none">
          <FiMenu className="text-3xl text-[#145C5B] hover:scale-110 transition-transform" />
        </button>
        <img src="/Q.png" alt="Q Logo" className="w-16 h-12 object-contain shadow-md" />
      </nav>

      {/* Floating Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#D7F0ED] shadow-xl transition-transform duration-500 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center p-6">
          <img
            src="/profile-placeholder.png"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#145C5B] shadow-md"
          />
          <h2 className="text-lg font-bold text-gray-700">Erika Faller</h2>
          <p className="text-sm text-gray-600">ojt_fallere@dnl.com.ph</p>
        </div>

        {/* Sidebar Items */}
        <div className="mt-4 space-y-1 text-gray-700">
          {/* DASHBOARD (Only in Sidebar) */}
          <div
            onClick={() => router.push("/dashboard")}
            className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition"
          >
            <AiOutlineAppstore className="text-2xl" />
            <span>DASHBOARD</span>
          </div>

          {/* CONNEQ-BIZ with Dropdown */}
          <div>
            <div
              onClick={() => setConneqBizOpen(!conneqBizOpen)}
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition"
            >
              <div className="flex items-center space-x-3">
                <BsBuildings className="text-2xl" />
                <span>CONNEQ-Biz</span>
              </div>
              {conneqBizOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
            </div>

            {/* Dropdown Items */}
            <div
              className={`ml-10 space-y-2 overflow-hidden transition-all duration-300 ${
                conneqBizOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div
                onClick={() => router.push("/my_cards")}
                className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition"
              >
                <BsCreditCard className="text-xl" />
                <span>My Cards</span>
              </div>
              <div
                onClick={() => router.push("/edit-information")}
                className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition"
              >
                <MdOutlineEdit className="text-xl" />
                <span>Edit Information</span>
              </div>
            </div>
          </div>

          {/* Other Menu Items */}
          {sidebarItems
            .filter((item) => item.label !== "DASHBOARD") // 🔥 Exclude DASHBOARD from main cards but keep in sidebar
            .map((item, idx) => (
              <div
                key={idx}
                onClick={() => router.push(item.path)}
                className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 flex items-center space-x-3 cursor-pointer text-red-500">
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </div>
      </div>

      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/40 z-40"></div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-16 bg-[#D7F0ED] text-[#145C5B] flex flex-col items-center py-8 space-y-6 border-r border-gray-300 shadow-xl">
          {sidebarItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => (item.isSidebarTrigger ? setSidebarOpen(true) : item.path && router.push(item.path))}
              className="p-3 rounded-full hover:bg-[#145C5B] hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-sm"
            >
              {item.icon}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-extrabold text-[#145C5B] mb-6">
            Welcome back, Erika Faller 👋
          </h1>

          {/* Dashboard Menu Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sidebarItems
              .filter((card) => card.label !== "DASHBOARD") // 🔥 Ensure DASHBOARD is removed from main section
              .map((card, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    card.label === "CONNEQ-Biz" ? router.push("/my_cards") : card.path && router.push(card.path)
                  }
                  className="bg-[#D7F0ED] hover:bg-[#B7E0DA] text-[#145C5B] flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  {card.icon}
                  <h2 className="text-lg font-semibold mt-4">{card.label}</h2>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}
