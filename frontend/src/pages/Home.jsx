import React from "react";
import ServiceSlotsCarousel from "../components/ServiceSlotsCarousel";
import ContactForm from "../components/ContactForm";
import Landing from "../components/Landing/Landing";

export function Home() {
    return (
      <>
        <h1 className="text-2xl font-bold">Serwis AGD / RTV</h1>
        <p className="mt-2 text-zinc-600">
          Strona główna
        </p>
        <ServiceSlotsCarousel />

        <ContactForm />
        <Landing />
      </>
    );
  }
  