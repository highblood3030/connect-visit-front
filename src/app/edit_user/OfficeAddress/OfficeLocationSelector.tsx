// edit_user/OfficeAddress/OfficeLocationSelector.tsx

import { addressDetails, locationOptions } from "./addressDetails";
import { UserFormData } from "../types";

interface Props {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
}

const OfficeLocationSelector = ({ formData, setFormData }: Props) => (
  <div className="relative">
    <label className="block mb-1">
      Office Location <span className="text-red-500">*</span>
    </label>
    <select
      name="location"
      className="input-field appearance-none w-full pr-6"
      value={formData.location}
      onChange={(e) => {
        const selected = e.target.value;
        const address = addressDetails[selected] || {};
        setFormData((prev) => ({
          ...prev,
          location: selected,
          ...address,
        }));
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
);

export default OfficeLocationSelector;
