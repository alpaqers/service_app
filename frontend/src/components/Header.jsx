import React from "react";
import { FaScrewdriverWrench, FaPhone } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="w-full border-b border-black/10 bg-white">
      <div className="flex h-20 w-full">
        {/* LEFT BRAND BLOCK */}
        <div className="flex items-center gap-3 bg-[#3F63FF] px-12 text-white">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-white">
            <FaScrewdriverWrench className="h-6 w-6 text-[#3F63FF] " />
          </div>

          <span className="text-2xl font-semibold tracking-tight">
            Serwis RTV/AGD
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-1 items-center pl-12">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
            {/* NAV */}
            <nav aria-label="Primary" className="flex items-center gap-10">
              {["Home", "About", "Pricing", "Features"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-sm font-medium text-black/80 hover:text-black"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* CALL US */}
            <div className="flex items-center gap-4 mr-24">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#3F63FF] text-white">
                <FaPhone className="h-6 w-6" />
              </div>

              <div className="leading-tight">
                <div className="text-sm font-semibold text-black">Zadzwoń do nas</div>
                <div className="text-lg font-semibold tracking-tight text-black">
                  123-123-123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
