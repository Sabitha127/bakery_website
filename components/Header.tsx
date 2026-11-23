"use client";
 
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
 
type Customer = {
  id: string;
  fullName: string;
  email: string;
};
 
export default function Header() {
  const router = useRouter();
  const { cartCount } = useCart();
 
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  // Load customer and listen for login/logout changes.
  useEffect(() => {
    const loadCustomer = () => {
      const savedUser = localStorage.getItem("butter-bloom-current-user");
 
      if (!savedUser) {
        setCustomer(null);
        return;
      }
 
      try {
        setCustomer(JSON.parse(savedUser));
      } catch (error) {
        console.error("Unable to load customer:", error);
        localStorage.removeItem("butter-bloom-current-user");
        setCustomer(null);
      }
    };
 
    loadCustomer();
 
    window.addEventListener("storage", loadCustomer);
    window.addEventListener("butter-bloom-auth-changed", loadCustomer);
 
    return () => {
      window.removeEventListener("storage", loadCustomer);
      window.removeEventListener("butter-bloom-auth-changed", loadCustomer);
    };
  }, []);
 
  // Logout
  const handleLogout = () => {
    localStorage.removeItem("butter-bloom-current-user");
 
    setCustomer(null);
    setIsAccountOpen(false);
    setIsMobileMenuOpen(false);
 
    window.dispatchEvent(new Event("butter-bloom-auth-changed"));
 
    router.push("/");
  };
 
  // Desktop account dropdown
  const accountMenu = (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsAccountOpen((open) => !open)}
        aria-expanded={isAccountOpen}
        aria-haspopup="true"
        className="whitespace-nowrap rounded-full border border-[#d9b99c] px-3 py-2 text-[11px] font-semibold text-[#79452e] transition hover:bg-[#f1e2d2] sm:px-4 sm:text-sm"
      >
        Welcome Back!
        <span className="ml-1 text-[10px]">▼</span>
      </button>
 
      {isAccountOpen && (
        <div className="absolute right-0 top-full z-[60] mt-2 w-40 overflow-hidden rounded-xl border border-[#eadfd2] bg-white py-2 text-left shadow-lg sm:w-44">
          <Link
            href="/profile"
            onClick={() => setIsAccountOpen(false)}
            className="block px-4 py-3 text-sm text-[#633b2b] transition hover:bg-[#fff4e9]"
          >
            My Profile
          </Link>
 
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
 
  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-[#633b2b] px-2 py-2 text-center text-[10px] leading-4 tracking-normal text-white sm:px-4 sm:text-sm sm:tracking-wider">
        Freshly baked with love ❤️{" "}
        <span className="hidden xs:inline">|</span>{" "}
        <span className="block sm:inline">
          Every day, every occasion
        </span>
      </div>
 
      <header className="sticky top-0 z-50 w-full border-b border-[#eadfd2] bg-[#fffaf4] shadow-sm">
        {/* Main Header Row */}
        <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4 lg:px-10">
 
          {/* Logo */}
          <Link
            href="/"
            aria-label="Butter and Bloom Home"
            className="min-w-0 shrink leading-tight outline-none focus-visible:ring-2 focus-visible:ring-[#79452e]"
          >
            <span className="block whitespace-nowrap text-[18px] font-bold tracking-tight text-[#79452e] sm:text-2xl sm:tracking-wide">
              Butter &amp; Bloom
            </span>
 
            <span className="mt-1 block whitespace-nowrap text-[7px] tracking-[1.8px] text-[#9c785e] sm:text-[10px] sm:tracking-[4px]">
              BAKERY &amp; PATISSERIE
            </span>
          </Link>
 
          {/* Desktop Navigation */}
          <nav className="hidden min-w-0 items-center gap-4 text-sm font-semibold lg:flex xl:gap-6">
            <Link
              href="/"
              className="whitespace-nowrap text-[#79452e] transition-colors hover:text-[#b36b43]"
            >
              Home
            </Link>
 
            <Link
              href="/products"
              className="whitespace-nowrap text-[#633b2b] transition-colors hover:text-[#b36b43]"
            >
              Shop
            </Link>
 
            <Link
              href="/about"
              className="whitespace-nowrap text-[#633b2b] transition-colors hover:text-[#b36b43]"
            >
              Our Story
            </Link>
 
            {customer && (
              <Link
                href="/orders"
                className="whitespace-nowrap text-[#633b2b] transition-colors hover:text-[#b36b43]"
              >
                My Orders
              </Link>
            )}
          </nav>
 
          {/* Account Actions and Cart */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
 
            {/* Desktop Login / Account */}
            <div className="hidden lg:block">
              {customer ? (
                accountMenu
              ) : (
                <Link
                  href="/login"
                  className="whitespace-nowrap rounded-full bg-[#79452e] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#593222]"
                >
                  Login
                </Link>
              )}
            </div>
 
            {/* Shopping Cart */}
            <Link
              href="/cart"
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#79452e] text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-[#593222] sm:h-11 sm:w-11"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
 
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-green-600 px-1 text-[9px] font-bold text-white sm:h-5 sm:min-w-5 sm:text-[10px]">
                  {cartCount}
                </span>
              )}
            </Link>
 
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((open) => !open);
                setIsAccountOpen(false);
              }}
              aria-label={
                isMobileMenuOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#79452e] transition hover:bg-[#f1e2d2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79452e] lg:hidden sm:h-11 sm:w-11"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
 
        {/* Mobile and Tablet Navigation */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="absolute left-0 top-full z-[55] w-full border-t border-[#eadfd2] bg-[#fffaf4] px-5 py-4 shadow-lg lg:hidden"
          >
            <div className="flex flex-col gap-1">
 
              {/* Home */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#79452e] hover:bg-[#f1e2d2]"
              >
                Home
              </Link>
 
              {/* Shop */}
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#633b2b] hover:bg-[#f1e2d2]"
              >
                Shop
              </Link>
 
              {/* Our Story */}
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#633b2b] hover:bg-[#f1e2d2]"
              >
                Our Story
              </Link>
 
              {customer ? (
                <>
                  {/* My Orders */}
                  <Link
                    href="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-semibold text-[#633b2b] hover:bg-[#f1e2d2]"
                  >
                    My Orders
                  </Link>
 
                  {/* Mobile Account Dropdown */}
                  <div className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() =>
                        setIsAccountOpen((open) => !open)
                      }
                      aria-expanded={isAccountOpen}
                      className="flex w-full items-center justify-between rounded-lg border border-[#d9b99c] px-4 py-3 text-left text-sm font-semibold text-[#79452e] transition hover:bg-[#f1e2d2]"
                    >
                      <span>Welcome Back!</span>
 
                      <span className="text-[10px]">
                        {isAccountOpen ? "▲" : "▼"}
                      </span>
                    </button>
 
                    {/* Profile and Logout - Same Left Alignment */}
                    {isAccountOpen && (
                      <div className="mt-2 flex flex-col rounded-lg border border-[#eadfd2] bg-white py-1">
 
                        <Link
                          href="/profile"
                          onClick={() => {
                            setIsAccountOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block rounded-lg px-4 py-3 text-left text-sm text-[#633b2b] transition hover:bg-[#fff4e9]"
                        >
                          My Profile
                        </Link>
 
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Login */
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 rounded-full bg-[#79452e] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#593222]"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}