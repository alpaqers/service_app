import React from "react";
import ContactForm from "../components/ContactForm";

export function Home() {
    return (
      <>
        <h1 className="text-2xl font-bold">Serwis AGD / RTV</h1>
        <p className="mt-2 text-zinc-600">
          Strona główna
        </p>

        <ContactForm />
      </>
    );
  }
  