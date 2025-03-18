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
            <input
        type="text"
        placeholder="Country*"
        name="country"
        value={formData?.phone || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />


<input
        type="text"
        placeholder="City State*"
        name="city State"
        value={formData?.phone || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />


<input
        type="text"
        placeholder="Postal code*"
        name="Postal Code"
        value={formData?.phone || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />


<input
        type="text"
        placeholder="Website*"
        name="Website"
        value={formData?.phone || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />


<input
        type="text"
        placeholder="Name*"
        name="Name"
        value={formData?.phone || ""}
        onChange={handleInputChange}
        className="w-full border px-3 py-2 rounded-md"
      />
    </div>
  );
};

export default OfficeAddress;
