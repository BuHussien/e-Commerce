const CategoriesSkeleton = () => {
  return (
    <main className="min-h-screen bg-gray-50/70">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />

          <div className="h-8 w-56 animate-pulse rounded-lg bg-gray-200" />

          <div className="h-4 w-72 max-w-full animate-pulse rounded bg-gray-100" />

          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Categories Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              {/* Circular Image Skeleton */}
              <div className="h-32 w-32 animate-pulse rounded-full border border-gray-100 bg-gray-200 shadow-sm sm:h-40 sm:w-40" />

              {/* Category Title Skeleton */}
              <div className="mt-4 h-4 w-20 max-w-full animate-pulse rounded bg-gray-200 sm:w-24" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
export default CategoriesSkeleton;