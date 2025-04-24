// src/app/edit_user/ContactInformation/PhoneInput.tsx

interface PhoneInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const PhoneInput = ({ label, name, value, onChange }: PhoneInputProps) => (
    <div className="relative w-full">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        placeholder="+63XXX-XXX-XXXX"
        value={value}
        onChange={onChange}
        pattern="\+63\d{3}-\d{3}-\d{4}"
        onInvalid={(e) =>
          (e.target as HTMLInputElement).setCustomValidity(
            "Please enter a valid 10-digit number (e.g. +63912-345-6789)"
          )
        }
        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
        className="w-full border px-3 py-2 rounded-md"
      />
    </div>
  );
  
  export default PhoneInput;
  