"use client";

// app/_components/interior-growth-partner-components/TourMusic.js
//
// Guided "60-second tour" + calm background music + WhatsApp button.
// No dependencies. Uses your site's font automatically (font-family: inherit).
//
//   <TourMusic brandColor="#YOUR_HEX" whatsappNumber="91XXXXXXXXXX" />
//
// Tour steps find sections by  data-tour="..."  attributes (see STEPS below).

import { useCallback, useEffect, useRef, useState } from "react";

const STEPS = [
  {
    title: "Your next big project is already searching for you",
    text: "Right now, homeowners in Bangalore are Googling for an interior designer. In 60 seconds, see how we make sure they find your studio, not your competitor's.",
  },
  {
    el: '[data-tour="hero"]',
    label: "What we do",
    title: "Get found. Get enquiries. Get booked.",
    text: "A portfolio website that sells your work, Google visibility that brings the right clients, and AI that replies to every enquiry in seconds, even while you're on site.",
  },
  {
    el: '[data-tour="journey"]',
    label: "The problem",
    title: "This is where good clients slip away",
    text: "Most studios lose leads between the first search and the first call: a slow reply, a weak portfolio, no follow-up. We fix every step of that journey.",
  },
  {
    el: '[data-tour="services"]',
    label: "Services",
    title: "One team instead of five vendors",
    text: "Website, local SEO, Google Business Profile, Google Ads, social media and AI lead automation. One plan, one point of contact, no juggling agencies.",
  },
  {
    el: '[data-tour="case-studies"]',
    label: "Proof",
    title: "Studios like yours are already growing",
    text: "Join 10+ interior studios we've helped. See what we built for them and what changed for their business.",
  },
  {
    el: '[data-tour="process"]',
    label: "Process",
    title: "You design. We handle the rest.",
    text: "Strategy, build, launch and ongoing growth, with clear updates at every step. No tech headaches on your plate.",
  },
  {
    el: '[data-tour="pricing"]',
    label: "Pricing",
    title: "Clear pricing, no surprises",
    text: "Transparent plans for every stage of your studio. For most designers, a single new project covers the investment many times over.",
  },
  {
    el: '[data-tour="faq"]',
    label: "FAQ",
    title: "Still wondering if it's right for you?",
    text: "Quick, honest answers to what designers ask us before getting started.",
  },
  {
    el: '[data-tour="contact"]',
    label: "Free audit",
    title: "Let's fill your calendar with site visits",
    text: "Get a free growth audit of your studio's online presence and a clear plan to win more projects. Free · No obligation · We reply within a few hours.",
    cta: { label: "Get my free audit", href: "#contact" },
  },
];

const SECONDS_PER_STEP = 8;

/* ------------------------------------------------------------------ music
 * "Evening": calm piano + violin, generated live in the browser.
 *  - D major, ~63 BPM: D → Bm → G → A (I–vi–IV–V), 4 beats per chord
 *  - piano: gentle broken-chord arpeggios over soft bass notes
 *  - violin: slow, singing melody with delayed vibrato and soft bowing,
 *    over a quiet low-string bed; enters after a piano introduction
 *  - long hall reverb and a gentle compressor
 * ~61-second form: piano alone → violin theme A → theme B → theme A (lower)
 */
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

