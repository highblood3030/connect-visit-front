import { globalClassNames } from "@/utils/classnames";
import React from "react";

interface SocialMediaProps {
  formData: {
    facebook?: string;
    linkedin?: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

const SocialMediaAccount: React.FC<SocialMediaProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="facebook" className="block mb-1">
            Facebook
          </label>
          <select
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
            className={globalClassNames.socialmedia}
          >
            <option value=""></option>
          </select>
        </div>

        <div className="relative">
          <label htmlFor="linkedin" className="block mb-1">
            LinkedIn
          </label>
          <select
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className={globalClassNames.socialmedia}
          >
            <option value=""></option>
            <option value="linkedin.com/company/d&l-industries-inc.">
              linkedin.com/company/d&l-industries-inc.
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAccount;
