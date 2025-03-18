"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiLogOut, FiSearch, FiX } from "react-icons/fi";
import { AiOutlineAppstore, AiOutlineUser } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsBuildings } from "react-icons/bs";
import { FiTag } from "react-icons/fi";

export default function ConneqPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // ✅ Modal state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
    file: null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setModalOpen(false); // Close modal after submission
  };

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
          <h1 className="text-2xl font-extrabold text-[#145C5B] mb-6">CONNEQ PAGE</h1>

          {/* Create & Search Section */}
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-[#145C5B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#0e4b4b] transition"
              onClick={() => setModalOpen(true)} // ✅ Open modal when clicking "Create"
            >
              + Create
            </button>

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
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* ✅ Modal for "Create" Button */}
      {modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      {/* Modal Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-bold text-[#145C5B]">CONNEQ PAGE FORM</h2>
        <FiX
          className="text-xl cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={() => setModalOpen(false)} // Close modal
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        
        {/* File Upload */}
        <div>
          <label className="text-gray-700 font-semibold block mb-1">Upload File(s) *</label>
          <div className="border border-gray-300 rounded-lg px-4 py-2 flex items-center">
            <input
              type="file"
              accept="image/*,application/pdf"
              className="w-full text-gray-600"
              onChange={handleFileChange}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, GIF, PDF</p>
        </div>

        {/* Name Input */}
        <div>
          <label className="text-gray-700 font-semibold block mb-1">Name *</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
            placeholder="Enter name"
            required
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-gray-700 font-semibold block mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
            placeholder="Enter description"
            rows={3}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="text-gray-700 font-semibold block mb-1">Status *</label>
          <select
            name="status"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#145C5B]"
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-[#145C5B] text-white px-6 py-2 rounded-md w-full mt-2 hover:bg-[#0e4b4b] transition-all"
        >
          Save
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
}
