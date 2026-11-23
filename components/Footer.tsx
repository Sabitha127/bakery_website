import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#38251d] px-4 py-10 text-[#f7e9dc] sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
        {/* Brand */}
        <div className="min-w-0">
          <h2 className="font-serif text-xl font-bold sm:text-2xl">
            Butter &amp; Bloom
          </h2>
          <p className="mt-3 text-[10px] tracking-[2.5px] text-[#c9a98e] sm:text-xs sm:tracking-[3px]">
            BAKERY &amp; PATISSERIE
          </p>
          <p className="mt-4 max-w-xs text-sm leading-7 text-[#d5c1b1] sm:mt-5">
            Bringing happiness to every bite, one freshly baked treat at a time.
          </p>
        </div>

        {/* Explore */}
        <div className="min-w-0">
          <h3 className="mb-4 font-semibold">Explore</h3>
          <div className="space-y-3 text-sm text-[#d5c1b1]">
            <Link href="/" className="block hover:text-white">Home</Link>
            <Link href="/products" className="block hover:text-white">Shop</Link>
            <Link href="/about" className="block hover:text-white">Our Story</Link>
            <Link href="/contact" className="block hover:text-white">Contact</Link>
          </div>
        </div>

        {/* Customer Care */}
        <div className="min-w-0">
          <h3 className="mb-4 font-semibold">Customer Care</h3>
          <div className="space-y-3 text-sm text-[#d5c1b1]">
            <Link href="/profile" className="block hover:text-white">My Account</Link>
            <Link href="/orders" className="block hover:text-white">My Orders</Link>
            <Link href="/cart" className="block hover:text-white">Shopping Bag</Link>
            <Link href="/faq" className="block hover:text-white">FAQs</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="min-w-0">
          <h3 className="mb-4 font-semibold">Get in Touch</h3>
          <p className="break-words text-sm leading-7 text-[#d5c1b1]">
            We&apos;d love to hear from you.
            <br />
            Email: hello@butterandbloom.com
            <br />
            Address: Add bakery address
            <br />
            Phone: Add contact number
            <br />
            FSSAI: Add license details
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-block text-sm text-[#e6c5a5] underline underline-offset-4 hover:text-white"
          >
            Contact us →
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-7xl border-t border-white/15 pt-6 text-center text-[10px] leading-5 text-[#c9a98e] sm:mt-12 sm:text-xs">
        © 2026 Butter &amp; Bloom Bakery. All rights reserved.
      </div>
    </footer>
  );
}
