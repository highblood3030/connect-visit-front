"use client";
import React from "react";

type Props = {
  profileImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
  setFormData: (data: any) => void;
};

export default function PersonalInformation({
  profileImage,
  handleImageChange,
  formData,
  setFormData,
}: Props) {
  return (
    <form className="space-y-4">
      {/* Upload Photo */}
      <div className="flex items-center space-x-6">
        <div className="w-28 h-28 rounded-full border border-gray-300 overflow-hidden">
          <img src={profileImage} alt="Profile" className="object-cover w-full h-full" />
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
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          className="input-field"
          placeholder="First Name *"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Middle Name"
          value={formData.middleName}
          onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Last Name *"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          className="input-field"
          placeholder="Honorific Prefix"
          value={formData.honorificPrefix}
          onChange={(e) => setFormData({ ...formData, honorificPrefix: e.target.value })}
        />
        <input
          type="text"
          className="input-field"
          placeholder="Honorific Suffix"
          value={formData.honorificSuffix}
          onChange={(e) => setFormData({ ...formData, honorificSuffix: e.target.value })}
        />
      </div>

      <input
        type="text"
        className="input-field"
        placeholder="Job Title *"
        value={formData.jobTitle}
        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
      />

      <input
        type="text"
        className="input-field bg-gray-100"
        value={formData.company}
        readOnly
      />
      <input
        type="text"
        className="input-field bg-gray-100"
        value={formData.logo}
        readOnly
      />

      <input
        type="text"
        className="input-field"
        placeholder="Website (without http://)"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
      />

      {/* Privacy Notice */}
      <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
        <div className="flex items-start space-x-2">
          <input type="checkbox" className="mt-1" checked readOnly />
          <p>
            I confirm that I have read, understood, and agree with the Privacy Notice of D&L
            Industries, Inc..{" "}
            <a href="#" className="text-blue-500 underline">
              Corporate Data Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
