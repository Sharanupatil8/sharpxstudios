"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { HiArrowUpRight, HiCheck } from "react-icons/hi2";

/* EmailJS: same service / template / key / recipient as before.
   The public key is meant to be public. Optionally move these to
   .env.local as NEXT_PUBLIC_EMAILJS_SERVICE_ID / _TEMPLATE_ID / _PUBLIC_KEY.
   Your template receives: from_name, to_name, number, email, to_email, message. */
const SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_x1gwtxs";
const TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_gne4q17";
const PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "cjDwO8_U8wR_xEdDe";
const TO_NAME = "Sharan";
const TO_EMAIL = "sharansp98@gmail.com";
const WA = "918050923077";

const initial = { name: "", phone: "", studio: "", note: "" };

/* ---------- validation ---------- */

// Indian mobile numbers: accepts "98765 43210", "+91 98765 43210", "098765 43210"
const cleanPhone = (v) => {
  let d = v.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
};

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[6-9]\d{9}$/.test(cleanPhone(v.phone)))
    e.phone = "Enter a 10-digit mobile number.";
  return e;
}

/* ---------- tiny helpers ---------- */

const base =
  "w-full rounded-md border bg-white px-4 py-3.5 text-base text-gray-900 placeholder:text-gray-500 transition focus:outline-none focus:ring-2 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400";
const ok =
  "border-gray-300 focus:border-indigo-600 focus:ring-indigo-600/25 dark:border-white/20 dark:focus:border-indigo-400";
const bad =
  "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400";

