import React, { useMemo, useState } from "react";

/**
 * Prosty kalendarz month-view (PL) bez zewnętrznych bibliotek.
 * - Poniedziałek jako pierwszy dzień tygodnia
 * - Nawigacja miesiącami
 * - "Dzisiaj" przenosi na obecny miesiąc
 * - Render przykładowych wydarzeń jako pill’e
 */

/** ---------- POLSKIE NAZWY ---------- */
const MONTHS_PL = [
  "styczeń",
  "luty",
  "marzec",
  "kwiecień",
  "maj",
  "czerwiec",
  "lipiec",
  "sierpień",
  "wrzesień",
  "październik",
  "listopad",
  "grudzień",
];

// skróty jak na screenie
const WEEKDAYS_PL = ["pon.", "wt.", "śr.", "czw.", "pt.", "sob.", "niedz."];

/** ---------- HELPERY DAT ---------- */
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function addMonths(date, delta) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

/** Klucz dnia pod eventy: YYYY-MM-DD */
function dayKey(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/**
 * Poniedziałek jako 0.
 * JS: getDay() => niedz=0, pon=1 ... sob=6
 */
function weekdayIndexMondayFirst(d) {
  const js = d.getDay(); // 0..6, niedz=0
  return (js + 6) % 7; // pon=0, wt=1, ... niedz=6
}

/** Buduje 42 dni (6 tygodni) dla month view */
function buildMonthGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startOffset = weekdayIndexMondayFirst(firstOfMonth); // 0..6

  // start grid = poniedziałek tygodnia, w którym wypada 1 dzień miesiąca
  const gridStart = new Date(year, month, 1 - startOffset);

  const days = [];
  for (let i = 0; i < 42; i += 1) {
    days.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i));
  }
  return days;
}

/** ---------- PRZYKŁADOWE WYDARZENIA ---------- */
const SAMPLE_EVENTS = [
  { date: "2026-01-12", title: "Kawa z Alą", time: "12:30", tone: "neutral" },
  { date: "2026-01-12", title: "Marketing — status", time: "15:30", tone: "neutral" },

  { date: "2026-01-20", title: "Demo produktu", time: "11:30", tone: "blue" },
  { date: "2026-01-21", title: "Deep work", time: "10:00", tone: "blue" },
  { date: "2026-01-21", title: "1:1 z Olą", time: "11:00", tone: "pink" },
  { date: "2026-01-22", title: "Lunch z Oliwią", time: "13:00", tone: "green" },
  { date: "2026-01-23", title: "Standup piątkowy", time: "10:00", tone: "blue" },
  { date: "2026-01-24", title: "Inspekcja domu", time: "12:00", tone: "orange" },
  { date: "2026-01-25", title: "Zaręczyny Avy", time: "14:00", tone: "purple" },

  { date: "2026-01-26", title: "Lunch zespołu", time: "13:15", tone: "pink" },
  { date: "2026-01-30", title: "Kawa / catch-up", time: "10:30", tone: "neutral" },
  { date: "2026-01-31", title: "Półmaraton", time: "08:00", tone: "green" },
];

function groupEventsByDate(events) {
  const map = new Map();
  for (const ev of events) {
    const arr = map.get(ev.date) ?? [];
    arr.push(ev);
    map.set(ev.date, arr);
  }
  return map;
}

function toneClasses(tone) {
  // styl “pill” jak w kalendarzach: delikatne tło + kolor tekstu
  switch (tone) {
    case "blue":
      return "bg-blue-50 text-blue-700 border border-blue-100";
    case "green":
      return "bg-green-50 text-green-700 border border-green-100";
    case "pink":
      return "bg-pink-50 text-pink-700 border border-pink-100";
    case "orange":
      return "bg-orange-50 text-orange-700 border border-orange-100";
    case "purple":
      return "bg-purple-50 text-purple-700 border border-purple-100";
    default:
      return "bg-black/5 text-black/70 border border-black/10";
  }
}

/** ---------- UI: DROPDOWN ---------- */
function ViewDropdown({ value, onChange }) {
  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">Wybierz widok</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-md border border-black/15 bg-white px-3 text-sm text-black/80 outline-none focus:border-black/25 focus:ring-4 focus:ring-black/10"
      >
        <option value="month">Widok miesiąca</option>
        <option value="week" disabled>
          Widok tygodnia (wkrótce)
        </option>
        <option value="day" disabled>
          Widok dnia (wkrótce)
        </option>
      </select>
    </label>
  );
}

