import { useEffect, useState } from "react";

// Event date: 6 October 2026. Start time isn't known, so 10:00 IST is assumed; adjust if needed.
const EVENT_DATE = new Date("2026-10-06T10:00:00+05:30");

const getTimeLeft = () => {
  const diff = Math.max(0, EVENT_DATE.getTime() - Date.now());
  return {
    over: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

function Chakra({ className = "" }) {
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg viewBox="-200 -200 400 400" className={className} aria-hidden="true">
      <g className="arya-spin" fill="none" stroke="currentColor">
        <circle r="192" strokeWidth="1.5" />
        <circle r="184" strokeWidth="0.6" strokeDasharray="2 6" />
        {spokes.map((angle) => (
          <line
            key={angle}
            x1="0"
            y1="-60"
            x2="0"
            y2="-184"
            strokeWidth="0.7"
            transform={`rotate(${angle})`}
          />
        ))}
        {spokes.map((angle) => (
          <circle
            key={`d${angle}`}
            cx="0"
            cy="-168"
            r="3"
            transform={`rotate(${angle})`}
            fill="currentColor"
            stroke="none"
          />
        ))}
      </g>
      <g className="arya-spin-rev" fill="none" stroke="currentColor">
        <circle r="140" strokeWidth="1" strokeDasharray="10 6" />
        <circle r="104" strokeWidth="0.8" />
        <circle r="96" strokeWidth="0.5" strokeDasharray="1 5" />
        <circle r="58" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="min-w-[4.25rem] rounded-sm border border-amber-200/30 bg-black/35 px-2 py-3 text-center backdrop-blur-sm sm:min-w-[7rem] sm:py-5">
        <span className="arya-display block text-4xl tabular-nums text-amber-100 sm:text-6xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-xs tracking-wide text-amber-200/80 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main
      className="arya-body relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-8 text-amber-50"
      style={{
        background:
          "radial-gradient(ellipse at 50% 38%, #8a4a12 0%, #4a230a 38%, #1c0e06 72%, #0d0603 100%)",
      }}
    >
      <header className="absolute inset-x-0 top-0 z-20 border-b border-amber-200/10 bg-[#1c0e06]/70 px-4 py-3 backdrop-blur-md sm:px-8 sm:py-4">
        <nav
          className="flex w-full flex-wrap items-center justify-around gap-x-5 gap-y-3"
          aria-label="Main navigation"
        >
          {[
            ["Timeline", "#timeline"],
            ["FAQs", "#faqs"],
            ["Registration", "#registration"],
            ["Contact us", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm tracking-wide text-amber-100/85 transition-colors hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 sm:text-base"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <Chakra className="pointer-events-none absolute left-1/2 top-1/2 w-[135vmin] max-w-none -translate-x-1/2 -translate-y-1/2 text-amber-300/20" />

      <section className="relative z-10 flex w-full flex-col items-center text-center">
        <h1
          className="arya-display text-5xl leading-tight text-amber-200 sm:text-7xl md:text-8xl"
          style={{ textShadow: "0 3px 24px rgba(255,170,60,0.45)" }}
        >
          Aryavarta 5.0
        </h1>
        <blockquote className="mt-5 max-w-md">
          <p className="arya-hindi text-2xl text-amber-100 sm:text-3xl">
            यतो धर्मस्ततो जयः
          </p>
          <footer className="arya-hindi mt-1 text-base text-amber-200/80 sm:text-lg">
            जहाँ धर्म है, वहाँ विजय है।
          </footer>
        </blockquote>

        <div
          className="mt-10"
          role="timer"
          aria-live="off"
          aria-label="Time until Aryavarta 5.0"
        >
          {timeLeft.over ? (
            <p className="arya-display text-2xl text-amber-100 sm:text-4xl">
              The battle has begun
            </p>
          ) : (
            <div className="flex gap-2 sm:gap-5">
              <Unit value={timeLeft.days} label="Days" />
              <Unit value={timeLeft.hours} label="Hours" />
              <Unit value={timeLeft.minutes} label="Minutes" />
              <Unit value={timeLeft.seconds} label="Seconds" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
