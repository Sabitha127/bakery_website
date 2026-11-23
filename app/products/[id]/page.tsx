
"use client";

import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

function ProductDetailsContent() {
  const { addToCart } = useCart();

  const params = useParams();
  const productId = Number(params.id);
  const product = products.find((item) => item.id === productId);

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fffaf5]">
        <h1 className="text-3xl font-bold text-[#4b2e24]">
          Product Not Found
        </h1>
        <Link
          href="/products"
          className="mt-5 text-[#a45c40] underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      variant: variant.label,
      price: variant.price,
      quantity: quantity,
    });

    alert(`${product.name} added to cart successfully!`);
  };

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fbf6f0] px-4 py-6 sm:px-5 sm:py-8 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-6 flex min-w-0 flex-wrap items-center gap-2 text-xs text-gray-500 sm:mb-8 sm:text-sm">
          <Link href="/" className="hover:text-[#9b543b]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#9b543b]">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#8b4934]">
            {product.name}
          </span>
        </div>

        {/* Product Section */}
        <section className="grid overflow-hidden rounded-3xl bg-white shadow-[0_8px_40px_rgba(75,46,36,0.07)] lg:grid-cols-2">

          {/* Image */}
          <div className="relative flex min-h-[400px] items-center justify-center bg-[#f5e9dd] p-6 md:p-12">
            <span className="absolute left-8 top-8 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#8b4934] shadow-sm">
              Freshly Baked
            </span>

            <img
              src={product.image}
              alt={product.name}
              className="h-[280px] w-full rounded-2xl object-cover shadow-md sm:h-[350px] md:h-[500px]"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14">

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#a45c40]">
              {product.category}
            </p>

            <h1 className="mb-4 text-2xl font-bold leading-tight text-[#43291f] sm:text-3xl md:text-4xl">
              {product.name}
            </h1>

            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-full bg-[#edf5e9] px-4 py-1.5 text-sm font-medium text-[#47713c]">
                ● {product.dietary}
              </span>

              <span className="text-sm text-gray-500">
                Made with care & quality ingredients
              </span>
            </div>

            <p className="mb-8 max-w-lg text-base leading-8 text-gray-600">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-7">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#43291f]">
                Select Your Size
              </h2>

              <div className="flex flex-wrap gap-3">
                {product.variants.map((item, index) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => setSelectedVariant(index)}
                    className={`min-w-[105px] rounded-xl border-2 px-5 py-3 text-sm font-semibold transition ${
                      selectedVariant === index
                        ? "border-[#96513a] bg-[#96513a] text-white shadow-md"
                        : "border-[#eadbd0] bg-white text-[#654638] hover:border-[#96513a]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-7 border-y border-[#f0e5dc] py-5">
              <p className="mb-1 text-sm text-gray-500">
                Price
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-4xl font-bold text-[#8b4934]">
                  ₹{variant.price.toLocaleString("en-IN")}
                </p>

                <span className="text-sm text-gray-500">
                  {variant.label}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-[#43291f]">
                  Quantity
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Choose how many you need
                </p>
              </div>

              <div className="flex items-center overflow-hidden rounded-xl border-2 border-[#eadbd0]">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="h-11 w-12 bg-[#f8eee6] text-xl font-bold text-[#8b4934] transition hover:bg-[#ead8ca]"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="flex h-11 min-w-12 items-center justify-center bg-white text-base font-bold text-[#43291f]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="h-11 w-12 bg-[#f8eee6] text-xl font-bold text-[#8b4934] transition hover:bg-[#ead8ca]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="mb-6 flex justify-between text-sm">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-bold text-[#43291f]">
                ₹{(variant.price * quantity).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full rounded-xl bg-[#8b4934] px-6 py-4 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#6e3828] hover:shadow-xl"
            >
              Add to Cart
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Baked fresh • Packed with love • Made for your moments
            </p>
          </div>
        </section>

        {/* Product Information */}
        <section className="mt-10 rounded-3xl bg-white p-7 shadow-[0_8px_40px_rgba(75,46,36,0.05)] md:p-10">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a45c40]">
              Know More
            </p>

            <h2 className="text-2xl font-bold text-[#43291f] md:text-3xl">
              Product Information
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "Ingredients",
                value: product.ingredients,
              },
              {
                title: "Allergens",
                value: product.allergens,
              },
              {
                title: "Shelf Life",
                value: product.shelfLife,
              },
              {
                title: "Storage Instructions",
                value: product.storage,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-[#fbf6f0] p-6"
              >
                <h3 className="mb-3 font-bold text-[#96513a]">
                  {item.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="py-10 text-center">
          <Link
            href="/products"
            className="font-semibold text-[#96513a] hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fffaf5]">
          <p className="text-[#8b4934]">
            Loading product details...
          </p>
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}
