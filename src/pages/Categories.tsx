import Category from "@components/eCommerce/Category";
import { Link } from "react-router-dom";
import Loading from "@components/feedback/Loading";
import Heading from "@components/common/Heading";
import useCategories from "@hooks/useCategories";
export const Categories = () => {
  const { error, loading, records } = useCategories();
  return (
    <Loading error={error ?? null} status={loading} skeletonFor="categories">
      <main className="min-h-screen bg-gray-50/70">
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {/* Header */}
          <Heading
            headTitle="Explore our collection"
            Title="Shop by Category"
            description="Discover the products you love by exploring our collections."
            recordsLength={`${records.length} Categories`}
          />

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            {records.map((record) => (
              <Link
                className="no-underline! text-gray-700!"
                key={record.id}
                to={`/products?cat_prefix=${encodeURIComponent(record.prefix)}`}
              >
                <Category {...record} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Loading>
  );
};
