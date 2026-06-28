"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't reach the server. Check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="max-w-xl border border-blueprint/40 bg-paper-dim p-6">
        <p className="font-mono text-xs tracking-[0.1em] text-blueprint">
          MESSAGE SENT
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          Thanks for reaching out — I'll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 font-mono text-xs tracking-[0.1em] text-ink-soft underline-offset-4 hover:text-blueprint hover:underline"
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="NAME"
          id="name"
          value={name}
          onChange={setName}
          type="text"
          autoComplete="name"
          required
        />
        <Field
          label="EMAIL"
          id="email"
          value={email}
          onChange={setEmail}
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="block font-mono text-[11px] tracking-[0.1em] text-ink-soft"
        >
          MESSAGE
        </label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          maxLength={5000}
          className="mt-2 w-full border border-ink/25 bg-transparent px-3 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-blueprint"
          placeholder="What are you working on?"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 font-mono text-[12px] text-calib">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 border border-ink px-5 py-2.5 font-mono text-xs tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "SENDING…" : "SEND MESSAGE →"}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type,
  autoComplete,
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-mono text-[11px] tracking-[0.1em] text-ink-soft"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-ink/25 bg-transparent px-3 py-2.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-blueprint"
      />
    </div>
  );
}
