"use client";
import React from "react";

export default function OfficeAddress() {
  return (
    <form className="space-y-6">
      {/* Displayed Address */}
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#145C5B] focus:outline-none"
        placeholder="Displayed Address *"
      />

      {/* Office Address */}
      <h3 className="font-bold text-lg text-[#145C5B] mt-4">Office Address</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          "Office Location",
          "Street *",
          "City *",
          "State / Province",
          "Postal Code *",
          "Country *",
        ].map((label, idx) => (
          <input
            key={idx}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#145C5B] focus:outline-none"
            placeholder={label}
          />
        ))}
      </div>

      {/* Factory Address */}
      <h3 className="font-bold text-lg text-[#145C5B] mt-4">Factory Address</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          "Factory Location",
          "Street",
          "City",
          "State / Province",
          "Postal Code",
          "Country",
        ].map((label, idx) => (
          <input
            key={idx}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#145C5B] focus:outline-none"
            placeholder={label}
          />
        ))}
      </div>
    </form>
  );
}
