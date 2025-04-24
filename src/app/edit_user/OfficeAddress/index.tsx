// src/app/edit_user/OfficeAddress/index.tsx

import { UserFormData } from "../types";
import AddressFields from "./AddressFields";
import OfficeLocationSelector from "./OfficeLocationSelector";
import FactoryLocationSelector from "./FactoryLocationSelector";

interface Props {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const OfficeAddress: React.FC<Props> = ({
  formData,
  setFormData,
  handleInputChange, // may be unused, but safe to keep for extensibility
}) => (
  <div className="space-y-6">
    {/* Displayed Address */}
    <div className="relative top-2">
      <label htmlFor="address" className="font-semibold block mb-1">
        Displayed Address
      </label>
      <select className="input-field appearance-none w-full pr-6" value="Office" disabled>
        <option value="Office">Office</option>
      </select>
    </div>

    {/* Office Address */}
    <div>
      <h2 className="text-lg font-bold mt-4 mb-2">Office Address</h2>
      <OfficeLocationSelector formData={formData} setFormData={setFormData} />
      <AddressFields formData={formData} />
    </div>

    {/* Factory Address */}
    <div>
      <h2 className="text-lg font-bold mt-6 mb-2">Factory Address</h2>
      <FactoryLocationSelector formData={formData} setFormData={setFormData} />
      <AddressFields prefix="factory" formData={formData} />
    </div>
  </div>
);

export default OfficeAddress;
