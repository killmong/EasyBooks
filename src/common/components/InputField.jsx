import React, { useState, useEffect } from "react";

const InputField = ({
  label,
  register,
  name,
  defaultValue,
  type = "text",
  disabled = false,
  required,
  errors,
}) => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled(!!defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    setIsFilled(!!e.target.value);
  };

  return (
    <div className="w-full pd4">
      <label className="block text-gray-800 font-medium mb-1">{label}</label>
      <input
        {...register(name, { required })}
        defaultValue={defaultValue}
        onChange={handleChange}
        type={type}
        disabled={disabled}
        className={`w-full pd2 rounded-md border outline-none bg-white transition-all duration-300 shadow-sm
          ${errors?.[name] ? "border-red-500" : "border-gray-300"}
          ${isFilled ? "shadow-[0_0_0_3px_rgba(139,92,246,0.3)]" : ""}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          focus:border-violet-500 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.4)]`}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">This field is required.</p>
      )}
    </div>
  );
};

export default InputField;
