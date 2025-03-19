"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaUser,
  FaTags,
  FaClipboardList,
  FaBuilding,
  FaSignOutAlt,
  FaTh,
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";

const MyCardsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conneqBizOpen, setConneqBizOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#AFCFCF] text-black h-full fixed lg:relative transition-all duration-300 ${
          isSidebarOpen ? "w-64 p-4" : "w-0 p-0 overflow-hidden"
        }`}
      >
        {isSidebarOpen && (
          <div className="text-center mb-4">
            <div className="w-24 h-24 bg-white rounded-full mx-auto"></div>
            <h2 className="font-bold text-lg mt-2">Erika Faller</h2>
            <p className="text-sm text-gray-800">ojt_fallere@dnl.com.ph</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 cursor-pointer">
              <FaTh />
              <Link href="/dashboard" className="hover:underline">
                DASHBOARD
              </Link>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer">
              <FaUser />
              <Link href="/conneq-page" className="hover:underline">
                CONNEQ-Page
              </Link>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer">
              <FaTags />
              <Link href="/conneq-tag" className="hover:underline">
                CONNEQ-Tag
              </Link>
            </li>
            {/* Dropdown for My Cards */}
            <li>
              <div
                onClick={() => setConneqBizOpen(!conneqBizOpen)}
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition"
              >
                <div className="flex items-center space-x-3">
                  <FaClipboardList className="text-xl" />
                  <span>CONNEQ-Biz</span>
                </div>
                {conneqBizOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
              </div>
              <div
                className={`ml-10 space-y-2 overflow-hidden transition-all duration-300 ${
                  conneqBizOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition">
                  <BsCreditCard className="text-xl" />
                  <Link href="/my_cards" className="hover:underline">My Cards</Link>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-[#A9DCD6] rounded-lg transition">
                  <MdOutlineEdit className="text-xl" />
                  <Link href="/edit-information" className="hover:underline">Edit Information</Link>
                </div>
              </div>
            </li>
            <li className="flex items-center space-x-2 text-red-500 cursor-pointer">
              <FaSignOutAlt />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#D8E0E3] min-h-screen">
        {/* Top Navigation */}
        <div className="bg-[#5F939A] text-white p-4 flex items-center justify-between">
          {/* Burger Button - ALWAYS VISIBLE */}
          <button
            className="text-white text-2xl block"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
          <h1 className="font-bold text-xl">CONNEQ-Biz</h1>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-black font-bold">Business 1</h2>
            <p className="text-black font-bold">Description for Business 1</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-black font-bold">Business 2</h2>
            <p className="text-black font-bold">Description for Business 2</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-black font-bold">Business 3</h2>
            <p className="text-black font-bold">Description for Business 3</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-black font-bold">Business 4</h2>
            <p className="text-black font-bold">Description for Business 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCardsPage;
