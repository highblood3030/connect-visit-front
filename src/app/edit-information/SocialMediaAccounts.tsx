import React from "react";

// ✅ Define the expected props
interface SocialMediaProps {
  formData: {
    facebook: string;
    linkedin: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMediaAccount: React.FC<SocialMediaProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="space-y-4">
        {/* Facebook Input */}
        <div>
          <input
            type="text"
            placeholder="Facebook*"
            name="facebook"
            value={formData.facebook} // ✅ Controlled input
            onChange={handleInputChange} // ✅ Updates state
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* LinkedIn Input */}
        <div>
          <input
            type="text"
            placeholder="LinkedIn*"
            name="linkedin" // ✅ Ensure correct naming
            value={formData.linkedin}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAccount;
