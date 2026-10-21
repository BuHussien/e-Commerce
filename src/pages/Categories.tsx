import Category from "@components/eCommerce/Category";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "../store/categories/atc/getCategories";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "@components/feedback/Loading";
import Heading from "@components/common/Heading";
import { cleanUpCategoriesRecords } from "@store/categories/categoriesSlice";
export const Categories = () => {
  const dispatch = useAppDispatch();

  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
    return () => {
      dispatch(cleanUpCategoriesRecords());
    };
  }, [dispatch]);

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