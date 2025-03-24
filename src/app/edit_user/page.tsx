"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";



import Layout from "../../components/Layout";
import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import OfficeAddress from "./OfficeAddress";
import SocialMediaAccount from "./SocialMediaAccounts";
import Others from "./Others";
import PreviewCard from "./PreviewCard";

// Data interface
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
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null!);

  // Sidebar + Tabs
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Profile Image
  const [profileImage, setProfileImage] = useState("/Default.jpeg");

  // Checkbox for Privacy Notice
  const [isChecked, setIsChecked] = useState(false);

  // Main form data
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

  // Tabs
  const tabs = [
    "PERSONAL INFORMATION",
    "CONTACT INFORMATION",
    "OFFICE ADDRESS",
    "SOCIAL MEDIA ACCOUNTS",
    "OTHERS",
  ];

  // Handle text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: UserFormData) => ({ ...prev, [name]: value }));
  };

  // Handle profile image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };


  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would normally save the data via an API call or similar.
    // For this example, we'll just log the formData.
    console.log("Form submitted", formData);
    // You can also navigate or show a success message.
  };


  return (
    <Layout>
      <div className="max-w-7xl mx-auto text-black">
        <h1 className="text-3xl font-extrabold text-[#145C5B] mb-6">
          MY INFORMATION
        </h1>

        {/* Main content area: Tabs + Preview */}
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-x-8">

          {/* Left side: Tabs + Form */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-xl p-6">
            <form ref={formRef} onSubmit={handleSubmit}>
              {/* Tabs */}
              <div className="flex flex-wrap gap-4 border-b-2 border-gray-300 pb-3">
                {tabs.map((tab, idx) => (
                  <span
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`cursor-pointer px-3 py-1 text-sm font-medium ${idx === activeTab
                        ? "text-[#145C5B] border-b-2 border-[#145C5B]"
                        : "text-gray-500 hover:text-[#145C5B]"
                      }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 0 && (
                <PersonalInformation
                  profileImage={profileImage}
                  handleImageChange={handleImageChange}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              {activeTab === 1 && (
                <ContactInformation
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {activeTab === 2 && (
                <OfficeAddress
                  formData={formData}
                  handleInputChange={handleInputChange}
                  setFormData={setFormData}
                />
              )}
              {activeTab === 3 && (
                <SocialMediaAccount
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {activeTab === 4 && (
                <Others formData={formData} handleInputChange={handleInputChange} />
              )}

              {/* Privacy Policy Link */}
              <div className="text-center mt-6">
                <a
                  href="https://dnl.com.ph/privacy-policy/"
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Corporate Data Privacy Policy
                </a>
              </div>

              {/* Checkbox Confirmation */}
              <div className="relative flex items-start space-x-2 mt-4">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                {!isChecked && <span className="text-red-500">*</span>}
                <p className="text-gray-700 text-justify">
                  I confirm that I have read, understood, and agree with the Privacy Notice of {formData.company || "(company name)"}. I understand
                  that some of my personal information, such as my personal mobile number, will be used for as part of my email signature,
                  business card and virtual card. I understand that my consent does not preclude the existence of other criteria for lawful
                  processing of personal data, and does not waive any of my rights under the Data Privacy Act of 2012 and other applicable laws.
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => prev - 1)}
                  disabled={activeTab === 0}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => prev + 1)}
                  disabled={activeTab === tabs.length - 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#145C5B] text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* Right side: Preview Cards */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <h2 className="text-2xl font-bold text-[#145C5B] mb-4">PREVIEW</h2>
            <PreviewCard
              title="Email Signature"
              profileImage={profileImage}
              formData={formData}
            />
            <PreviewCard
              title="Business Card"
              profileImage={profileImage}
              formData={formData}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
