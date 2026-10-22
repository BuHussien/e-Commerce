import { useForm, type SubmitHandler } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import Heading from "@components/common/Heading";
import Input from "@components/forms/Input";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {signUpScheema,type signUpType} from "@validation/signUpSchema"
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import SuccessSVG from "@assets/svg/success.svg?react";
import LockSVG from "@assets/svg/lock.svg?react";

export const Register = () => {
  const { register, handleSubmit, formState: {errors}, getFieldState, trigger } = useForm<signUpType>({resolver: zodResolver(signUpScheema), mode:"all"});
  const {checkEmailAvailability, emailAvailabilityStatus, enteredEmail, resetCheckEmailAvailability} = useCheckEmailAvailability();
  const emailOnBlurHandler = async(e: React.FocusEvent<HTMLInputElement>) => {
    await trigger('email');
    const {isDirty,invalid} = getFieldState("email");
    const value = e.target.value;

    if(isDirty && !invalid && enteredEmail !== value){
      await checkEmailAvailability(value);
    }
    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  }
  const submitForm: SubmitHandler<signUpType> = (data) => console.log('submited');
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xl flex flex-col lg:flex-row my-auto">
      {/* LEFT COLUMN - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        {/* Header Heading */}
        <div className="mb-1">
          <Heading
            headTitle="Create Account"
            Title="Sign up to start shopping your favorite products."
          />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto">
          <Form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            <div className="flex gap-4">
              <Input styles="w-1/2" label="first name" placeholder="John" type="text" register={register} name="firstname" error={errors.firstname?.message}/>
              <Input styles="w-1/2" label="last name" placeholder="Doe" type="text" register={register} name="lastname" error={errors.lastname?.message}/>
            </div>
            <Input
              label="email" 
              placeholder="john.doe@example.com" 
              type="email" 
              register={register} 
              name="email" 
              error={emailAvailabilityStatus === 'notAvailable' ? 'taken email, try another one' : errors.email?.message} 
              onBlur={emailOnBlurHandler}
              afterOnBlurOperationSuccessOrFailed={emailAvailabilityStatus === "available" ? <SuccessSVG /> : <LockSVG/>}
            />
            <Input label="password" placeholder="******" type="password" register={register} name="password" error={errors.password?.message}/>
            <Input label="confirm Password" placeholder="******" type="password" register={register} name="confirmPassword" error={errors.confirmPassword?.message}/>
            
            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-800 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed text-white rounded-3xl! py-3 font-medium mt-2 cursor-pointer"
              disabled = {emailAvailabilityStatus === 'notAvailable' || !!errors.firstname || !!errors.lastname || !!errors.email || !!errors.password || !!errors.confirmPassword}
            >
              Register
            </button>

            <div className="flex justify-center items-center gap-1.5 pt-2 text-xs">
              <span className="text-gray-500">Already have an account?</span>
              <Link
                to="/login"
                className="font-bold text-rose-600 hover:text-rose-700 no-underline!"
              >
                Login
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

        <div className="relative z-10 space-y-4 max-w-lg">
          <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight text-white">
            Welcome to <span className="text-yellow-300">NOOR</span> Store
          </h2>
          <p className="text-rose-100 text-sm leading-relaxed opacity-90">
            Create an account today to discover top products, save items to your
            wishlist, and enjoy seamless checkout experiences.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-6 text-xs text-rose-100 font-medium">
          <span>Fast Delivery</span>
          <span>•</span>
          <span>Secure Shopping</span>
          <span>•</span>
          <span>Quality Assured</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
