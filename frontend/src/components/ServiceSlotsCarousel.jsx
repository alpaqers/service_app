import React, { useMemo, useState } from "react";

const WEEKDAYS_PL = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek"];
const WEEKDAYS_SHORT = ["pon.", "wt.", "śr.", "czw.", "pt."];

const SEGMENTS = [
  { key: "06-09", label: "6–9" },
  { key: "09-12", label: "9–12" },
  { key: "12-15", label: "12–15" },
  { key: "15-18", label: "15–18" },
  { key: "18-21", label: "18–21" },
];

function pad2(n) {
  return String(n).padStart(2, "0");
}
function ymd(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function plDateLabel(d) {
  // np. 21.01.2026
  return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
}
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addDays(d, days) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}
function getMonday(d) {
  // poniedziałek jako początek tygodnia
  const js = d.getDay(); // niedz=0
  const mondayIndex = (js + 6) % 7; // pon=0 ... niedz=6
  return addDays(d, -mondayIndex);
}

/**
 * MOCK "zajętości" — docelowo to przyjdzie z fetch.
 * Struktura:
 * busyMap[YYYY-MM-DD] = Set(["06-09", "12-15", ...])
 */
function buildMockBusyMap(days) {
  const map = new Map();

  // wrzućmy przykładowe zajętości, żeby było co zobaczyć:
  for (const d of days) {
    const key = ymd(d);
    map.set(key, new Set());
  }

  // parę ręcznych zajęć
  // tydzień 1:
  map.get(ymd(days[0]))?.add("09-12"); // pon
  map.get(ymd(days[1]))?.add("12-15"); // wt
  map.get(ymd(days[1]))?.add("15-18");
  map.get(ymd(days[2]))?.add("06-09"); // śr
  map.get(ymd(days[3]))?.add("18-21"); // czw
  map.get(ymd(days[4]))?.add("06-09"); // pt
  map.get(ymd(days[4]))?.add("09-12");
  map.get(ymd(days[4]))?.add("12-15");

  // tydzień 2:
  map.get(ymd(days[5]))?.add("15-18"); // pon
  map.get(ymd(days[6]))?.add("06-09"); // wt
  map.get(ymd(days[7]))?.add("09-12"); // śr
  map.get(ymd(days[8]))?.add("12-15"); // czw
  map.get(ymd(days[9]))?.add("18-21"); // pt

  return map;
}

function findNearestFree(days, busyMap) {
  for (const d of days) {
    const key = ymd(d);
    const busy = busyMap.get(key) ?? new Set();
    for (const seg of SEGMENTS) {
      if (!busy.has(seg.key)) {
        return { date: d, segment: seg };
      }
    }
  }
  return null;
}

function SegmentButton({ disabled, children, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex h-10 w-full items-center justify-center rounded-md text-sm font-semibold transition-colors",
        disabled
          ? "cursor-not-allowed bg-black/80 text-white/70"
          : "bg-[#3F63FF]/10 text-[#3F63FF] hover:bg-[#3F63FF]/15 active:bg-[#3F63FF]/20",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function DayCard({ date, weekdayIndex, busySet, onPick }) {
  const dayName = WEEKDAYS_SHORT[weekdayIndex];
  const fullName = WEEKDAYS_PL[weekdayIndex];

  return (
    <div className="flex flex-1 flex-col rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <div className="text-sm font-semibold text-black/80">
          {dayName} <span className="text-black/50">•</span>{" "}
          <span className="text-black/70">{plDateLabel(date)}</span>
        </div>
        <div className="text-xs text-black/50">{fullName}</div>
      </div>

      <div className="flex flex-col gap-2">
        {SEGMENTS.map((seg) => {
          const isBusy = busySet.has(seg.key);
          return (
            <SegmentButton
              key={seg.key}
              disabled={isBusy}
              onClick={() => onPick({ date, segment: seg })}
            >
              {seg.label}
            </SegmentButton>
          );
        })}
      </div>
    </div>
  );
}

export default function ServiceSlotsCarousel() {
  // Start: bieżący tydzień (pon-pt) + następny tydzień (pon-pt)
  const today = useMemo(() => startOfDay(new Date()), []);
  const monday = useMemo(() => getMonday(today), [today]);

  // Budujemy listę 10 dni: pon-pt (tydzień 1) + pon-pt (tydzień 2)
  const allDays = useMemo(() => {
    const days = [];
    // tydzień 1: pon(0) ... pt(4)
    for (let i = 0; i < 5; i += 1) days.push(addDays(monday, i));
    // tydzień 2: pon(7) ... pt(11)
    for (let i = 7; i < 12; i += 1) days.push(addDays(monday, i));
    return days;
  }, [monday]);

  // w realu: busyMap będzie pochodzić z fetcha
  const busyMap = useMemo(() => buildMockBusyMap(allDays), [allDays]);

  // "karuzela": 0 = tydzień 1, 1 = tydzień 2
  const [weekIndex, setWeekIndex] = useState(0);

  const visibleDays = useMemo(() => {
    const start = weekIndex * 5;
    return allDays.slice(start, start + 5);
  }, [allDays, weekIndex]);

  const nearestFree = useMemo(() => findNearestFree(allDays, busyMap), [allDays, busyMap]);

  function prevWeek() {
    setWeekIndex((w) => Math.max(0, w - 1));
  }
  function nextWeek() {
    setWeekIndex((w) => Math.min(1, w + 1));
  }

  function handlePick({ date, segment }) {
    // docelowo: otwierasz modal / zapisujesz wybór / wysyłasz do backendu
    console.log("Wybrano:", ymd(date), segment.key);
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-6 py-10">
        {/* TOP TITLE */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-black/90">
              Najbliższy wolny termin:
              <span className="ml-2 text-[#3F63FF]">
                {nearestFree
                  ? `${plDateLabel(nearestFree.date)} • ${nearestFree.segment.label}`
                  : "brak w ciągu 2 tygodni"}
              </span>
            </h2>
            <p className="mt-2 text-sm text-black/60">
              Poniżej widzisz dostępność na dwa tygodnie do przodu (pon–pt).
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevWeek}
              disabled={weekIndex === 0}
              className={[
                "inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-semibold transition-colors",
                weekIndex === 0
                  ? "cursor-not-allowed border-black/10 text-black/30"
                  : "border-black/15 text-black/70 hover:bg-black/5",
              ].join(" ")}
            >
              ‹ Poprzedni tydzień
            </button>

            <button
              type="button"
              onClick={nextWeek}
              disabled={weekIndex === 1}
              className={[
                "inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-semibold transition-colors",
                weekIndex === 1
                  ? "cursor-not-allowed border-black/10 text-black/30"
                  : "border-black/15 text-black/70 hover:bg-black/5",
              ].join(" ")}
            >
              Następny tydzień ›
            </button>
          </div>
        </div>

        {/* CAROUSEL VIEWPORT */}
        <div className="mt-8">
          <div className="flex flex-col gap-4 md:flex-row">
            {visibleDays.map((d, idx) => {
              const key = ymd(d);
              const busySet = busyMap.get(key) ?? new Set();
              return (
                <DayCard
                  key={key}
                  date={d}
                  weekdayIndex={idx} // pon..pt w ramach widoku tygodnia
                  busySet={busySet}
                  onPick={handlePick}
                />
              );
            })}
          </div>

          {/* WEEK LABEL */}
          <div className="mt-4 text-sm text-black/50">
            Wyświetlany tydzień:{" "}
            <span className="font-semibold text-black/70">
              {weekIndex === 0 ? "bieżący" : "następny"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
