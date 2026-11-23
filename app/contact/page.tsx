"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "Bakery enquiry").trim();
    const message = String(formData.get("message") || "").trim();

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:hello@butterandbloom.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fffaf4] text-[#39251d]">
      <section className="bg-[#f1e2d2] px-4 py-12 text-center sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-[#a36a49]">We are happy to help</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-[#533324] sm:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#795d4b]">
          Have a question about a cake, sweet box or order? Send us a message and our bakery team will be happy to help.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-5 sm:py-14 md:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div className="rounded-3xl bg-[#79452e] p-5 text-white sm:p-8 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#f0c89f]">Get in touch</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold">Let&apos;s make your day sweeter.</h2>
          <p className="mt-4 text-sm leading-7 text-white/80">For product enquiries, custom cake requests and order-related questions, contact us using the details below.</p>
          <div className="mt-9 space-y-6 text-sm">
            <div>
              <p className="font-semibold text-[#f0c89f]">Email</p>
              <a href="mailto:hello@butterandbloom.com" className="mt-1 inline-block hover:underline">hello@butterandbloom.com</a>
            </div>
            <div>
              <p className="font-semibold text-[#f0c89f]">Bakery</p>
              <p className="mt-1 text-white/80">Butter &amp; Bloom Bakery</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-[#eee1d4] bg-white p-5 shadow-sm sm:p-9">
          <h2 className="font-serif text-2xl font-semibold text-[#533324]">Send us a message</h2>
          <p className="mt-2 text-sm text-[#947765]">Complete the form. Your default email application will open with your message ready to send.</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#633b2b]">
              Your name
              <input name="name" required maxLength={100} className="mt-2 w-full rounded-xl border border-[#e8d9ca] bg-[#fffdfa] px-4 py-3 font-normal outline-none focus:border-[#a36a49]" placeholder="Enter your name" />
            </label>
            <label className="block text-sm font-semibold text-[#633b2b]">
              Email address
              <input name="email" type="email" required maxLength={150} className="mt-2 w-full rounded-xl border border-[#e8d9ca] bg-[#fffdfa] px-4 py-3 font-normal outline-none focus:border-[#a36a49]" placeholder="you@example.com" />
            </label>
          </div>

          <label className="mt-5 block text-sm font-semibold text-[#633b2b]">
            Subject
            <input name="subject" required maxLength={120} className="mt-2 w-full rounded-xl border border-[#e8d9ca] bg-[#fffdfa] px-4 py-3 font-normal outline-none focus:border-[#a36a49]" placeholder="How can we help?" />
          </label>

          <label className="mt-5 block text-sm font-semibold text-[#633b2b]">
            Message
            <textarea name="message" required rows={6} maxLength={3000} className="mt-2 w-full resize-y rounded-xl border border-[#e8d9ca] bg-[#fffdfa] px-4 py-3 font-normal outline-none focus:border-[#a36a49]" placeholder="Write your message..." />
          </label>

          <button type="submit" className="mt-6 rounded-full bg-[#79452e] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#593222]">
            Open email to send →
          </button>

          {submitted && (
            <p role="status" className="mt-4 text-sm text-[#47713c]">
              Your email application should open with the message prepared. Please send it there to complete your enquiry.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
