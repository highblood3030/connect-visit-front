"use client";
import React from "react";

export default function ContactInformation() {
  return (
    <form className="space-y-4">
      {["Cellphone", "WhatsApp", "Viber", "Wechat", "Work Phone", "Work Email *", "Work Fax"].map((label, idx) => (
        <input key={idx} type="text" className="input-field" placeholder={label} />
      ))}
    </form>
  );
}
