
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AddressType = "Home" | "Work" | "Other";

type Address = {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
  type: AddressType;
  isDefault: boolean;
};

type AddressForm = Omit<Address, "id" | "isDefault">;

const STORAGE_KEY = "butter-bloom-addresses";

const emptyAddress: AddressForm = {
  fullName: "",
  phone: "",
  pincode: "",
  address: "",
  city: "",
  state: "",
  type: "Home",
};

export default function AddressesPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AddressForm>(emptyAddress);

  useEffect(() => {
    const savedUser = localStorage.getItem("butter-bloom-current-user");

    if (!savedUser) {
      router.push("/login");
      return;
    }

    const savedAddresses = localStorage.getItem(STORAGE_KEY);

    if (savedAddresses) {
      try {
        const parsedAddresses: Address[] = JSON.parse(savedAddresses);
        setAddresses(parsedAddresses);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [router]);

  const saveAddresses = (updated: Address[]) => {
    setAddresses(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyAddress });
    setIsFormOpen(true);
  };

  const openEditForm = (address: Address) => {
    setEditingId(address.id);

    setForm({
      fullName: address.fullName,
      phone: address.phone,
      pincode: address.pincode,
      address: address.address,
      city: address.city,
      state: address.state,
      type: address.type,
    });

    setIsFormOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    if (editingId) {
      const updated = addresses.map((item) =>
        item.id === editingId ? { ...item, ...form } : item
      );

      saveAddresses(updated);
    } else {
      const newAddress: Address = {
        ...form,
        id: `ADDR${Date.now()}`,
        isDefault: addresses.length === 0,
      };

      saveAddresses([...addresses, newAddress]);
    }

    setIsFormOpen(false);
    setEditingId(null);
    setForm({ ...emptyAddress });
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    const updated = addresses.filter((item) => item.id !== id);

    if (updated.length > 0 && !updated.some((item) => item.isDefault)) {
      updated[0] = { ...updated[0], isDefault: true };
    }

    saveAddresses(updated);
  };

  const setDefaultAddress = (id: string) => {
    const updated = addresses.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));

    saveAddresses(updated);
  };

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fffaf4] px-4 py-10 sm:px-5 sm:py-12 text-[#39251d]">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/profile"
          className="text-sm font-medium text-[#79452e] hover:underline"
        >
          ← Back to My Profile
        </Link>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[4px] text-[#a36a49]">
              Delivery Information
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold text-[#533324] sm:text-4xl">
              My Addresses
            </h1>

            <p className="mt-2 text-sm text-[#947765]">
              Manage your saved delivery addresses.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="rounded-full bg-[#79452e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#593222]"
          >
            + Add New Address
          </button>
        </div>

        {/* Address Form */}
        {isFormOpen && (
          <div className="mt-8 rounded-3xl border border-[#eadfd2] bg-white p-4 shadow-sm sm:p-8">
            <h2 className="mb-6 text-xl font-semibold text-[#533324]">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Mobile Number
                  </label>
                  <input
                    required
                    type="tel"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    placeholder="10-digit mobile number"
                    className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Pincode
                  </label>
                  <input
                    required
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pincode: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    placeholder="6-digit pincode"
                    className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    City
                  </label>
                  <input
                    required
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    placeholder="Enter city"
                    className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    State
                  </label>
                  <input
                    required
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    placeholder="Enter state"
                    className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Address Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as AddressType,
                      })
                    }
                    className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Full Delivery Address
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="House number, street, area, landmark..."
                    className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                  />
                </div>

              </div>

              <div className="mt-7 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingId(null);
                    setForm({ ...emptyAddress });
                  }}
                  className="rounded-full border border-[#d9b99c] px-6 py-3 text-sm font-semibold text-[#79452e] hover:bg-[#f1e2d2]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-[#79452e] px-7 py-3 text-sm font-semibold text-white hover:bg-[#593222]"
                >
                  {editingId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Saved Addresses */}
        <div className="mt-8">
          <h2 className="mb-5 text-xl font-semibold text-[#533324]">
            Saved Addresses ({addresses.length})
          </h2>

          {addresses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#d9b99c] bg-white px-6 py-14 text-center">
              <div className="text-5xl">📍</div>

              <h3 className="mt-4 text-lg font-semibold text-[#533324]">
                No addresses saved yet
              </h3>

              <p className="mt-2 text-sm text-[#947765]">
                Add your delivery address to make checkout easier.
              </p>

              <button
                type="button"
                onClick={openAddForm}
                className="mt-6 rounded-full bg-[#79452e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#593222]"
              >
                Add Your First Address
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {addresses.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#eadfd2] bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#f1e2d2] px-4 py-1 text-xs font-semibold text-[#79452e]">
                      {item.type}
                    </span>

                    {item.isDefault && (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        Default Address
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-semibold text-[#533324]">
                    {item.fullName}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#795d4b]">
                    {item.address}
                    <br />
                    {item.city}, {item.state} - {item.pincode}
                  </p>

                  <p className="mt-3 text-sm text-[#795d4b]">
                    Phone: {item.phone}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#eee1d4] pt-4">
                    <button
                      type="button"
                      onClick={() => openEditForm(item)}
                      className="text-sm font-semibold text-[#79452e] hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="text-sm font-semibold text-red-600 hover:underline"
                    >
                      Delete
                    </button>

                    {!item.isDefault && (
                      <button
                        type="button"
                        onClick={() => setDefaultAddress(item.id)}
                        className="ml-auto text-sm font-semibold text-[#79452e] hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
