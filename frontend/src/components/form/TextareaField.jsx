import React from "react";

export default function TextareaField({
  id,
  label,
  required = false,
  placeholder = "",
  value,
  onChange,
  rows = 8,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-black/80">
        {label}{" "}
        {required ? <span className="text-red-500">*</span> : null}
      </label>

      <textarea
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full resize-none rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition-shadow placeholder:text-black/40 focus:border-black/30 focus:ring-4 focus:ring-black/10"
      />
    </div>
  );
}
