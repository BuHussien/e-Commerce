import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetAllProducts from "@store/products/act/actGetAllProducts";
import { useEffect } from "react";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetAllProducts());
  }, [dispatch]);

  // this fetch all products which is performance issue ('FIX IT Later')
  const { records, loading, error } = useAppSelector((state) => state.products);

  const wishlistItemsIds = useAppSelector((state) => state.wishlist.itemsIds);

  const wishlistProducts = records.filter((product) =>
    wishlistItemsIds.includes(product.id),
  );
  const isUserAccess: boolean = (useAppSelector(state => state.auth).accessToken) ? true : false;
  return { loading, error, wishlistProducts, isUserAccess };
};

export default useWishlist;
