
"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fffaf4] text-[#533324]">

      {/* Hero Section */}
      <section className="relative flex min-h-[430px] items-center overflow-hidden bg-[#ead8c5]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1800"
            alt="Fresh bakery pastries"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-center text-white sm:px-6 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[5px]">
            Welcome to Butter & Bloom
          </p>

          <h1 className="mt-5 font-serif text-4xl font-bold sm:text-5xl md:text-7xl">
            Our Story
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/90 md:text-lg">
            Every celebration deserves something sweet.
            Discover the love, warmth and joy behind our bakery.
          </p>

          <Link
            href="/products"
            className="mt-9 inline-block rounded-full bg-white px-8 py-3 font-semibold text-[#79452e] transition hover:bg-[#f1e2d2]"
          >
            Explore Our Collection
          </Link>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2 md:py-28">

        <div>
          <p className="text-xs font-bold uppercase tracking-[4px] text-[#a36a49]">
            A Little About Us
          </p>

          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Made with Love,
            <br />
            Shared with Joy.
          </h2>

          <p className="mt-7 leading-8 text-[#795d4b]">
            Welcome to Butter & Bloom Bakery, where every treat is
            created to make your special moments even sweeter.
            From delightful celebration cakes to traditional Indian
            sweets, savoury snacks and freshly baked cookies, we
            bring together a collection of flavours for every occasion.
          </p>

          <p className="mt-5 leading-8 text-[#795d4b]">
            Whether you are celebrating a birthday, sharing a festive
            gift or simply enjoying a little treat, we believe every
            moment deserves something delicious.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block border-b-2 border-[#79452e] pb-2 font-semibold text-[#79452e] hover:text-[#a36a49]"
          >
            Discover Our Products →
          </Link>
        </div>

        {/* Square About Image */}
        <div className="mx-auto w-full max-w-[500px] overflow-hidden rounded-3xl md:rounded-[40px]">
          <div className="aspect-square w-full">
            <img
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1000"
              alt="Bakery assortment"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#f1e5d8] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl text-center">

          <p className="text-xs font-bold uppercase tracking-[4px] text-[#a36a49]">
            What We Believe
          </p>

          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Our Baking Philosophy
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#795d4b]">
            Great food is more than just taste. It is about the
            experience, the memories and the happiness we share.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">

            {[
              {
                icon: "🥐",
                title: "Freshness First",
                description:
                  "We celebrate the joy of freshly prepared bakery treats and delicious flavours.",
              },
              {
                icon: "❤️",
                title: "Made with Care",
                description:
                  "Every product deserves attention, care and a little extra love.",
              },
              {
                icon: "🎁",
                title: "Made for Moments",
                description:
                  "From everyday cravings to special celebrations, there is something for everyone.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-[#fffaf4] p-9 transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="text-5xl">{item.icon}</div>

                <h3 className="mt-6 font-serif text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#795d4b]">
                  {item.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">

        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[4px] text-[#a36a49]">
            A Taste of Happiness
          </p>

          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
            Made to Make You Smile
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[#795d4b]">
            Explore the delicious world of cakes, sweets, snacks
            and treats at Butter & Bloom.
          </p>
        </div>

        {/* Square Image Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">

          {[
            {
              name: "Celebration Cakes",
              image:
                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
            },
            {
              name: "Traditional Sweets",
              image:
                "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700",
            },
            {
              name: "Freshly Baked",
              image:
                "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700",
            },
            {
              name: "Sweet Treats",
              image:
                "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700",
            },
          ].map((item) => (
            <div key={item.name} className="group min-w-0">

              {/* Square Image */}
              <div className="aspect-square w-full overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-3 text-center font-serif text-sm font-bold sm:mt-4 sm:text-lg">
                {item.name}
              </h3>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}