export function buildTranquil(ctx, destination) {
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.ratio.value = 3;
  comp.attack.value = 0.02;
  comp.release.value = 0.4;
  comp.connect(destination);

  // hall reverb (generated impulse, ~5 s, darker towards the tail)
  const verb = ctx.createConvolver();
  const len = Math.floor(ctx.sampleRate * 5);
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  const fadeIn = ctx.sampleRate * 0.02;
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < len; i++) {
      const k = 0.15 + 0.8 * (i / len);
      lp += (Math.random() * 2 - 1 - lp) * (1 - k);
      d[i] = lp * Math.pow(1 - i / len, 2.5) * (i < fadeIn ? i / fadeIn : 1);
    }
  }
  verb.buffer = ir;
  const verbOut = ctx.createGain();
  verbOut.gain.value = 1.4;
  verb.connect(verbOut);
  verbOut.connect(comp);

  const bus = (dry, wet) => {
    const g = ctx.createGain();
    const d = ctx.createGain();
    const w = ctx.createGain();
    d.gain.value = dry;
    w.gain.value = wet;
    g.connect(d);
    g.connect(w);
    d.connect(comp);
    w.connect(verb);
    return g;
  };
  const pianoBus = bus(0.9, 0.45);
  const violinBus = bus(0.7, 0.75);

  /* ---- piano: slightly inharmonic partials, each with its own decay ---- */
  const AMPS = [1, 0.42, 0.22, 0.12, 0.07, 0.035];
  const piano = (m, t, vel) => {
    const f = mtof(m);
    const dur = Math.min(5.5, Math.max(1.8, 5 - (m - 48) * 0.07));
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 900 + vel * 2600;
    tone.connect(pianoBus);
    AMPS.forEach((amp, i) => {
      const n = i + 1;
      const fn = f * n * Math.sqrt(1 + 0.0003 * n * n);
      if (fn > 9000) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = fn;
      const peak = amp * vel * 0.11;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(peak, t + 0.006);
      g.gain.exponentialRampToValueAtTime(peak * 0.35, t + 0.25 / n + 0.05);
      g.gain.exponentialRampToValueAtTime(0.00001, t + dur / (1 + i * 0.5));
      o.connect(g);
      g.connect(tone);
      o.start(t);
      o.stop(t + dur + 0.05);
    });
  };

  /* ---- violin: bowed saw pair, body resonances, delayed vibrato ---- */
  const violin = (m, t, d, vel) => {
    const f = mtof(m);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = Math.min(3200, f * 6);
    lp.Q.value = 0.5;
    const body1 = ctx.createBiquadFilter();
    body1.type = "peaking";
    body1.frequency.value = 290;
    body1.gain.value = 5;
    body1.Q.value = 1.2;
    const body2 = ctx.createBiquadFilter();
    body2.type = "peaking";
    body2.frequency.value = 2400;
    body2.gain.value = 3;
    body2.Q.value = 1.5;
    const hs = ctx.createBiquadFilter();
    hs.type = "highshelf";
    hs.frequency.value = 3500;
    hs.gain.value = -10;
    const env = ctx.createGain();
    lp.connect(body1);
    body1.connect(body2);
    body2.connect(hs);
    hs.connect(env);
    env.connect(violinBus);

    const vib = ctx.createOscillator();
    const vibAmt = ctx.createGain();
    vib.frequency.value = 5.2 + Math.random() * 0.4;
    vibAmt.gain.setValueAtTime(0, t);
    vibAmt.gain.linearRampToValueAtTime(f * 0.0045, t + Math.min(0.9, d * 0.5));
    vib.connect(vibAmt);

    [-5, 5].forEach((cents) => {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f;
      o.detune.setValueAtTime(cents - 18, t); // tiny slide into the note
      o.detune.linearRampToValueAtTime(cents, t + 0.12);
      vibAmt.connect(o.frequency);
      o.connect(lp);
      o.start(t);
      o.stop(t + d + 1.3);
    });
    vib.start(t);
    vib.stop(t + d + 1.3);

    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(vel * 0.8, t + 0.45); // soft bow attack
    env.gain.linearRampToValueAtTime(vel, t + d * 0.6); // gentle swell
    env.gain.linearRampToValueAtTime(vel * 0.85, t + d);
    env.gain.linearRampToValueAtTime(0, t + d + 1.2); // long release, notes overlap
  };

  /* ---- composition ---- */
  const BEAT = 60 / 63;
  const CHORDS = [
    { root: 50, minor: false }, // D
    { root: 47, minor: true }, // Bm
    { root: 43, minor: false }, // G
    { root: 45, minor: false }, // A
  ];
  // violin phrases: [midi note, beats] per chord, 4 beats each
  const THEME_A = [
    [
      [78, 3],
      [76, 1],
    ],
    [
      [74, 2],
      [78, 2],
    ],
    [
      [79, 3],
      [78, 1],
    ],
    [[76, 4]],
  ];
  const THEME_B = [
    [
      [81, 2],
      [78, 2],
    ],
    [
      [83, 2],
      [81, 1],
      [78, 1],
    ],
    [
      [79, 2],
      [74, 2],
    ],
    [
      [73, 2],
      [76, 2],
    ],
  ];
  const THEME_A_LOW = THEME_A.map((ph) => ph.map(([mm, b]) => [mm - 12, b]));
  const SECTIONS = [null, THEME_A, THEME_B, THEME_A_LOW];

  let next = 0;
  let c = 0;
  const h = () => (Math.random() - 0.5) * 0.02; // human timing

  return {
    reset(t) {
      if (next < t) next = t;
    },
    schedule(until) {
      while (next < until) {
        const chord = CHORDS[c % 4];
        const section = SECTIONS[Math.floor(c / 4) % SECTIONS.length];
        const third = chord.minor ? 15 : 16;
        const pattern = [0, 7, 12, third, 19, third, 12, 7];

        // piano: soft bass + broken chord in eighth notes
        piano(chord.root - 12, next + h(), 0.55);
        pattern.forEach((iv, k) => {
          const vel =
            (k === 0 ? 0.62 : k === 4 ? 0.55 : 0.45) + Math.random() * 0.06;
          piano(chord.root + iv, next + k * (BEAT / 2) + h(), vel);
        });
        // a few high piano notes during the intro
        if (!section && Math.random() < 0.6) {
          const hi = chord.root + 24 + (Math.random() < 0.5 ? 7 : 12);
          piano(hi, next + BEAT * (2 + Math.floor(Math.random() * 2)), 0.3);
        }

        if (section) {
          let t = next;
          section[c % 4].forEach(([mm, beats]) => {
            violin(mm, t + 0.03, beats * BEAT, 0.055);
            t += beats * BEAT;
          });
          // quiet low-string bed (root + fifth)
          violin(chord.root, next, 4 * BEAT, 0.018);
          violin(chord.root + 7, next, 4 * BEAT, 0.014);
        }

        next += 4 * BEAT;
        c++;
      }
    },
  };
}

