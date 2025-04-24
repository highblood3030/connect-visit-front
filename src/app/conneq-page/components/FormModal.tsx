// app/conneq-page/components/FormModal.tsx

"use client";

import { FiX } from "react-icons/fi";
import { FormDataType } from "../hooks/useConneqPage";
import { globalClassNames } from "@/utils/classnames";

interface FormModalProps {
  isOpen: boolean;
  isEdit: boolean;
  formData: FormDataType;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFileChange: (file: File | null) => void;
}

export default function FormModal({
  isOpen,
  isEdit,
  formData,
  onClose,
  onChange,
  onSubmit,
  onFileChange,
}: FormModalProps) {
  if (!isOpen) return null;

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/heif",
      "application/pdf",
    ];

    if (file && !allowedTypes.includes(file.type)) {
      alert("Invalid file type. Upload JPG, PNG, GIF, HEIF, or PDF.");
      e.target.value = "";
      return;
    }

    onFileChange(file);
  };

  return (
    <div className={globalClassNames.modal}>
      <div className={globalClassNames.modalContent}>
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-black">
            {isEdit ? "Edit CONNEQ Page" : "CONNEQ PAGE FORM"}
          </h2>
          <FiX className={globalClassNames.XButton} onClick={onClose} />
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid gap-4 mt-4">
          {/* Name */}
          <div>
            <label className={globalClassNames.block}>
              Name<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              maxLength={30}
              className={globalClassNames.description}
            />
          </div>

          {/* Description */}
          <div>
            <label className={globalClassNames.block}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              maxLength={50}
              className={globalClassNames.description}
            ></textarea>
          </div>

          {/* Status */}
          <div>
            <label className={globalClassNames.block}>
              Status<span className="ml-1 text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className={globalClassNames.description}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className={globalClassNames.block}>
              Upload File(s)<span className="ml-1 text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Supports JPG, JPEG, GIF, PNG, HEIF, PDF.
            </p>
            <input
              type="file"
              accept=".jpg,.jpeg,.gif,.png,.heif,.pdf"
              onChange={handleFileInput}
              required={!isEdit}
              className={globalClassNames.description}
            />
            {formData.file && (
              <p className="text-sm text-gray-600 mt-1">
                Selected file: {formData.file.name}
              </p>
            )}
          </div>

          {/* Category (Read-Only) */}
          {formData.file && (
            <div>
              <label className={globalClassNames.block}>Category</label>
              <input
                type="text"
                value={formData.category}
                readOnly
                className={globalClassNames.readOnlyField}
              />
            </div>
          )}

          {/* Save Button */}
          <button type="submit" className={globalClassNames.tagSaveButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
