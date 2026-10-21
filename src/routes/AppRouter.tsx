import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "@layouts/MainLayout";
const Home = lazy(() => import("@pages/Home").then(({ Home }) => ({ default: Home })));
const Categories = lazy(() => import("@pages/Categories").then(({ Categories }) => ({default: Categories,})));
const Products = lazy(() => import("@pages/Products").then(({ Products }) => ({default: Products,})));
const AboutUs = lazy(() =>import("@pages/AboutUs").then(({ AboutUs }) => ({default: AboutUs})));
const Login = lazy(() =>import("@pages/Login").then(({ Login }) => ({ default: Login })));
const Register = lazy(() =>import("@pages/Register").then(({ Register }) => ({default: Register})));
const Error = lazy(() =>import("@pages/Error").then(({ Error }) => ({ default: Error })));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"))


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
