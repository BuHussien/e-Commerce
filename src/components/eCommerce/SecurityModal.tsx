"use client";

import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actUpdateUser from "@store/auth/act/actUpdateUser";
import { type SecurityFormData } from "@customTypes/shared"

const inputClass = "w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500";

const SecurityModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<SecurityFormData>({
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SecurityFormData) => {
    try {
      await dispatch(actUpdateUser(data)).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">Login & Security</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
              <input
                {...register("firstname", { required: "First name is required" })}
                className={inputClass}
              />
              {errors.firstname && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.firstname.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
              <input
                {...register("lastname", { required: "Last name is required" })}
                className={inputClass}
              />
              {errors.lastname && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.lastname.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep current"
              {...register("password")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                validate: (value) =>
                  !getValues("password") ||
                  value === getValues("password") ||
                  "Passwords do not match",
              })}
              className={inputClass}
            />
            {errors.confirmPassword && (
              <p className="text-[11px] text-rose-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition shadow-sm shadow-rose-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecurityModal;