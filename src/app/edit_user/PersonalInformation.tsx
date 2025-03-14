"use client";
import React from "react";

type Props = {
  profileImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PersonalInformation({ profileImage, handleImageChange }: Props) {
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
        <input type="text" className="input-field" placeholder="First Name *" />
        <input type="text" className="input-field" placeholder="Middle Name" />
        <input type="text" className="input-field" placeholder="Last Name *" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input type="text" className="input-field" placeholder="Honorific Prefix" />
        <input type="text" className="input-field" placeholder="Honorific Suffix" />
      </div>

      <input type="text" className="input-field" placeholder="Job Title *" />
      <input
        type="text"
        className="input-field bg-gray-100"
        value="D&L Industries, Inc."
        readOnly
      />
      <input type="text" className="input-field bg-gray-100" value="D&L" readOnly />
      <input type="text" className="input-field" placeholder="Website (without http://)" />

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

      {/* Buttons */}
      <div className="flex justify-between space-x-4 pt-4">
        <button
          type="button"
          className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
        >
          Back
        </button>
        <button
          type="button"
          className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Next
        </button>
        <button
          type="submit"
          className="bg-[#145C5B] text-white px-8 py-2 rounded-lg hover:bg-[#0e4b4a]"
        >
          Save
        </button>
      </div>
    </form>
  );
}
