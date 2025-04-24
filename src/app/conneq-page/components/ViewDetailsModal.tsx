// app/conneq-page/components/ViewDetailsModal.tsx

"use client";

import { FiX, FiDownload, FiEdit, FiInfo } from "react-icons/fi";
import QRCode from "react-qr-code";
import { DataItem } from "../hooks/useConneqPage";
import { globalClassNames } from "@/utils/classnames";

interface ViewDetailsModalProps {
  isOpen: boolean;
  selectedItem: DataItem | null;
  onClose: () => void;
  onEdit: (item: DataItem) => void;
}

export default function ViewDetailsModal({
  isOpen,
  selectedItem,
  onClose,
  onEdit,
}: ViewDetailsModalProps) {
  if (!isOpen || !selectedItem) return null;

  const handleDownloadFile = () => {
    if (!selectedItem.file) return;
    const fileURL = URL.createObjectURL(selectedItem.file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = selectedItem.file.name;
    link.click();
  };

  const fileUrl = selectedItem.file
    ? URL.createObjectURL(selectedItem.file)
    : "NoFile";

  return (
    <div className={globalClassNames.modal}>
      <div className={globalClassNames.modalContent}>
        {/* Close Icon */}
        <div className="flex justify-end">
          <FiX className={globalClassNames.XButton} onClick={onClose} />
        </div>

        {/* Icon Header */}
        <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-blue-100">
          <FiInfo className="text-blue-600 text-4xl" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
          CONNEQ PAGE
        </h2>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-6">
          {/* QR Code */}
          <div className="flex justify-center mb-4 md:mb-0">
            <QRCode value={fileUrl} size={150} />
          </div>

          {/* Metadata */}
          <div className="flex-1 space-y-3">
            <p className="text-black">
              <strong>Status:</strong> {selectedItem.status}
            </p>
            <p className="text-black">
              <strong>File:</strong>{" "}
              {selectedItem.file ? selectedItem.file.name : "No file"}
            </p>
            <p className="text-black">
              <strong>URL:</strong>{" "}
              {selectedItem.file ? (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {fileUrl}
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p className="text-black">
              <strong>Name:</strong> {selectedItem.name}
            </p>
            <p className="text-black">
              <strong>Description:</strong> {selectedItem.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleDownloadFile}
            className={globalClassNames.Downloadbutton}
          >
            <FiDownload className="mr-2" />
            Download
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(selectedItem);
            }}
            className={globalClassNames.editButton}
          >
            <FiEdit className="mr-2" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
