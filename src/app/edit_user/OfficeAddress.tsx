import React, { useEffect } from "react";
import type { UserFormData } from "./edituserdashboard";

interface OfficeAddressProps {
  formData: UserFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OfficeAddress: React.FC<OfficeAddressProps> = ({ formData, handleInputChange }) => {
  useEffect(() => {
    console.log("OfficeAddress component mounted");
    console.log("formData:", formData);
  }, [formData]);

  return (
    <div className="space-y-4">
      {/* Country */}
      <input
        type="text"
        placeholder="Country*"
        name="country"
        value={formData.country || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      {/* City State ✅ FIXED */}
      <input
        type="text"
        placeholder="City State*"
        name="cityState" // ✅ Corrected name
        value={formData.cityState || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      {/* Postal Code ✅ FIXED */}
      <input
        type="text"
        placeholder="Postal Code*"
        name="postalCode" // ✅ Corrected name
        value={formData.postalCode || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      {/* Website ✅ FIXED */}
      <input
        type="text"
        placeholder="Website*"
        name="website" // ✅ Corrected name
        value={formData.website || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />

      {/* Name or Phone ✅ FIXED */}
      <input
        type="text"
        placeholder="Name*"
        name="phone" // ✅ Ensure it's correctly linked
        value={formData.phone || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />
    </div>
  );
};

export default OfficeAddress;
