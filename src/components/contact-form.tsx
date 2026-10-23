"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "./icons";
import { Sparkles } from "lucide-react";
import "./site-ending.css";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    setSending(true);
    setError("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/wtsnova.agency@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json() as { success?: boolean | string; ok?: boolean; message?: string };
      const accepted = result.success === true || result.success === "true" || result.ok === true;

      if (!response.ok || !accepted) {
        throw new Error(result.message || "We couldn’t send your inquiry. Please try again.");
      }

      setSubmitted(true);
      form.reset();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We couldn’t send your inquiry. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="contact-form contact-success" role="status" aria-live="polite">
        <span className="contact-success-mark"><Sparkles aria-hidden="true" /></span>
        <span className="contact-form-step">MESSAGE RECEIVED</span>
        <h3>Thanks for reaching out!</h3>
        <p>Your inquiry has been sent successfully. Our team will review it and get in touch soon.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" aria-label="Contact WTS Nova" action="https://formsubmit.co/wtsnova.agency@gmail.com" method="POST" onSubmit={submitInquiry}>
      <input type="hidden" name="_subject" value="New website inquiry — WTS Nova" />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-honeypot" />
      <div className="contact-form-heading">
        <span className="contact-form-step">START A PROJECT</span>
        <h3>Tell us what you have in mind.</h3>
        <p>Share a few details and we can start shaping the right approach.</p>
      </div>
      <div className="contact-form-fields">
        <div className="contact-field">
          <label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Name" required />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Email address <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
        </div>
        <div className="contact-field contact-field-wide">
          <label htmlFor="contact-business">Business or brand <span className="contact-optional">Optional</span></label>
          <input id="contact-business" name="business" autoComplete="organization" placeholder="Your business or brand name" />
        </div>
        <div className="contact-field contact-field-wide">
          <label htmlFor="contact-service">What are you looking for? <span aria-hidden="true">*</span></label>
          <select id="contact-service" name="service" defaultValue="" required>
            <option value="">Select a service</option>
            <option>Social Media Management</option>
            <option>Content Creation</option>
            <option>Social Media Marketing &amp; Strategy</option>
            <option>Online Presence &amp; Growth Solutions</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="contact-field contact-field-wide">
          <label htmlFor="contact-message">A little about your goals <span aria-hidden="true">*</span></label>
          <textarea id="contact-message" name="message" placeholder="What would you like help with?" rows={3} required />
        </div>
      </div>
      <button className="button button-dark ending-form-submit" type="submit" aria-busy={sending}>
        {sending ? "Sending inquiry…" : "Submit inquiry"} <span className="button-icon"><Arrow diagonal /></span>
      </button>
      <p className="contact-form-note">Your inquiry will be sent directly to WTS Nova.</p>
      {error && <p className="contact-form-error" role="alert">{error}</p>}
    </form>
  );
}
