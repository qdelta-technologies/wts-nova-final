"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "./icons";
import "./site-ending.css";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Form delivery isn’t configured yet, so your inquiry hasn’t been sent.");
  }

  return (
    <form className="contact-form" aria-label="Contact WTS Nova" onSubmit={submitInquiry}>
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
      <button className="button button-dark ending-form-submit" type="submit">
        Submit inquiry <span className="button-icon"><Arrow diagonal /></span>
      </button>
      <p className="contact-form-note" aria-live="polite">{status}</p>
    </form>
  );
}
