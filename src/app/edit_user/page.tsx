"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { AiOutlineAppstore, AiOutlineFileImage, AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";

import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import PreviewCard from "./PreviewCard";
import OfficeAddress from "./OfficeAddress";
import SocialMediaAccount from "./SocialMediaAccounts";
import Others from "./Others";

export interface UserFormData {
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

export default function EditUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [profileImage, setProfileImage] = useState("/Default.jpeg");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null!);
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    firstname: "",
    middlename: "",
    lastname: "",
    honorificprefix: "",
    honorificsuffix: "",
    jobtitle: "",
    company: "",
    logo: "",
    website: "",
    cellphone: "",
    whatsapp: "",
    viber: "",
    wechat: "",
    workphone: "",
    workemail: "",
    workfax: "",
    address: "",
    location: "",
    linkedin: "",
    facebook: "",
    note: "",
  });

  const tabs = [
    "PERSONAL INFORMATION",
    "CONTACT INFORMATION",
    "OFFICE ADDRESS",
    "SOCIAL MEDIA ACCOUNTS",
    "OTHERS",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  }

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
                    className={`cursor-pointer px-3 py-1 text-sm font-medium ${idx === activeTab ? "text-[#145C5B] border-b-2 border-[#145C5B]" : "text-gray-500 hover:text-[#145C5B]"
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
                />
              )}
              {activeTab === 1 && <ContactInformation formData={formData} handleInputChange={handleInputChange} />}
              {activeTab === 2 && <OfficeAddress formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />}
              {activeTab === 3 && <SocialMediaAccount formData={formData} handleInputChange={handleInputChange} />}
              {activeTab === 4 && <Others formData={formData} handleInputChange={handleInputChange} />}

              <div className="text-center">
                <a href="https://dnl.com.ph/privacy-policy/" className="text-blue-500 no-underline">Corporate Data Privacy Policy</a>
              </div>

              <div className="relative flex items-justify space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                {!isChecked && (
                  <span className="text-red-500 relative top-15.5">*</span>
                )}
                <p className="text-gray-700 text-justify">
                  I confirm that I have read, understood, and agree with the Privacy Notice of {formData.company || "(company name)"}. I understand
                  that some of my personal information, such as my personal mobile number, will be used for as part of my email signature,
                  business card and virtual card. I understand that my consent does not preclude the existence of other criteria for lawful
                  processing of personal data, and does not waive any of my rights under the Data Privacy Act of 2012 and other applicable laws.
                </p>
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