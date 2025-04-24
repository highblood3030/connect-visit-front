"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { UserFormData } from "../types";
import { logoOptionsMap } from "./constants";
import { isValidHonorific, isValidJobtitle, isValidName } from "./validators";

type Props = {
  profileImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: UserFormData;
  setFormDataAction: React.Dispatch<React.SetStateAction<UserFormData>>;
};

export default function PersonalInformation({
  formData,
  setFormDataAction,
  handleImageChange,
}: Props) {
  useEffect(() => {
    if (formData.company) {
      const logos = logoOptionsMap[formData.company] || [];
      setFormDataAction((prev) => ({
        ...prev,
        logo: logos.length === 1 ? logos[0] : "",
      }));
    }
  }, [formData.company, setFormDataAction]);

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    if (
      (field === "jobtitle" && isValidJobtitle(value)) ||
      (["honorificprefix", "honorificsuffix"].includes(field) && isValidHonorific(value)) ||
      (!["jobtitle", "honorificprefix", "honorificsuffix"].includes(field) && isValidName(value)) ||
      value === ""
    ) {
      setFormDataAction((prev) => ({ ...prev, [field]: value }));
    }
  };

  const getLogoOptions = (companyValue: string) => logoOptionsMap[companyValue] || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-6">
        <div className="w-28 h-28 rounded-full border border-gray-300 overflow-hidden relative top-2">
          <Image
            src={formData.profileImage || "/profile-placeholder.jpeg"}
            alt="Profile Preview"
            className="object-cover"
            width={112}
            height={112}
          />
        </div>
        <div>
          <label htmlFor="upload-photo" className="cursor-pointer bg-primary hover:bg-[#0d4746] text-white px-4 py-2 rounded-lg text-sm">
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
        {["firstname", "middlename", "lastname"].map((field, index) => (
          <div key={field}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {["firstname", "lastname"].includes(field) && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </label>
            <input
              type="text"
              className="input-field pr-6"
              value={formData[field as keyof UserFormData]}
              onChange={(e) => handleInputChange(field as keyof UserFormData, e.target.value)}
              required={["firstname", "lastname"].includes(field)}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {["honorificprefix", "honorificsuffix"].map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field === "honorificprefix" ? "Honorific Prefix" : "Honorific Suffix"}</label>
            <input
              type="text"
              className="input-field pr-6"
              value={formData[field as keyof UserFormData]}
              onChange={(e) => handleInputChange(field as keyof UserFormData, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="jobtitle">
          Job Title<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          className="input-field pr-6"
          value={formData.jobtitle}
          onChange={(e) => handleInputChange("jobtitle", e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="company">
          Company<span className="ml-1 text-red-500">*</span>
        </label>
        <select
          className="input-field appearance-none"
          value={formData.company}
          onChange={(e) =>
            setFormDataAction({ ...formData, company: e.target.value })
          }
          required
        >
          <option value=""></option>
          {Object.keys(logoOptionsMap).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="logo">
          Logo<span className="ml-1 text-red-500">*</span>
        </label>
        <select
          className="input-field appearance-none"
          value={formData.logo}
          onChange={(e) =>
            setFormDataAction({ ...formData, logo: e.target.value })
          }
          disabled={Boolean(formData.company && logoOptionsMap[formData.company]?.length === 1)}
          required
        >
          <option value=""></option>
          {getLogoOptions(formData.company).map((logo) => (
            <option key={logo} value={logo}>
              {logo}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="website">Website</label>
        <input
          type="url"
          className="input-field"
          value={formData.website}
          onChange={(e) => {
            const value = e.target.value.replace(/\/$/, "");
            setFormDataAction({ ...formData, website: value });
          }}
        />
      </div>
    </div>
  );
}
