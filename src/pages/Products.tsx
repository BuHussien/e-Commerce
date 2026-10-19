import Heading from "@components/common/Heading";
import Product from "@components/eCommerce/Product";
import Loading from "@components/feedback/Loading";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCategoryPrefix,
  ProductsCleanUp,
} from "@store/products/productsSlice";
import { actGetAllProducts } from "@store/products/act/getAllProducts";
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
    } else {
      dispatch(actGetAllProducts());
    }

    return () => {
      dispatch(ProductsCleanUp());
    };
  }, [dispatch, catPrefix]);

  return (
    <Loading status={loading} error={error ?? null} skeletonFor="products">
      <main className="min-h-screen bg-gray-50/70">
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Heading
            headTitle="Explore our collection"
            Title={`${catPrefix ?? 'All'} Products`}
            description="Discover products you'll love from our collection."
            recordsLength={`${records.length} product`}
          ></Heading>
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
