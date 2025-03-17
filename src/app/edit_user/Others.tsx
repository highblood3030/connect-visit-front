"use client";
import React from "react";

export default function Others() {
  return (
    <form className="space-y-4">
      <textarea
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#145C5B] focus:outline-none resize-none"
        rows={5}
        placeholder="Note"
      />
    </form>
  );
}
