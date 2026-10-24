import Modal from "@components/common/Modal";
import DeliverySVG from "@assets/svg/delivery.svg?react";

interface IProps {
  subtotal: number;
  shippingFees?: number;
  onSubmit: () => void;
}

const CheckoutModal = ({ subtotal, shippingFees, onSubmit }: IProps) => {
  return (
    <Modal
      title="Proceed to Checkout→"
      confirmBtnTxt="Place Order"
      cancelBtnTxt="Cancel"
      onConfirm={onSubmit}
    >
      <div className="space-y-3">
        {/* Order Summary Card */}
        <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Order subtotal</span>
            <span className="font-medium text-slate-800">${subtotal}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Shipping</span>
            <span className="font-semibold text-pink-600">
              $ {shippingFees || "Free"}
            </span>
          </div>

          <div className="border-t border-rose-100" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">Total</span>
            <span className="text-lg font-bold text-pink-600">
              ${subtotal + (shippingFees ? shippingFees : 0)}
            </span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
            <DeliverySVG />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-800">
              Delivery to your address
            </p>
            <p className="text-[11px] text-slate-400">
              Please review before confirming your order.
            </p>
          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="text-center text-[11px] text-slate-400">
          By confirming, you agree to proceed with your order.
        </p>
      </div>
    </Modal>
  );
};
export default CheckoutModal;
