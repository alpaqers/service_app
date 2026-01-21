import ContactInfoSection from "../components/ContactInfoSection";
import React from "react";
import ServiceSlotsCarousel from "../components/ServiceSlotsCarousel";
import ContactForm from "../components/ContactForm";
import Landing from "../components/Landing/Landing";

export function Home() {
    return (
      <>
        <Landing />
        <ContactForm />
        <ServiceSlotsCarousel />
        <ContactInfoSection />
      </>
    );
  }
  