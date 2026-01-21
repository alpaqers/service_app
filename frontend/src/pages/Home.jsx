import ContactInfoSection from "../components/ContactInfoSection";
import React from "react";
import ServiceSlotsCarousel from "../components/ServiceSlotsCarousel";
import ContactForm from "../components/ContactForm";
import Landing from "../components/Landing/Landing";
import OurOffer from "../components/OurOffer";

export function Home() {
    return (
      <>
        <Landing />
        <OurOffer />
        <ContactForm />
        <ServiceSlotsCarousel />
        <ContactInfoSection />
      </>
    );
  }
  