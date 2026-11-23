
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const categories = [
  "All",
  "Sweets",
  "Puffs",
  "Savouries",
  "Cookies",
  "Gift Boxes",
];

const dietaryOptions = ["All", "Veg", "Eggless", "Non-Veg"];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState("All");
  const [dietary, setDietary] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Bakery products only – cake products are handled separately.
  const bakeryProducts = useMemo(
    () => products.filter((product) => product.category !== "Cakes"),
    []
  );

  const suggestions = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return [];

    return bakeryProducts
      .filter((product) => {
        const searchableText = [
          product.name,
          product.category,
          product.description,
          product.dietary,
          product.ingredients,
          product.allergens,
          (product as typeof product & { flavour?: string }).flavour,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(term);
      })
      .slice(0, 5);
  }, [search, bakeryProducts]);

  const filteredProducts = useMemo(() => {
    let result = bakeryProducts.filter((product) => {
      const categoryMatch =
        category === "All" || product.category === category;

      const dietaryMatch =
        dietary === "All" || product.dietary === dietary;

      const term = search.trim().toLowerCase();

      const searchableText = [
        product.name,
        product.category,
        product.description,
        product.dietary,
        product.ingredients,
        product.allergens,
        (product as typeof product & { flavour?: string }).flavour,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchMatch = !term || searchableText.includes(term);

      return categoryMatch && dietaryMatch && searchMatch;
    });

    if (sort === "low") {
      result = [...result].sort(
        (a, b) => a.variants[0].price - b.variants[0].price
      );
    }

    if (sort === "high") {
      result = [...result].sort(
        (a, b) => b.variants[0].price - a.variants[0].price
      );
    }

    return result;
  }, [bakeryProducts, category, dietary, search, sort]);

  const clearFilters = () => {
    setCategory("All");
    setDietary("All");
    setSearch("");
    setSort("default");
    setShowSuggestions(false);
  };

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fffaf4] text-[#39251d]">
      {/* Page Hero */}
      <section className="bg-[#f1e2d2] px-4 py-12 text-center sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-[#a36a49]">
          Fresh from our bakery
        </p>

        <h1 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl">
          Our Bakery Collection
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#795d4b]">
          Discover traditional sweets, fresh puffs, savouries and
          delicious cookies, lovingly prepared for every craving.
        </p>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-12 lg:px-10">
        {/* Search and Sort */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <div className="flex items-center rounded-xl border border-[#e8d9ca] bg-white px-4 focus-within:border-[#a36a49]">
              <span className="mr-3 text-lg text-[#a36a49]">⌕</span>

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setShowSuggestions(false);
                  }

                  if (e.key === "Enter") {
                    setShowSuggestions(false);
                  }
                }}
                placeholder="Search sweets, puffs, cookies..."
                className="w-full bg-transparent py-3 text-sm outline-none"
              />

              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setShowSuggestions(false);
                  }}
                  className="ml-2 text-lg text-[#947765]"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            {showSuggestions && search.trim() && (
              <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-[#eadfd4] bg-white shadow-xl">
                {suggestions.length > 0 ? (
                  suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSearch(product.name);
                        setShowSuggestions(false);
                      }}
                      className="flex w-full items-center justify-between border-b border-[#f3ebe4] px-5 py-3 text-left last:border-0 hover:bg-[#fff8f1]"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-[#947765]">
                          {product.category}
                        </p>
                      </div>
                      <span className="text-[#a36a49]">→</span>
                    </button>
                  ))
                ) : (
                  <p className="px-5 py-4 text-sm text-[#947765]">
                    No matching bakery products found.
                  </p>
                )}
              </div>
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-[#e8d9ca] bg-white px-5 py-3 text-sm outline-none focus:border-[#a36a49]"
            aria-label="Sort products"
          >
            <option value="default">Sort by: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="mb-7">
          <h2 className="mb-4 font-serif text-xl font-semibold">
            Explore Categories
          </h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition ${
                  category === item
                    ? "bg-[#79452e] text-white"
                    : "border border-[#e8d9ca] bg-white text-[#795d4b] hover:bg-[#f4ebe2]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold">
            Dietary preference:
          </span>

          {dietaryOptions.map((item) => (
            <button
              key={item}
              onClick={() => setDietary(item)}
              className={`rounded-lg border px-4 py-2 text-xs transition ${
                dietary === item
                  ? "border-[#79452e] bg-[#f1e2d2] text-[#633b2b]"
                  : "border-[#e8d9ca] bg-white hover:bg-[#f4ebe2]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Result Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-[#947765]">
            Showing{" "}
            <span className="font-semibold text-[#633b2b]">
              {filteredProducts.length}
            </span>{" "}
            bakery products
          </p>

          <button
            onClick={clearFilters}
            className="text-xs font-semibold text-[#a36a49] underline underline-offset-4 hover:text-[#633b2b]"
          >
            Clear all filters
          </button>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-[#eee1d4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-[#f4ebe2]">
                  <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      const variant = product.variants[0];
                      addToCart({
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        variant: variant.label,
                        price: variant.price,
                        quantity: 1,
                      });
                    }}
                    aria-label={`Add ${product.name} to bag`}
                    title="Add to bag"
                    className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-[#79452e] shadow-lg transition hover:scale-110 hover:bg-[#79452e] hover:text-white"
                  >
                    🛒
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[#a36a49]">
                      {product.category}
                    </span>

                    <span className="rounded-full bg-[#f0f6eb] px-3 py-1 text-xs text-green-700">
                      {product.dietary}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold">
                    {product.name}
                  </h2>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-[#947765]">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-[#79452e]">
                        ₹{Math.min(
                            ...product.variants.map((variant) => variant.price)
                        )}
                        </span>

                    <Link
                      href={`/products/${product.id}`}
                      className="rounded-full bg-[#79452e] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#593222]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#eee1d4] bg-white p-12 text-center">
            <p className="text-5xl">🔍</p>

            <h2 className="mt-4 text-xl font-semibold">
              No products found
            </h2>

            <p className="mt-2 text-sm text-[#947765]">
              Try another product name, category or dietary preference.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 rounded-full bg-[#79452e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#593222]"
            >
              View All Products
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
