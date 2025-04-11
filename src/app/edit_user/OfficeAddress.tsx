import React, { useEffect, useState } from "react";

interface OfficeAddressProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
  setFormData: (data: any) => void;
}

const OfficeAddress: React.FC<OfficeAddressProps> = ({
  formData,
  handleInputChange,
  setFormData,
}) => {
  const isPlaceholderSelected = (value: string) => value === "";

  const locationOptions = [
    "Mercury Office",
    "BVFO Office",
    "LBL Main Office",
    "LBL-South Plant",
    "Laguna Plant",
    "MRI Plant",
    "FIT",
    "Bauan Office",
    "CCPI Office",
    "CTI Davao Branch",
  ];

  const addressDetails: {
    [key: string]: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  } = {
    "Mercury Office": {
      street: "#5 Mercury Avenue, Bagumbayan",
      city: "Quezon City",
      state: "Metro Manila",
      postalCode: "1110",
      country: "Philippines",
    },
    "BVFO Office": {
      street: "#62 Calle Industria",
      city: "Quezon City",
      state: "Metro Manila",
      postalCode: "1110",
      country: "Philippines",
    },
    "LBL Main Office": {
      street: "#65 Calle Industria",
      city: "Quezon City",
      state: "Metro Manila",
      postalCode: "1110",
      country: "Philippines",
    },
    "LBL-South Plant": {
      street: "#66 Calle Industria",
      city: "Quezon City",
      state: "Metro Manila",
      postalCode: "1110",
      country: "Philippines",
    },
    "Laguna Plant": {
      street:
        "122 Progress Ave., Carmelray Industrial Park 1, Special Economic Zone, Canlubang",
      city: "Calamba City",
      state: "Laguna",
      postalCode: "4027",
      country: "Philippines",
    },
    "MRI Plant": {
      street: "2821 F. Manalo St. Punta Sta Ana",
      city: "Manila",
      state: "Metro Manila",
      postalCode: "1009",
      country: "Philippines",
    },
    FIT: {
      street:
        "Administration Building, First Industrial Township-sez, Brgy. Pagaspas",
      city: "Tanauan",
      state: "Batangas",
      postalCode: "4232",
      country: "Philippines",
    },
    BauanOffice: {
      street: "Barangay Balayong",
      city: "Bauan",
      state: "Batangas",
      postalCode: "4201",
      country: "Philippines",
    },
    CCPIOffice: {
      street:
        "Consumer Care Bldg. Manggahan Light Industrial Park A Rodriguez Avenue Santolan",
      city: "Pasig City",
      state: "Metro Manila",
      postalCode: "1610",
      country: "Philippines",
    },
    CTIDavaoBranch: {
      street:
        "Door 2C & 2D, Main Building, Amina Way Business Park, Diversion Road, Sasa",
      city: "Davao City",
      state: "Davao Del Sur",
      postalCode: "8000",
      country: "Philippines",
    },
  };

  return (
    <div className="space-y-6">
      {/* Displayed Address */}
      <div className="relative top-2">
        <label htmlFor="address" className="font-semibold block mb-1">
          Displayed Address
        </label>
        <select
          className="input-field appearance-none w-full pr-6"
          value="Office"
          disabled
          required
        >
          <option value="Office">Office</option>
        </select>
      </div>

      {/* Office Address Section */}
      <div>
        <h2 className="text-lg font-bold mt-4 mb-2">Office Address</h2>
        <div className="relative">
          <label htmlFor="location" className="block mb-1">
            Office Location <span className="text-red-500">*</span>
          </label>
          <select
            className={`input-field appearance-none w-full pr-6 ${isPlaceholderSelected(
              formData.location,
            )}`}
            value={formData.location}
            onChange={(e) => {
              const selected = e.target.value;
              setFormData({
                ...formData,
                location: selected,
                ...(selected
                  ? addressDetails[selected]
                  : {
                      street: "",
                      city: "",
                      state: "",
                      postalCode: "",
                      country: "",
                    }),
              });
            }}
            required
          >
            <option value=""></option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Auto-filled Fields */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-2">
            <label className="block mb-1">Street</label>
            <input
              type="text"
              className="input-field"
              value={formData.street || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              className="input-field"
              value={formData.city || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1">State/Province</label>
            <input
              type="text"
              className="input-field"
              value={formData.state || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1">Postal Code</label>
            <input
              type="text"
              className="input-field"
              value={formData.postalCode || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1">Country</label>
            <input
              type="text"
              className="input-field"
              value={formData.country || ""}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Factory Address Section */}
      <div>
        <h2 className="text-lg font-bold mt-6 mb-2">Factory Address</h2>
        <div className="relative">
          <label htmlFor="factoryLocation" className="block mb-1">
            Factory Location <span className="text-red-500">*</span>
          </label>
          <select
            className="input-field appearance-none w-full pr-6"
            value={formData.factoryLocation || ""}
            onChange={(e) => {
              const selected = e.target.value;
              setFormData({
                ...formData,
                factoryLocation: selected,
                ...(selected
                  ? {
                      factoryStreet: addressDetails[selected].street,
                      factoryCity: addressDetails[selected].city,
                      factoryState: addressDetails[selected].state,
                      factoryPostalCode: addressDetails[selected].postalCode,
                      factoryCountry: addressDetails[selected].country,
                    }
                  : {
                      factoryStreet: "",
                      factoryCity: "",
                      factoryState: "",
                      factoryPostalCode: "",
                      factoryCountry: "",
                    }),
              });
            }}
          >
            <option value=""></option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Auto-filled Fields */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="col-span-2">
            <label className="block mb-1">Street</label>
            <input
              type="text"
              className="input-field"
              value={formData.factoryStreet || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              className="input-field"
              value={formData.factoryCity || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1">State/Province</label>
            <input
              type="text"
              className="input-field"
              value={formData.factoryState || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1">Postal Code</label>
            <input
              type="text"
              className="input-field"
              value={formData.factoryPostalCode || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1">Country</label>
            <input
              type="text"
              className="input-field"
              value={formData.factoryCountry || ""}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeAddress;