/** ---------- GŁÓWNY KOMPONENT ---------- */
export default function CalendarMonthPl() {
  const today = useMemo(() => startOfDay(new Date()), []);
  // startowo: styczeń 2026 jak na screenie (możesz zmienić na "today")
  const [viewDate, setViewDate] = useState(new Date(2026, 0, 1));
  const [viewMode, setViewMode] = useState("month");

  // w realnym projekcie eventy przyjdą z API/state
  const [events] = useState(SAMPLE_EVENTS);

  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);

  const gridDays = useMemo(() => buildMonthGrid(viewDate), [viewDate]);

  const monthLabel = `${MONTHS_PL[viewDate.getMonth()]} ${viewDate.getFullYear()}`;

  const rangeLabel = useMemo(() => {
    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0); // ostatni dzień miesiąca
    const startText = `${start.getDate()} ${MONTHS_PL[start.getMonth()]} ${start.getFullYear()}`;
    const endText = `${end.getDate()} ${MONTHS_PL[end.getMonth()]} ${end.getFullYear()}`;
    return `${startText} – ${endText}`;
  }, [viewDate]);

  function goPrev() {
    setViewDate((d) => addMonths(d, -1));
  }

  function goNext() {
    setViewDate((d) => addMonths(d, 1));
  }

  function goToday() {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-6 py-8">
        <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
          {/* TOP BAR */}
          <div className="flex flex-col gap-4 border-b border-black/10 p-4 md:flex-row md:items-center md:justify-between">
            {/* LEFT: Month title */}
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-lg border border-black/10 bg-white">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-black/50">
                  {MONTHS_PL[viewDate.getMonth()].slice(0, 3)}
                </div>
                <div className="text-lg font-bold text-black/80">
                  {String(viewDate.getDate()).padStart(2, "0")}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-black/90">
                    {monthLabel}
                  </h2>
                  <span className="rounded-md bg-black/5 px-2 py-1 text-xs font-medium text-black/60">
                    Tydzień 3
                  </span>
                </div>
                <div className="text-sm text-black/60">{rangeLabel}</div>
              </div>
            </div>

            {/* RIGHT: Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center overflow-hidden rounded-md border border-black/15 bg-white">
                <button
                  type="button"
                  onClick={goPrev}
                  className="grid h-9 w-9 place-items-center text-black/70 hover:bg-black/5"
                  aria-label="Poprzedni miesiąc"
                  title="Poprzedni miesiąc"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={goToday}
                  className="h-9 px-3 text-sm font-medium text-black/70 hover:bg-black/5"
                >
                  Dzisiaj
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="grid h-9 w-9 place-items-center text-black/70 hover:bg-black/5"
                  aria-label="Następny miesiąc"
                  title="Następny miesiąc"
                >
                  ›
                </button>
              </div>

              <ViewDropdown value={viewMode} onChange={setViewMode} />

              <button
                type="button"
                className="inline-flex h-9 items-center rounded-md bg-[#7C3AED] px-4 text-sm font-semibold text-white hover:brightness-95 active:brightness-90"
              >
                + Dodaj wydarzenie
              </button>
            </div>
          </div>

          {/* WEEKDAYS HEADER */}
          <div className="grid grid-cols-7 border-b border-black/10 bg-white">
            {WEEKDAYS_PL.map((d) => (
              <div
                key={d}
                className="px-3 py-2 text-xs font-semibold text-black/50"
              >
                {d}
              </div>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-7">
            {gridDays.map((day) => {
              const inMonth = isSameMonth(day, viewDate);
              const isToday = isSameDay(day, today);

              const key = dayKey(day);
              const dayEvents = eventsByDate.get(key) ?? [];

              return (
                <div
                  key={key}
                  className="min-h-28 border-b border-black/10 border-r border-black/10 p-2 last:border-r-0"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={[
                        "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                        inMonth ? "text-black/80" : "text-black/35",
                        isToday ? "bg-[#7C3AED] text-white" : "",
                      ].join(" ")}
                      title={key}
                    >
                      {day.getDate()}
                    </div>
                  </div>

                  {/* EVENTS */}
                  <div className="mt-2 flex flex-col gap-1">
                    {dayEvents.slice(0, 3).map((ev, idx) => (
                      <div
                        key={`${key}-${idx}`}
                        className={[
                          "truncate rounded-md px-2 py-1 text-xs font-medium",
                          toneClasses(ev.tone),
                        ].join(" ")}
                        title={`${ev.title} • ${ev.time}`}
                      >
                        <span className="font-semibold">{ev.title}</span>{" "}
                        <span className="text-[11px] opacity-70">
                          {ev.time}
                        </span>
                      </div>
                    ))}

                    {dayEvents.length > 3 ? (
                      <div className="text-xs font-medium text-black/50">
                        {dayEvents.length - 3} więcej…
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOT NOTE (opcjonalnie) */}
          <div className="px-4 py-3 text-xs text-black/50">
            Widok: <span className="font-medium">{viewMode === "month" ? "miesiąc" : viewMode}</span> • Poniedziałek jako pierwszy dzień tygodnia
          </div>
        </div>
      </div>
    </section>
  );
}
