"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import Layout from "../../components/Layout";
import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import OfficeAddress from "./OfficeAddress";
import SocialMediaAccount from "./SocialMediaAccounts";
import Others from "./Others";
import PreviewCard from "./PreviewCard";
import { saveUserData } from "../conneq-biz/userApi";
import { v4 as uuidv4 } from "uuid"; // Ensure uuid is installed

export interface UserFormData {
  userId?: string; // Add userId to the form data
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
  profileImage?: string;

  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  factoryLocation?: string;
  factoryStreet?: string;
  factoryCity?: string;
  factoryState?: string;
  factoryPostalCode?: string;
  factoryCountry?: string;
}

export default function EditUser() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null!);

  const [activeTab, setActiveTab] = useState(0);
  const [profileImage, setProfileImage] = useState("/profile-placeholder.jpeg");
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  
  

  const tabs = [
    "PERSONAL INFORMATION",
    "CONTACT INFORMATION",
    "OFFICE ADDRESS",
    "SOCIAL MEDIA ACCOUNTS",
    "OTHERS",
  ];

  const defaultFormData: UserFormData = {
    userId: undefined, // Initialize userId as undefined
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
    profileImage: "/profile-placeholder.jpeg",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    factoryLocation: "",
    factoryStreet: "",
    factoryCity: "",
    factoryState: "",
    factoryPostalCode: "",
    factoryCountry: "",
  };

  const [formData, setFormData] = useState<UserFormData>(defaultFormData);

  useEffect(() => {
    const storedData = localStorage.getItem("userFormData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      if (parsedData.profileImage) {
        setProfileImage(parsedData.profileImage);
      }
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChecked) {
      setShowError(true);
      return;
    }

    setShowError(false);

    try {
      // Check if userId exists, if not, generate a new one
      const updatedFormData = {
        ...formData,
        userId: formData.userId || uuidv4(),
      };


      // Save data to the backend
      const result = await saveUserData(updatedFormData);
      console.log("✔️ Data saved successfully:", result);

      alert("✔️ Data saved successfully!");
      router.push("/conneq-biz"); // Redirect to the Conneq Biz page
    } catch (error) {
      console.error("❌ Error saving user data:", error);
      alert("❌ Error: Failed to save user data.");
    }
    
    const handleUpdate = async () => {
      if (!formData || !formData.userId) {
        alert("❌ User ID is missing. Cannot update user.");
        return;
      }
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      try {
        const response = await fetch(
          `${apiUrl}/users/update-user/${formData.userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to update user.");
        }

        alert("✔️ User updated successfully!");
        router.push("/conneq-biz");
      } catch (error) {
        console.error("Update error:", error);
        alert("❌ Failed to update user.");
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 font-montserrat text-primary">
        <h1 className="text-3xl font-extrabold mt-8 md:mt-16 text-primary font-montserrat">
          MY INFORMATION
        </h1>

        <div className="flex flex-col lg:flex-row space-y-8 lg:space-x-8 mt-6">
          {/* Left Panel */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-xl p-6">
            <form ref={formRef} onSubmit={handleSubmit}>
              {/* Tabs */}
              <div className="flex flex-wrap gap-4 border-b-2 border-gray-300 pb-3">
                {tabs.map((tab, idx) => (
                  <span
                    key={idx}
                    onClick={() => {
                      if (idx > activeTab) {
                        if (
                          formRef.current &&
                          !formRef.current.reportValidity()
                        )
                          return;
                      }
                      setActiveTab(idx);
                    }}
                    className={`cursor-pointer px-3 py-1 text-sm font-medium ${
                      idx === activeTab
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-500 hover:text-primary"
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
                  setFormDataAction={setFormData}
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
                <Others
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {/* Privacy Notice */}
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

              {/* Checkbox + Error */}
              <div className="relative flex flex-col space-y-2 mt-4">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  {!isChecked && <span className="text-red-500">*</span>}
                  <p className="text-gray-700 text-justify">
                    I confirm that I have read, understood, and agree with the
                    Privacy Notice of {formData.company || "(company name)"}. I
                    understand that some of my personal information, such as my
                    personal mobile number, will be used for as part of my email
                    signature, business card and virtual card. I understand that
                    my consent does not preclude the existence of other criteria
                    for lawful processing of personal data, and does not waive
                    any of my rights under the Data Privacy Act of 2012 and
                    other applicable laws.
                  </p>
                </div>

                {showError && (
                  <p className="bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm">
                    Kindly confirm the data privacy policy to enable saving.
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setActiveTab((prev) => prev - 1)}
                  disabled={activeTab === 0}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-500"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (formRef.current && !formRef.current.reportValidity())
                      return;
                    setActiveTab((prev) => prev + 1);
                  }}
                  disabled={activeTab === tabs.length - 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-blue-700"
                >
                  Next
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded transition cursor-pointer hover:bg-green-800"
                >
                  Save
                </button>

              </div>
            </form>
          </div>

          {/* Right Panel: Preview */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <h2 className="text-2xl font-bold text-primary mb-4">PREVIEW</h2>
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
