import React from "react";
import CalendarMonthPl from "../components/CalendarMonthPl";

export function Home() {
    return (
      <>
        <h1 className="text-2xl font-bold">Serwis AGD / RTV</h1>
        <p className="mt-2 text-zinc-600">
          Strona główna
        </p>

        <CalendarMonthPl />
      </>
    );
  }
  