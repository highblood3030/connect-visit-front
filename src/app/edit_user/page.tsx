"use client";
import { useState } from "react";
import { FiMenu, FiLogOut, FiTag } from "react-icons/fi";
import { AiOutlineAppstore, AiOutlineFileImage, AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsBuildings } from "react-icons/bs";

import PersonalInformation from "./PersonalInformation";
import PreviewCard from "./PreviewCard";

export default function EditUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [profileImage, setProfileImage] = useState("/profile-placeholder.png");

  // ✅ FORM DATA STATE FOR LIVE PREVIEW
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    honorificPrefix: "",
    honorificSuffix: "",
    jobTitle: "",
    company: "D&L Industries, Inc.",
    logo: "D&L",
    website: "",
    email: "",
  });

  const tabs = [
    "PERSONAL INFORMATION",
    "CONTACT INFORMATION",
    "OFFICE ADDRESS",
    "SOCIAL MEDIA ACCOUNTS",
    "OTHERS",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const sidebarItems = [
    { label: "DASHBOARD", icon: <AiOutlineAppstore className="text-xl" /> },
    { label: "CONNEQ-Biz", icon: <BsBuildings className="text-xl" /> },
    { label: "CONNEQ-Page", icon: <AiOutlineUser className="text-xl" /> },
    { label: "CONNEQ-Tag", icon: <FiTag className="text-xl" /> },
    { label: "CONNEQ-Visit", icon: <HiOutlineDocumentText className="text-xl" /> },
  ];

  return (
    <div className="min-h-screen bg-[#E8F1F2] flex flex-col relative overflow-y-auto">
      {/* Navbar */}
      <nav className="bg-[#91C8C4] text-white flex justify-between items-center h-16 px-6 shadow-lg">
        <button onClick={() => setSidebarOpen(true)} className="focus:outline-none">
          <FiMenu className="text-3xl text-[#145C5B] hover:scale-110 transition-transform" />
        </button>
        <img src="/Q.png" alt="Q Logo" className="w-16 h-12 object-contain shadow-md" />
      </nav>

      {/* Floating Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#B7E0DA] p-6 shadow-xl transition-transform duration-500 z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col items-center space-y-2">
          <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full border-4 border-[#145C5B] shadow-md" />
          <h2 className="text-lg font-bold text-gray-700">Erika Faller</h2>
          <p className="text-sm text-gray-600">ojt_fallere@dnl.com.ph</p>
        </div>
        <div className="mt-8 space-y-4 text-gray-700">
          {sidebarItems.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 cursor-pointer hover:text-[#145C5B]">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-6 flex items-center space-x-3 cursor-pointer text-red-500">
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </div>
      </div>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>}

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mini Sidebar */}
        <aside className="w-16 bg-[#D7F0ED] text-[#145C5B] flex flex-col items-center py-8 space-y-6 border-r border-gray-300 shadow-xl">
          {[AiOutlineAppstore, AiOutlineFileImage, HiOutlineDocumentText, AiOutlineFileText, AiOutlineUser].map((Icon, idx) => (
            <div key={idx} className="p-3 rounded-full hover:bg-[#145C5B] hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-sm">
              <Icon className="text-2xl" />
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 h-full">
          <h1 className="text-3xl font-extrabold text-[#145C5B] mb-6">MY INFORMATION</h1>
          <div className="flex space-x-8 h-full">
            {/* Form Section */}
            <div className="w-[950px] bg-white rounded-xl shadow-2xl p-8 overflow-y-auto max-h-[80vh] min-h-[70vh]">
              {/* Tabs */}
              <div className="flex space-x-10 border-b-2 border-gray-300 mb-8">
                {tabs.map((tab, idx) => (
                  <span
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`relative pb-3 font-medium text-sm cursor-pointer transition-all ${
                      idx === activeTab
                        ? "text-[#145C5B] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#145C5B] after:rounded-full"
                        : "text-gray-500 hover:text-[#145C5B]"
                    }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              {/* Form content */}
              {activeTab === 0 && (
                <PersonalInformation
                  profileImage={profileImage}
                  handleImageChange={handleImageChange}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {/* Buttons */}
              <div className="flex justify-center space-x-6 mt-8">
                <button className="bg-gray-500 text-white px-8 py-2 rounded-lg shadow hover:bg-gray-600 transition">Back</button>
                <button className="bg-gray-800 text-white px-8 py-2 rounded-lg shadow hover:bg-gray-900 transition">Next</button>
                <button className="bg-[#145C5B] text-white px-8 py-2 rounded-lg shadow hover:bg-[#104746] transition">Save</button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="w-[450px] flex flex-col">
              <h2 className="text-3xl font-bold text-[#145C5B] mb-4">PREVIEW</h2>
              <div className="flex flex-col items-center space-y-8 ml-20">
                <PreviewCard title="Email Signature" profileImage={profileImage} formData={formData} />
                <PreviewCard title="Business Card" profileImage={profileImage} formData={formData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
