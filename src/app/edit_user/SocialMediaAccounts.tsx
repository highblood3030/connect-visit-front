"use client";
import React from "react";

export default function SocialMediaAccounts() {
  return (
    <form className="space-y-4">
      {["Facebook", "LinkedIn"].map((platform, idx) => (
        <input
          key={idx}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#145C5B] focus:outline-none"
          placeholder={platform}
        />
      ))}
    </form>
  );
}
