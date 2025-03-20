import React, { useEffect, useState } from "react";
import type { UserFormData } from "./edituserdashboard";

interface ContactInformationProps {
  formData: UserFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ formData, handleInputChange }) => {
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

    if (value === "") {
      handleInputChange({
        target: { name: e.target.name, value: "" }
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

    if (value.length > 0) {
      value = "63" + value;
    }

    value = value.slice(0, 12);

    handleInputChange({
      target: { name: e.target.name, value: value ? "+" + value : "" }
    } as React.ChangeEvent<HTMLInputElement>);

    if (value.length === 0) {
      setCellphoneError("");
    } else if (value.length !== 12) {
      setCellphoneError("The number should contain 10 digits.");
    } else {
      setCellphoneError("");
    }
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value === "") {
      handleInputChange({
        target: { name: e.target.name, value: "" }
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

    if (value.length > 0) {
      value = "63" + value;
    }

    value = value.slice(0, 12);

    handleInputChange({
      target: { name: e.target.name, value: value ? "+" + value : "" }
    } as React.ChangeEvent<HTMLInputElement>);

    if (value.length === 0) {
      setWhatsappError("");
    } else if (value.length !== 12) {
      setWhatsappError("The number should contain 10 digits.");
    } else {
      setWhatsappError("");
    }
  };

  const handleViberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value === "") {
      handleInputChange({
        target: { name: e.target.name, value: "" }
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

    if (value.length > 0) {
      value = "63" + value;
    }

    value = value.slice(0, 12);

    handleInputChange({
      target: { name: e.target.name, value: value ? "+" + value : "" }
    } as React.ChangeEvent<HTMLInputElement>);

    if (value.length === 0) {
      setViberError("");
    } else if (value.length !== 12) {
      setViberError("The number should contain 10 digits.");
    } else {
      setViberError("");
    }
  };

  const handleWechatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");

    if (value === "") {
      handleInputChange({
        target: { name: e.target.name, value: "" }
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

    if (value.length > 0) {
      value = "63" + value;
    }

    value = value.slice(0, 12);

    handleInputChange({
      target: { name: e.target.name, value: value ? "+" + value : "" }
    } as React.ChangeEvent<HTMLInputElement>);

    if (value.length === 0) {
      setWechatError("");
    } else if (value.length !== 12) {
      setWechatError("The number should contain 10 digits.");
    } else {
      setWechatError("");
    }
  };

  const handleWorkphoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
  
    if (value === "") {
      handleInputChange({
        target: { name: e.target.name, value: "" }
      } as React.ChangeEvent<HTMLInputElement>);
      setWorkphoneError("");
      return;
    }
  
    value = value.slice(0, 10);
  
    let formattedValue = "";
    if (value.length <= 2) {
      formattedValue = `(${value}`;
    } else if (value.length <= 6) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, value.length - 4)}-${value.slice(value.length - 4)}`;
    }
  
    handleInputChange({
      target: { name: e.target.name, value: formattedValue }
    } as React.ChangeEvent<HTMLInputElement>);
  
    const numericValue = value.slice(2);
  
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
    let value = e.target.value.replace(/\D/g, "");
  
    if (value === "") {
      handleInputChange({
        target: { name: e.target.name, value: "" }
      } as React.ChangeEvent<HTMLInputElement>);
      setWorkfaxError("");
      return;
    }
  
    value = value.slice(0, 10);
  
    let formattedValue = "";
    if (value.length <= 2) {
      formattedValue = `(${value}`;
    } else if (value.length <= 6) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, value.length - 4)}-${value.slice(value.length - 4)}`;
    }
  
    handleInputChange({
      target: { name: e.target.name, value: formattedValue }
    } as React.ChangeEvent<HTMLInputElement>);
  
    const numericValue = value.slice(2);
  
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
        <input
          type="text"
          placeholder="Cellphone"
          name="cellphone"
          value={formData?.cellphone || ""}
          onChange={handleCellphoneChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {cellphoneError && <p className="text-red-500 text-sm mt-1">{cellphoneError}</p>}
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="WhatsApp"
          name="whatsapp"
          value={formData?.whatsapp || ""}
          onChange={handleWhatsappChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {whatsappError && <p className="text-red-500 text-sm mt-1">{whatsappError}</p>}
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Viber"
          name="viber"
          value={formData?.viber || ""}
          onChange={handleViberChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {viberError && <p className="text-red-500 text-sm mt-1">{viberError}</p>}
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Wechat"
          name="wechat"
          value={formData?.wechat || ""}
          onChange={handleWechatChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {wechatError && <p className="text-red-500 text-sm mt-1">{wechatError}</p>}
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Work Phone"
          name="workphone"
          value={formData?.workphone || ""}
          onChange={handleWorkphoneChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {workphoneError && <p className="text-red-500 text-sm mt-1">{workphoneError}</p>}
      </div>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Work Email"
          name="workemail"
          value={formData?.workemail || ""}
          onChange={handleWorkEmailChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        {showAsterisk && <span className="text-red-500 absolute right-145.5 top-1/2 transform -translate-y-1/2">*</span>}
        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
      </div>

      <div className="relative w-full">
      <input
        type="text"
        placeholder="Work Fax"
        name="workfax"
        value={formData?.workfax || ""}
        onChange={handleWorkfaxChange}
        className="w-full border px-3 py-2 rounded-md"
      />
      {workfaxError && <p className="text-red-500 text-sm mt-1">{workfaxError}</p>}
      </div>
      <br />
    </div>
  );
};

export default ContactInformation;