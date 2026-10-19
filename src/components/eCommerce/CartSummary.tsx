interface IProps {
  totalQuantity: number;
  subtotal: number;
  shipping: number;
  total: number;
}

const CartSummary = ({shipping,subtotal,total,totalQuantity}: IProps) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Subtotal ({totalQuantity} items)
          </span>
          <span className="font-medium text-gray-900">${subtotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium text-gray-900">${shipping}</span>
        </div>

        <div className="border-t border-dashed border-gray-200 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-rose-600">${total}</span>
          </div>
          <p className="mt-1 text-right text-xs text-gray-400">
            Including shipping
          </p>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-rose-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 active:scale-[0.99]"
      >
        Proceed to Checkout
        <span className="ml-2">→</span>
      </button>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-4 w-4"
        >
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        Secure checkout
      </div>
    </div>
  );
};

export default CartSummary;
