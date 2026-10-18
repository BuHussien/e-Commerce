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

export const AppRouter = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <MainLayout />,
          errorElement: <Error />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "categories",
              element: <Categories />,
            },
            {
              path: "products",
              element: <Products />,
            },
            {
              path: "about-us",
              element: <AboutUs />,
            },
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
            {
              path: "cart",
              element: <Cart />
            }
          ],
        },
      ])}
    />
  );
};
