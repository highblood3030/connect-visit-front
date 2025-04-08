import React, { useEffect, useState } from "react";
import type { UserFormData } from "./edituserdashboard";

interface ContactInformationProps {
  formData: UserFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  formData,
  handleInputChange,
}) => {
  const [emailError, setEmailError] = useState("");
  const [cellphoneError, setCellphoneError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");
  const [viberError, setViberError] = useState("");
  const [wechatError, setWechatError] = useState("");
  
  useEffect(() => {
    console.log("ContactInformation component mounted");
    console.log("formData:", formData);
  }, [formData]);

  const handleCellphoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value === "" || value === "63") {
      handleInputChange({
        target: { name: e.target.name, value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      setCellphoneError("");
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

    if (value.length === 0) {
      setCellphoneError("");
    } else if (value.length !== 10) {
      setCellphoneError("The number should contain exactly 10 digits.");
    } else {
      setCellphoneError("");
    }
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value === "" || value === "63") {
      handleInputChange({
        target: { name: e.target.name, value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      setWhatsappError("");
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

    if (value.length === 0) {
      setWhatsappError("");
    } else if (value.length !== 10) {
      setWhatsappError("The number should contain exactly 10 digits.");
    } else {
      setWhatsappError("");
    }
  };

  const handleViberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value === "" || value === "63") {
      handleInputChange({
        target: { name: e.target.name, value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      setViberError("");
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

    if (value.length === 0) {
      setViberError("");
    } else if (value.length !== 10) {
      setViberError("The number should contain exactly 10 digits.");
    } else {
      setViberError("");
    }
  };

  const handleWechatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value === "" || value === "63") {
      handleInputChange({
        target: { name: e.target.name, value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      setWechatError("");
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

    if (value.length === 0) {
      setWechatError("");
    } else if (value.length !== 10) {
      setWechatError("The number should contain exactly 10 digits.");
    } else {
      setWechatError("");
    }
  };

  const handleWorkEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value && !emailRegex.test(e.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
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
          onChange={handleCellphoneChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {cellphoneError && (
          <p className="text-red-500 text-sm mt-1">{cellphoneError}</p>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor="whatsapp">WhatsApp</label>
        <input
          type="text"
          placeholder="+63XXX-XXX-XXXX"
          name="whatsapp"
          value={formData?.whatsapp || ""}
          onChange={handleWhatsappChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {whatsappError && (
          <p className="text-red-500 text-sm mt-1">{whatsappError}</p>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor="viber">Viber</label>
        <input
          type="text"
          placeholder="+63XXX-XXX-XXXX"
          name="viber"
          value={formData?.viber || ""}
          onChange={handleViberChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {viberError && (
          <p className="text-red-500 text-sm mt-1">{viberError}</p>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor="wechat">Wechat</label>
        <input
          type="text"
          placeholder="+63XXX-XXX-XXXX"
          name="wechat"
          value={formData?.wechat || ""}
          onChange={handleWechatChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {wechatError && (
          <p className="text-red-500 text-sm mt-1">{wechatError}</p>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor="workphone">Work Phone</label>
        <input
          type="text"
          placeholder="(XX/X)X/XXX-XXXX"
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
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor="workfax">Work Fax</label>
        <input
          type="text"
          placeholder="(XX/X)X/XXX-XXXX"
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