import React from "react";

const InputField = ({
  type,
  name,
  onChange,
  text,
  value,

  For,
  id,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-base capitalize font-medium " htmlFor={For}>{text}</label>
      <input
        type={type}
        placeholder={text}
        className="focus:outline-0 "
        onChange={onChange}
        name={name}

        id={id}
        value={value}
      />
    </div>
  );
};

export default InputField;
