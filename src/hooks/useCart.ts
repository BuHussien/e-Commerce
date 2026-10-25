import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import getProductsFullInfo from "@store/cart/act/actGetProductsFullInfo";
import { cleanCartProductsFullInfo } from "@store/cart/cartSlice";
const useCart = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector((state) => state.cart);
  const useAccessToken = useAppSelector(state => state.auth.accessToken);
  useEffect(() => {
    dispatch(getProductsFullInfo());
    return () => {
      dispatch(cleanCartProductsFullInfo());
    };
  }, [dispatch]);
  const subtotal = productsFullInfo.reduce(
    (total, obj) => total + Number(obj.product.price) * obj.qnt,
    0,
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;
  const totalQuantity = productsFullInfo.reduce(
    (total, obj) => total + obj.qnt,
    0,
  );

  return {loading, error, productsFullInfo,useAccessToken, total,totalQuantity,shipping,subtotal};
};

export default useCart;
