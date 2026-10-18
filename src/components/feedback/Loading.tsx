import type { TLoading } from "@customTypes/shared";
import { type ReactNode } from "react";

interface IProps {
  status: TLoading;
  error: null | string;
  children: ReactNode;
  skeletonFor: "products" | "categories";
}

const Loading = ({ error, status, skeletonFor, children }: IProps) => { 
  if (status ==="pending") {
    if (skeletonFor === "products")
      return (
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 py-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      );
    if (skeletonFor === "categories") {
      return (
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-72 max-w-full animate-pulse rounded bg-gray-100" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-full bg-gray-100"
              />
            ))}
          </div>
        </section>
      );
    }
  }

  if (status === "failed") {
    if (skeletonFor === "products")
      return (
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Something went wrong {error}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Failed to load products. Please try again.
          </p>
        </div>
      );
    if (skeletonFor === "categories")
      return (
        <section className="mx-auto max-w-7xl px-4 py-20 text-center">
          <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 px-6 py-10">
            <h2 className="text-lg font-bold text-gray-900">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We couldn't load the categories. Please try again later.
            </p>
            <button className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700">
              Try again
            </button>
          </div>
        </section>
      );
  }
  return <>{children}</>;
};

export default Loading;
