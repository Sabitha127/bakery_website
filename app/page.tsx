"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const categories = [
  { name: "Celebration Cakes", icon: "🎂", description: "Make every celebration special" },
  { name: "Traditional Sweets & Mithai", icon: "🍮", description: "Authentic Indian favourites" },
  { name: "Hot Puffs & Savouries", icon: "🥐", description: "Fresh, crispy and delicious" },
  { name: "Cookies & Biscuits", icon: "🍪", description: "Little bites of happiness" },
  { name: "Festive Gift Boxes", icon: "🎁", description: "Thoughtful gifts for everyone" },
  { name: "100% Eggless Collection", icon: "🌿", description: "Delicious eggless treats" },
];

const reviews = [
  {
    name: "Happy Customer",
    occasion: "Celebration Cakes",
    message: "A beautiful cake makes every celebration feel extra special. The perfect treat for sharing happy moments!",
  },
  {
    name: "Sweet Moments",
    occasion: "Traditional Sweets",
    message: "A lovely collection of traditional favourites. Perfect for sharing with family and friends.",
  },
  {
    name: "Bakery Lover",
    occasion: "Cookies & Biscuits",
    message: "A little sweetness can brighten an ordinary day. These treats are made for those special little moments.",
  },
];

export default function Home() {
  const { addToCart } = useCart();
  const featuredProducts = [products[0], products[6], products[8], products[16]];
  const newArrivals = [products[4], products[12], products[17]];

  const addProductToBag = (product: (typeof products)[number]) => {
    const variant = product.variants[0];
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      variant: variant.label,
      price: variant.price,
      quantity: 1,
    });
  };

  return (
    <main className="min-h-screen w-full min-w-0 bg-[#fffaf4] text-[#39251d]">
      {/* Bakery hero banner */}
      <section className="relative isolate w-full overflow-hidden bg-[#3b2119]">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1800&q=90"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#28150f]/95 via-[#392016]/80 to-[#392016]/40" />

        <div className="mx-auto grid w-full max-w-7xl min-w-0 items-center gap-7 px-4 py-10 sm:gap-8 sm:px-6 sm:py-14 md:min-h-[590px] md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:px-10 lg:py-24">
          <div className="w-full min-w-0 max-w-2xl text-white">
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[2.5px] text-[#f0c89f] sm:text-xs sm:tracking-[5px]">
              Butter &amp; Bloom · Bakery &amp; Patisserie
            </p>
            <h1 className="break-words font-serif text-[2.25rem] font-semibold leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">
              Cakes, sweets
              <span className="block italic text-[#f2c69b]">&amp; savoury treats.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:mt-6 sm:text-base sm:leading-8">
              From celebration cakes and traditional Indian sweets to fresh puffs,
              crispy savouries and cookies — discover something delicious for every moment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
              <Link
                href="/products"
                className="rounded-full bg-[#f2c69b] px-5 py-3 text-xs font-bold text-[#45291e] shadow-lg transition hover:bg-white sm:px-8 sm:py-4 sm:text-sm"
              >
                Shop our collection →
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/70 px-5 py-3 text-xs font-semibold text-white transition hover:bg-white/15 sm:px-8 sm:py-4 sm:text-sm"
              >
                Our story
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-white/90 sm:mt-10 sm:gap-x-8 sm:text-sm">
              <span>✦ Freshly prepared</span>
              <span>✦ Made with care</span>
              <span>✦ Perfect for sharing</span>
            </div>
          </div>

          {/* Hero image is visible on mobile, tablet and desktop */}
          <div className="flex w-full min-w-0 justify-center md:justify-end">
            <div className="w-full max-w-[360px] overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-2 shadow-2xl backdrop-blur-sm sm:max-w-md sm:p-3 md:max-w-lg">
              <img
                src="/images/celebration-hamperbox.png"
                alt="Premium assorted Indian sweets gift hamper"
                className="h-52 w-full rounded-2xl object-cover object-center sm:h-72 md:h-[390px]"
              />
              <p className="px-2 py-3 text-center font-serif text-base text-white sm:py-4 sm:text-xl">
                A little sweetness in every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Collections */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mb-7 text-center sm:mb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a36a49] sm:text-xs sm:tracking-[4px]">
            Explore our collection
          </p>
          <h2 className="mt-3 break-words font-serif text-2xl font-semibold text-[#533324] sm:text-3xl lg:text-4xl">
            Something for every craving
          </h2>
          <p className="mt-3 text-xs text-[#947765] sm:text-sm">
            Discover your favourite bakery treats.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              href="/products"
              key={category.name}
              className="group min-w-0 rounded-xl border border-[#eee1d4] bg-white p-3 text-center transition hover:-translate-y-2 hover:shadow-lg sm:rounded-2xl sm:p-5"
            >
              <span className="mb-3 block text-4xl transition group-hover:scale-110 sm:mb-4 sm:text-5xl">
                {category.icon}
              </span>
              <h3 className="break-words text-sm font-semibold text-[#633b2b] sm:text-base">
                {category.name}
              </h3>
              <p className="mt-2 text-[10px] leading-4 text-[#a38a78] sm:text-xs">
                {category.description}
              </p>
              <span className="mt-3 inline-block text-[10px] font-semibold text-[#a36a49] sm:mt-4 sm:text-xs">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full bg-[#f4ebe2] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 sm:mb-10 sm:gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a36a49] sm:text-xs sm:tracking-[4px]">
                Handpicked favourites
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#533324] sm:mt-3 sm:text-3xl lg:text-4xl">
                Our Best Sellers
              </h2>
            </div>
            <Link href="/products" className="shrink-0 text-xs font-semibold text-[#8e5336] underline underline-offset-4 sm:text-sm">
              View all products →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
            {featuredProducts.map((product) => (
              <article key={product.id} className="group min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                <div className="relative overflow-hidden bg-[#f4ebe2]">
                  <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                    />
                  </Link>
                  <span className="absolute left-3 top-3 rounded-full bg-[#fffaf4] px-3 py-1 text-[10px] font-semibold text-[#8e5336] sm:left-4 sm:top-4 sm:text-xs">
                    Bestseller
                  </span>
                  <button
                    type="button"
                    onClick={() => addProductToBag(product)}
                    aria-label={`Add ${product.name} to bag`}
                    title="Add to bag"
                    className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#79452e] shadow-lg transition hover:scale-110 hover:bg-[#79452e] hover:text-white sm:bottom-4 sm:right-4 sm:h-12 sm:w-12"
                  >
                    🛒
                  </button>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-xs text-[#a38a78]">{product.category}</p>
                  <h3 className="mt-2 break-words text-base font-semibold text-[#533324] sm:text-lg">
                    {product.name}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-base font-bold text-[#79452e]">
                      ₹{product.variants[0].price.toLocaleString("en-IN")}
                    </span>
                    <Link href={`/products/${product.id}`} className="rounded-full bg-[#79452e] px-4 py-2 text-xs font-semibold text-white hover:bg-[#593222]">
                      Explore
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mb-7 text-center sm:mb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a36a49] sm:text-xs sm:tracking-[4px]">
            Fresh from our kitchen
          </p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-[#533324] sm:text-3xl lg:text-4xl">
            New Arrivals
          </h2>
          <p className="mt-3 text-xs text-[#947765] sm:text-sm">
            Discover more treats to fall in love with.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-7">
          {newArrivals.map((item) => (
            <Link href="/products" key={item.id} className="group min-w-0 overflow-hidden rounded-2xl border border-[#eee1d4] bg-white transition hover:-translate-y-2 hover:shadow-xl">
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="break-words font-serif text-lg font-semibold text-[#533324] sm:text-xl">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#947765] sm:text-sm">
                  {item.description}
                </p>
                <p className="mt-4 text-xs font-semibold text-[#a36a49] sm:mt-5 sm:text-sm">
                  Explore collection →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="mx-auto grid w-full max-w-7xl min-w-0 items-center gap-7 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-10 lg:px-10 lg:py-20">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=85"
          alt="Freshly baked bakery bread"
          loading="lazy"
          className="h-64 w-full rounded-2xl object-cover sm:h-80 md:h-[360px] md:rounded-3xl"
        />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a36a49] sm:text-xs sm:tracking-[4px]">
            The Butter &amp; Bloom promise
          </p>
          <h2 className="mt-3 break-words font-serif text-3xl font-semibold leading-tight text-[#533324] sm:mt-4 sm:text-4xl">
            Good ingredients.
            <span className="block italic text-[#a96843]">Beautiful memories.</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#806858] sm:mt-5 sm:text-base sm:leading-8">
            Every treat deserves care. From celebration cakes to everyday favourites,
            we believe in making delicious moments with thoughtful ingredients and
            a little extra love.
          </p>
          <Link href="/about" className="mt-6 inline-block rounded-full bg-[#79452e] px-7 py-3 text-xs font-semibold text-white hover:bg-[#593222] sm:mt-8 sm:px-8 sm:py-4 sm:text-sm">
            Discover Our Story →
          </Link>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="w-full bg-[#f4ebe2] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 text-center sm:mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a36a49] sm:text-xs sm:tracking-[4px]">
              Sweet words
            </p>
            <h2 className="mt-3 break-words font-serif text-2xl font-semibold text-[#533324] sm:text-3xl lg:text-4xl">
              Made for Happy Moments
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {reviews.map((review) => (
              <article key={review.name} className="min-w-0 rounded-2xl border border-[#eadfd2] bg-white p-5 shadow-sm sm:p-7">
                <div className="text-2xl tracking-widest text-[#c18b5d]">★★★★★</div>
                <p className="mt-4 text-sm leading-7 text-[#806858] sm:mt-5">
                  “{review.message}”
                </p>
                <div className="mt-5 border-t border-[#eee1d4] pt-4 sm:mt-6 sm:pt-5">
                  <h3 className="font-semibold text-[#533324]">{review.name}</h3>
                  <p className="mt-1 text-xs text-[#a38a78]">{review.occasion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
