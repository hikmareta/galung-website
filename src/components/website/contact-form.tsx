"use client";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { contactCopy } from "@/lib/i18n/contact-copy";
import { contactNotices } from "@/services/contact/policy";
async function requestToken(
  locale: Locale,
  signal?: AbortSignal,
): Promise<string> {
  try {
    const response = await fetch(`/api/contact/token?locale=${locale}`, {
      cache: "no-store",
      signal,
    });
    if (!response.ok) return "";
    const data = (await response.json()) as { token?: unknown };
    return typeof data.token === "string" ? data.token : "";
  } catch {
    return "";
  }
}
function storedSubmission(locale: Locale, replace = false) {
  const key = `galung-contact-${locale}`;
  try {
    const saved = sessionStorage.getItem(key);
    if (
      !replace &&
      saved &&
      /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
        saved,
      )
    )
      return saved;
    const id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}
type Outcome =
  "editing" | "sent" | "processing" | "unknown" | "failed" | "changed";
type Snapshot = {
  name: string;
  email: string;
  message: string;
  website: string;
  consent: true;
  locale: Locale;
  privacyRevision: string;
  submissionId: string;
};
export function ContactForm({
  ready,
  locale = "id",
}: {
  ready: boolean;
  locale?: Locale;
}) {
  const copy = contactCopy[locale];
  const notice = contactNotices[locale];
  const [token, setToken] = useState("");
  const [tokenLoading, setTokenLoading] = useState(ready);
  const [tokenError, setTokenError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [outcome, setOutcome] = useState<Outcome>("editing");
  const submissionIdRef = useRef("");
  const snapshotRef = useRef<Snapshot | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    if (ready)
      void requestToken(locale, controller.signal).then((value) => {
        if (controller.signal.aborted) return;
        submissionIdRef.current = storedSubmission(locale);
        setToken(value);
        setTokenLoading(false);
        setTokenError(!value);
      });
    return () => controller.abort();
  }, [ready, locale]);
  async function refreshToken() {
    setTokenLoading(true);
    setTokenError(false);
    setToken("");
    const value = await requestToken(locale);
    setToken(value);
    setTokenLoading(false);
    setTokenError(!value);
  }
  async function transmit(values: Snapshot) {
    if (busy || !ready || !token) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, token }),
      });
      const data = (await response.json()) as { code?: string };
      if (response.status === 200 && data.code === "sent") {
        try {
          sessionStorage.removeItem(`galung-contact-${locale}`);
        } catch {
          /* Session storage is optional. */
        }
        setOutcome("sent");
        setMessage(copy.sent);
        snapshotRef.current = null;
        formRef.current?.reset();
      } else if (data.code === "processing" || data.code === "unknown") {
        setOutcome(data.code);
        setMessage(copy[data.code]);
        await refreshToken();
      } else if (data.code === "delivery") {
        setOutcome("failed");
        setMessage(copy.failed);
        await refreshToken();
      } else if (data.code === "changed") {
        setOutcome("changed");
        setMessage(copy.changed);
        await refreshToken();
      } else {
        setMessage(
          data.code === "rate"
            ? copy.rate
            : data.code === "token"
              ? copy.token
              : data.code === "invalid"
                ? copy.invalid
                : copy.server,
        );
        await refreshToken();
      }
    } catch {
      setOutcome("unknown");
      setMessage(copy.unknown);
      await refreshToken();
    } finally {
      setBusy(false);
      statusRef.current?.focus();
    }
  }
  const locked = !ready || busy || outcome !== "editing";
  return (
    <section className="contact-form" aria-labelledby="contact-heading">
      <h2 id="contact-heading">{copy.heading}</h2>
      <div id="contact-privacy">
        {notice.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {!ready && (
        <p role="status">
          {copy.unavailable}{" "}
          <a href="mailto:admin@galung.id">admin@galung.id</a>.
        </p>
      )}
      {ready && tokenLoading && <p role="status">{copy.preparing}</p>}
      {ready && tokenError && (
        <div role="alert">
          <p>{copy.tokenError}</p>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => {
              void refreshToken();
            }}
          >
            {copy.retry}
          </button>
        </div>
      )}
      <form
        ref={formRef}
        aria-label={copy.form}
        aria-describedby="contact-privacy"
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          if (locked || !token) return;
          const form = event.currentTarget;
          const fields = new FormData(form);
          const name = String(fields.get("name") || "").trim();
          const email = String(fields.get("email") || "").trim();
          const text = String(fields.get("message") || "").trim();
          const next: Record<string, string> = {};
          if (!name || name.length > 120) next.name = copy.nameError;
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
            next.email = copy.emailError;
          if (!text || text.length > 5000) next.message = copy.messageError;
          if (!fields.get("consent")) next.consent = copy.consentError;
          setErrors(next);
          if (Object.keys(next).length) {
            const first = form.elements.namedItem(Object.keys(next)[0]);
            if (first instanceof HTMLElement) first.focus();
            return;
          }
          submissionIdRef.current ||= storedSubmission(locale);
          const values: Snapshot = {
            name,
            email,
            message: text,
            website: String(fields.get("website") || ""),
            consent: true,
            locale,
            privacyRevision: notice.revision,
            submissionId: submissionIdRef.current,
          };
          snapshotRef.current = values;
          await transmit(values);
        }}
      >
        <label htmlFor="contact-name">{copy.name}</label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          disabled={locked}
        />
        {errors.name && (
          <p className="form-error" id="contact-name-error">
            {errors.name}
          </p>
        )}
        <label htmlFor="contact-email">{copy.email}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          disabled={locked}
        />
        {errors.email && (
          <p className="form-error" id="contact-email-error">
            {errors.email}
          </p>
        )}
        <label htmlFor="contact-message">{copy.message}</label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={7}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          disabled={locked}
        />
        {errors.message && (
          <p className="form-error" id="contact-message-error">
            {errors.message}
          </p>
        )}
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <label className="contact-consent">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={!!errors.consent}
            aria-describedby="contact-consent-error contact-privacy"
            disabled={locked}
          />
          {copy.consent}
        </label>
        <p className="form-error" id="contact-consent-error">
          {errors.consent}
        </p>
        <button
          className="button button--primary"
          type="submit"
          disabled={locked || !token || tokenLoading}
        >
          {busy ? copy.sending : copy.send}
        </button>
        <p ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
          {message}
        </p>
      </form>
      {(outcome === "processing" || outcome === "unknown") && (
        <button
          className="button button--secondary"
          type="button"
          disabled={busy || !token || tokenLoading}
          onClick={() => {
            if (snapshotRef.current) void transmit(snapshotRef.current);
          }}
        >
          {copy.check}
        </button>
      )}
      {(outcome === "sent" ||
        outcome === "failed" ||
        outcome === "changed") && (
        <button
          className="button button--secondary"
          type="button"
          disabled={busy}
          onClick={() => {
            submissionIdRef.current = storedSubmission(locale, true);
            snapshotRef.current = null;
            formRef.current?.reset();
            setOutcome("editing");
            setErrors({});
            setMessage("");
            void refreshToken();
          }}
        >
          {copy.reset}
        </button>
      )}
    </section>
  );
}
