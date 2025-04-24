// edit_user/OfficeAddress/FactoryLocationSelector.tsx

import { addressDetails, locationOptions } from "./addressDetails";
import { UserFormData } from "../types";

interface Props {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
}

const FactoryLocationSelector = ({ formData, setFormData }: Props) => (
  <div className="relative">
    <label className="block mb-1">Factory Location</label>
    <select
      name="factoryLocation"
      className="input-field appearance-none w-full pr-6"
      value={formData.factoryLocation || ""}
      onChange={(e) => {
        const selected = e.target.value;
        const address = addressDetails[selected] || {};
        setFormData((prev) => ({
          ...prev,
          factoryLocation: selected,
          factoryStreet: address.street || "",
          factoryCity: address.city || "",
          factoryState: address.state || "",
          factoryPostalCode: address.postalCode || "",
          factoryCountry: address.country || "",
        }));
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
);

export default FactoryLocationSelector;
