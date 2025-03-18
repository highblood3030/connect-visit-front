"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiLogOut, FiSearch, FiUpload } from "react-icons/fi";
import { AiOutlineAppstore, AiOutlineUser } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsBuildings, BsPrinter } from "react-icons/bs";
import { FiTag } from "react-icons/fi";

export default function ConneqTag() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { label: "DASHBOARD", icon: <AiOutlineAppstore className="text-2xl" />, path: "/dashboard" },
    { label: "CONNEQ-Biz", icon: <BsBuildings className="text-2xl" />, path: "/my_cards" },
    { label: "CONNEQ-Page", icon: <AiOutlineUser className="text-2xl" />, path: "/conneq-page" },
    { label: "CONNEQ-Tag", icon: <FiTag className="text-2xl" />, path: "/conneq-tag" },
    { label: "CONNEQ-Visit", icon: <HiOutlineDocumentText className="text-2xl" />, path: "/conneq-visit" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="bg-[#91C8C4] text-white flex justify-between items-center h-16 px-6 shadow-md">
      <button
        onClick={() => setSidebarOpen(true)} // ✅ This ensures clicking opens the sidebar
        className="focus:outline-none"
        >
        <FiMenu className="text-3xl text-[#145C5B] hover:scale-110 transition-transform" />
        </button>

        <img src="/Q.png" alt="Q Logo" className="w-16 h-12 object-contain shadow-md" />
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-16 bg-[#D7F0ED] text-[#145C5B] flex flex-col items-center py-8 space-y-6 border-r border-gray-300 shadow-xl">
          {sidebarItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => router.push(item.path)}
              className="p-3 rounded-full hover:bg-[#145C5B] hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-sm"
            >
              {item.icon}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-extrabold text-[#145C5B] mb-6">CONNEQ TAG</h1>

          {/* Actions Section */}
          <div className="flex gap-4 mb-4">
            <button
              className="bg-[#145C5B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#0e4b4b] transition"
              onClick={() => alert("Create Tag Clicked")}
            >
              + Create
            </button>

            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition flex items-center"
              onClick={() => alert("Upload Tags File Clicked")}
            >
              <FiUpload className="mr-2" />
              Upload Tags File
            </button>

            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition flex items-center"
              onClick={() => alert("Batch Print Clicked")}
            >
              <BsPrinter className="mr-2" />
              Batch Print
            </button>
          </div>

          {/* Filters & Search */}
          <div className="bg-white p-4 rounded-lg shadow-md flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Name filter"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
            />
            <input
              type="text"
              placeholder="Tag filter"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
            />
            <input
              type="text"
              placeholder="Description filter"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
            />
            <input
              type="date"
              placeholder="Date filter"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
            />
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-md">
              <input
                type="text"
                placeholder="Search"
                className="outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
              <FiSearch className="text-xl text-gray-500 cursor-pointer" />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Text Tag</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date Created</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-6">
                    No data available
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
              <button className="text-gray-500 px-3 py-1 rounded-lg cursor-not-allowed" disabled>
                ◄
              </button>
              <span className="text-gray-600">Page 1 of 0</span>
              <button className="text-gray-500 px-3 py-1 rounded-lg cursor-not-allowed" disabled>
                ►
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
