import React, { useEffect } from "react";
import type { UserFormData } from "./edituserdashboard";

interface ContactInformationProps {
  formData: UserFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  formData,
  handleInputChange,
}) => {
  useEffect(() => {
    console.log("ContactInformation component mounted");
    console.log("formData:", formData);
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

    if (value.length > 0 && !value.startsWith("9")) {
      return;
    }

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

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

  const handleWorkEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full relative top-2">
        <label htmlFor="cellphone">Cellphone</label>
        <input
          type="text"
          placeholder="+63XXX-XXX-XXXX"
          name="cellphone"
          value={formData?.cellphone || ""}
          onChange={formatPhoneNumber}
          pattern="\+63\d{3}-\d{3}-\d{4}"
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              "Please enter a valid 10-digit number (e.g. +63912-345-6789)"
            )
          }
          onInput={(e) =>
            (e.target as HTMLInputElement).setCustomValidity("")
          }
          className="w-full border px-3 py-2 rounded-md"
        />

      </div>

      <div className="relative w-full">
        <label htmlFor="whatsapp">WhatsApp</label>
        <input
          type="text"
          placeholder="+63XXX-XXX-XXXX"
          name="whatsapp"
          value={formData?.whatsapp || ""}
          onChange={formatPhoneNumber}
          pattern="\+63\d{3}-\d{3}-\d{4}"
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              "Please enter a valid 10-digit number (e.g. +63912-345-6789)"
            )
          }
          onInput={(e) =>
            (e.target as HTMLInputElement).setCustomValidity("")
          }
          className="w-full border px-3 py-2 rounded-md"
        />

      </div>

      <div className="relative w-full">
        <label htmlFor="viber">Viber</label>
        <input
          type="text"
          placeholder="+63XXX-XXX-XXXX"
          name="viber"
          value={formData?.viber || ""}
          onChange={formatPhoneNumber}
          pattern="\+63\d{3}-\d{3}-\d{4}"
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              "Please enter a valid 10-digit number (e.g. +63912-345-6789)"
            )
          }
          onInput={(e) =>
            (e.target as HTMLInputElement).setCustomValidity("")
          }
          className="w-full border px-3 py-2 rounded-md"
        />

      </div>

      <div className="relative w-full">
        <label htmlFor="wechat">Wechat</label>
        <input
          type="text"
          placeholder="+63XXX-XXX-XXXX"
          name="wechat"
          value={formData?.wechat || ""}
          onChange={formatPhoneNumber}
          pattern="\+63\d{3}-\d{3}-\d{4}"
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              "Please enter a valid 10-digit number (e.g. +63912-345-6789)"
            )
          }
          onInput={(e) =>
            (e.target as HTMLInputElement).setCustomValidity("")
          }
          className="w-full border px-3 py-2 rounded-md"
        />

      </div>

      <div className="relative w-full">
        <label htmlFor="workphone">Work Phone</label>
        <input
          type="text"
          placeholder="(XX) XXX-XXXX or local 123"
          name="workphone"
          value={formData?.workphone || ""}
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
          placeholder="user@dnl.com.ph"
          name="workemail"
          value={formData?.workemail || ""}
          onChange={handleWorkEmailChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div className="relative w-full">
        <label htmlFor="workfax">Work Fax</label>
        <input
          type="tel"
          placeholder="(XX)XXX-XXXX or local 123"
          name="workfax"
          value={formData?.workfax || ""}
          onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default ContactInformation;