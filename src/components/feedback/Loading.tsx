import type { TLoading } from "@customTypes/shared";
import { type ReactNode } from "react";

interface IProps {
  status: TLoading;
  error: null | string;
  children: ReactNode;
  skeletonFor: "products" | "categories" | "cart" | "wishlist";
}

const Loading = ({ error, status, skeletonFor, children }: IProps) => {
  if (status === "pending") {
    if (skeletonFor === "products" || skeletonFor === "wishlist")
      return (
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-72 max-w-full animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-8 w-200 animate-pulse rounded-lg bg-gray-200" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-20">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        </section>
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
    if (skeletonFor === "cart") {
      return (
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Heading Skeleton */}
          <div className="mb-8 border-b border-gray-100 pb-6">
            <div className="mb-3 h-3 w-36 animate-pulse rounded bg-gray-200" />
            <div className="flex items-center justify-between gap-4">
              <div className="h-9 w-56 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-7 w-20 animate-pulse rounded-full bg-gray-100" />
            </div>
            <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Cart Items Skeleton */}
            <section>
              <div className="mb-3 hidden grid-cols-[minmax(0,1fr)_110px_100px] gap-4 px-4 sm:grid">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
                <div className="mx-auto h-3 w-16 animate-pulse rounded bg-gray-100" />
                <div className="ml-auto h-3 w-12 animate-pulse rounded bg-gray-100" />
              </div>

              <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white px-4 sm:px-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_110px_100px] sm:items-center sm:gap-4"
                  >
                    <div className="flex gap-4">
                      <div className="h-24 w-24 shrink-0 animate-pulse rounded-xl bg-gray-100 sm:h-28 sm:w-28" />

                      <div className="flex flex-1 flex-col gap-3 py-2">
                        <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                        <div className="h-4 w-40 max-w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                        <div className="mt-2 h-3 w-12 animate-pulse rounded bg-gray-100" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-center">
                      <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
                    </div>

                    <div className="flex items-center justify-between sm:justify-end">
                      <div className="h-4 w-16 animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 h-4 w-32 animate-pulse rounded bg-gray-100" />
            </section>

            {/* Order Summary Skeleton */}
            <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-7 h-6 w-36 animate-pulse rounded bg-gray-200" />

              <div className="space-y-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}

                <div className="border-t border-dashed border-gray-200 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-12 animate-pulse rounded bg-gray-100" />
                    <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </div>

              <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-rose-100" />
              <div className="mx-auto mt-5 h-3 w-28 animate-pulse rounded bg-gray-100" />
            </aside>
          </div>
        </main>
      );
    }
  }

  if (status === "failed") {
      return (
        <section className="mx-auto max-w-7xl px-4 py-20 text-center">
          <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 px-6 py-10">
            <h2 className="text-lg font-bold text-gray-900">
              {error || "Something went wrong"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We couldn't load the {skeletonFor}. Please try again later.
            </p>
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
