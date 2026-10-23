import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@components/common/Heading";
import Input from "@components/forms/Input";
import { Alert, Form } from "react-bootstrap";
import { Link, useSearchParams, useNavigate, Navigate } from "react-router-dom";
import { signInScheema, type signInType } from "@validation/signInSchema";
import type { TLoginForm } from "@customTypes/auth";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useEffect } from "react";
import actGetWishlists from "@store/wishlist/act/getWishlist";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("msg");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({ resolver: zodResolver(signInScheema) });

  const { accessToken, error, loading } = useAppSelector(
    (state) => state.auth,
  );

  const submitForm: SubmitHandler<signInType> = async (data: TLoginForm) => {
    if (searchParams.get("msg") === "account_created") setSearchParams("");
    try {
      await dispatch(actAuthLogin(data)).unwrap();
      navigate("/");
      dispatch(actGetWishlists());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);


  if(accessToken) return <Navigate to="/" />
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xl flex flex-col lg:flex-row my-auto">
      {/* LEFT COLUMN - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        {/* Header Heading */}
        <div className="mb-6">
          <Heading
            headTitle="Welcome Back"
            Title="Sign in to continue shopping your favorite products."
          />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto">
          <Form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            <Input
              label="email"
              placeholder="john.doe@example.com"
              type="email"
              register={register}
              name="email"
              error={errors.email?.message}
            />
            <Input
              label="password"
              placeholder="******"
              type="password"
              register={register}
              name="password"
              error={errors.password?.message}
            />

            {error && (
              <p className="text-red-500 m-2 flex flex-col">{`${error}`}</p>
            )}

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-800 text-white rounded-3xl! py-3 font-medium  mt-2 cursor-pointer disabled:bg-gray-500"
              disabled={loading === "pending"}
            >
              Login
            </button>

            <div className="flex justify-center items-center gap-1.5 pt-2 text-xs">
              <span className="text-gray-500">Don't have an account?</span>
              <Link
                to="/register"
                className="font-bold text-rose-600 hover:text-rose-700 no-underline!"
              >
                Create One
              </Link>
            </div>
          </Form>
        </div>
      </div>
      {/* RIGHT COLUMN - Brand Banner aligned with Header & Footer Theme */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-rose-600 via-rose-700 to-zinc-900 p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2">
          <span className="bg-white/20 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-md shadow-sm uppercase tracking-wider">
            NOOR STORE
          </span>
        </div>
        {searchParams.get("msg") === "account_created" && (
          <Alert
            variant="success"
            className="absolute top-0 right-0 w-auto max-w-md bg-blue-400"
          >
            Account created successfully. Try to log in.
          </Alert>
        )}
        <div className="relative z-10 space-y-4 max-w-lg">
          <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight text-white">
            Glad to Have You Back
          </h2>
          <p className="text-rose-100 text-sm leading-relaxed opacity-90">
            Log in to access your personal cart, saved wishlist items, order
            history, and exclusive member discount offers.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-6 text-xs text-rose-100 font-medium">
          <span>Fast Checkout</span>
          <span>•</span>
          <span>Track Orders</span>
          <span>•</span>
          <span>Exclusive Offers</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
