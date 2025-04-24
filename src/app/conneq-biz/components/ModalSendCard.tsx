"use client";

import { globalClassNames } from "@/utils/classnames";

interface ModalSendCardProps {
  onClose: () => void;
  onSendFail: () => void;
}

export default function ModalSendCard({ onClose, onSendFail }: ModalSendCardProps) {
  return (
    <div className={globalClassNames.modal} onClick={onClose}>
      <div
        className={globalClassNames.modalContent}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <h2 className="text-xl text-center mb-6">Send Business Card</h2>

        <input
          type="text"
          name="Name"
          placeholder="Fullname"
          className="input-field mt-8"
        />
        <input
          type="email"
          name="Email"
          placeholder="Email Address"
          className="input-field mt-4"
        />
        <input
          type="text"
          name="Description"
          placeholder="Description"
          className="input-field mt-4 p-6"
        />

        <div className="flex justify-center mt-6">
          <button
            className={globalClassNames.primaryButton}
            onClick={onSendFail}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
