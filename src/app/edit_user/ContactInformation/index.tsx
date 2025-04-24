// src/app/edit_user/ContactInformation/index.tsx

import { useEffect } from "react";
import { UserFormData } from "../types";
import PhoneInput from "./PhoneInput";

interface ContactInformationProps {
  formData: UserFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  formData,
  handleInputChange,
}) => {
  useEffect(() => {
    console.log("ContactInformation mounted", formData);
  }, [formData]);

  const formatPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value === "" || value === "63") {
      handleInputChange({
        target: { name: e.target.name, value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      return;
    }

    if (value.startsWith("63")) {
      value = value.slice(2);
    }

    if (value.length > 0 && !value.startsWith("9")) return;
    if (value.length > 10) value = value.slice(0, 10);

    let formattedValue = "+63" + value;
    if (value.length > 3) {
      formattedValue = `+63${value.slice(0, 3)}-${value.slice(3, 6)}`;
    }
    if (value.length > 6) {
      formattedValue = `+63${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    }

    handleInputChange({
      target: { name: e.target.name, value: formattedValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="space-y-4">
      <PhoneInput
        label="Cellphone"
        name="cellphone"
        value={formData.cellphone || ""}
        onChange={formatPhoneNumber}
      />
      <PhoneInput
        label="WhatsApp"
        name="whatsapp"
        value={formData.whatsapp || ""}
        onChange={formatPhoneNumber}
      />
      <PhoneInput
        label="Viber"
        name="viber"
        value={formData.viber || ""}
        onChange={formatPhoneNumber}
      />
      <PhoneInput
        label="Wechat"
        name="wechat"
        value={formData.wechat || ""}
        onChange={formatPhoneNumber}
      />

      <div className="relative w-full">
        <label htmlFor="workphone">Work Phone</label>
        <input
          type="text"
          name="workphone"
          placeholder="(XX) XXX-XXXX or local 123"
          value={formData.workphone || ""}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div className="relative w-full">
        <label htmlFor="workemail">
          Work Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="workemail"
          placeholder="user@dnl.com.ph"
          value={formData.workemail || ""}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div className="relative w-full">
        <label htmlFor="workfax">Work Fax</label>
        <input
          type="tel"
          name="workfax"
          placeholder="(XX)XXX-XXXX or local 123"
          value={formData.workfax || ""}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default ContactInformation;
