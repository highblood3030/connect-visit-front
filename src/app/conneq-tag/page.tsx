"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaTags,
  FaClipboardList,
  FaBuilding,
  FaSignOutAlt,
  FaTh,
  FaFileAlt,
} from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter } from "next/navigation";

const MyCardsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conneqBizOpen, setConneqBizOpen] = useState(false);
  const [cards, setCards] = useState([
    { id: 1, title: "Business 1", description: "Description for Business 1" },
    { id: 2, title: "Business 2", description: "Description for Business 2" },
    { id: 3, title: "Business 3", description: "Description for Business 3" },
    { id: 4, title: "Business 4", description: "Description for Business 4" },
  ]);
  const router = useRouter();

  const updateCard = (id: number, field: keyof typeof cards[number], value: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#D8F0EB] text-gray-800 h-full fixed lg:relative transition-all duration-300 shadow-lg p-4 ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {isSidebarOpen && (
          <div className="text-center mb-6">
            <div className="w-24 h-24 border-4 border-teal-900 rounded-full mx-auto"></div>
            <h2 className="font-bold text-lg mt-2">Erika Faller</h2>
            <p className="text-sm text-gray-600">ojt_fallere@dnl.com.ph</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
          <ul className="space-y-2">
            <li className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#A9DCD6] cursor-pointer">
              <FaTh className="text-lg" />
              <Link href="/dashboard">DASHBOARD</Link>
            </li>
            <li className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#A9DCD6] cursor-pointer">
              <FaUser className="text-lg" />
              <Link href="/conneq-page">CONNEQ-Page</Link>
            </li>
            <li className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#A9DCD6] cursor-pointer">
              <FaTags className="text-lg" />
              <Link href="/conneq-tag">CONNEQ-Tag</Link>
            </li>
            <li className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#A9DCD6] cursor-pointer">
              <FaFileAlt className="text-lg" />
              <Link href="/conneq-visit">CONNEQ-Visit</Link>
            </li>
            {/* CONNEQ-Biz Dropdown */}
            <div>
              <div
                onClick={() => setConneqBizOpen(!conneqBizOpen)}
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition"
              >
                <div className="flex items-center space-x-3">
                  <BsBuildings className="text-lg" />
                  <span>CONNEQ-Biz</span>
                </div>
                {conneqBizOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
              </div>
            </div>
            <li className="flex items-center space-x-3 px-4 py-3 text-red-500 cursor-pointer">
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#D8E0E3] min-h-screen p-6">
        {/* Top Navigation */}
        <div className="bg-[#5F939A] text-white p-4 flex items-center justify-between">
          <h1 className="font-bold text-xl">CONNEQ-Biz</h1>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>

        {/* Editable Cards Section */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="bg-white p-4 rounded-lg shadow-md">
              <input
                type="text"
                value={card.title}
                onChange={(e) => updateCard(card.id, "title", e.target.value)}
                className="text-black font-bold w-full border-b focus:outline-none"
              />
              <textarea
                value={card.description}
                onChange={(e) => updateCard(card.id, "description", e.target.value)}
                className="text-black w-full mt-2 border focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCardsPage;
