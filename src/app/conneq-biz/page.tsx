"use client";

import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { FiEdit, FiMail, FiDownload, FiRefreshCw, FiGrid } from "react-icons/fi";

interface UserFormData {
  firstname: string;
  middlename?: string;
  lastname: string;
  honorificprefix?: string;
  honorificsuffix?: string;
  jobtitle: string;
  company: string;
  logo: string;
  website?: string;
  cellphone?: string;
  whatsapp?: string;
  viber?: string;
  wechat?: string;
  workphone?: string;
  workemail: string;
  workfax?: string;
  address: string;
  location: string;
  linkedin?: string;
  facebook?: string;
  note?: string;
}

export default function ConneqBizCards() {
  const [userData, setUserData] = useState<UserFormData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userFormData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#145C5B]">
            MY CARDS
          </h1>
        </div>

        {/* Action Buttons */}
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

        {/* Business Cards Layout */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left Side: Profile Card */}
          <div className="bg-gradient-to-br from-[#145C5B] to-[#0e4b4b] text-white rounded-xl p-6 w-full md:w-[40%] flex flex-col items-center text-center shadow-lg">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-300 overflow-hidden">
              {userData?.logo ? (
                <img
                  src={userData.logo}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="text-sm text-white pt-8">No Logo</p>
              )}
            </div>
            <h3 className="text-xl font-bold mt-4">
              {userData ? `${userData.firstname} ${userData.lastname}` : "---"}
            </h3>
            <p className="text-sm font-semibold">{userData?.jobtitle || "---"}</p>
            <div className="mt-6 space-y-3 text-sm">
              <p>📍 {userData?.address || "---"}</p>
              <p>✉️ {userData?.workemail || "---"}</p>
              <p>📞 {userData?.cellphone || "---"}</p>
            </div>
            <button className="mt-4 bg-white text-[#145C5B] px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
              Save Contact
            </button>
            <div className="mt-4 w-16 h-8 bg-gray-300 rounded" />
          </div>

          {/* Right Side: QR Code Business Card */}
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-[40%] border border-gray-300 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-md mb-4" />
            <h3 className="text-lg font-bold text-gray-800">
              {userData ? `${userData.firstname} ${userData.lastname}` : "---"}
            </h3>
            <p className="text-sm text-gray-600">{userData?.jobtitle || "---"}</p>
            <div className="mt-4 space-y-2 text-sm text-gray-500 text-center">
              <p>📍 {userData?.address || "---"}</p>
              <p>📞 {userData?.cellphone || "---"}</p>
              <p>✉️ {userData?.workemail || "---"}</p>
            </div>
            <div className="mt-4 w-16 h-8 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
