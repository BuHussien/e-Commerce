const ProductsGridSkeleton = () => {
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
};

export default ProductsGridSkeleton;
