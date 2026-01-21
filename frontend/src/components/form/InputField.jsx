import React from "react";

export default function InputField({
  id,
  label,
  required = false,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-black/80">
        {label}{" "}
        {required ? <span className="text-red-500">*</span> : null}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-md border border-black/15 bg-white px-4 text-sm text-black outline-none transition-shadow placeholder:text-black/40 focus:border-black/30 focus:ring-4 focus:ring-black/10"
      />
    </div>
  );
}
