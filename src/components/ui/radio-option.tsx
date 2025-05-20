import React from "react";
import { useFormContext } from "react-hook-form";

interface RadioOptionProps {
  id: string;
  label: string;
  value: string;
  register: unknown;
  name: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  id,
  label,
  value,
  name,
}) => {
  const { register } = useFormContext();
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="radio"
        value={value}
        {...register(name)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label htmlFor={id} className="ml-3 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default RadioOption;
