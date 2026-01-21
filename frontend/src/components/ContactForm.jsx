import React, { useState } from "react";
import InputField from "./form/InputField";
import TextareaField from "./form/TextareaField";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // na razie tylko podgląd:
    console.log("Submit:", form);
  }

  return (
    <section className="w-full bg-[#F6F7F9]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-black/90">
            Zgłoś serwis
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/60">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            <InputField
              id="name"
              label="Imię"
              required
              placeholder=""
              value={form.name}
              onChange={handleChange}
            />

            <InputField
              id="email"
              label="Email"
              required
              type="email"
              placeholder=""
              value={form.email}
              onChange={handleChange}
            />

            <TextareaField
              id="message"
              label="Zgłoszenie"
              required
              className="md:col-span-2"
              value={form.message}
              onChange={handleChange}
              rows={10}
            />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#3F63FF] px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Zgłoś
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
