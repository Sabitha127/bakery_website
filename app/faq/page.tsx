
"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Butter & Bloom Bakery?",
    answer:
      "Butter & Bloom is a bakery offering delicious bakery treats, traditional sweets, savouries, cookies, biscuits and gift boxes.",
  },
  {
    question: "What products are available?",
    answer:
      "You can explore traditional sweets, puffs, savouries, cookies, biscuits and bakery gift boxes through our product collection.",
  },
  {
    question: "Do I need an account to browse products?",
    answer:
      "No. You can browse our product collections without logging in. An account is required for customer-specific features.",
  },
  {
    question: "Are eggless products available?",
    answer:
      "Please check the individual product details for eggless information. For specific dietary requirements, contact the bakery before placing your order.",
  },
  {
    question: "How can I know the ingredients used?",
    answer:
      "Please refer to the individual product details or contact the bakery for ingredient and allergen information.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Browse the products, select your preferred items, add them to your bag and proceed to checkout to place your order.",
  },
  {
    question: "How can I check my order status?",
    answer:
      "Log in to your account and visit the My Orders section to view your order information.",
  },
  {
    question: "How can I know the delivery charges?",
    answer:
      "Applicable delivery charges and availability will be shown during checkout, based on the configured delivery options.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "Available payment methods will be displayed during checkout. Please select one of the options shown there.",
  },
  {
    question: "How should I store bakery products?",
    answer:
      "Storage requirements can differ between products. Please follow the storage instructions provided with the individual product.",
  },
  {
    question: "How can I know the freshness or shelf life?",
    answer:
      "Freshness and shelf-life information may vary by product. Please check the product packaging or contact the bakery for details.",
  },
  {
    question: "Can I cancel an order?",
    answer:
      "Order cancellation depends on the bakery's cancellation policy and the current order status. Please contact the bakery for assistance.",
  },
  {
    question: "What should I do if I receive a damaged product?",
    answer:
      "Please contact the bakery and share your order details along with photographs of the product so the team can review your concern.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Returns and replacements are subject to the bakery's applicable policy. Please contact the bakery before making a return request.",
  },
  {
    question: "How can I contact Butter & Bloom?",
    answer:
      "Visit our Contact page to find the available contact information and reach our team.",
  },
];

const QUESTIONS_PER_LOAD = 5;

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const [visibleCount, setVisibleCount] = useState(QUESTIONS_PER_LOAD);

  const visibleFAQs = faqs.slice(0, visibleCount);
  const hasMore = visibleCount < faqs.length;

  const handleLoadMore = () => {
    setVisibleCount((previous) =>
      Math.min(previous + QUESTIONS_PER_LOAD, faqs.length)
    );
  };

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fffaf4] text-[#39251d]">

      {/* FAQ Hero */}
      <section className="bg-[#f1e2d2] px-6 py-16 text-center md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-[#a36a49]">
          We are here to help
        </p>

        <h1 className="mt-4 font-serif text-3xl font-semibold text-[#533324] sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#806858]">
          Find answers to common questions about our products,
          ordering, payments and more.
        </p>

        <div className="mt-6 text-4xl">💬</div>
      </section>

      {/* FAQ Questions */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-5 sm:py-16 lg:px-10">

        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#a36a49]">
            Help Centre
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#533324]">
            Got Questions?
          </h2>

          <p className="mt-3 text-sm text-[#947765]">
            Here are some answers to help you.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {visibleFAQs.map((faq, index) => {
            const isOpen = openQuestion === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-[#eadfd2] bg-white shadow-sm transition hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenQuestion(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="font-semibold text-[#533324]">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4ebe2] text-lg font-semibold text-[#79452e] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#f0e5da] px-6 py-5">
                    <p className="text-sm leading-7 text-[#806858]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-10 text-center">
          <p className="mb-4 text-xs text-[#947765]">
            Showing {visibleFAQs.length} of {faqs.length} questions
          </p>

          {hasMore && (
            <button
              type="button"
              onClick={handleLoadMore}
              className="rounded-full bg-[#79452e] px-9 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#593222]"
            >
              Load More ↓
            </button>
          )}

          {!hasMore && (
            <p className="font-medium text-[#79452e]">
              You&apos;ve viewed all the questions! 🤎
            </p>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-14 rounded-3xl bg-[#f1e2d2] px-6 py-10 text-center">
          <div className="text-3xl">🤎</div>

          <h3 className="mt-4 font-serif text-2xl font-semibold text-[#533324]">
            Still have questions?
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#806858]">
            We are happy to help! Get in touch with our team
            for any additional information.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-[#79452e] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#593222]"
          >
            Contact Us →
          </a>
        </div>

      </section>
    </main>
  );
}
