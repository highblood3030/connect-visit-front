"use client";
import { useState } from "react";
import { FiMenu, FiLogOut, FiTag } from "react-icons/fi";
import { AiOutlineAppstore, AiOutlineFileImage, AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsBuildings } from "react-icons/bs";

// Correct relative import of PersonalInformation component
import PersonalInformation from "./PersonalInformation";

export default function EditUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [profileImage, setProfileImage] = useState("/profile-placeholder.png");

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
            <div className="w-[950px] bg-white rounded-xl shadow-2xl p-8 overflow-y-auto h-full">
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

              {/* Conditional Tabs Content */}
              {activeTab === 0 && <PersonalInformation profileImage={profileImage} handleImageChange={handleImageChange} />}
              {/* You can add the same logic for other tabs */}

            </div>

            {/* Preview Section */}
            <div className="w-[450px] flex flex-col">
              <h2 className="text-3xl font-bold text-[#145C5B] mb-4">PREVIEW</h2>
              <div className="flex flex-col items-center space-y-8 ml-20">
                <PreviewCard title="Email Signature" profileImage={profileImage} />
                <PreviewCard title="Business Card" profileImage={profileImage} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Preview Card Component
const PreviewCard = ({ title, profileImage }: { title: string; profileImage: string }) => (
  <div className="flex flex-col items-center mb-8">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="relative w-[450px] h-[250px] bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300">
      <img src="/Background-ESign.png" alt={`${title} background`} className="absolute inset-0 w-full h-full object-cover" />
      {title === "Email Signature" && (
        <>
          <img src="/qr.png" alt="QR Code" className="absolute top-4 left-4 w-16 h-16 object-contain" />
          <img src="/DNL-BC.png" alt="D&L Logo" className="absolute bottom-4 right-4 w-16 h-8 object-contain" />
        </>
      )}
      {title === "Business Card" && (
        <div className="relative w-full h-full">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-[#145C5B] shadow-md">
            <img src={profileImage} alt="Profile" className="object-cover w-full h-full" />
          </div>
          <div className="absolute bottom-16 w-full flex justify-center">
            <button className="bg-[#145C5B] text-white px-6 py-2 rounded-lg">Save Contact</button>
          </div>
          <div className="absolute bottom-4 w-full flex justify-center">
            <img src="/DNL-BC.png" alt="D&L Logo" className="w-20 h-10 object-contain" />
          </div>
        </div>
      )}
    </div>
  </div>
);
