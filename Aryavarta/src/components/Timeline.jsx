import { useEffect, useRef, useState } from "react";
import bow from "../assets/bow.png";
import cards from "../assets/cards.png";
import chakravyuhBg from "../assets/chakravyuh-bg.jpg";
import dharmaChakra from "../assets/dharma_chakra.png";
import dice from "../assets/dice.png";
import king from "../assets/king.png";
import kurukshetraBg from "../assets/kurukshetra-bg.jpg";
import shield from "../assets/shield.png";
import parchmentTop from "../assets/parchment-top.png";
import parchmentMid from "../assets/parchment-mid.png";
import parchmentBottom from "../assets/parchment-bottom.png";

/* ------------------------------------------------------------------
   Scroll-driven timeline. The section is tall; a sticky stage stays
   pinned while you scroll. Each round is one scroll "step", and the
   background switches to Day 2 once you pass the third round.
   All text sits on the parchment.

   NOTE: position: sticky stops working if a parent element has
   overflow: hidden / auto. Keep the parents of this section clear.
------------------------------------------------------------------- */
const ICONS = { bow, cards, dice, king, shield, wheel: dharmaChakra };

const DAYS = [
  {
    id: "day1",
    number: "01",
    date: "6 October",
    event: "Chakravyuh",
    kind: "Quiz",
    bg: chakravyuhBg,
    bgPosition: "center 22%",
    label: "The quiz arena",
    blurb:
      "Three quiz rounds where aim, chance and strategy decide who breaks the formation.",
    rounds: [
      {
        round: "Round 1",
        title: "Arjuna's Aim: The Blind Shot",
        icon: "bow",
        text: "Inspired by Draupadi's Swayamvara. Teams aim at a dartboard before each question, and a blindfolded representative decides the boon, penalty or challenge that shapes the answer.",
      },
      {
        round: "Round 2",
        title: "The Gambit",
        icon: "cards",
        text: "A mini card game where teams get as close to 21 as possible without going over. Hit or Stand: the closest team answers first, and a wrong answer passes the chance on.",
      },
      {
        round: "Round 3",
        title: "The Battlefield",
        icon: "shield",
        text: "A strategy-based quiz where teams capture and defend regions on a shared battlefield, challenging rival kingdoms through Wars.",
      },
    ],
  },
  {
    id: "day2",
    number: "02",
    date: "7 October",
    event: "Kurukshetra",
    kind: "Debate",
    bg: kurukshetraBg,
    bgPosition: "center 40%",
    label: "The debate arena",
    blurb:
      "Three debate rounds where preparation meets persuasion and every argument can shift the balance of power.",
    rounds: [
      {
        round: "Round 1",
        title: "Shakuni's Dice",
        icon: "dice",
        text: "A classic debate where preparation meets persuasion. Teams get a motion and prep time, then present, defend and respond to the opposing side.",
      },
      {
        round: "Round 2",
        title: "Dharma's Dilemma",
        icon: "wheel",
        text: "Inspired by Barbarik, who vowed to fight for the weaker side. Teams debate for and against, then switch sides midway and continue from the opposing view.",
      },
      {
        round: "Round 3",
        title: "The Final Kurukshetra",
        icon: "king",
        text: "An Oxford-style debate where kingdoms rise and claims are challenged. Teams take opposing stands and win through strategy and persuasion.",
      },
    ],
  },
];

/* One entry per scroll step: every round, tagged with its day. */
const STEPS = DAYS.flatMap((d, day) => d.rounds.map((r) => ({ ...r, day })));

function Divider() {
  return (
    <div className="av-divider" aria-hidden="true">
      <span />
      <svg viewBox="0 0 24 24" width="14" height="14">
        <path d="M12 1 L14.6 9.4 L23 12 L14.6 14.6 L12 23 L9.4 14.6 L1 12 L9.4 9.4 Z" fill="currentColor" />
      </svg>
      <span />
    </div>
  );
}

