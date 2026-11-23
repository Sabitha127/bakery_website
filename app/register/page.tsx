
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Customer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    try {
      setLoading(true);

      const savedUsers: Customer[] = JSON.parse(
        localStorage.getItem("butter-bloom-users") || "[]"
      );

      if (!Array.isArray(savedUsers)) {
        throw new Error("Invalid customer data.");
      }

      const existingUser = savedUsers.find(
        (user) => user.email === normalizedEmail
      );

      if (existingUser) {
        setError("This email is already registered. Please login.");
        return;
      }

      const newUser: Customer = {
        id: `USER${Date.now()}`,
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        password,
      };

      localStorage.setItem(
        "butter-bloom-users",
        JSON.stringify([...savedUsers, newUser])
      );

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err) {
      console.error("Registration error:", err);
      setError("Unable to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fbf6f0] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-10">

        {/* Header */}
        <div className="text-center mb-7">

          <Link
            href="/"
            className="text-3xl font-bold text-[#8b4934]"
          >
            Butter & Bloom
          </Link>

          <p className="text-gray-500 mt-3 text-sm">
            Create your account and enjoy our delicious treats.
          </p>

        </div>

        <h1 className="text-2xl font-bold text-[#43291f] text-center mb-6">
          Create an Account
        </h1>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#43291f] mb-2">
              Full Name
            </label>

            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full border border-[#e8d8cc] rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#8b4934] focus:ring-1 focus:ring-[#8b4934]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#43291f] mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-[#e8d8cc] rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#8b4934] focus:ring-1 focus:ring-[#8b4934]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-[#43291f] mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
              placeholder="Enter 10-digit phone number"
              className="w-full border border-[#e8d8cc] rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#8b4934] focus:ring-1 focus:ring-[#8b4934]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#43291f] mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full border border-[#e8d8cc] rounded-xl px-4 py-3 pr-16 text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#8b4934] focus:ring-1 focus:ring-[#8b4934]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#8b4934]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#43291f] mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full border border-[#e8d8cc] rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#8b4934] focus:ring-1 focus:ring-[#8b4934]"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm font-medium">
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p className="text-green-700 text-sm font-medium">
              {success}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8b4934] text-white py-3 rounded-xl font-bold hover:bg-[#693725] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#8b4934] font-bold hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Back to Home */}
        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-[#8b4934]"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
