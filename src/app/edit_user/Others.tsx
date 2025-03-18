import React from "react";

interface OthersProps {
  formData: { note?: string };
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Others: React.FC<OthersProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <label className="block text-gray-700 font-semibold mb-2">Note</label>
      <textarea
        name="note"
        placeholder="Write your note here..."
        value={formData.note || ""}
        onChange={handleInputChange}
        className="w-full h-32 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
};

export default Others;
