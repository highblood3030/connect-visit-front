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
  const [showAsterisk, setShowAsterisk] = useState(!formData?.workemail);
  const [emailError, setEmailError] = useState("");
  const [cellphoneError, setCellphoneError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");
  const [viberError, setViberError] = useState("");
  const [wechatError, setWechatError] = useState("");
  const [workphoneError, setWorkphoneError] = useState("");
  const [workfaxError, setWorkfaxError] = useState("");

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

  const handleWorkphoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d()\s]/g, "");

    if (value === "") {
      handleInputChange({
        target: { name: e.target.name, value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      setWorkphoneError("");
      return;
    }

    const match = value.match(/\((\d+)\)/);
    const digitsInsideParentheses = match ? match[1] : "";

    const maxLength = digitsInsideParentheses.length === 2 ? 13 : 14;
    value = value.slice(0, maxLength);

    let formattedValue = value;
    if (value.length > 6) {
      formattedValue = `${value.slice(0, value.length - 4)}-${value.slice(value.length - 4)}`;
    }

    handleInputChange({
      target: { name: e.target.name, value: formattedValue },
    } as React.ChangeEvent<HTMLInputElement>);

    const numericValue = value.replace(/\(\d+\)/g, "").replace(/[^\d]/g, "");

    if (numericValue.length === 0) {
      setWorkphoneError("");
    } else if (numericValue.length < 7) {
      setWorkphoneError("Insufficient number length");
    } else {
      setWorkphoneError("");
    }
  };

  const handleWorkEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setShowAsterisk(!e.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value && !emailRegex.test(e.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleWorkfaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d()\s]/g, "");

    if (value === "") {
      handleInputChange({
        target: { name: e.target.name, value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      setWorkfaxError("");
      return;
    }

    const match = value.match(/\((\d+)\)/);
    const digitsInsideParentheses = match ? match[1] : "";

    const maxLength = digitsInsideParentheses.length === 2 ? 13 : 14;
    value = value.slice(0, maxLength);

    let formattedValue = value;
    if (value.length > 6) {
      formattedValue = `${value.slice(0, value.length - 4)}-${value.slice(value.length - 4)}`;
    }

    handleInputChange({
      target: { name: e.target.name, value: formattedValue },
    } as React.ChangeEvent<HTMLInputElement>);

    const numericValue = value.replace(/\(\d+\)/g, "").replace(/[^\d]/g, "");

    if (numericValue.length === 0) {
      setWorkfaxError("");
    } else if (numericValue.length < 7) {
      setWorkfaxError("Insufficient number length");
    } else {
      setWorkfaxError("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full">
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
          onChange={handleWorkphoneChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {workphoneError && (
          <p className="text-red-500 text-sm mt-1">{workphoneError}</p>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor="workemail">Work Email</label>
        {showAsterisk && <span className="ml-1 text-red-500">*</span>}
        <input
          type="text"
          placeholder="user@dnl.com.ph"
          name="workemail"
          value={formData?.workemail || ""}
          onChange={handleWorkEmailChange}
          className="w-full border px-3 py-2 rounded-md"
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
          onChange={handleWorkfaxChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {workfaxError && (
          <p className="text-red-500 text-sm mt-1">{workfaxError}</p>
        )}
      </div>
    </div>
  );
};

export default ContactInformation;
