import Heading from "@components/common/Heading";
import Product from "@components/eCommerce/Product";
import Loading from "@components/feedback/Loading";
import useProducts from "@hooks/useProducts";

export const Products = () => {
  const { catPrefix, error, loading, records, wishlistItemsIds } =
    useProducts();
  return (
    <Loading status={loading} error={error ?? null} skeletonFor="products">
      <main className="min-h-screen bg-gray-50/70">
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Heading
            headTitle="Explore our collection"
            Title={`${catPrefix ?? "All"} Products`}
            description="Discover products you'll love from our collection."
            recordsLength={`${records.length} product`}
          ></Heading>
          <div className="zoom-90">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {records.map((record) => (
                <Product
                  key={record.id}
                  {...record}
                  isLiked={wishlistItemsIds.includes(record.id)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Loading>
  );
};
