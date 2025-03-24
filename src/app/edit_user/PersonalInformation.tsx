"use client";
import React, { useState, useEffect } from "react";

type Props = {
  profileImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
  setFormData: (data: any) => void;
};

const logoOptionsMap: Record<string, string[]> = {
  "D&L Industries, Inc": ["D&L"],
  "Oleofats, Inc": ["OFI", "OFI-DLPF", "DLPF"],
  "Chemrez Product Solutions, Inc": ["CPSI"],
  "Chemrez Technologies, Inc": ["CTI"],
  "Natura Aeropack Corporation": ["D&L"],
  "Malay Resources Inc": ["OFI", "DLPF"],
  "D&L Premium Foods Inc": ["OFI", "DLPF"],
  "D&L Polymers & Colours, Inc": ["DLPC"],
  "First In Colours, Inc": ["FICI"],
};

const isValidName = (value: string) => /^[A-Za-z\s-]{0,20}$/.test(value);
const isValidJobtitle = (value: string) => /^[A-Za-z\s().-]{0,40}$/.test(value);
const isValidWebsite = (value: string) => /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}([\/\w .-]*)?$/.test(value);
const isValidHonorific = (value: string) => /^[A-Za-z\s.,-]{0,20}$/.test(value);

export default function PersonalInformation({
  profileImage,
  formData,
  setFormData,
}: Props) {

  const [showAsterisk, setShowAsterisk] = useState({
    firstname: !formData.firstname,
    lastname: !formData.lastname,
    jobtitle: !formData.jobtitle,
    company: !formData.company,
    logo: !formData.logo,
  });

  const [websiteError, setWebsiteError] = useState(false);

  useEffect(() => {
    if (formData.company) {
      const logos = logoOptionsMap[formData.company] || [];
      if (logos.length === 1) {
        setFormData((prevData: any) => ({ ...prevData, logo: logos[0] }));
        setShowAsterisk((prev) => ({ ...prev, logo: false }));
      } else {
        setFormData((prevData: any) => ({ ...prevData, logo: "" }));
        setShowAsterisk((prev) => ({ ...prev, logo: true }));
      }
    } else {
      setFormData((prevData: any) => ({ ...prevData, logo: "" }));
      setShowAsterisk((prev) => ({ ...prev, logo: true }));
    }
  }, [formData.company]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, JPEG, and PNG formats are allowed.");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData: any) => ({ ...prevData, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (
      (field === "jobtitle" && isValidJobtitle(value)) ||
      (field === "honorificprefix" && isValidHonorific(value)) ||
      (field === "honorificsuffix" && isValidHonorific(value)) ||
      (field !== "jobtitle" && field !== "honorificprefix" && field !== "honorificsuffix" && isValidName(value)) ||
      value === ""
    ) {
      setFormData((prevData: any) => ({ ...prevData, [field]: value }));
      setShowAsterisk((prevAsterisk) => ({ ...prevAsterisk, [field]: value === "" }));
    }
  };

  const isPlaceholderSelected = (value: string) => value === "";

  const getLogoOptions = (companyValue: string) => {
    return logoOptionsMap[companyValue] || [];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-6">
        <div className="w-28 h-28 rounded-full border border-gray-300 overflow-hidden">
          <img
            src={formData.profileImage || "/Default.jpeg"}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <label
            htmlFor="upload-photo"
            className="cursor-pointer bg-[#1F7F7D] hover:bg-[#145C5B] text-white px-4 py-2 rounded-lg text-sm"
          >
            Choose a file
          </label>

          <input
            type="file"
            id="upload-photo"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="relative">
          <label htmlFor="firstname">First Name</label>
          {showAsterisk.firstname && <span className="ml-1 text-red-500">*</span>}
          <input
            type="text"
            className="input-field pr-6"
            value={formData.firstname}
            onChange={(e) => handleInputChange("firstname", e.target.value)}
          />
        </div>

        <div className="relative">
          <label htmlFor="middlename">Middle Name</label>
          <input
            type="text"
            className="input-field"
            value={formData.middlename}
            onChange={(e) => handleInputChange("middlename", e.target.value)}
          />
        </div>

        <div className="relative">
          <label htmlFor="lastname">Last Name</label>
          {showAsterisk.lastname && <span className="ml-1 text-red-500">*</span>}
          <input
            type="text"
            className="input-field pr-6"
            value={formData.lastname}
            onChange={(e) => handleInputChange("lastname", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="honorificprefix">Honorific Prefix</label>
          <input
            type="text"
            className="input-field pr-6"
            value={formData.honorificprefix}
            onChange={(e) => handleInputChange("honorificprefix", e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="honorificsuffix">Honorific Suffix</label>
          <input
            type="text"
            className="input-field pr-6"
            value={formData.honorificsuffix}
            onChange={(e) => handleInputChange("honorificsuffix", e.target.value)}
          />
        </div>
      </div>
    </div>

      <div className="relative">
        <label htmlFor="jobtitle">Job Title</label>
        {showAsterisk.jobtitle && <span className="ml-1 text-red-500">*</span>}
        <input
          type="text"
          className={'input-field pr-6 "text-black" : "text-green"'}
          value={formData.jobtitle}
          onChange={(e) => handleInputChange("jobtitle", e.target.value)}
        />
      </div>

      <div className="relative">
        <label htmlFor="company">Company</label>
        {showAsterisk.company && <span className="ml-1 text-red-500">*</span>}
        <select
          className={`input-field appearance-none ${isPlaceholderSelected(formData.company)}`}
          value={formData.company}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, company: value });
            setShowAsterisk((prev) => ({ ...prev, company: value === "" }));
          }}
        >
          <option value=""></option>
          {Object.keys(logoOptionsMap).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      <div className="relative">
        <label htmlFor="logo">Logo</label>
        {showAsterisk.logo && <span className="ml-1 text-red-500">*</span>}
        <select
          className={`input-field appearance-none ${isPlaceholderSelected(formData.logo)}`}
          value={formData.logo}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, logo: value });
            setShowAsterisk((prev) => ({ ...prev, logo: value === "" }));
          }}
          disabled={!formData.company || (logoOptionsMap[formData.company]?.length === 1)}
        >
          <option value=""></option>
          {getLogoOptions(formData.company).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="relative">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          className="input-field"
          value={formData.website}
          onChange={(e) => {
            let value = e.target.value.replace(/\/$/, "");
            setFormData({ ...formData, website: value });
            setWebsiteError(value !== "" && !isValidWebsite(value));
          }}
        />
        {websiteError && (
          <p className="text-red-500 text-sm mt-1">Invalid website URL format.</p>
        )}
      </div>
    </div>
  );
}