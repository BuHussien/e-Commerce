import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "@pages/Error";
import MainLayout from "@layouts/MainLayout";
const Home = lazy(() => import("@pages/Home").then(({ Home }) => ({ default: Home })));
const Categories = lazy(() => import("@pages/Categories").then(({ Categories }) => ({default: Categories,})));
const Products = lazy(() => import("@pages/Products").then(({ Products }) => ({default: Products,})));
const AboutUs = lazy(() =>import("@pages/AboutUs").then(({ AboutUs }) => ({default: AboutUs})));
const Login = lazy(() =>import("@pages/Login").then(({ Login }) => ({ default: Login })));
const Register = lazy(() =>import("@pages/Register").then(({ Register }) => ({default: Register})));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"))


import { useAppDispatch } from "@store/hooks";
import actGetWishlists from "@store/wishlist/act/getWishlist";
import { useEffect } from "react";
import Contact from "@pages/contact";
import PageSuspenseFallback from "@components/feedback/PageSuspenseFallback";
import ProtectedRoutes from "@components/auth/ProtectedRoutes";
import ProductDetails from "@pages/ProductDetails";
import Profile from "@pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <PageSuspenseFallback> <Categories /> </PageSuspenseFallback>},
      { path: "products", element: <PageSuspenseFallback> <Products /> </PageSuspenseFallback>},
      { path: `products/:id`, element: <PageSuspenseFallback> <ProductDetails /> </PageSuspenseFallback>},
      { path: "about-us", element: <PageSuspenseFallback> <AboutUs /> </PageSuspenseFallback>},
      { path: "login", element: <PageSuspenseFallback> <Login /> </PageSuspenseFallback>},
      { path: "register", element: <PageSuspenseFallback> <Register /> </PageSuspenseFallback>},
      { path: "cart", element: <PageSuspenseFallback> <Cart /> </PageSuspenseFallback>},
      {path: "contact", element: <PageSuspenseFallback> <Contact /> </PageSuspenseFallback>},
      { path: "wishlist", element: <ProtectedRoutes><PageSuspenseFallback> <Wishlist /> </PageSuspenseFallback></ProtectedRoutes>},
      { path: "profile", element: <ProtectedRoutes><PageSuspenseFallback> <Profile /> </PageSuspenseFallback></ProtectedRoutes>},
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
