"use client";

import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actUpdateAddress from "@store/addresses/act/actUpdateAddress";
import type { AddressFormData } from "@customTypes/shared";

const inputClass =
  "w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-rose-500";

const AddressModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.address);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    defaultValues: {
      country: address.country,
      government: address.government,
      city: address.city,
      detailedAddress: address.detailedAddress,
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    try {
      await dispatch(actUpdateAddress(data)).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">Edit Address</h3>
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Country
              </label>
              <input
                {...register("country", { required: "Country is required" })}
                className={inputClass}
              />
              {errors.country && (
                <p className="text-[11px] text-rose-500 mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Government
              </label>
              <input
                {...register("government", {
                  required: "Government is required",
                })}
                className={inputClass}
              />
              {errors.government && (
                <p className="text-[11px] text-rose-500 mt-1">
                  {errors.government.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              City
            </label>
            <input
              {...register("city", { required: "City is required" })}
              className={inputClass}
            />
            {errors.city && (
              <p className="text-[11px] text-rose-500 mt-1">
                {errors.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Address
            </label>
            <textarea
              rows={2}
              {...register("detailedAddress", {
                required: "Detailed address is required",
              })}
              className={`${inputClass} resize-none`}
            />
            {errors.detailedAddress && (
              <p className="text-[11px] text-rose-500 mt-1">
                {errors.detailedAddress.message}
              </p>
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
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
