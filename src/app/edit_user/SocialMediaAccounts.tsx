import React, { useState } from "react";

interface SocialMediaProps {
  formData: {
    facebook?: string;
    linkedin?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMediaAccount: React.FC<SocialMediaProps> = ({
  formData,
  handleInputChange,
}) => {
  const [errors, setErrors] = useState<{
    facebook?: string;
    linkedin?: string;
  }>({});

  const validateURL = (name: string, value: string) => {
    let isValid = true;
    let errorMessage = "";

    const facebookRegex = /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.-]+$/;
    const linkedinRegex =
      /^https?:\/\/(www\.)?linkedin\.com\/[a-zA-Z0-9\/_.-]+$/;

    if (value) {
      if (name === "facebook" && !facebookRegex.test(value)) {
        isValid = false;
        errorMessage = "Invalid Facebook URL format.";
      } else if (name === "linkedin" && !linkedinRegex.test(value)) {
        isValid = false;
        errorMessage = "Invalid LinkedIn format.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValid ? "" : errorMessage,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    validateURL(e.target.name, e.target.value);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.facebook && (
            <p className="text-red-500 text-sm">{errors.facebook}</p>
          )}
        </div>

        <div>
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.linkedin && (
            <p className="text-red-500 text-sm">{errors.linkedin}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAccount;
