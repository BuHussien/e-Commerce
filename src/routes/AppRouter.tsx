import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@pages/Home";
import { Categories } from "@pages/Categories";
import { Products } from "@pages/Products";
import { AboutUs } from "@pages/AboutUs";
import { Login } from "@pages/Login";
import { Register } from "@pages/Register";
import MainLayout from "@layouts/MainLayout";
import { Error } from "@pages/Error";
import Cart from "@pages/Cart";
import Wishlist from "@pages/Wishlist";
import { useAppDispatch } from "@store/hooks";
import actGetWishlists from "@store/wishlist/act/getWishlist";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "products", element: <Products /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <Wishlist /> },
    ],
  },
]);

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  // Fetch Wishlists from DB
  useEffect(() => {
    dispatch(actGetWishlists());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};
