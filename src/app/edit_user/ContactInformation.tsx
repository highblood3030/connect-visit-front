"use client";
import React from "react";

export default function ContactInformation() {
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        "Cellphone",
        "WhatsApp",
        "Viber",
        "Wechat",
        "Work Phone",
        "Work Email *",
        "Work Fax",
      ].map((label, idx) => (
        <input
          key={idx}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#145C5B] focus:outline-none"
          placeholder={label}
        />
      ))}
    </form>
  );
}
