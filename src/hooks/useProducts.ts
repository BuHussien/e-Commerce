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
    if (catPrefix) {
      dispatch(actGetProductsByCategoryPrefix(catPrefix));
    } else {
      dispatch(actGetAllProducts());
    }
    dispatch(actGetWishlists());
    return () => {
      dispatch(cleanUpProductsRecords());
    };
  }, [dispatch, catPrefix]);

  const wishlistItemsIds = useAppSelector((state) => state.wishlist.itemsIds);
  return {loading, error, records, catPrefix, wishlistItemsIds};
};

export default useProducts;
