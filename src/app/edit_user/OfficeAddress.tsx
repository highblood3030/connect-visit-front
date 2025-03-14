"use client";
import React from "react";

export default function OfficeAddress() {
  return (
    <form className="space-y-4">
      <input type="text" className="input-field" placeholder="Displayed Address *" />
      <h3 className="font-bold text-lg">Office Address</h3>
      {["Office Location", "Street *", "City *", "State / Province", "Postal Code *", "Country *"].map((label, idx) => (
        <input key={idx} type="text" className="input-field" placeholder={label} />
      ))}

      <h3 className="font-bold text-lg">Factory Address</h3>
      {["Factory Location", "Street", "City", "State / Province", "Postal Code", "Country"].map((label, idx) => (
        <input key={idx} type="text" className="input-field" placeholder={label} />
      ))}
    </form>
  );
}
