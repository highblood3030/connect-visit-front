"use client";
import React from "react";
import { FiMenu } from "react-icons/fi";
import {
  AiOutlineAppstore,
  AiOutlineFileImage,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function EditUser() {
  return (
    <div className="min-h-screen bg-[#E8F1F2] flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-[#91C8C4] text-white flex justify-between items-center h-16 px-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <FiMenu className="text-2xl text-[#145C5B] hover:scale-110 transition-transform" />
          <h1 className="text-xl font-bold text-[#145C5B]"></h1>
        </div>
        <div>
          <img src="/Q.png" alt="Q Logo" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-16 bg-[#D7F0ED] text-[#145C5B] flex flex-col items-center py-8 space-y-6 border-r border-gray-300 shadow-xl">
        <SidebarIcon><AiOutlineAppstore className="text-lg" /></SidebarIcon>
        <SidebarIcon><AiOutlineFileImage className="text-lg" /></SidebarIcon>
        <SidebarIcon><HiOutlineDocumentText className="text-lg" /></SidebarIcon>
        <SidebarIcon><AiOutlineFileText className="text-lg" /></SidebarIcon>
        <SidebarIcon><AiOutlineUser className="text-lg" /></SidebarIcon>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-4xl font-extrabold text-[#145C5B] mb-6">MY iNFORMATION</h1>

          {/* Tabs Section */}
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

          <div className="flex space-x-8">
            {/* Left Form Section */}
            <div className="flex-1 bg-white rounded-xl shadow-2xl p-8 backdrop-blur-lg border border-gray-200">
              {/* Upload Photo */}
              <div className="flex items-center space-x-4 mb-6">
                <img src="/dp.jpg" alt="Profile" className="w-28 h-28 rounded-full object-cover shadow-lg" />
                <div>
                  <label className="font-semibold block text-gray-700">Upload Photo</label>
                  <button className="bg-green-600 text-white px-5 py-2 rounded-lg mt-3 text-sm hover:bg-green-700 transition-all">
                    Choose a file
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <form className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {["First Name *", "Middle Name", "Last Name *"].map((placeholder, idx) => (
                    <input key={idx} type="text" className="input-field" placeholder={placeholder} />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {["Honorific Prefix", "Honorific Suffix"].map((placeholder, idx) => (
                    <input key={idx} type="text" className="input-field" placeholder={placeholder} />
                  ))}
                </div>

                <input type="text" className="input-field" placeholder="Job Title *" />
                <input type="text" className="input-field bg-gray-100" value="D&L Industries, Inc." readOnly />
                <input type="text" className="input-field bg-gray-100" value="D&L" readOnly />
                <input type="text" className="input-field" placeholder="website.com without http://" />

                {/* Privacy */}
                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1" />
                  <p className="text-sm text-gray-600">
                    I confirm that I have read, understood, and agree with the{" "}
                    <a href="#" className="text-blue-600 underline">Privacy Notice</a>.
                  </p>
                </div>

                <div className="text-red-500 text-sm">Kindly confirm to data privacy policy to enable saving.</div>

                <button type="submit" className="bg-[#145C5B] text-white px-8 py-3 rounded-lg hover:bg-[#0e4b4a] transition-all">
                  Save
                </button>
              </form>
            </div>

            {/* Right Preview Section */}
            <div className="w-[400px]">
              <h2 className="text-2xl font-bold text-[#145C5B] mb-4">PREVIEW</h2>
              <PreviewCard title="Email Signature" />
              <PreviewCard title="Business Card" />
            </div>
          </div>
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

// Preview Card Component
const PreviewCard = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center mb-8">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="relative w-[350px] h-[200px] bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300">
      <img src="/Background-ESign.png" alt={`${title} background`} className="absolute inset-0 w-full h-full object-cover" />
      <img src="/qr.png" alt="QR Code" className="absolute top-4 left-4 w-16 h-16 object-contain" />
      <img src="/DNL-BC.png" alt="D&L Logo" className="absolute bottom-4 right-4 w-16 h-8 object-contain" />
    </div>
  </div>
);
