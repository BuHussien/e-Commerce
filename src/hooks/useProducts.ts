import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCategoryPrefix,
  cleanUpProductsRecords,
} from "@store/products/productsSlice";
import { actGetAllProducts } from "@store/products/act/getAllProducts";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import actGetWishlists from "@store/wishlist/act/getWishlist";

const useProducts = () => {
  const [searchParams] = useSearchParams();
  const catPrefix = searchParams.get("cat_prefix");

  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);

  useEffect(() => {
    let promise;
    if (catPrefix) {
      promise = dispatch(actGetProductsByCategoryPrefix(catPrefix));
    } else {
      promise = dispatch(actGetAllProducts());
    }
    dispatch(actGetWishlists());
    return () => {
      dispatch(cleanUpProductsRecords());
      promise.abort();
    };
  }, [dispatch, catPrefix]);

  const wishlistItemsIds = useAppSelector((state) => state.wishlist.itemsIds);
      const isUserAccess: boolean = (useAppSelector(state => state.auth).accessToken) ? true : false;

  return { loading, error, records, catPrefix, wishlistItemsIds, isUserAccess };
};

export default useProducts;
