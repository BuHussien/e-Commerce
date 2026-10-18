import Category from "@components/eCommerce/Category";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "../store/categories/atc/getCategories";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "@components/feedback/Loading";

export const Categories = () => {
  const dispatch = useAppDispatch();

  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

  return (
    <Loading error={error??null}status={loading} skeletonFor="categories">
      <main className="min-h-screen bg-gray-50/70">
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-3 sm:mb-10 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-pink -600">
                Explore our collection
              </p>

              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Shop by Category
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Discover the products you love by exploring our collections.
              </p>
            </div>

            <span className="w-fit rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600">
              {records.length} Categories
            </span>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
            {records.map((record) => (
              <Link
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
