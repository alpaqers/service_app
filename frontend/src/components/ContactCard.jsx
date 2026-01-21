import React from "react";

export default function ContactCard({ icon, title, children }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* ICON */}
      <div className="mb-6 grid h-24 w-24 place-items-center rounded-full bg-black/5">
        {icon}
      </div>

      {/* TITLE */}
      <h3 className="mb-3 text-lg font-semibold text-black">
        {title}
      </h3>

      {/* CONTENT */}
      <div className="space-y-1 text-sm text-black/60">
        {children}
      </div>
    </div>
  );
}
