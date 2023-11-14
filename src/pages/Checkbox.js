import React from "react";

export function Checkbox({ id, name, value = false, updateValue = () => {}, children }) {
  const handleChange = () => {
    updateValue(!value, name, id);
  };

  return (
    <div className="c-check-box">
      <input
        type="checkbox"
        id={`${id}-checkbox`}
        name={name}
        checked={value}
        onChange={handleChange}
      />
      <label htmlFor={`${id}-checkbox`} className="">
        {children}
      </label>
    </div>
  );
}
