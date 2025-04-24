// app/conneq-tag/components/TagSuccessModal.tsx

"use client";

import { FiCheckCircle } from "react-icons/fi";
import { globalClassNames } from "@/utils/classnames";

interface TagSuccessModalProps {
  isOpen: boolean;
  onDownloadPDF: () => void;
  onClose: () => void;
}

export default function TagSuccessModal({
  isOpen,
  onDownloadPDF,
  onClose,
}: TagSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className={globalClassNames.modal}>
      <div className="bg-blur p-6 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
          <FiCheckCircle className="text-green-600 text-4xl" />
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          Details Successfully Saved
        </h2>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={onDownloadPDF} className={globalClassNames.Downloadbutton}>
            Download PDF
          </button>
          <button onClick={onClose} className={globalClassNames.closeBUtton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