function Field({ id, label, optional, error, valid, children }) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200"
      >
        <span>
          {label}
          {optional && (
            <span className="ml-1 font-normal text-gray-500"> (optional)</span>
          )}
        </span>
        {valid && !error && (
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/15 text-xs text-green-600"
            aria-hidden="true"
          >
            <HiCheck />
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-err`}
          role="alert"
          className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// Sends a conversion event if Google Tag Manager / Analytics is on the page (safe if not)
function track(data) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      form_name: "interior_landing",
      ...data,
    });
    if (typeof window.gtag === "function")
      window.gtag("event", "generate_lead", {
        form_name: "interior_landing",
        ...data,
      });
  } catch {
    /* tracking must never break the form */
  }
}

/* ---------- the form ---------- */

export default function LeadForm({ onStatusChange }) {
  const formRef = useRef(null);
  const doneRef = useRef(null);
  const [v, setV] = useState(initial);
  const [touched, setTouched] = useState({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState("");
  const [sent, setSent] = useState(null);

  // lets the parent hide its own heading while the thank-you screen is showing
  useEffect(() => {
    if (onStatusChange) onStatusChange(status);
  }, [status, onStatusChange]);

  const errors = validate(v);
  const show = (k) => (touched[k] || tried) && errors[k];
  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));
  const blur = (k) => () => setTouched((p) => ({ ...p, [k]: true }));

  const waLink = (d) =>
    `https://wa.me/${WA}?text=${encodeURIComponent(
      d
        ? `Hi SharpXstudios! I'm ${d.name}${d.studio ? ` from ${d.studio}` : ""}. I just sent the growth audit form.`
        : "Hi SharpXstudios! I'd like a free growth audit for my studio.",
    )}`;

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    // honeypot: real people never fill this hidden field
    if (formRef.current?.elements?.company?.value) {
      setSent({ ...v });
      setStatus("done");
      return;
    }

    setTried(true);
    const errs = validate(v);
    const firstBad = Object.keys(errs)[0];
    if (firstBad) {
      formRef.current?.elements?.[firstBad]?.focus();
      return;
    }

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setErrorMsg(
        "You seem to be offline. Please check your connection and try again.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const phone = cleanPhone(v.phone);
    // Your EmailJS template has a single "message" field, so the extra detail
    // goes into it. The tag at the top tells you which page the lead came from.
    const message = [
      "[Lead from: Interior & Architects landing page]",
      `Studio / firm: ${v.studio.trim() || "-"}`,
      `Notes: ${v.note.trim() || "-"}`,
    ].join("\n");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: v.name.trim(),
          to_name: TO_NAME,
          number: `+91 ${phone}`,
          email: "not provided",
          to_email: TO_EMAIL,
          message,
        },
        PUBLIC_KEY,
      );
      track({ has_studio_name: !!v.studio.trim() });
      setSent({ ...v, name: v.name.trim(), studio: v.studio.trim() });
      setStatus("done");
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg(
        "Something went wrong sending that. Your details are still here, so you can try again.",
      );
      setStatus("error");
    }
  }

  function reset() {
    setV(initial);
    setTouched({});
    setTried(false);
    setErrorMsg("");
    setSent(null);
    setStatus("idle");
  }

  /* thank-you screen: the tick draws itself, then the text follows */
  useEffect(() => {
    if (status !== "done" || !doneRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".ty-badge",
          { scale: 0, rotate: -30 },
          { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" },
        )
        .fromTo(
          ".ty-tick",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          ".ty-item",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 },
          "-=0.2",
        );
    }, doneRef);
    return () => ctx.revert();
  }, [status]);

  if (status === "done" && sent)
    return (
      <div
        ref={doneRef}
        role="status"
        className="grid content-center justify-items-start gap-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 dark:border-white/15 dark:bg-white/5 md:p-8"
      >
        <span className="ty-badge flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className="ty-tick"
              d="M5 12.5l4.5 4.5L19 7.5"
              pathLength="1"
              strokeDasharray="1"
            />
          </svg>
        </span>
        <h3 className="ty-item text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          Thanks{sent.name ? `, ${sent.name.split(" ")[0]}` : ""}! Your request
          is in.
        </h3>
        <p className="ty-item text-gray-700 dark:text-gray-300">
          We&apos;ll call or message you on <b>+91 {cleanPhone(sent.phone)}</b>{" "}
          within a few hours. Want a faster reply? Message us on WhatsApp now.
        </p>
        <div className="ty-item flex flex-wrap gap-3">
          <a
            href={waLink(sent)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-green-600 px-4 py-3 text-lg font-bold text-white transition hover:bg-green-700"
          >
            Chat on WhatsApp <HiArrowUpRight />
          </a>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-gray-300 px-4 py-3 text-lg font-bold text-gray-800 transition hover:border-indigo-600 hover:text-indigo-600 dark:border-white/20 dark:text-gray-200 dark:hover:border-indigo-400"
          >
            Send another
          </button>
        </div>
      </div>
    );

  return (
    <form
      ref={formRef}
      className="grid content-start gap-5"
      onSubmit={onSubmit}
      noValidate
    >
      <Field
        id="lf-name"
        label="Your name"
        error={show("name")}
        valid={touched.name && !errors.name}
      >
        <input
          id="lf-name"
          name="name"
          value={v.name}
          onChange={set("name")}
          onBlur={blur("name")}
          placeholder="e.g. Priya Sharma"
          autoComplete="name"
          enterKeyHint="next"
          required
          aria-invalid={!!show("name")}
          aria-describedby={show("name") ? "lf-name-err" : undefined}
          className={`${base} ${show("name") ? bad : ok}`}
        />
      </Field>

      <Field
        id="lf-phone"
        label="WhatsApp number"
        error={show("phone")}
        valid={touched.phone && !errors.phone}
      >
        <div className="flex">
          <span className="flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 text-base font-semibold text-gray-700 dark:border-white/20 dark:bg-white/10 dark:text-gray-300">
            +91
          </span>
          <input
            id="lf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            value={v.phone}
            onChange={(e) =>
              setV((p) => ({
                ...p,
                phone: e.target.value.replace(/[^\d+\s-]/g, ""),
              }))
            }
            onBlur={() => {
              blur("phone")();
              // tidy a valid number into "98765 43210" (drops a pasted +91 or 0)
              const d = cleanPhone(v.phone);
              if (/^[6-9]\d{9}$/.test(d))
                setV((p) => ({
                  ...p,
                  phone: `${d.slice(0, 5)} ${d.slice(5)}`,
                }));
            }}
            placeholder="10-digit mobile number"
            autoComplete="tel"
            enterKeyHint="next"
            required
            aria-invalid={!!show("phone")}
            aria-describedby={show("phone") ? "lf-phone-err" : undefined}
            className={`${base} rounded-l-none ${show("phone") ? bad : ok}`}
          />
        </div>
      </Field>

      <Field id="lf-studio" label="Studio / firm name" optional>
        <input
          id="lf-studio"
          name="studio"
          value={v.studio}
          onChange={set("studio")}
          placeholder="e.g. Studio Arc"
          autoComplete="organization"
          enterKeyHint="next"
          className={`${base} ${ok}`}
        />
      </Field>

      <Field id="lf-note" label="Anything we should know?" optional>
        <textarea
          id="lf-note"
          name="note"
          rows={3}
          maxLength={500}
          value={v.note}
          onChange={set("note")}
          placeholder="Website or Instagram link, or what you'd like to improve"
          className={`${base} ${ok}`}
        />
      </Field>

      {/* honeypot: hidden from people, bots fill it in */}
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-indigo-700 bg-indigo-700 px-4 py-3.5 text-lg font-bold text-white transition hover:bg-indigo-800 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" />
            Sending…
          </>
        ) : (
          <>
            Get my free audit <HiArrowUpRight />
          </>
        )}
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-300/40 dark:bg-red-500/15 dark:text-red-100"
        >
          {errorMsg}{" "}
          <a
            href={waLink(null)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            Or message us on WhatsApp
          </a>
          .
        </p>
      )}

      <p className="text-sm text-gray-600 dark:text-gray-400">
        No spam. The audit is yours to keep.
      </p>
    </form>
  );
}
