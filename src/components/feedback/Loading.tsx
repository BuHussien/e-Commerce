import type { TLoading } from "@customTypes/shared";
import { type ReactNode } from "react";
import CategoriesSkeleton from "./CategoriesSkeleton";
import CartSkeleton from "./CartSkeleton";
import ProductsGridSkeleton from "./ProductsGridSkeleton";
import LottieHandler from "./LottieHandler";

interface IProps {
  status: TLoading;
  error: null | string;
  children: ReactNode;
  skeletonFor: "products" | "categories" | "cart" | "wishlist";
}

const Loading = ({ error, status, skeletonFor, children }: IProps) => {
  if (status === "pending") {
    if (skeletonFor === "products" || skeletonFor === "wishlist") {
      return <ProductsGridSkeleton />;
    }

    if (skeletonFor === "categories") {
      return <CategoriesSkeleton />;
    }
    if (skeletonFor === "cart") {
      return <CartSkeleton />;
    }
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 px-6 py-10">
          <LottieHandler type="error" message={error || `Server Error (500)`} />
          <p className="text-yellow-700 font-bold text-md">Try Again Later</p>
          <button className="mt-5 rounded-xl bg-red-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">
            Try again
          </button>
        </div>
      </section>
    );
  }
  return <>{children}</>;
};

export default Loading;
