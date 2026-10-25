import { useAppDispatch } from "@store/hooks";
import CheckoutModal from "./CheckoutModal";
import { useNavigate } from "react-router-dom";
import actPlaceOrder from "@store/orders/act/actPlaceOrder";
import { emptyCart } from "@store/cart/cartSlice";
import { useState } from "react";

interface IProps {
  totalQuantity: number;
  subtotal: number;
  shipping: number;
  total: number;
  useAccessToken: string | null;
}

const CartSummary = ({ shipping, subtotal, total, totalQuantity, useAccessToken }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmitHandler = async () => {
    try {
      await dispatch(
        actPlaceOrder({ subTotal: subtotal, shipping: shipping }),
      ).unwrap();
      setIsSuccess(true);

      setTimeout(() => {
        dispatch(emptyCart());
        navigate("/me/orders");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="animate-bounce text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-gray-900">
          Order Placed Successfully!
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Redirecting to home page...
        </p>
      </div>
    );
  }

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

      {useAccessToken ? (
        <CheckoutModal
          subtotal={subtotal}
          shippingFees={shipping}
          onSubmit={onSubmitHandler}
        />
      ) : (
        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-gray-400 px-5 py-3.5 text-sm font-semibold text-black shadow-sm transition hover:bg-gray-500 active:scale-[0.99]"
          disabled
        >
          Login to checkOut
          <span className="ml-2">→</span>
        </button>
      )}

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
