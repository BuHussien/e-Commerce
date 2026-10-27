import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";
import type { TUser } from "@customTypes/user";

type TUserRole = "admin" | "user" | "greatAdmin";

interface IUpdateUserRole {
  id: number;
  role: TUserRole;
}

const actUpdateUserRole = createAsyncThunk<
  TUser,
  IUpdateUserRole,
  { rejectValue: string }
>(
  "users/actUpdateUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch<TUser>(`/users/${id}`, {
        role,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actUpdateUserRole;