// app/conneq-tag/components/TagFormModal.tsx

"use client";

import { FiX } from "react-icons/fi";
import { globalClassNames } from "@/utils/classnames";

interface TagFormModalProps {
  isOpen: boolean;
  formData: {
    textTag: string;
    name: string;
    description: string;
    status: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

export default function TagFormModal({
  isOpen,
  formData,
  onChange,
  onSubmit,
  onClose,
}: TagFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className={globalClassNames.modal}>
      <div className={globalClassNames.modalContent}>
        {/* Modal Header */}
        <div className={globalClassNames.tagModal}>
          <h2 className="text-xl font-bold text-[#145C5B]">CONNEQ TAG FORM</h2>
          <FiX className={globalClassNames.XButton} onClick={onClose} />
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          {/* Text Tag */}
          <div>
            <label className={globalClassNames.tagLabel}>
              Text Tag<span className="ml-1 text-red-500">*</span>
            </label>
            <textarea
              name="textTag"
              className={globalClassNames.ConneqTag}
              placeholder="Text Tag"
              rows={2}
              maxLength={50}
              required
              value={formData.textTag}
              onChange={onChange}
            ></textarea>
          </div>

          {/* Name Input */}
          <div>
            <label className={globalClassNames.tagLabel}>
              Name<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              maxLength={30}
              className={globalClassNames.ConneqTag}
              placeholder="Item Name"
              required
              value={formData.name}
              onChange={onChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className={globalClassNames.tagLabel}>Description</label>
            <textarea
              name="description"
              className={globalClassNames.ConneqTag}
              placeholder="Description"
              rows={3}
              maxLength={50}
              value={formData.description}
              onChange={onChange}
            ></textarea>
          </div>

          {/* Status (readonly) */}
          <div>
            <label className={globalClassNames.tagLabel}>Status</label>
            <p className="text-md font-semibold text-[#145C5B]">{formData.status}</p>
          </div>

          {/* Save Button */}
          <button type="submit" className={globalClassNames.tagSaveButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
