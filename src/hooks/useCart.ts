import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import getProductsFullInfo from "@store/cart/getProductsFullInfo";
import { cleanCartProductsFullInfo } from "@store/cart/cartSlice";
const useCart = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart,
  );
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

  return {loading, error, productsFullInfo, total,totalQuantity,shipping,subtotal};
};

export default useCart;
