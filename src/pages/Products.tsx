import Product from "@components/eCommerce/Product";
import Loading from "@components/feedback/Loading";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCategoryPrefix,
  ProductsCleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const [searchParams] = useSearchParams();
  const catPrefix = searchParams.get("cat_prefix");

  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (catPrefix) {
      dispatch(actGetProductsByCategoryPrefix(catPrefix));
      return () => {
        dispatch(ProductsCleanUp());
      };
    }
  }, [dispatch, catPrefix]);

  return (
    <Loading status={loading} error={error ?? null} skeletonFor="products">
      <main className="min-h-screen bg-gray-50/70">
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:mb-10 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
                Explore our collection
              </p>

              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                {catPrefix
                  ? `${catPrefix.replace(/-/g, " ")} Products`
                  : "All Products"}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Discover products you'll love from our collection.
              </p>
            </div>

            <span className="w-fit rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600">
              {records.length} Products
            </span>
          </div>
          <div className="zoom-80">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {records.map((record) => (
                <Product key={record.id} {...record} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Loading>
  );
};
