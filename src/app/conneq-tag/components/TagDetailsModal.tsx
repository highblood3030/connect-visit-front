// app/conneq-tag/components/TagDetailsModal.tsx

"use client";

import { FiX, FiDownload } from "react-icons/fi";
import QRCode from "react-qr-code";
import { globalClassNames } from "@/utils/classnames";
import { RefObject } from "react";

interface TagData {
  id: number;
  name: string;
  textTag: string;
  description: string;
  status: string;
  dateCreated: string;
}

interface TagDetailsModalProps {
  isOpen: boolean;
  selectedItem: TagData | null;
  qrRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onDownloadQR: () => void;
}

export default function TagDetailsModal({
  isOpen,
  selectedItem,
  qrRef,
  onClose,
  onDownloadQR,
}: TagDetailsModalProps) {
  if (!isOpen || !selectedItem) return null;

  return (
    <div className={globalClassNames.modal}>
      <div className={globalClassNames.modalContent}>
        {/* Modal Header */}
        <div className={globalClassNames.tagModal}>
          <h2 className="text-xl font-bold text-[#145C5B]">CONNEQ TAG</h2>
          <FiX className={globalClassNames.XButton} onClick={onClose} />
        </div>

        {/* Modal Body */}
        <div className="mt-4 flex flex-col items-center space-y-4">
          {/* QR Code Container with ref */}
          <div ref={qrRef}>
            <QRCode value={selectedItem.textTag} size={150} />
          </div>

          {/* Download QR Button */}
          <button className={globalClassNames.Downloadbutton} onClick={onDownloadQR}>
            <FiDownload className="mr-2" />
            Download QR
          </button>

          {/* Info Display */}
          <div className="text-center">
            <p className="text-gray-700">
              <strong>Status:</strong> {selectedItem.status}
            </p>
            <p className="text-gray-700">
              <strong>Text Tag:</strong> {selectedItem.textTag}
            </p>
            <p className="text-gray-700">
              <strong>Name:</strong> {selectedItem.name}
            </p>
            <p className="text-gray-700">
              <strong>Description:</strong> {selectedItem.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
