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
const isValidJobtitle = (value: string) => /^[A-Za-z\s.-]{0,40}$/.test(value);
const isValidWebsite = (value: string) => /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}([\/\w .-]*)?$/.test(value);

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
      (field !== "jobtitle" && isValidName(value)) ||
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
          <input
            type="text"
            className="input-field pr-6"
            placeholder="First Name"
            value={formData.firstname}
            onChange={(e) => handleInputChange("firstname", e.target.value)}
          />
          {showAsterisk.firstname && (
            <span className="absolute right-30 top-1/2 transform -translate-y-1/2 text-red-500">*</span>
          )}
        </div>
        <input
          type="text"
          className="input-field"
          placeholder="Middle Name"
          value={formData.middlename}
          onChange={(e) => handleInputChange("middlename", e.target.value)}
        />
        <div className="relative">
          <input
            type="text"
            className="input-field pr-6"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={(e) => handleInputChange("lastname", e.target.value)}
          />
          {showAsterisk.lastname && (
            <span className="absolute right-30.5 top-1/2 transform -translate-y-1/2 text-red-500">*</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          className={`input-field appearance-none ${isPlaceholderSelected(formData.honorificprefix) ? "text-gray-400" : "text-black"}`}
          value={formData.honorificprefix}
          onChange={(e) => setFormData({ ...formData, honorificprefix: e.target.value })}
        >
          <option value="" className="text-gray-400">Honorific Prefix</option>
          <option value="Mr.">Mr.</option>
          <option value="Mrs.">Mrs.</option>
          <option value="Ms.">Ms.</option>
          <option value="Dr.">Dr.</option>
        </select>
        <select
          className={`input-field appearance-none ${isPlaceholderSelected(formData.honorificsuffix) ? "text-gray-400" : "text-black"}`}
          value={formData.honorificsuffix}
          onChange={(e) => setFormData({ ...formData, honorificsuffix: e.target.value })}
        >
          <option value="" className="text-gray-400">Honorific Suffix</option>
          <option value="Jr.">Jr.</option>
          <option value="Sr.">Sr.</option>
          <option value="PhD">PhD</option>
        </select>
      </div>

      <div className="relative">
        <input
          type="text"
          className="input-field pr-6"
          placeholder="Job Title"
          value={formData.jobtitle}
          onChange={(e) => handleInputChange("jobtitle", e.target.value)}
        />
        {showAsterisk.jobtitle && (
          <span className="absolute right-151.5 top-1/2 transform -translate-y-1/2 text-red-500">*</span>
        )}
      </div>

      <div className="relative">
        <select
          className={`input-field appearance-none ${isPlaceholderSelected(formData.company) ? "text-gray-400" : "text-black"}`}
          value={formData.company}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, company: value });
            setShowAsterisk((prev) => ({ ...prev, company: value === "" }));
          }}
        >
          <option value="">Company</option>
          {Object.keys(logoOptionsMap).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        {showAsterisk.company && (
          <span className="absolute right-149 top-1/2 transform -translate-y-1/2 text-red-500">*</span>
        )}
      </div>

      <div className="relative">
        <select
          className={`input-field appearance-none ${isPlaceholderSelected(formData.logo) ? "text-gray-400" : "text-black"}`}
          value={formData.logo}
          onChange={(e) => {
            const value = e.target.value;
            setFormData({ ...formData, logo: value });
            setShowAsterisk((prev) => ({ ...prev, logo: value === "" }));
          }}
          disabled={!formData.company}
        >
          <option value="">Logo</option>
          {getLogoOptions(formData.company).map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {showAsterisk.logo && (
          <span className="absolute right-157 top-1/2 transform -translate-y-1/2 text-red-500">*</span>
        )}
      </div>

      <input
        type="text"
        className="input-field"
        placeholder="Website"
        value={formData.website}
        onChange={(e) => {
          let value = e.target.value.replace(/\/$/, "");
          setFormData({ ...formData, website: value });
          setWebsiteError(value !== "" && !isValidWebsite(value));
        }}
      />
      <br />
      {websiteError && (
        <p className="text-red-500 text-sm mt-1">Invalid website URL format.</p>
      )}
    </div>
  );
}