import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetOrders from "@store/orders/act/actGetOrders";
import actGetWishlists from "@store/wishlist/act/getWishlist";
import actGetAddress from "@store/addresses/act/actGetAddress";

export const useProfileData = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const wishlistCount = useAppSelector((state) => state.wishlist.itemsIds.length);
  const ordersCount = useAppSelector((state) => state.orders.orderList.length);
  const address = useAppSelector((state) => state.address);

  useEffect(() => {
    dispatch(actGetOrders());
    dispatch(actGetWishlists());
    dispatch(actGetAddress());
  }, [dispatch]);

  return { user, wishlistCount, ordersCount, address };
};