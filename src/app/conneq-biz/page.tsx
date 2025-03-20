"use client";

import Layout from "../../components/Layout";
import { FiEdit, FiMail, FiDownload, FiRefreshCw, FiGrid } from "react-icons/fi";

export default function ConneqBizCards() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#145C5B]">
            MY CARDS
          </h1>
        </div>

        {/* Action Buttons - Right Aligned & Smaller */}
        <div className="flex justify-end gap-3 mb-6">
          <button className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-blue-700 transition">
            <FiEdit className="mr-1.5" /> Edit
          </button>
          <button className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-green-700 transition">
            <FiMail className="mr-1.5" /> Send VCard
          </button>
          <button className="flex items-center bg-gray-600 text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-gray-700 transition">
            <FiDownload className="mr-1.5" /> Download
          </button>
          <button className="flex items-center bg-[#91C8C4] text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-[#78B0AC] transition">
            <FiRefreshCw className="mr-1.5" /> Refresh
          </button>
          <button className="flex items-center bg-[#91C8C4] text-white px-3 py-1.5 rounded-lg shadow-md text-sm hover:bg-[#78B0AC] transition">
            <FiGrid className="mr-1.5" /> QR Code
          </button>
        </div>

        {/* Business Cards Layout with Proper Spacing */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Side: Profile Card */}
          <div className="bg-gradient-to-br from-[#145C5B] to-[#0e4b4b] text-white rounded-xl p-6 w-full md:w-[40%] flex flex-col items-center text-center shadow-lg">
            {/* Profile Image Placeholder */}
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-300"></div>

            <h3 className="text-xl font-bold mt-4">---</h3>
            <p className="text-sm font-semibold">---</p>

            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center justify-center">📍 ---</p>
              <p className="flex items-center justify-center">✉️ ---</p>
              <p className="flex items-center justify-center">📞 ---</p>
              <p className="text-white underline flex items-center justify-center">🔗 LinkedIn Profile</p>
            </div>

            {/* Save Contact Button */}
            <button className="mt-4 bg-white text-[#145C5B] px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
              Save Contact
            </button>

            {/* Company Logo Placeholder */}
            <div className="mt-4 w-16 h-8 bg-gray-300 rounded"></div>
          </div>

          {/* Right Side: QR Code Business Card */}
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-[40%] border border-gray-300 flex flex-col items-center">
            {/* QR Code Placeholder */}
            <div className="w-24 h-24 bg-gray-300 rounded-md mb-4"></div>

            <h3 className="text-lg font-bold text-gray-800">---</h3>
            <p className="text-sm text-gray-600">---</p>

            <div className="mt-4 space-y-2 text-sm text-gray-500 text-center">
              <p className="flex items-center justify-center">📍 ---</p>
              <p className="flex items-center justify-center">📞 ---</p>
              <p className="flex items-center justify-center">✉️ ---</p>
            </div>

            {/* Empty Company Logo Placeholder */}
            <div className="mt-4 w-16 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
