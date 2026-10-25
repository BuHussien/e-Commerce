import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetOrders from "@store/orders/act/actGetOrders";
import { type TOrderItem } from "@customTypes/order";
import Heading from "@components/common/Heading";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { error, loading, orderList } = useAppSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState<TOrderItem | null>(null);

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  if (loading === "pending") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600 font-medium animate-pulse">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
        <p className="text-red-700 font-medium">Error loading orders</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!orderList.length) {
    return (
      <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 max-w-lg mx-auto my-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          📦
        </div>
        <h3 className="text-lg font-bold text-slate-800">No Orders Yet</h3>
        <p className="text-slate-500 text-sm mt-1">
          You haven't placed any orders with us yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <Heading
          headTitle={" My Orders"}
        />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Order Number</th>
                <th className="py-4 px-6 text-center">Items Count</th>
                <th className="py-4 px-6 text-center">Subtotal</th>
                <th className="py-4 px-6 text-center">Products Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {orderList.map((order: TOrderItem) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    <span className="text-indigo-600">#{order.id}</span>
                  </td>
                  <td className="py-4 px-6 text-center text-slate-600 font-medium">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-emerald-600">
                    $
                    {typeof order.subTotal === "number"
                      ? order.subTotal.toFixed(2)
                      : order.subTotal}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-roseo-800 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
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

      {/* Modal - Details Popup */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Order Details{" "}
                  <span className="text-indigo-600">#{selectedOrder.id}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Total:{" "}
                  <strong className="text-emerald-600">
                    $
                    {typeof selectedOrder.subTotal === "number"
                      ? selectedOrder.subTotal.toFixed(2)
                      : selectedOrder.subTotal}
                  </strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-200/60 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Items List */}
            <div className="p-6 max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
              {selectedOrder.items.map((product, idx) => (
                <div
                  key={`${selectedOrder.id}-${product.id}-${idx}`}
                  className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    {product.img ? (
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 bg-slate-50"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-xs">
                        No image
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">
                        {product.title}
                      </h4>
                      {product.cat_prefix && (
                        <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded mt-1">
                          {product.cat_prefix}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="font-bold text-slate-900 text-sm">
                    ${product.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
