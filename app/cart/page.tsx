
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fbf6f0] px-4 py-8 sm:px-5 sm:py-10 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a45c40]">
            Your Selection
          </p>

          <h1 className="text-2xl font-bold text-[#43291f] sm:text-3xl md:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your bag
          </p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-5 text-6xl">🛍️</div>

            <h2 className="text-2xl font-bold text-[#43291f]">
              Your Cart is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              Looks like you haven't added anything delicious yet.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-block rounded-xl bg-[#8b4934] px-8 py-3 font-semibold text-white transition hover:bg-[#693725]"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">

            {/* Cart Items */}
            <section className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-full rounded-xl object-cover sm:w-36"
                  />

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-[#43291f]">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        Size: {item.variant}
                      </p>

                      <p className="mt-2 font-semibold text-[#8b4934]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      {/* Quantity */}
                      <div className="flex items-center overflow-hidden rounded-lg border border-[#eadbd0]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.variant,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="h-9 w-10 bg-[#f8eee6] text-lg font-bold text-[#8b4934] hover:bg-[#ead8ca] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="flex h-9 min-w-10 items-center justify-center text-sm font-bold text-[#43291f]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.variant,
                              item.quantity + 1
                            )
                          }
                          className="h-9 w-10 bg-[#f8eee6] text-lg font-bold text-[#8b4934] hover:bg-[#ead8ca]"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <p className="font-bold text-[#43291f]">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.id, item.variant)
                        }
                        className="text-sm font-semibold text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap justify-between gap-4">
                

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-semibold text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </button>
              </div>
            </section>

            {/* Order Summary */}
            {/* <aside className="rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6"> */}
            <aside className="self-start rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="mb-6 text-xl font-bold text-[#43291f]">
                Order Summary
              </h2>

              <div className="mb-4 flex justify-between text-sm text-gray-600">
                <span>Total Items</span>
                <span>{cartCount}</span>
              </div>

              <div className="mb-4 flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="mb-5 flex justify-between text-sm text-gray-600">
                <span>Delivery</span>
                <span className="font-medium text-green-700">
                  Calculated at checkout
                </span>
              </div>

              <div className="border-t border-[#f0e5dc] pt-5">
                <div className="mb-6 flex justify-between">
                  <span className="font-bold text-[#43291f]">
                    Total
                  </span>

                  <span className="text-xl font-bold text-[#8b4934]">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full rounded-xl bg-[#8b4934] px-5 py-4 text-center font-bold text-white transition hover:bg-[#693725]"
                >
                  Proceed to Checkout
                </Link>
              </div>

              <p className="mt-5 text-center text-xs text-gray-400">
                Freshly baked and packed with love.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
