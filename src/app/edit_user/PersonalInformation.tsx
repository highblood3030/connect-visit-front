"use client";
import React, { useEffect } from "react";
import Image from "next/image";

// Define proper types for form data
interface FormData {
  profileImage: string;
  firstname: string;
  middlename: string;
  lastname: string;
  honorificprefix: string;
  honorificsuffix: string;
  jobtitle: string;
  company: string;
  logo: string;
  website: string;
}

type Props = {
  profileImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: FormData;
  setFormDataAction: (data: FormData | ((prevData: FormData) => FormData)) => void;
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
const isValidJobtitle = (value: string) =>
  /^[A-Za-z\s().-]{0,40}$/.test(value);
const isValidHonorific = (value: string) =>
  /^[A-Za-z\s.,-]{0,20}$/.test(value);

export default function PersonalInformation({
  formData,
  setFormDataAction,
}: Props) {
  useEffect(() => {
    if (formData.company) {
      const logos = logoOptionsMap[formData.company] || [];
      if (logos.length === 1) {
        setFormDataAction((prevData) => ({
          ...prevData,
          logo: logos[0],
        }));
      } else {
        setFormDataAction((prevData) => ({
          ...prevData,
          logo: "",
        }));
      }
    } else {
      setFormDataAction((prevData) => ({ ...prevData, logo: "" }));
    }
  }, [formData.company, setFormDataAction]);

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
        if (typeof reader.result === 'string') {
          setFormDataAction((prevData) => ({
            ...prevData,
            profileImage: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (
      (field === "jobtitle" && isValidJobtitle(value)) ||
      (field === "honorificprefix" && isValidHonorific(value)) ||
      (field === "honorificsuffix" && isValidHonorific(value)) ||
      (field !== "jobtitle" &&
        field !== "honorificprefix" &&
        field !== "honorificsuffix" &&
        isValidName(value)) ||
      value === ""
    ) {
      setFormDataAction((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  const getLogoOptions = (companyValue: string) => {
    return logoOptionsMap[companyValue] || [];
  };

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
          <label
            htmlFor="upload-photo"
            className="cursor-pointer bg-primary hover:bg-[#0d4746] text-white px-4 py-2 rounded-lg text-sm"
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
        <div>
          <label htmlFor="firstname">
            First Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input-field pr-6"
            value={formData.firstname}
            onChange={(e) => handleInputChange("firstname", e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="middlename">Middle Name</label>
          <input
            type="text"
            className="input-field"
            value={formData.middlename}
            onChange={(e) => handleInputChange("middlename", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lastname">
            Last Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input-field pr-6"
            value={formData.lastname}
            onChange={(e) => handleInputChange("lastname", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="honorificprefix">Honorific Prefix</label>
          <input
            type="text"
            className="input-field pr-6"
            value={formData.honorificprefix}
            onChange={(e) =>
              handleInputChange("honorificprefix", e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="honorificsuffix">Honorific Suffix</label>
          <input
            type="text"
            className="input-field pr-6"
            value={formData.honorificsuffix}
            onChange={(e) =>
              handleInputChange("honorificsuffix", e.target.value)
            }
          />
        </div>
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
          {getLogoOptions(formData.company).map((option) => (
            <option key={option} value={option}>
              {option}
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