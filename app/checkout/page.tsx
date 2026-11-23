
"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

type Address = {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
  type: "Home" | "Work" | "Other";
  isDefault: boolean;
};

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    deliveryDate: "",
    timeSlot: "",
    paymentMethod: "COD",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  // Load customer and saved addresses
  useEffect(() => {
    const savedUser = localStorage.getItem(
      "butter-bloom-current-user"
    );

    if (!savedUser) {
      router.push("/login");
      return;
    }

    try {
      const currentUser = JSON.parse(savedUser);

      setForm((prev) => ({
        ...prev,
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      }));

      const savedAddresses = localStorage.getItem(
        "butter-bloom-addresses"
      );

      if (savedAddresses) {
        const parsedAddresses: Address[] = JSON.parse(savedAddresses);

        if (Array.isArray(parsedAddresses)) {
          setAddresses(parsedAddresses);

          const defaultAddress =
            parsedAddresses.find((item) => item.isDefault) ||
            parsedAddresses[0];

          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id);

            setForm((prev) => ({
              ...prev,
              fullName: defaultAddress.fullName,
              phone: defaultAddress.phone,
              address: defaultAddress.address,
              city: defaultAddress.city,
              pincode: defaultAddress.pincode,
            }));
          }
        }
      }
    } catch (error) {
      console.error("Unable to load customer details:", error);
    }
  }, [router]);

  // Handle normal form changes
  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle saved address selection
  const handleAddressSelect = (id: string) => {
    setSelectedAddressId(id);

    if (id === "new") {
      setForm((prev) => ({
        ...prev,
        address: "",
        city: "",
        pincode: "",
      }));
      return;
    }

    const selectedAddress = addresses.find(
      (item) => item.id === id
    );

    if (!selectedAddress) return;

    setForm((prev) => ({
      ...prev,
      fullName: selectedAddress.fullName,
      phone: selectedAddress.phone,
      address: selectedAddress.address,
      city: selectedAddress.city,
      pincode: selectedAddress.pincode,
    }));
  };

  // Place Order
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      const savedUser = localStorage.getItem(
        "butter-bloom-current-user"
      );

      if (!savedUser) {
        alert("Please login before placing your order.");
        router.push("/login");
        return;
      }

      const currentUser = JSON.parse(savedUser);

      if (!currentUser.id) {
        alert("Please login again to continue.");
        router.push("/login");
        return;
      }

      const orderId = `BB${Date.now()}`;

      const newOrder = {
        orderId,
        customerId: currentUser.id,
        orderDate: new Date().toISOString(),

        customer: {
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
        },

        deliveryDate: form.deliveryDate,
        timeSlot: form.timeSlot,
        paymentMethod: form.paymentMethod,

        items: cartItems.map((item) => ({
          ...item,
        })),

        totalAmount: cartTotal,
        status: "Order Placed",
      };

      const savedOrders = localStorage.getItem(
        "butter-bloom-orders"
      );

      const existingOrders = savedOrders
        ? JSON.parse(savedOrders)
        : [];

      if (!Array.isArray(existingOrders)) {
        throw new Error("Invalid order data");
      }

      localStorage.setItem(
        "butter-bloom-orders",
        JSON.stringify([newOrder, ...existingOrders])
      );

      setPlacedOrderId(orderId);
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error("Unable to save order:", error);
      alert("Unable to place your order. Please try again.");
    }
  };

  // Order Success Screen
  if (orderPlaced) {
    return (
      <main className="w-full min-w-0 flex min-h-screen items-center justify-center bg-[#fbf6f0] p-4 sm:p-5">
        <div className="w-full max-w-lg rounded-3xl bg-white p-6 text-center shadow-lg sm:p-10">

          <div className="mb-5 text-6xl">🎉</div>

          <h1 className="text-3xl font-bold text-[#43291f]">
            Order Placed Successfully!
          </h1>

          <p className="mt-4 leading-7 text-gray-500">
            Thank you for choosing Butter & Bloom Bakery.
            Your order details have been saved successfully.
          </p>

          <div className="mt-6 rounded-xl bg-[#fbf6f0] p-4">
            <p className="text-sm text-gray-500">
              Your Order ID
            </p>

            <p className="mt-2 text-lg font-bold text-[#8b4934]">
              {placedOrderId}
            </p>
          </div>

          <Link
            href="/orders"
            className="mt-6 inline-block rounded-xl bg-[#8b4934] px-8 py-3 font-bold text-white transition hover:bg-[#693725]"
          >
            View My Orders
          </Link>

          <div>
            <Link
              href="/products"
              className="mt-5 inline-block text-sm font-semibold text-[#96513a] hover:underline"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </main>
    );
  }

  // Empty Cart Screen
  if (cartItems.length === 0) {
    return (
      <main className="w-full min-w-0 flex min-h-screen items-center justify-center bg-[#fbf6f0] p-4 sm:p-5">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

          <div className="mb-4 text-5xl">🛍️</div>

          <h1 className="text-2xl font-bold text-[#43291f]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Add some delicious treats before checkout.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-xl bg-[#8b4934] px-7 py-3 font-semibold text-white"
          >
            Explore Products
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fbf6f0] px-4 py-8 sm:px-5 sm:py-10 md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a45c40]">
            Almost There
          </p>

          <h1 className="text-3xl font-bold text-[#43291f] md:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Complete your details to place your order.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">

            {/* Delivery Form */}
            <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

              <h2 className="mb-6 text-xl font-bold text-[#43291f]">
                Delivery Information
              </h2>

              {/* Saved Address Selection */}
              {addresses.length > 0 && (
                <div className="mb-7 rounded-xl border border-[#eadbd0] bg-[#fbf6f0] p-5">

                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <label className="text-sm font-bold text-[#654638]">
                      Select Saved Address
                    </label>

                    <Link
                      href="/profile"
                      className="text-xs font-semibold text-[#96513a] hover:underline"
                    >
                      Manage Addresses
                    </Link>
                  </div>

                  <select
                    value={selectedAddressId}
                    onChange={(e) =>
                      handleAddressSelect(e.target.value)
                    }
                    className="w-full rounded-xl border border-[#eadbd0] bg-white px-4 py-3 text-sm text-[#43291f] outline-none focus:border-[#96513a]"
                  >
                    {addresses.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.type} - {item.fullName}
                        {item.isDefault ? " (Default)" : ""}
                      </option>
                    ))}

                    <option value="new">
                      + Enter a New Address
                    </option>
                  </select>

                  <p className="mt-3 text-xs text-gray-500">
                    Select a saved address to automatically fill your delivery details.
                  </p>
                </div>
              )}

              {addresses.length === 0 && (
                <div className="mb-7 rounded-xl border border-dashed border-[#d9b99c] bg-[#fbf6f0] p-5">
                  <p className="text-sm text-[#654638]">
                    You don't have any saved addresses yet.
                  </p>

                  <Link
                    href="/profile"
                    className="mt-2 inline-block text-sm font-semibold text-[#96513a] hover:underline"
                  >
                    + Add an address in My Profile
                  </Link>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#654638]">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-[#eadbd0] px-4 py-3 text-[#43291f] placeholder:text-gray-400 outline-none focus:border-[#96513a]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#654638]">
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    placeholder="10-digit mobile number"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    required
                    className="w-full rounded-xl border border-[#eadbd0] px-4 py-3 text-[#43291f] placeholder:text-gray-400 outline-none focus:border-[#96513a]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#654638]">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-[#eadbd0] px-4 py-3 text-[#43291f] placeholder:text-gray-400 outline-none focus:border-[#96513a]"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#654638]">
                    Delivery Address *
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House number, street, area..."
                    rows={3}
                    required
                    className="w-full resize-none rounded-xl border border-[#eadbd0] px-4 py-3 text-[#43291f] placeholder:text-gray-400 outline-none focus:border-[#96513a]"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#654638]">
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                    className="w-full rounded-xl border border-[#eadbd0] px-4 py-3 text-[#43291f] placeholder:text-gray-400 outline-none focus:border-[#96513a]"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#654638]">
                    Pincode *
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                      })
                    }
                    placeholder="6-digit pincode"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    className="w-full rounded-xl border border-[#eadbd0] px-4 py-3 text-[#43291f] placeholder:text-gray-400 outline-none focus:border-[#96513a]"
                  />
                </div>

              </div>

              {/* Delivery Schedule */}
              <div className="mb-6 mt-9 border-t border-[#f0e5dc] pt-7">

                <h2 className="mb-5 text-xl font-bold text-[#43291f]">
                  Delivery Schedule
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#654638]">
                      Delivery Date *
                    </label>

                    <input
                      type="date"
                      name="deliveryDate"
                      value={form.deliveryDate}
                      onChange={handleChange}
                      min={new Date().toLocaleDateString("en-CA")}
                      required
                      className="w-full rounded-xl border border-[#eadbd0] px-4 py-3 text-[#43291f] outline-none focus:border-[#96513a]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#654638]">
                      Time Slot *
                    </label>

                    <select
                      name="timeSlot"
                      value={form.timeSlot}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[#eadbd0] bg-white px-4 py-3 text-[#43291f] outline-none focus:border-[#96513a]"
                    >
                      <option value="">Select time slot</option>
                      <option value="9 AM - 12 PM">9 AM - 12 PM</option>
                      <option value="12 PM - 3 PM">12 PM - 3 PM</option>
                      <option value="3 PM - 6 PM">3 PM - 6 PM</option>
                      <option value="6 PM - 9 PM">6 PM - 9 PM</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Payment */}
              <div className="border-t border-[#f0e5dc] pt-7">

                <h2 className="mb-5 text-xl font-bold text-[#43291f]">
                  Payment Method
                </h2>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-[#96513a] bg-[#fbf6f0] p-4">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={form.paymentMethod === "COD"}
                    onChange={handleChange}
                    className="accent-[#96513a]"
                  />

                  <div>
                    <p className="font-semibold text-[#43291f]">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Pay when your order arrives.
                    </p>
                  </div>

                </label>
              </div>

            </section>

            {/* Order Summary */}
            <aside className="rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">

              <h2 className="mb-6 text-xl font-bold text-[#43291f]">
                Order Summary
              </h2>

              <div className="mb-5 space-y-4">

                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.variant}`}
                    className="flex items-center gap-3"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#43291f]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.variant} × {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-[#8b4934]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                  </div>
                ))}

              </div>

              <div className="space-y-4 border-t border-[#f0e5dc] pt-5">

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>

                  <span className="text-green-700">
                    Calculated later
                  </span>
                </div>

                <div className="flex justify-between border-t border-[#f0e5dc] pt-4">
                  <span className="font-bold text-[#43291f]">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-[#8b4934]">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-xl bg-[#8b4934] px-5 py-4 font-bold text-white transition hover:bg-[#693725]"
              >
                Place Order
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Thank you for choosing Butter & Bloom.
              </p>

            </aside>

          </div>
        </form>

      </div>
    </main>
  );
}
