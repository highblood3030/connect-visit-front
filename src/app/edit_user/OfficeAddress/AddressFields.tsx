import { UserFormData } from "../types";

interface AddressFieldsProps {
  prefix?: "factory" | ""; // restrict to known values
  formData: UserFormData;
}

const getFieldValue = (
  formData: UserFormData,
  prefix: "factory" | "",
  field: "Street" | "City" | "State" | "PostalCode" | "Country"
): string => {
  const fullKey = `${prefix}${field}` as keyof UserFormData;
  return formData[fullKey] || "";
};

const AddressFields = ({ prefix = "", formData }: AddressFieldsProps) => (
  <div className="grid grid-cols-2 gap-4 mt-4">
    <div className="col-span-2">
      <label className="block mb-1">Street</label>
      <input className="input-field" value={getFieldValue(formData, prefix, "Street")} readOnly />
    </div>
    <div>
      <label className="block mb-1">City</label>
      <input className="input-field" value={getFieldValue(formData, prefix, "City")} readOnly />
    </div>
    <div>
      <label className="block mb-1">State/Province</label>
      <input className="input-field" value={getFieldValue(formData, prefix, "State")} readOnly />
    </div>
    <div>
      <label className="block mb-1">Postal Code</label>
      <input className="input-field" value={getFieldValue(formData, prefix, "PostalCode")} readOnly />
    </div>
    <div>
      <label className="block mb-1">Country</label>
      <input className="input-field" value={getFieldValue(formData, prefix, "Country")} readOnly />
    </div>
  </div>
);

export default AddressFields;
