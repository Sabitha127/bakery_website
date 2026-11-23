
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

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const savedUsers: Customer[] = JSON.parse(
        localStorage.getItem("butter-bloom-users") || "[]"
      );

      const normalizedEmail = email.trim().toLowerCase();

      const user = savedUsers.find(
        (customer) =>
          customer.email.toLowerCase() === normalizedEmail &&
          customer.password === password
      );

      if (!user) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      // Save logged-in customer details without password
      const currentUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      };

      localStorage.setItem(
        "butter-bloom-current-user",
        JSON.stringify(currentUser)
      );

      // Notify Header about successful login
      window.dispatchEvent(
        new Event("butter-bloom-auth-changed")
      );

      // Redirect to Home page
      router.push("/");

    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fbf6f0] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-3xl font-bold text-[#8b4934]"
          >
            Butter & Bloom
          </Link>

          <p className="text-gray-500 mt-3 text-sm">
            Welcome back! Your favourite treats are waiting.
          </p>
        </div>

        <h1 className="text-2xl font-bold text-[#43291f] text-center mb-7">
          Login to Your Account
        </h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

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
              placeholder="Enter your registered email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm font-medium">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8b4934] text-white py-3 rounded-xl font-bold hover:bg-[#693725] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-7">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#8b4934] font-bold hover:underline"
          >
            Create Account
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
