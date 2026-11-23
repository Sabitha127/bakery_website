
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Customer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

type OrderItem = {
  id: number;
  name: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
};

type Order = {
  orderId: string;
  customerId: string;
  orderDate: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
  deliveryDate: string;
  timeSlot: string;
  paymentMethod: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
};

const trackingSteps = [
  {
    title: "Order Placed",
    description: "Your order has been received successfully.",
    icon: "🛍️",
  },
  {
    title: "Confirmed",
    description: "The bakery has confirmed your order.",
    icon: "✓",
  },
  {
    title: "Preparing",
    description: "Your delicious treats are being prepared.",
    icon: "🧁",
  },
  {
    title: "Out for Delivery",
    description: "Your order is on its way to you.",
    icon: "🚚",
  },
  {
    title: "Delivered",
    description: "Your order has been delivered successfully.",
    icon: "🎉",
  },
];

export default function MyOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    null
  );

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(
        "butter-bloom-current-user"
      );

      if (!savedUser) {
        router.replace("/login");
        return;
      }

      const currentUser: Customer = JSON.parse(savedUser);

      if (!currentUser.id) {
        router.replace("/login");
        return;
      }

      setCustomer(currentUser);

      const savedOrders = localStorage.getItem(
        "butter-bloom-orders"
      );

      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);

        if (Array.isArray(parsedOrders)) {
          const customerOrders = parsedOrders.filter(
            (order: Order) => order.customerId === currentUser.id
          );

          setOrders(customerOrders);
        }
      }
    } catch (error) {
      console.error("Unable to load orders:", error);
    } finally {
      setIsLoaded(true);
    }
  }, [router]);

  const toggleTracking = (orderId: string) => {
    setExpandedOrderId((previous) =>
      previous === orderId ? null : orderId
    );
  };

  const getCurrentStep = (status: string) => {
    const statusMap: Record<string, number> = {
      "Order Placed": 0,
      "Confirmed by Bakery": 1,
      "Confirmed": 1,
      "Preparing / Baking": 2,
      "Preparing": 2,
      "Out for Delivery": 3,
      "Delivered": 4,
    };

    return statusMap[status] ?? 0;
  };

  if (!isLoaded) {
    return (
      <main className="w-full min-w-0 flex min-h-screen items-center justify-center bg-[#fbf6f0]">
        <p className="text-[#8b4934]">Loading your orders...</p>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="w-full min-w-0 flex min-h-screen items-center justify-center bg-[#fbf6f0]">
        <p className="text-[#8b4934]">Redirecting to login...</p>
      </main>
    );
  }

  return (
    <main className="w-full min-w-0 min-h-screen bg-[#fbf6f0] px-4 py-8 sm:px-5 sm:py-10 md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#a45c40]">
            Your Account
          </p>

          <h1 className="text-3xl font-bold text-[#43291f] md:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Welcome, {customer.fullName}! View and track your orders here.
          </p>
        </div>

        {/* Order Count */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <p className="mt-1 text-3xl font-bold text-[#8b4934]">
            {orders.length}
          </p>
        </div>

        {/* Empty Orders */}
        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">

            <div className="mb-5 text-6xl">📦</div>

            <h2 className="text-2xl font-bold text-[#43291f]">
              No Orders Yet
            </h2>

            <p className="mt-3 text-gray-500">
              You haven't placed any orders yet.
              Explore our delicious bakery collection!
            </p>

            <Link
              href="/products"
              className="mt-7 inline-block rounded-xl bg-[#8b4934] px-8 py-3 font-semibold text-white transition hover:bg-[#693725]"
            >
              Explore Products
            </Link>

          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.orderId;
              const activeStep = getCurrentStep(order.status);

              return (
                <section
                  key={order.orderId}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >

                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f0e5dc] bg-[#fffaf6] p-5">

                    <div>
                      <p className="text-xs text-gray-500">
                        Order ID
                      </p>

                      <h2 className="mt-1 font-bold text-[#8b4934]">
                        {order.orderId}
                      </h2>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Order Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#43291f]">
                        {new Date(order.orderDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#fdf0df] px-4 py-2 text-xs font-bold text-[#a45c40]">
                      {order.status}
                    </span>

                  </div>

                  {/* Ordered Products */}
                  <div className="space-y-4 p-5">

                    {order.items.map((item, index) => (
                      <div
                        key={`${item.id}-${item.variant}-${index}`}
                        className="flex flex-wrap items-center gap-4"
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-[#43291f]">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Size: {item.variant}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold text-[#8b4934]">
                          ₹{(
                            item.price * item.quantity
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>
                    ))}

                  </div>

                  {/* Delivery and Payment */}
                  <div className="grid gap-4 border-t border-[#f0e5dc] bg-[#fffaf6] p-5 sm:grid-cols-2">

                    <div>
                      <p className="text-xs text-gray-500">
                        Delivery Schedule
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#43291f]">
                        {new Date(
                          `${order.deliveryDate}T00:00:00`
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.timeSlot}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Payment Method
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#43291f]">
                        {order.paymentMethod === "COD"
                          ? "Cash on Delivery"
                          : order.paymentMethod}
                      </p>
                    </div>

                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f0e5dc] p-5">

                    <div>
                      <p className="text-xs text-gray-500">
                        Order Total
                      </p>

                      <p className="mt-1 text-xl font-bold text-[#8b4934]">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleTracking(order.orderId)}
                      className="rounded-xl bg-[#8b4934] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#693725]"
                    >
                      {isExpanded
                        ? "Hide Tracking ↑"
                        : "Track Order ↓"}
                    </button>

                  </div>

                  {/* Expandable Tracking Section */}
                  {isExpanded && (
                    <div className="border-t border-[#f0e5dc] bg-[#fffaf6] p-5 md:p-8">

                      {/* Delivery Progress */}
                      <div className="mb-8">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#a45c40]">
                          Order Tracking
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-[#43291f]">
                          Delivery Progress
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Follow your order from preparation to delivery.
                        </p>
                      </div>

                      {/* Progress Percentage */}
                      <div className="mb-8">

                        <div className="mb-3 flex justify-between text-xs font-semibold text-gray-500">
                          <span>Order Progress</span>

                          <span className="text-green-700">
                            {Math.round(
                              ((activeStep + 1) / trackingSteps.length) * 100
                            )}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-green-500 transition-all duration-500"
                            style={{
                              width: `${
                                ((activeStep + 1) / trackingSteps.length) * 100
                              }%`,
                            }}
                          />
                        </div>

                      </div>

                      {/* Horizontal Tracking Timeline */}
                      <div className="overflow-x-auto pb-3">
                        <div className="min-w-[620px]">

                          <div className="relative px-[10%]">

                            {/* Background Line */}
                            <div className="absolute left-[10%] right-[10%] top-5 h-1 rounded-full bg-gray-200" />

                            {/* Completed Green Line */}
                            <div
                              className="absolute left-[10%] top-5 h-1 rounded-full bg-green-500 transition-all duration-500"
                              style={{
                                width: `${activeStep * 20}%`,
                              }}
                            />

                            {/* Tracking Steps */}
                            <div className="relative grid grid-cols-5">

                              {trackingSteps.map((step, index) => {
                                const isCompleted = index < activeStep;
                                const isCurrent = index === activeStep;

                                return (
                                  <div
                                    key={step.title}
                                    className="flex flex-col items-center text-center"
                                  >

                                    <div
                                      className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg transition-all duration-300 ${
                                        isCompleted
                                          ? "border-green-600 bg-green-600 text-white"
                                          : isCurrent
                                          ? "border-green-600 bg-green-50 text-green-700 ring-4 ring-green-100"
                                          : "border-gray-300 bg-white text-gray-400"
                                      }`}
                                    >
                                      {isCompleted ? "✓" : step.icon}
                                    </div>

                                    <h4
                                      className={`mt-3 text-xs font-bold ${
                                        isCompleted || isCurrent
                                          ? "text-green-700"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      {step.title}
                                    </h4>

                                    {isCurrent && (
                                      <span className="mt-2 rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
                                        Current
                                      </span>
                                    )}

                                    {isCompleted && (
                                      <span className="mt-2 text-[10px] font-semibold text-green-600">
                                        Completed
                                      </span>
                                    )}

                                  </div>
                                );
                              })}

                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expected Delivery */}
                      <div className="mt-8 rounded-xl bg-white p-5">

                        <p className="text-sm text-gray-500">
                          Expected Delivery
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#8b4934]">
                          {new Date(
                            `${order.deliveryDate}T00:00:00`
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {order.timeSlot}
                        </p>

                      </div>

                      {/* Delivery Address */}
                      <div className="mt-5 rounded-xl bg-white p-5">

                        <h4 className="font-bold text-[#43291f]">
                          Delivery Address
                        </h4>

                        <p className="mt-2 text-sm text-gray-600">
                          {order.customer.address}
                        </p>

                        <p className="text-sm text-gray-600">
                          {order.customer.city} - {order.customer.pincode}
                        </p>

                      </div>

                      <p className="mt-5 text-center text-xs text-gray-500">
                        Demo tracking: actual delivery updates will be
                        connected to the bakery management system later.
                      </p>

                    </div>
                  )}

                </section>
              );
            })}

          </div>
        )}

        {/* Continue Shopping */}
        

      </div>
    </main>
  );
}
