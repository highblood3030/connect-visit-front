"use client";

import { globalClassNames } from "@/utils/classnames";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className={globalClassNames.errorContainer}>
      <div className={globalClassNames.errorContent}>
        <p className="text-lg mb-4 text-center">{message}</p>
        <button
          onClick={onClose}
          className={globalClassNames.primaryButton}
        >
          OK
        </button>
      </div>
    </div>
  );
}