function createSynth() {
  const AC = window.AudioContext || window.webkitAudioContext;
  const ctx = new AC();
  const out = ctx.createGain();
  out.gain.value = 0;
  out.connect(ctx.destination);
  const music = buildTranquil(ctx, out);
  let timer = null;
  let wanted = false;
  const tick = () => music.schedule(ctx.currentTime + 4);

  return {
    // resolves true once sound is actually coming out
    play(vol) {
      wanted = true;
      music.reset(ctx.currentTime + 0.1);
      tick();
      clearInterval(timer);
      timer = setInterval(tick, 1000);
      out.gain.cancelScheduledValues(ctx.currentTime);
      out.gain.setTargetAtTime(vol, ctx.currentTime, 1.2);
      if (ctx.state === "running") return Promise.resolve(true);
      return ctx
        .resume()
        .then(() => ctx.state === "running")
        .catch(() => false);
    },
    pause() {
      wanted = false;
      out.gain.cancelScheduledValues(ctx.currentTime);
      out.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
      clearInterval(timer);
      setTimeout(() => {
        if (!wanted) ctx.suspend().catch(() => {});
      }, 2500);
    },
  };
}

function createFilePlayer(src) {
  const a = new Audio(src);
  a.loop = true;
  a.preload = "auto";
  a.volume = 0;
  let raf;
  let wanted = false;
  const fade = (to, done) => {
    cancelAnimationFrame(raf);
    const from = a.volume;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / 1500, 1);
      a.volume = from + (to - from) * p;
      if (p < 1) raf = requestAnimationFrame(step);
      else if (done) done();
    };
    raf = requestAnimationFrame(step);
  };
  return {
    play(vol) {
      wanted = true;
      fade(vol);
      const pr = a.play();
      return (pr || Promise.resolve()).then(() => !a.paused).catch(() => false);
    },
    pause() {
      wanted = false;
      fade(0, () => {
        if (!wanted) a.pause();
      });
    },
  };
}

const safeGet = (k) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const safeSet = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};

const pad2 = (n) => String(n).padStart(2, "0");

/* -------------------------------------------------------------- component */

