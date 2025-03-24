import React from "react";

interface OthersProps {
  formData: { note?: string };
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Others: React.FC<OthersProps> = ({ formData, handleInputChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 20) {
      handleInputChange(e);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <label className="block text-gray-700 font-semibold mb-2" htmlFor="note">Note</label>
      <textarea
        name="note"
        placeholder="Write your note here..."
        value={formData.note || ""}
        onChange={handleChange}
        className="w-full h-32 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
      />
      <p className="text-sm text-gray-500 mt-1 text-center">
        {formData.note?.length || 0}/20 characters
      </p>
    </div>
  );
};

export default Others;