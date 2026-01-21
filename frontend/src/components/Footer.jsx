import React from "react";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaScrewdriverWrench } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-[#3F63FF] text-white">
      <div className="flex w-full flex-col px-12 py-12 md:flex-row md:justify-evenly">
        {/* BRAND */}
        <div className="flex max-w-sm flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10">
              <FaScrewdriverWrench className="h-6 w-6" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Serwis RTV/AGD
            </span>
          </div>

          <p className="text-sm leading-relaxed text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wide">
            Company
          </span>

          <a href="#" className="text-sm text-white/80 hover:text-white">
            About
          </a>
          <a href="#" className="text-sm text-white/80 hover:text-white">
            Pricing
          </a>
          <a href="#" className="text-sm text-white/80 hover:text-white">
            Features
          </a>
        </div>

        {/* CONTACT */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide">
            Kontakt
          </span>

          <div className="flex items-center gap-3">
            <FaPhoneSquareAlt className="h-6 w-6 text-white" />
            <span className="text-sm font-medium">
              123-123-123
            </span>
          </div>

          <span className="text-sm text-white/80">
            kontakt@serwisrtv.pl
          </span>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 px-6 py-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Serwis RTV/AGD. Wszystkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