export default function Tourmusic({
  brandColor = "#4338ca", // indigo-700 (matches InteriorHero CTA)
  musicSrc,
  volume = 0.6, // 0–1; still soft background level
  autoPlay = true,
  whatsappNumber, // e.g. "919876543210" (country code, no + or spaces)
  whatsappMessage = "Hi SharpXstudios, I'd like to grow my interior design business.",
  steps = STEPS,
}) {
  /* ---- music ---- */
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);
  const playingRef = useRef(false);
  const musicBtnRef = useRef(null);

  const [audible, setAudible] = useState(false); // is sound actually coming out?

  const startMusic = useCallback(() => {
    if (!playerRef.current)
      playerRef.current = musicSrc ? createFilePlayer(musicSrc) : createSynth();
    playingRef.current = true;
    setPlaying(true);
    safeSet("sx-music", "on");
    return playerRef.current.play(volume).then((ok) => {
      if (ok && playingRef.current) setAudible(true);
      return ok;
    });
  }, [musicSrc, volume]);

  const stopMusic = useCallback(() => {
    playerRef.current?.pause();
    playingRef.current = false;
    setPlaying(false);
    setAudible(false);
    safeSet("sx-music", "off");
  }, []);

  // Music is ON by default (unless the visitor turned it off before).
  // Browsers only allow sound after the visitor clicks, taps or presses a key,
  // so we try right away (works if the browser allows it), then start on the
  // very first interaction. Until then a small hint is shown.
  useEffect(() => {
    if (!autoPlay || safeGet("sx-music") === "off") return;
    let done = false;
    const events = [
      "pointerdown",
      "pointerup",
      "mousedown",
      "touchend",
      "keydown",
      "click",
    ];
    const cleanup = () => {
      if (done) return;
      done = true;
      events.forEach((ev) => window.removeEventListener(ev, unlock, true));
    };
    const tryPlay = () =>
      startMusic().then((ok) => {
        if (ok) cleanup();
      });
    const unlock = (e) => {
      if (musicBtnRef.current?.contains(e.target)) return cleanup(); // they used the toggle itself
      if (!playingRef.current) return cleanup();
      tryPlay();
    };
    events.forEach((ev) => window.addEventListener(ev, unlock, true));
    tryPlay();
    return cleanup;
  }, [autoPlay, startMusic]);

  // Pause when the tab is hidden
  useEffect(() => {
    const onVis = () => {
      if (!playerRef.current || !playingRef.current) return;
      if (document.hidden) playerRef.current.pause();
      else playerRef.current.play(volume);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [volume]);

  useEffect(() => () => playerRef.current?.pause(), []);

  /* ---- tour ---- */
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const spotRef = useRef(null);
  const tagRef = useRef(null);
  const tipRef = useRef(null);
  const barRef = useRef(null);
  const elapsedRef = useRef(0);
  const startRef = useRef(0);
  const pausedRef = useRef(false);

  const step = steps[index];
  const last = index === steps.length - 1;

  const stopTour = useCallback(() => {
    setActive(false);
    setPaused(false);
    pausedRef.current = false;
  }, []);

  const go = useCallback(
    (n) => {
      if (n < 0) return;
      if (n >= steps.length) return stopTour();
      setIndex(n);
    },
    [steps.length, stopTour],
  );

  const togglePause = useCallback(() => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    startRef.current = performance.now() - elapsedRef.current;
  }, []);

  // On step change: reset timer + scroll target into view
  useEffect(() => {
    if (!active) return;
    elapsedRef.current = 0;
    startRef.current = performance.now();
    const target = step?.el ? document.querySelector(step.el) : null;
    if (target) {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const tall =
        target.getBoundingClientRect().height > window.innerHeight * 0.7;
      target.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: tall ? "start" : "center",
      });
    }
    tipRef.current
      ?.querySelector(".sx-primary")
      ?.focus({ preventScroll: true });
  }, [active, index, step]);

  // Animation loop: position spotlight + card, drive auto-advance
  useEffect(() => {
    if (!active) return;
    let raf;
    const loop = () => {
      const spot = spotRef.current;
      const tip = tipRef.current;
      if (spot && tip) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const pad = 8;
        const target = step?.el ? document.querySelector(step.el) : null;
        let r;
        if (target) {
          const b = target.getBoundingClientRect();
          const top = Math.max(b.top - pad, 8);
          const bottom = Math.min(b.bottom + pad, vh - 8);
          r = {
            left: Math.max(b.left - pad, 4),
            top,
            width: Math.min(b.width + pad * 2, vw - 8),
            height: Math.max(bottom - top, 0),
          };
        } else {
          r = { left: vw / 2, top: vh / 2, width: 0, height: 0 };
        }
        Object.assign(spot.style, {
          left: `${r.left}px`,
          top: `${r.top}px`,
          width: `${r.width}px`,
          height: `${r.height}px`,
        });
        if (tagRef.current)
          tagRef.current.classList.toggle("sx-tag-in", r.top < 40);

        const tw = tip.offsetWidth;
        const th = tip.offsetHeight;
        const gap = 14;
        let tx, ty;
        if (!target) {
          tx = (vw - tw) / 2;
          ty = (vh - th) / 2;
        } else {
          tx = Math.min(Math.max(r.left, 16), vw - tw - 16);
          if (r.top + r.height + gap + th < vh - 8) ty = r.top + r.height + gap;
          else if (r.top - gap - th > 8) ty = r.top - gap - th;
          else ty = vh - th - 16;
        }
        tip.style.left = `${tx}px`;
        tip.style.top = `${ty}px`;
      }

      if (!pausedRef.current)
        elapsedRef.current = performance.now() - startRef.current;
      const pct = Math.min(elapsedRef.current / (SECONDS_PER_STEP * 1000), 1);
      if (barRef.current) barRef.current.style.width = `${pct * 100}%`;
      if (pct >= 1 && !last) {
        go(index + 1);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, index, step, last, go]);

  // Keyboard: ← → navigate, Space pause, Esc close
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") stopTour();
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
      else if (e.key === " ") {
        e.preventDefault();
        togglePause();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, index, go, stopTour, togglePause]);

  const startTour = () => {
    setIndex(0);
    setPaused(false);
    pausedRef.current = false;
    setActive(true);
  };

  return (
    <div className="sx-root" style={{ "--sx-accent": brandColor }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="sx-dock">
        {whatsappNumber && (
          <a
            className="sx-wa"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
          >
            <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
              <path
                fill="currentColor"
                d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.5.7 4.8 1.9 6.8L3 29l6.8-2.1c1.9 1 4 1.6 6.2 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23.1c-2 0-3.9-.6-5.5-1.6l-.4-.2-4 1.2 1.3-3.9-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.5 9.8 10.2 5.2 16 5.2s10.5 4.6 10.5 10.4S21.8 26.1 16 26.1zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"
              />
            </svg>
          </a>
        )}
        {playing && !audible && (
          <div className="sx-hint" role="status">
            <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
              <path
                d="M6 12.5V3.2l7-1.4v9.2"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinejoin="round"
              />
              <circle cx="4.5" cy="12.5" r="1.8" fill="currentColor" />
              <circle cx="11.5" cy="11" r="1.8" fill="currentColor" />
            </svg>
            Tap anywhere to play music
          </div>
        )}
        <div className="sx-row-btns">
          <button
            className="sx-btn"
            onClick={startTour}
            aria-label="Start 60-second guided tour"
          >
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
              <path d="M2 1l9 5-9 5z" fill="currentColor" />
            </svg>
            Tour
          </button>
          <button
            ref={musicBtnRef}
            className={`sx-btn sx-btn-primary ${playing ? "sx-playing" : ""}`}
            onClick={() => (playing ? stopMusic() : startMusic())}
            aria-pressed={playing}
            aria-label={playing ? "Turn music off" : "Turn music on"}
            title={playing ? "Turn music off" : "Turn music on"}
          >
            <span className="sx-eq" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            {playing ? "Music off" : "Music on"}
          </button>
        </div>
      </div>

      {active && step && (
        <>
          <div className="sx-block" onClick={togglePause} />
          <div className="sx-spot" ref={spotRef}>
            {step.el && (
              <span className="sx-tag" ref={tagRef}>
                {pad2(index + 1)} — {step.label || step.title}
              </span>
            )}
            <i className="sx-c sx-c1" />
            <i className="sx-c sx-c2" />
            <i className="sx-c sx-c3" />
            <i className="sx-c sx-c4" />
          </div>
          <div
            className="sx-tip"
            ref={tipRef}
            role="dialog"
            aria-live="polite"
            aria-label="Guided tour"
          >
            <div className="sx-ruler" aria-hidden="true" />
            <div className="sx-body">
              <button
                className="sx-close"
                onClick={stopTour}
                aria-label="Close tour"
              >
                <svg
                  viewBox="0 0 12 12"
                  width="12"
                  height="12"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2l8 8M10 2l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="sx-kicker">
                <span className="sx-kline" aria-hidden="true" />
                Step {pad2(index + 1)} / {pad2(steps.length)}
              </div>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
              <div className="sx-bar">
                <span ref={barRef} />
              </div>
              <div className="sx-row">
                {index > 0 && (
                  <button className="sx-ghost" onClick={() => go(index - 1)}>
                    Back
                  </button>
                )}
                {!last && (
                  <button className="sx-ghost" onClick={togglePause}>
                    {paused ? "Play" : "Pause"}
                  </button>
                )}
                <button
                  className="sx-primary"
                  onClick={() => {
                    if (last && step.cta) {
                      stopTour();
                      const dest = document.querySelector(step.cta.href);
                      if (dest)
                        dest.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      else window.location.href = step.cta.href;
                      return;
                    }
                    go(index + 1);
                  }}
                >
                  {last ? (step.cta ? step.cta.label : "Done") : "Next"}
                  {(!last || step.cta) && (
                    <svg
                      viewBox="0 0 12 12"
                      width="10"
                      height="10"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 6h6M6.5 3L9 6 6.5 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ styles
 * Same design language as InteriorHero: indigo-600/700, ruler ticks
 * (minor every 8px, major every 80px), faded notebook rules, margin line,
 * tracked uppercase kicker, rounded-md bold buttons, white rounded-xl cards.
 * Font is inherited from your site.
 */
const CSS = `
.sx-root{--sx-700:var(--sx-accent);--sx-600:color-mix(in srgb,var(--sx-accent) 82%,#fff);--sx-800:color-mix(in srgb,var(--sx-accent) 82%,#000);
  --sx-rule:rgba(79,70,229,.12);--sx-tick-major:rgba(79,70,229,.5);--sx-tick-minor:rgba(79,70,229,.28);
  --sx-ink:#111827;--sx-body:#374151;--sx-muted:#6b7280;--sx-line:#e5e7eb}
.sx-root,.sx-root *{font-family:inherit;box-sizing:border-box}

/* ---- floating dock ---- */
.sx-dock{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:9998;display:flex;flex-direction:column;align-items:flex-end;gap:12px}
.sx-row-btns{display:flex;gap:8px}
.sx-btn{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700;line-height:1;padding:12px 16px;border-radius:6px;
  border:1px solid var(--sx-line);background:#fff;color:var(--sx-ink);cursor:pointer;
  box-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);transition:transform .15s,border-color .15s,color .15s}
.sx-btn svg{color:var(--sx-600)}
.sx-btn:hover{transform:translateY(-1px);border-color:var(--sx-600);color:var(--sx-700)}
.sx-btn-primary,.sx-btn-primary:hover{background:var(--sx-700);border-color:var(--sx-700);color:#fff;
  box-shadow:0 20px 25px -5px rgba(99,102,241,.3),0 8px 10px -6px rgba(99,102,241,.3)}
.sx-btn-primary:hover{background:var(--sx-800);border-color:var(--sx-800)}
.sx-btn-primary .sx-eq{color:#fff}
.sx-hint{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:.02em;color:var(--sx-700);
  background:#fff;border:1px solid var(--sx-line);border-radius:6px;padding:8px 12px;
  box-shadow:0 10px 15px -3px rgba(99,102,241,.18);animation:sx-hint 2.4s ease-in-out infinite}
@keyframes sx-hint{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.sx-btn:focus-visible,.sx-tip button:focus-visible,.sx-wa:focus-visible{outline:2px solid var(--sx-600);outline-offset:2px}
.sx-eq{display:inline-flex;align-items:flex-end;gap:2px;height:12px;color:var(--sx-600)}
.sx-eq i{width:2px;height:3px;background:currentColor;border-radius:1px;opacity:.45}
.sx-playing .sx-eq i{opacity:1;animation:sx-eq 1.6s ease-in-out infinite}
.sx-playing .sx-eq i:nth-child(2){animation-delay:.4s}
.sx-playing .sx-eq i:nth-child(3){animation-delay:.8s}
.sx-playing .sx-eq i:nth-child(4){animation-delay:1.2s}
@keyframes sx-eq{0%,100%{height:3px}50%{height:12px}}
.sx-wa{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:#25d366;color:#fff;
  box-shadow:0 10px 25px -5px rgba(37,211,102,.45);transition:transform .15s}
.sx-wa:hover{transform:scale(1.06)}

/* ---- spotlight ---- */
.sx-block{position:fixed;inset:0;z-index:9999}
.sx-spot{position:fixed;z-index:9999;pointer-events:none;border-radius:12px;
  box-shadow:0 0 0 1.5px var(--sx-600),0 0 0 9999px rgba(17,24,39,.6);transition:all .5s cubic-bezier(.4,0,.2,1)}
.sx-c{position:absolute;width:14px;height:14px;border:0 solid var(--sx-600)}
.sx-c1{top:-6px;left:-6px;border-top-width:3px;border-left-width:3px;border-top-left-radius:4px}
.sx-c2{top:-6px;right:-6px;border-top-width:3px;border-right-width:3px;border-top-right-radius:4px}
.sx-c3{bottom:-6px;left:-6px;border-bottom-width:3px;border-left-width:3px;border-bottom-left-radius:4px}
.sx-c4{bottom:-6px;right:-6px;border-bottom-width:3px;border-right-width:3px;border-bottom-right-radius:4px}
.sx-tag{position:absolute;left:0;top:-32px;white-space:nowrap;font-size:11px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;
  background:var(--sx-700);color:#fff;padding:7px 10px;border-radius:6px}
.sx-tag.sx-tag-in{top:10px;left:10px}

/* ---- tour card: white page with ruler + notebook rules ---- */
.sx-tip{position:fixed;z-index:10000;width:min(380px,calc(100vw - 32px));background:#fff;color:var(--sx-ink);
  border:1px solid var(--sx-line);border-radius:12px;overflow:hidden;isolation:isolate;
  box-shadow:0 25px 50px -12px rgba(99,102,241,.3);
  transition:top .5s cubic-bezier(.4,0,.2,1),left .5s cubic-bezier(.4,0,.2,1)}
.sx-ruler{position:absolute;inset:0 0 auto 0;height:16px;z-index:-1;
  background-image:
    repeating-linear-gradient(to right,var(--sx-tick-major) 0,var(--sx-tick-major) 1px,transparent 1px,transparent 80px),
    repeating-linear-gradient(to right,var(--sx-tick-minor) 0,var(--sx-tick-minor) 1px,transparent 1px,transparent 8px);
  background-size:100% 16px,100% 8px;background-repeat:no-repeat;
  -webkit-mask-image:linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%);
          mask-image:linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)}
.sx-body{position:relative;padding:30px 22px 20px 30px}
.sx-body::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 23px,var(--sx-rule) 23px,var(--sx-rule) 24px);
  -webkit-mask-image:linear-gradient(to bottom,#000 0%,#000 55%,transparent 100%);
          mask-image:linear-gradient(to bottom,#000 0%,#000 55%,transparent 100%)}
.sx-body::after{content:"";position:absolute;top:0;bottom:0;left:16px;width:1px;z-index:-1;
  background:linear-gradient(to bottom,rgba(99,102,241,.3),rgba(99,102,241,.15),transparent)}
.sx-kicker{display:flex;align-items:center;gap:10px;font-size:11px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;
  color:var(--sx-600);margin-bottom:10px;font-variant-numeric:tabular-nums}
.sx-kline{display:inline-block;width:28px;height:1px;background:var(--sx-600);flex-shrink:0}
.sx-tip h4{margin:0 0 8px;font-size:22px;line-height:1.2;font-weight:900;letter-spacing:-.03em;padding-right:24px;color:var(--sx-ink)}
.sx-tip p{margin:0 0 18px;font-size:15px;line-height:1.6;color:var(--sx-body)}
.sx-bar{height:2px;background:var(--sx-line);overflow:hidden;margin-bottom:16px;border-radius:2px}
.sx-bar span{display:block;height:100%;width:0;background:linear-gradient(to right,var(--sx-600),var(--sx-700))}
.sx-row{display:flex;align-items:center;justify-content:flex-end;gap:8px}
.sx-tip button{font-size:14px;font-weight:700;line-height:1;cursor:pointer;border-radius:6px;padding:11px 16px;transition:background .15s,border-color .15s}
.sx-ghost{background:#fff;border:1px solid var(--sx-line);color:var(--sx-ink)}
.sx-ghost:hover{border-color:var(--sx-600);color:var(--sx-700)}
.sx-primary{display:inline-flex;align-items:center;gap:6px;background:var(--sx-700);border:1px solid var(--sx-700);color:#fff}
.sx-primary:hover{background:var(--sx-800);border-color:var(--sx-800)}
.sx-tip .sx-close{position:absolute;top:22px;right:14px;padding:6px;border:0;background:transparent;color:var(--sx-muted);border-radius:6px;line-height:0}
.sx-tip .sx-close:hover{color:var(--sx-ink);background:#f3f4f6}
@media (prefers-reduced-motion:reduce){.sx-spot,.sx-tip{transition:none}.sx-hint{animation:none}.sx-playing .sx-eq i{animation:none;height:8px}}
`;
