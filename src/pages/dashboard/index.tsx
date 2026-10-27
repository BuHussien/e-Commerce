import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCategories from "@store/categories/atc/actGetCategories";
import actGetAllOrders from "@store/orders/act/actGetAllOrders";
import actGetAllProducts from "@store/products/act/actGetAllProducts";

interface IProps {}

const AdminDashboard = ({}: IProps) => {
  const dispatch = useAppDispatch();
  const { totalItems } = useAppSelector((state) => state.products);
  const { records: categories } = useAppSelector((state) => state.categories);
  const { allOrders: orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(actGetAllProducts({}));
    dispatch(actGetCategories());
    dispatch(actGetAllOrders());
  }, [dispatch]);

  // Calculate total revenue from all orders
  const totalRevenue = orders?.reduce(
    (acc, order) => acc + (order.total || 0),
    0,
  );

  // Get recent 5 orders
  const recentOrders = orders ? [...orders].reverse().slice(0, 5) : [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-xs text-gray-500">
          Here is a quick summary of your store's performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Products
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {totalItems}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        </div>

        {/* Total Categories */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Categories
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {categories.length}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
        </div>

        {/* Total Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Orders
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {orders?.length}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Revenue
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              ${totalRevenue?.toFixed(2)}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">Recent Orders</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-gray-500 text-xs"
                  >
                    No recent orders available.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3.5 font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-4 py-3.5">#{order.userId}</td>
                    <td className="px-4 py-3.5">
                      {order.items?.length || 0} items
                    </td>
                    <td className="px-4 py-3.5 text-center font-semibold text-gray-900">
                      ${order.total?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
