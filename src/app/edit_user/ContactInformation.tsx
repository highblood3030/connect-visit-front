import React, { useEffect } from "react";
import type { UserFormData } from "./edituserdashboard";

interface ContactInformationProps {
  formData: UserFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ formData, handleInputChange }) => {
  useEffect(() => {
    console.log("ContactInformation component mounted");
    console.log("formData:", formData);
  }, [formData]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        value={formData?.email || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700">Phone</label>
      <input
        type="text"
        name="phone"
        value={formData?.phone || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700">Alternate Phone</label>
      <input
        type="text"
        name="altPhone"
        value={formData?.altPhone || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700">Website</label>
      <input
        type="text"
        name="website"
        value={formData?.website || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700">Company Name</label>
      <input
        type="text"
        name="company"
        value={formData?.company || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />
    </div>
  );
};

export default ContactInformation;
