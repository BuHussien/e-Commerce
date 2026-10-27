import { useState } from "react";
import type { TOrder } from "@customTypes/order";

interface DashboardOrdersTableProps {
  orders: TOrder[];
}

const DashboardOrdersTable = ({ orders }: DashboardOrdersTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3.5">Order ID</th>
                <th className="px-6 py-3.5">User ID</th>
                <th className="px-6 py-3.5">Items Count</th>
                <th className="px-6 py-3.5">Total Price</th>
                <th className="px-6 py-3.5 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4">#{order.userId}</td>
                  <td className="px-6 py-4">{order.items?.length || 0} items</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${order.total?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-950">Order Details</h3>
                <p className="text-xs text-gray-500">
                  Order ID: #{selectedOrder.id} | User ID: #{selectedOrder.userId}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Ordered Products
              </div>
              <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto rounded-xl border border-gray-100 p-3">
                {selectedOrder.items?.map((item: any, index: number) => {
                  const itemPrice = parseFloat(item.price) || 0;
                  const itemTotal = itemPrice * (item.qnt || 1);
                  return (
                    <div key={index} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.img && (
                          <img
                            src={item.img}
                            alt={item.title}
                            className="h-10 w-10 rounded-lg object-cover border border-gray-100"
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500">Qty: {item.qnt}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        ${itemTotal.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-1.5 pt-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${selectedOrder.subTotal?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>${selectedOrder.shipping?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-base font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-pink-600">
                    ${selectedOrder.total?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-xl bg-pink-600 px-4 py-2 text-xs font-semibold text-white hover:bg-pink-700 transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardOrdersTable;
