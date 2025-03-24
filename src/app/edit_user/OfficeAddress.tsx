import React, { useEffect, useState } from "react";

interface OfficeAddressProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
  setFormData: (data: any) => void;
}

const OfficeAddress: React.FC<OfficeAddressProps> = ({ formData, handleInputChange, setFormData }) => {
  const [showAsterisk, setShowAsterisk] = useState({ address: !formData.address, location: !formData.location });

  useEffect(() => {
    console.log("OfficeAddress component mounted");
    console.log("formData:", formData);
  }, [formData]);

  const isPlaceholderSelected = (value: string) => value === "";

  const locationOptions: { [key: string]: string[] } = {
    Office: ["Mercury Office", "BVFO Office", "LBL Main Office", "LBL-South Plant", "Laguna Plant", "MRI Plant",
      "FIT", "Bauan Office", "CCPI Office", "CTI Davao Branch"],
    Factory: ["Mercury Office", "BVFO Office", "LBL Main Office", "LBL-South Plant", "Laguna Plant", "MRI Plant",
      "FIT", "Bauan Office", "CCPI Office", "CTI Davao Branch"],
  };

  const addressDetails: { [key: string]: { street: string; city: string; state: string; postalCode: string; country: string } } = {
    "Mercury Office": { street: "#5 Mercury Avenue, Bagumbayan #5 Mercury Avenue, Bagumbayan", city: "Quezon City", state: "Metro Manila", postalCode: "1110 ", country: "Philippines" },
    "BVFO Office": { street: "#62 Calle Industria", city: "Quezon City", state: "Metro Manila", postalCode: "1110 ", country: "Philippines" },
    "LBL Main Office": { street: "#65 Calle Industria", city: "Quezon City", state: "Metro Manila", postalCode: "1110 ", country: "Philippines" },
    "LBL-South Plant": { street: "#66 Calle Industria", city: "Quezon City", state: "Metro Manila", postalCode: "1110 ", country: "Philippines" },
    "Laguna Plant": { street: "122 Progress Ave., Carmelray Industrial Park 1, Special Economic Zone, Canlubang", city: "Calamba City", state: "Laguna", postalCode: "4027", country: "Philippines" },
    "MRI Plant": { street: "2821 F. Manalo St. Punta Sta Ana", city: "Manila", state: "Metro Manila", postalCode: "1009", country: "Philippines" },
    "FIT": { street: "Administration Building, First Industrial Township-sez, Brgy. Pagaspas", city: "Tanauan", state: "Batangas", postalCode: "4232", country: "Philippines" },
    "Bauan Office": { street: "Barangay Balayong", city: "Bauan", state: "Batangas", postalCode: "4201", country: "Philippines" },
    "CCPI Office": { street: "Consumer Care Bldg. Manggahan Light Industrial Park A Rodriguez Avenue Santolan", city: "Pasig City", state: "Metro Manila", postalCode: "1610", country: "Philippines" },
    "CTI Davao Branch": { street: "Door 2C & 2D, Main Building, Amina Way Business Park, Diversion Road, Sasa", city: "Davao City", state: "Davao Del Sur", postalCode: "8000", country: "Philippines" },
  };

  return (
    <div className="space-y-4">
      <div className="relative">
      <label htmlFor="address">Address</label>
      {showAsterisk.address && <span className="ml-1 text-red-500">*</span>}
        <select
          className={`input-field appearance-none w-full pr-6 ${isPlaceholderSelected(formData.address)}`}
          value={formData.address}
          onChange={(e) => {
            const selectedAddress = e.target.value;
            setFormData({
              ...formData,
              address: selectedAddress,
              location: "",
              street: "",
              city: "",
              state: "",
              postalCode: "",
              country: "",
            });
            setShowAsterisk({ address: selectedAddress === "", location: true });
          }}
        >
          <option value=""></option>
          <option value="Office">Office</option>
          <option value="Factory">Factory</option>
        </select>
      </div>

      <div className="relative">
      <label htmlFor="location">Location</label>
      {showAsterisk.location && <span className="ml-1 text-red-500">*</span>}
        <select
          className={`input-field appearance-none w-full pr-6 ${isPlaceholderSelected(formData.location)}`}
          value={formData.location}
          onChange={(e) => {
            const selectedLocation = e.target.value;
            setFormData({
              ...formData,
              location: selectedLocation,
              ...(selectedLocation ? addressDetails[selectedLocation] : {
                street: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
              }),
            });
            setShowAsterisk((prev) => ({ ...prev, location: selectedLocation === "" }));
          }}
          disabled={!formData.address}
        >
          <option value=""></option>
          {formData.address &&
            locationOptions[formData.address]?.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
        </select>
      </div>
      <input type="text" className="input-field" placeholder="Street" value={formData.street || ""} readOnly />
      <input type="text" className="input-field" placeholder="City" value={formData.city || ""} readOnly />
      <input type="text" className="input-field" placeholder="State/Province" value={formData.state || ""} readOnly />
      <input type="text" className="input-field" placeholder="Postal Code" value={formData.postalCode || ""} readOnly />
      <input type="text" className="input-field" placeholder="Country" value={formData.country || ""} readOnly />
    </div>
  );
};

export default OfficeAddress;