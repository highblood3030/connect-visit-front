"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FiMenu, FiLogOut, FiTag, FiChevronDown, FiChevronUp 
} from "react-icons/fi";
import { 
  AiOutlineAppstore, AiOutlineUser 
} from "react-icons/ai";
import { 
  HiOutlineDocumentText 
} from "react-icons/hi";
import { 
  BsBuildings, BsCreditCard 
} from "react-icons/bs";
import { 
  MdOutlineEdit 
} from "react-icons/md";
import { FaBars } from "react-icons/fa";

export default function MyCardsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conneqBizOpen, setConneqBizOpen] = useState(false);

  const sidebarItems = [
    { label: "DASHBOARD", icon: <AiOutlineAppstore className="text-2xl" />, path: "/dashboard" },
    { label: "CONNEQ-Page", icon: <AiOutlineUser className="text-2xl" />, path: "/conneq-page" },
    { label: "CONNEQ-Tag", icon: <FiTag className="text-2xl" />, path: "/conneq-tag" },
    { label: "CONNEQ-Visit", icon: <HiOutlineDocumentText className="text-2xl" />, path: "/conneq-visit" },
  ];

  const businessCards = [
    { title: "Business 1", description: "Description for Business 1" },
    { title: "Business 2", description: "Description for Business 2" },
    { title: "Business 3", description: "Description for Business 3" },
    { title: "Business 4", description: "Description for Business 4" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#AFCFCF] text-black h-full fixed top-0 left-0 transition-all duration-300 ${
          sidebarOpen ? "w-64 p-4" : "w-0 p-0 overflow-hidden"
        }`}
      >
        {sidebarOpen && (
          <div className="text-center mb-4">
            <div className="w-24 h-24 bg-white rounded-full mx-auto"></div>
            <h2 className="font-bold text-lg mt-2">Erika Faller</h2>
            <p className="text-sm text-gray-800">ojt_fallere@dnl.com.ph</p>
          </div>
        )}
        
        {/* Sidebar Items */}
        <nav className={`${sidebarOpen ? "block" : "hidden"}`}>
          <ul className="space-y-4">
            {sidebarItems.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push(item.path)}>
                {item.icon}
                <span className="hover:underline">{item.label}</span>
              </li>
            ))}
            {/* CONNEQ-Biz with Dropdown */}
            <li>
              <div
                onClick={() => setConneqBizOpen(!conneqBizOpen)}
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition"
              >
                <div className="flex items-center space-x-3">
                  <BsBuildings className="text-xl" />
                  <span>CONNEQ-Biz</span>
                </div>
                {conneqBizOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
              </div>
              <div className={`ml-10 space-y-2 overflow-hidden transition-all duration-300 ${
                  conneqBizOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition" onClick={() => router.push("/my_cards")}>
                  <BsCreditCard className="text-xl" />
                  <span className="hover:underline">My Cards</span>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition" onClick={() => router.push("/edit-information")}>
                  <MdOutlineEdit className="text-xl" />
                  <span className="hover:underline">Edit Information</span>
                </div>
              </div>
            </li>
            <li className="flex items-center space-x-2 text-red-500 cursor-pointer">
              <FiLogOut />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#D8E0E3] min-h-screen">
        {/* Top Navigation */}
        <div className="bg-[#5F939A] text-white p-4 flex items-center justify-between">
          <button
            className="text-white text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <h1 className="font-bold text-xl">CONNEQ-Biz</h1>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>

        {/* Business Cards Section */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessCards.map((card, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-black">
                <h2 className="text-lg font-bold">{card.title}</h2>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
