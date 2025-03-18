"use client";


import { FiMenu, FiLogOut, FiTag } from "react-icons/fi";
import { AiOutlineAppstore, AiOutlineFileImage, AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsBuildings } from "react-icons/bs";
import { useState, useRef } from "react";

import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import PreviewCard from "./PreviewCard";
import OfficeAddress from "./OfficeAddress";
import SocialMediaAccount from "./SocialMediaAccounts";
import Others from "./Others";

interface UserFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  honorificPrefix: string;
  honorificSuffix: string;
  jobTitle: string;
  company: string;
  logo: string;
  website: string;
  email: string;
  phone: string;
  officeAddress: string;
  socialMedia: string;
  others: string;
  altPhone: string;
  country: string;
  cityState: string;
  postalCode: string;
  facebook: string;
  linkedin: string;
  note?: string;
}

export default function EditUser() {
  // ✅ HOOKS DECLARED INSIDE COMPONENT BODY
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [profileImage, setProfileImage] = useState("/profile-placeholder.png");
  const router = useRouter();

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

  });

  // ✅ FORM REF FOR VALIDATION
  const formRef = useRef<HTMLFormElement>(null);

  // ✅ REQUIRED FIELD VALIDATION
  const validatePersonalInformation = () => {
    const { firstName, lastName, jobTitle } = formData;
    if (!firstName.trim() || !lastName.trim() || !jobTitle.trim()) {
      alert("⚠️ Please fill in First Name, Last Name, and Job Title before proceeding.");
      return false;
    }
    return true;
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };


  return (
    <div className="min-h-screen bg-[#E8F1F2] flex flex-col text-black">
      <nav className="bg-[#91C8C4] flex justify-between items-center h-16 px-6 shadow-lg">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden">
          <FiMenu className="text-3xl text-[#145C5B]" />
        </button>
        <img src="/Q.png" alt="Q Logo" className="w-16 h-12" />
      </nav>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-30 md:hidden"></div>}

      <div className="flex flex-col md:flex-row flex-1">
        <aside className="hidden md:flex md:w-16 bg-[#D7F0ED] flex-col items-center py-8 space-y-6 shadow-xl">
          {[AiOutlineAppstore, AiOutlineFileImage, HiOutlineDocumentText, AiOutlineFileText, AiOutlineUser].map((Icon, idx) => (
            <div key={idx} className="p-3 rounded-full hover:bg-[#145C5B] hover:text-white cursor-pointer transition">
              <Icon className="text-2xl" />
            </div>
          ))}
        </aside>

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-extrabold text-[#145C5B] mb-6">MY INFORMATION</h1>
          <div className="flex flex-col lg:flex-row space-y-8 lg:space-x-8">
            <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-xl p-6">
              <div className="flex flex-wrap gap-4 border-b-2 border-gray-300 pb-3">
                {tabs.map((tab, idx) => (
                  <span
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`cursor-pointer px-3 py-1 text-sm font-medium ${
                      idx === activeTab ? "text-[#145C5B] border-b-2 border-[#145C5B]" : "text-gray-500 hover:text-[#145C5B]"
                    }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              {activeTab === 0 && (
                <PersonalInformation
                  profileImage={profileImage}
                  handleImageChange={handleImageChange}
                  formData={formData}
                  setFormData={setFormData}
                  formRef={formRef} // ✅ Ref passed here
                />
              )}
              {activeTab === 1 && <ContactInformation formData={formData} handleInputChange={handleInputChange} />}
              {activeTab === 2 && <OfficeAddress formData={formData} handleInputChange={handleInputChange} />} 
              {activeTab === 3 && <SocialMediaAccount formData={formData} handleInputChange={handleInputChange} />}
              {activeTab === 4 && <Others formData={formData} handleInputChange={handleInputChange} />}


              </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col">
              <h2 className="text-2xl font-bold text-[#145C5B] mb-4">PREVIEW</h2>
              <PreviewCard title="Email Signature" profileImage={profileImage} formData={formData} />
              <PreviewCard title="Business Card" profileImage={profileImage} formData={formData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
