import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import ContactCard from "./ContactCard";

export default function ContactInfoSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-evenly">
          <div className="flex-1">
            <ContactCard
              title="Adres Email"
              icon={<FaEnvelope className="h-8 w-8 text-[#3F63FF]" />}
            >
              <p>kontakt@serwisrtv.pl</p>
              <p>wsparcie@serwisrtv.pl</p>
            </ContactCard>
          </div>

          <div className="flex-1">
            <ContactCard
              title="Numer telefonu"
              icon={<FaPhoneAlt className="h-8 w-8 text-[#3F63FF]" />}
            >
              <p>+48 123 123 123</p>
              <p>+48 321 321 321</p>
            </ContactCard>
          </div>

          <div className="flex-1">
            <ContactCard
              title="Adres"
              icon={<FaLocationDot className="h-8 w-8 text-[#3F63FF]" />}
            >
              <p>Ulicowa 12/1,</p>
              <p>12-123 Wrocław</p>
            </ContactCard>
          </div>
        </div>
      </div>
    </section>
  );
}
