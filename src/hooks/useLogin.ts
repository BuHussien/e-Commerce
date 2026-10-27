import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import { signInScheema, type signInType } from "@validation/signInSchema";
import type { TLoginForm } from "@customTypes/auth";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useEffect } from "react";
import actGetWishlists from "@store/wishlist/act/actGetWishlist";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("msg");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({ resolver: zodResolver(signInScheema) });
  const { accessToken, error, loading } = useAppSelector((state) => state.auth);

  const submitForm: SubmitHandler<signInType> = async (data: TLoginForm) => {
    if (searchParams.get("msg") === "account_created") setSearchParams("");
    try {
      await dispatch(actAuthLogin(data)).unwrap();
      const user = await dispatch(actAuthLogin(data)).unwrap();

      if ( user.data.user?.role === "admin" || user.data.user?.role === "greatAdmin"){
        navigate("/dashboard");
      }else{
        navigate("/");
        dispatch(actGetWishlists());
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return { accessToken, handleSubmit, submitForm, error, loading, errors, register, searchParams};
};
