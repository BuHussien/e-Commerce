import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCategoryPrefix,
  cleanUpProductsRecords,
} from "@store/products/productsSlice";
import { actGetAllProducts } from "@store/products/act/actGetAllProducts";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import actGetWishlists from "@store/wishlist/act/actGetWishlist";

const useProducts = () => {
  const [searchParams] = useSearchParams();
  const catPrefix = searchParams.get("cat_prefix");

  const dispatch = useAppDispatch();
  const { loading, error, records, totalItems } = useAppSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [catPrefix]);

  useEffect(() => {
    let promise;
    if (catPrefix) {
      promise = dispatch(
        actGetProductsByCategoryPrefix(catPrefix)
      );
    } else {
      promise = dispatch(actGetAllProducts({ page: currentPage, limit: itemsPerPage }));
    }
    dispatch(actGetWishlists());

    return () => {
      dispatch(cleanUpProductsRecords());
      promise.abort();
    };
  }, [dispatch, catPrefix, currentPage]);

  const totalPages = Math.ceil((totalItems || records.length) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const wishlistItemsIds = useAppSelector((state) => state.wishlist.itemsIds);
  const isUserAccess: boolean = useAppSelector((state) => state.auth.accessToken) ? true : false;

  return {
    loading,
    error,
    records,
    catPrefix,
    wishlistItemsIds,
    isUserAccess,
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    totalItems,
    setCurrentPage,
  };
};

export default useProducts;