/* --------------------------- Component ---------------------------- */
export default function Timeline() {
  const rootRef = useRef(null);
  const [step, setStep] = useState(0);
  const day = STEPS[step].day;

  useEffect(() => {
    const root = rootRef.current;
    let frame = 0;

    const update = () => {
      frame = 0;
      const total = root.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -root.getBoundingClientRect().top / total)) : 0;
      root.style.setProperty("--p", p.toFixed(4)); // drives the background drift
      const next = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
      setStep((s) => (s === next ? s : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Clicking a dot scrolls to the middle of that step. */
  const goTo = (i) => {
    const root = rootRef.current;
    const total = root.offsetHeight - window.innerHeight;
    const top = root.getBoundingClientRect().top + window.scrollY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: top + ((i + 0.5) / STEPS.length) * total,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={rootRef}
      className="av-root"
      aria-label="Aryavarta 5.0 timeline"
      style={{ "--steps": STEPS.length }}
    >
      <style>{css}</style>

      <div className="av-stage">
        {DAYS.map((d, i) => (
          <div
            key={d.id}
            className={`av-bg ${i === day ? "is-on" : ""}`}
            style={{ backgroundImage: `url(${d.bg})`, backgroundPosition: d.bgPosition }}
            aria-hidden="true"
          />
        ))}
        <div className="av-veil" aria-hidden="true" />

        <div className="av-scroll">
          <div className="av-cap av-cap-top" style={{ backgroundImage: `url(${parchmentTop})` }} aria-hidden="true" />

          <div className="av-sheet" style={{ backgroundImage: `url(${parchmentMid})` }}>
            <p className="av-eyebrow">Aryavarta 5.0 · Timeline</p>

            {/* Day heading: all days share one grid cell, only the active one shows */}
            <div className="av-stack">
              {DAYS.map((d, i) => (
                <header key={d.id} className={`av-layer ${i === day ? "is-on" : ""}`} aria-hidden={i !== day}>
                  <p className="av-daytag">Day {d.number} · {d.date}</p>
                  <h2 className="av-event">{d.event}</h2>
                  <p className="av-kind">{d.kind} · {d.label}</p>
                  <p className="av-blurb">{d.blurb}</p>
                </header>
              ))}
            </div>

            <br/>

            {/* Round details: one per scroll step */}
            <div className="av-stack" aria-live="polite">
              {STEPS.map((s, i) => (
                <article key={`${s.day}-${s.title}`} className={`av-layer ${i === step ? "is-on" : ""}`} aria-hidden={i !== step}>
                  <span className="av-medal"><img src={ICONS[s.icon]} alt="" /></span>
                  <p className="av-round">{s.round}</p>
                  <h3 className="av-card-title">{s.title}</h3>
                  <p className="av-text">{s.text}</p>
                </article>
              ))}
            </div>

            <nav className="av-pips" aria-label="Timeline progress">
              {STEPS.map((s, i) => (
                <span className="av-pip-wrap" key={i}>
                  {i > 0 && s.day !== STEPS[i - 1].day && <span className="av-pip-gap" aria-hidden="true" />}
                  <button
                    type="button"
                    className={`av-pip ${i === step ? "is-on" : i < step ? "is-done" : ""}`}
                    aria-label={`Day ${DAYS[s.day].number}, ${s.round}`}
                    aria-current={i === step ? "step" : undefined}
                    onClick={() => goTo(i)}
                  />
                </span>
              ))}
            </nav>

            <p className={`av-hint ${step === STEPS.length - 1 ? "is-end" : ""}`}>
              {step === STEPS.length - 1 ? "***" : "Scroll to unfold"}
            </p>
          </div>

          <div className="av-cap av-cap-bottom" style={{ backgroundImage: `url(${parchmentBottom})`  }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

/* Dark ink on parchment; gold and rust accents from the brochure. */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

.av-root {
  --ink: #120a05;
  --paper-ink: #2b1607;
  --rust: #8a2f0f;
  --brown: #54351c;
  --gold: #f0b445;
  --pale: #ffe99a;
  --rule: rgba(84, 53, 28, 0.4);
  --p: 0;

  position: relative;
  /* each round gets 60 viewport-heights of scrolling, plus one screen */
  height: calc(100vh + var(--steps) * 60vh);
  height: calc(100svh + var(--steps) * 60svh);
  font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif;
  background: var(--ink);
}
.av-root *, .av-root *::before, .av-root *::after { box-sizing: border-box; }

/* Pinned stage */
.av-stage {
  position: sticky; top: 0;
  height: 100vh; height: 100svh;
  overflow: hidden; isolation: isolate;
  display: grid; place-items: center;
  padding: 12px 0;
}

/* Backgrounds crossfade per day and drift slowly as you scroll */
.av-bg {
  position: absolute; inset: 0; z-index: -2;
  background-size: cover; background-repeat: no-repeat;
  opacity: 0; transition: opacity 0.9s ease;
  transform: translate3d(0, calc(var(--p) * -2.5%), 0) scale(1.07);
  will-change: transform, opacity;
}
.av-bg.is-on { opacity: 1; }
.av-veil {
  position: absolute; inset: 0; z-index: -1;
  background:
    radial-gradient(75% 70% at 50% 50%, rgba(10, 6, 3, 0.2), rgba(10, 6, 3, 0.72) 100%),
    linear-gradient(180deg, rgba(10,6,3,0.35), rgba(10,6,3,0.15) 40%, rgba(10,6,3,0.6));
}

/* Parchment: top roll + stretchable sheet + bottom roll */
.av-scroll {
  width: 94dvw;
  display: flex; flex-direction: column;
  filter: drop-shadow(0 22px 30px rgba(0, 0, 0, 0.65));
}
.av-cap {
  width: 100%; flex: none;
  background-size: 100% 100%; background-repeat: no-repeat;
}
.av-cap-top { aspect-ratio: 3.8835; margin-bottom: -1px; }
.av-cap-bottom { aspect-ratio: 4.2105; margin-top: -1px;}
.av-sheet {
  background-size: 100% 100%; background-repeat: no-repeat;
  padding: 0 17%;
  display: flex; flex-direction: column; align-items: center;
  text-align: center; color: var(--paper-ink);
}

/* Stacked layers share one grid cell so the parchment never changes height */
.av-stack { display: grid; width: 100%; }
.av-layer {
  grid-area: 1 / 1;
  display: flex; flex-direction: column; align-items: center;
  opacity: 0; transform: translateY(8px); pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.av-layer.is-on {
  opacity: 1; transform: none; pointer-events: auto;
  transition: opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s;
}

/* Text on parchment */
.av-eyebrow {
  margin: 0 0 10px; color: var(--rust);
  font-size: 0.66rem; letter-spacing: 0.28em; text-transform: uppercase;
}
.av-daytag { margin: 0; color: var(--rust); font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; }
.av-event {
  margin: 4px 0 0; font-weight: 700; color: var(--paper-ink);
  font-size: clamp(1.7rem, 7vw, 2.5rem); line-height: 1.1;
}
.av-kind { margin: 6px 0 0; color: var(--brown); font-size: 0.78rem; letter-spacing: 0.08em; }
.av-blurb { margin: 8px 0 0; color: var(--brown); font-size: 0.78rem; line-height: 1.6; font-style: italic; }

.av-divider {
  display: flex; align-items: center; gap: 12px;
  width: 100%; margin: 14px 0; color: var(--rust);
}
.av-divider span { flex: 1; height: 1px; background: var(--rule); }

.av-medal {
  display: grid; place-items: center; flex: none;
  width: 76px; height: 76px; padding: 14px; border-radius: 50%;
  background: radial-gradient(circle at 35% 28%, #6b3d1a 0%, #25150a 62%, #120a05 100%);
  border: 2px solid var(--gold);
  box-shadow: inset 0 0 14px rgba(0,0,0,0.8), 0 6px 14px rgba(60, 30, 10, 0.45);
}
.av-medal img { width: 100%; height: 100%; object-fit: contain; display: block; }

.av-round { margin: 12px 0 0; color: var(--rust); font-size: 0.68rem; letter-spacing: 0.28em; text-transform: uppercase; }
.av-card-title { margin: 6px 0 0; font-weight: 700; font-size: clamp(1.05rem, 4.4vw, 1.3rem); line-height: 1.3; color: var(--paper-ink); }
.av-text { margin: 8px 0 0; font-size: 0.84rem; line-height: 1.7; color: var(--paper-ink); }

/* Progress dots */
.av-pips { display: flex; align-items: center; justify-content: center; margin-top: 12px; }
.av-pip-wrap { display: inline-flex; align-items: center; }
.av-pip-gap {
  width: 8px; height: 8px; margin: 0 8px;
  background: var(--rust); opacity: 0.55; transform: rotate(45deg);
}
.av-pip {
  width: 22px; height: 22px; padding: 0; border: 0; background: transparent; cursor: pointer;
  display: grid; place-items: center;
}
.av-pip::before {
  content: ''; width: 10px; height: 10px; border-radius: 50%;
  border: 1.5px solid var(--rust); background: transparent;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
}
.av-pip.is-done::before { background: rgba(138, 47, 15, 0.45); }
.av-pip.is-on::before { background: var(--rust); transform: scale(1.35); box-shadow: 0 0 0 3px rgba(138, 47, 15, 0.2); }
.av-pip:focus-visible { outline: 2px solid var(--rust); outline-offset: 1px; border-radius: 50%; }

.av-hint { margin: 4px 0 14px; color: var(--brown); font-size: 0.64rem; letter-spacing: 0.24em; text-transform: uppercase; }
.av-hint.is-end { color: var(--rust); font-weight: 700; }

/* Shorter screens: smaller parchment and less text */
@media (max-height: 820px) {
  .av-scroll { width: min(94vw, 540px); }
}
@media (max-height: 760px) {
  .av-blurb { display: none; }
  .av-medal { width: 64px; height: 64px; padding: 12px; }
  .av-text { font-size: 0.8rem; line-height: 1.6; }
}
@media (max-height: 680px) {
  .av-eyebrow { display: none; }
  .av-divider { margin: 10px 0; }
}

@media (prefers-reduced-motion: reduce) {
  .av-bg { transition: none; transform: scale(1.07); }
  .av-layer, .av-layer.is-on, .av-pip::before { transition: none; }
}
`;
