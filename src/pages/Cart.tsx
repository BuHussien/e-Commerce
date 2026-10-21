import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import getProductsFullInfo from "@store/cart/getProductsFullInfo";
import Heading from "@components/common/Heading";
import { Link } from "react-router-dom";
import CartItem from "@components/eCommerce/CartItem";
import CartSummary from "@components/eCommerce/CartSummary";
import Loading from "@components/feedback/Loading";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  );
  useEffect(() => {
    dispatch(getProductsFullInfo());
  }, [dispatch]);
  const subtotal = productsFullInfo.reduce(
    (total, obj) => total + Number(obj.product.price) * obj.qnt,
    0,
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;
  const totalQuantity = productsFullInfo.reduce(
    (total, obj) => total + obj.qnt,
    0,
  );

  return (
    <Loading status={loading} error={error} skeletonFor="cart">
      {productsFullInfo.length === 0 ? (
        <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/products"
            className="mt-6 rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
          >
            Start shopping
          </Link>
        </main>
      ) : (
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <Heading
            headTitle="Your shopping bag"
            Title="Shopping Cart"
            recordsLength={`${totalQuantity} items`}
            description="Review your items and get ready to checkout."
          />
          <div className="zoom-90 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Cart Items */}
            <section>
              <div className="mb-3 hidden grid-cols-[minmax(0,1fr)_110px_100px] gap-4 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400 sm:grid">
                <span>Product</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white px-4 sm:px-5">
                {productsFullInfo.map((obj) => (
                  <CartItem
                    key={obj.product.id}
                    product={obj.product}
                    qnt={obj.qnt}
                  />
                ))}
              </div>

              <Link
                to="/products"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-rose-600"
              >
                <span>←</span>
                Continue shopping
              </Link>
            </section>

            {/* Order Summary */}
            <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-30">
              <CartSummary
                shipping={shipping}
                subtotal={subtotal}
                total={total}
                totalQuantity={totalQuantity}
              />
            </aside>
          </div>
        </main>
      )}
    </Loading>
  );
};

export default Cart;
