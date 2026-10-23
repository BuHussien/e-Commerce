import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister } from "@store/auth/authSlice";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { signUpScheema, type signUpType } from "@validation/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import type { TRegisterForm } from "@customTypes/auth";

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    trigger,
  } = useForm<signUpType>({
    resolver: zodResolver(signUpScheema),
    mode: "all",
  });
  const {
    checkEmailAvailability,
    emailAvailabilityStatus,
    enteredEmail,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    const value = e.target.value;

    if (isDirty && !invalid && enteredEmail !== value) {
      await checkEmailAvailability(value);
    }
    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };
  const submitForm: SubmitHandler<signUpType> = async (data: TRegisterForm) => {
    await dispatch(actAuthRegister(data))
      .unwrap()
      .then(() => {
        navigate("/login?msg=account_created");
      });
  };
  return {accessToken,register, handleSubmit, error, errors, emailAvailabilityStatus, emailOnBlurHandler, submitForm, loading};
};
