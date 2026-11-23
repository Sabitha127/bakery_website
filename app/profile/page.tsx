
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Customer = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
};

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

const ADDRESS_STORAGE_KEY = "butter-bloom-addresses";

const emptyAddress: AddressForm = {
  fullName: "",
  phone: "",
  pincode: "",
  address: "",
  city: "",
  state: "",
  type: "Home",
};

export default function ProfilePage() {
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<AddressForm>({
    ...emptyAddress,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("butter-bloom-current-user");

    if (!savedUser) {
      router.push("/login");
      return;
    }

    try {
      const user: Customer = JSON.parse(savedUser);

      setCustomer(user);
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");

      const savedAddresses = localStorage.getItem(ADDRESS_STORAGE_KEY);

      if (savedAddresses) {
        const parsedAddresses: Address[] = JSON.parse(savedAddresses);
        setAddresses(parsedAddresses);
      }
    } catch {
      localStorage.removeItem("butter-bloom-current-user");
      router.push("/login");
    }
  }, [router]);

  // Save Profile
  const handleSave = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all the fields.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!customer) return;

    const updatedCustomer: Customer = {
      ...customer,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    localStorage.setItem(
      "butter-bloom-current-user",
      JSON.stringify(updatedCustomer)
    );

    setCustomer(updatedCustomer);
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  // Save Addresses
  const saveAddresses = (updated: Address[]) => {
    setAddresses(updated);
    localStorage.setItem(
      ADDRESS_STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  // Open Add Address Form
  const openAddAddressForm = () => {
    setEditingAddressId(null);
    setAddressForm({ ...emptyAddress });
    setIsAddressFormOpen(true);
  };

  // Open Edit Address Form
  const openEditAddressForm = (item: Address) => {
    setEditingAddressId(item.id);

    setAddressForm({
      fullName: item.fullName,
      phone: item.phone,
      pincode: item.pincode,
      address: item.address,
      city: item.city,
      state: item.state,
      type: item.type,
    });

    setIsAddressFormOpen(true);
  };

  // Submit Address
  const handleAddressSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(addressForm.phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(addressForm.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    if (editingAddressId) {
      const updated = addresses.map((item) =>
        item.id === editingAddressId
          ? { ...item, ...addressForm }
          : item
      );

      saveAddresses(updated);
    } else {
      const newAddress: Address = {
        ...addressForm,
        id: `ADDR${Date.now()}`,
        isDefault: addresses.length === 0,
      };

      saveAddresses([...addresses, newAddress]);
    }

    setIsAddressFormOpen(false);
    setEditingAddressId(null);
    setAddressForm({ ...emptyAddress });

    alert(
      editingAddressId
        ? "Address updated successfully!"
        : "Address added successfully!"
    );
  };

  // Delete Address
  const handleDeleteAddress = (id: string) => {
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

  // Set Default Address
  const setDefaultAddress = (id: string) => {
    const updated = addresses.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));

    saveAddresses(updated);
  };

  if (!customer) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf4] text-[#79452e]">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fffaf4] px-4 py-10 sm:px-5 sm:py-12 text-[#39251d]">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/"
          className="text-sm font-medium text-[#79452e] hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="mb-8 mt-6">
          <p className="text-xs font-semibold uppercase tracking-[4px] text-[#a36a49]">
            Your Account
          </p>

          <h1 className="mt-3 font-serif text-3xl font-semibold text-[#533324] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#947765]">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl border border-[#eadfd2] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col items-center gap-4 border-b border-[#eee1d4] pb-7 sm:flex-row">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f1e2d2] text-3xl text-[#79452e]">
              👤
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-[#533324]">
                {customer.fullName}
              </h2>

              <p className="mt-1 text-sm text-[#947765]">
                {customer.email}
              </p>

              <span className="mt-3 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Active Customer
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  setFullName(customer.fullName);
                  setEmail(customer.email);
                  setPhone(customer.phone || "");
                }
                setIsEditing(!isEditing);
              }}
              className="rounded-full border border-[#d9b99c] px-5 py-2 text-sm font-semibold text-[#79452e] transition hover:bg-[#f1e2d2] sm:ml-auto"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Personal Information */}
          <div className="pt-7">

            <h3 className="mb-6 text-lg font-semibold text-[#533324]">
              Personal Information
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-[#795d4b]">
                  Full Name
                </label>

                <input
                  type="text"
                  value={fullName}
                  disabled={!isEditing}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49] disabled:opacity-80"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#795d4b]">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  disabled={!isEditing}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49] disabled:opacity-80"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#795d4b]">
                  Phone Number
                </label>

                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-[#eadfd2] bg-[#fffaf4] px-4 py-3 text-sm outline-none focus:border-[#a36a49] disabled:opacity-80"
                />
              </div>

            </div>

            {isEditing && (
              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-full bg-[#79452e] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#593222]"
                >
                  Save Changes
                </button>
              </div>
            )}

          </div>
        </div>

        {/* My Addresses */}
        <div className="mt-8 rounded-3xl border border-[#eadfd2] bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-[#a36a49]">
                Delivery Information
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#533324]">
                My Addresses
              </h2>

              <p className="mt-1 text-sm text-[#947765]">
                Manage your saved delivery addresses.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddAddressForm}
              className="rounded-full bg-[#79452e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#593222]"
            >
              + Add Address
            </button>
          </div>

          {/* Add / Edit Address Form */}
          {isAddressFormOpen && (
            <div className="mt-7 rounded-2xl border border-[#eadfd2] bg-[#fffaf4] p-5 sm:p-7">

              <h3 className="mb-6 text-lg font-semibold text-[#533324]">
                {editingAddressId ? "Edit Address" : "Add New Address"}
              </h3>

              <form onSubmit={handleAddressSubmit}>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Full Name
                    </label>

                    <input
                      required
                      value={addressForm.fullName}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Enter full name"
                      className="w-full rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
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
                      value={addressForm.phone}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Pincode
                    </label>

                    <input
                      required
                      maxLength={6}
                      value={addressForm.pincode}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          pincode: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      placeholder="6-digit pincode"
                      className="w-full rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      City
                    </label>

                    <input
                      required
                      value={addressForm.city}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          city: e.target.value,
                        })
                      }
                      placeholder="Enter city"
                      className="w-full rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      State
                    </label>

                    <input
                      required
                      value={addressForm.state}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          state: e.target.value,
                        })
                      }
                      placeholder="Enter state"
                      className="w-full rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Address Type
                    </label>

                    <select
                      value={addressForm.type}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          type: e.target.value as AddressType,
                        })
                      }
                      className="w-full rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
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
                      value={addressForm.address}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          address: e.target.value,
                        })
                      }
                      placeholder="House number, street, area, landmark..."
                      className="w-full rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#a36a49]"
                    />
                  </div>

                </div>

                <div className="mt-6 flex flex-wrap justify-end gap-3">

                  <button
                    type="button"
                    onClick={() => {
                      setIsAddressFormOpen(false);
                      setEditingAddressId(null);
                      setAddressForm({ ...emptyAddress });
                    }}
                    className="rounded-full border border-[#d9b99c] px-6 py-3 text-sm font-semibold text-[#79452e] hover:bg-[#f1e2d2]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-full bg-[#79452e] px-7 py-3 text-sm font-semibold text-white hover:bg-[#593222]"
                  >
                    {editingAddressId ? "Update Address" : "Save Address"}
                  </button>

                </div>
              </form>
            </div>
          )}

          {/* Saved Address List */}
          <div className="mt-7">

            <h3 className="mb-5 text-lg font-semibold text-[#533324]">
              Saved Addresses ({addresses.length})
            </h3>

            {addresses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#d9b99c] px-4 py-10 sm:px-5 sm:py-12 text-center">

                <div className="text-5xl">📍</div>

                <h4 className="mt-4 font-semibold text-[#533324]">
                  No addresses saved yet
                </h4>

                <p className="mt-2 text-sm text-[#947765]">
                  Add your delivery address to make checkout easier.
                </p>

                <button
                  type="button"
                  onClick={openAddAddressForm}
                  className="mt-5 rounded-full bg-[#79452e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#593222]"
                >
                  Add Your First Address
                </button>

              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">

                {addresses.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#eadfd2] p-5"
                  >

                    <div className="flex flex-wrap items-center justify-between gap-3">

                      <span className="rounded-full bg-[#f1e2d2] px-4 py-1 text-xs font-semibold text-[#79452e]">
                        {item.type}
                      </span>

                      {item.isDefault && (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          Default Address
                        </span>
                      )}

                    </div>

                    <h4 className="mt-5 font-semibold text-[#533324]">
                      {item.fullName}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-[#795d4b]">
                      {item.address}
                      <br />
                      {item.city}, {item.state} - {item.pincode}
                    </p>

                    <p className="mt-3 text-sm text-[#795d4b]">
                      Phone: {item.phone}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#eee1d4] pt-4">

                      <button
                        type="button"
                        onClick={() => openEditAddressForm(item)}
                        className="text-sm font-semibold text-[#79452e] hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(item.id)}
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

        {/* Account Shortcuts */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2">

          <Link
            href="/orders"
            className="flex items-center justify-between rounded-2xl border border-[#eadfd2] bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <h3 className="font-semibold text-[#533324]">
                My Orders
              </h3>

              <p className="mt-1 text-sm text-[#947765]">
                View your orders and track deliveries.
              </p>
            </div>

            <span className="text-2xl">📦</span>
          </Link>

          <Link
            href="/products"
            className="flex items-center justify-between rounded-2xl border border-[#eadfd2] bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <h3 className="font-semibold text-[#533324]">
                Continue Shopping
              </h3>

              <p className="mt-1 text-sm text-[#947765]">
                Explore our bakery collection.
              </p>
            </div>

            <span className="text-2xl">🛍️</span>
          </Link>

        </div>

      </div>
    </main>
  );
}
