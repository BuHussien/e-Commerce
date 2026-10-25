import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import type { RootState } from "@store/index";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";
import type { TAddressItem } from "./actGetAddress";

type TAddressPayload = Omit<TAddressItem, "userId" | "id">;

export const actUpdateAddress = createAsyncThunk<
  TAddressItem,
  TAddressPayload,
  { rejectValue: string }
>(
  "address/actUpdateAddress",
  async (addressData, { rejectWithValue, getState }) => {
    try {
      const { auth, address } = getState() as RootState;
      const userId = auth.user?.id;
      if (!userId || !auth.accessToken) {
        return rejectWithValue("User is not authenticated");
      }
      if (address.id) {
        const response = await axiosInstance.patch<TAddressItem>(`/addresses/${address.id}`,{...addressData,userId});
        return response.data;
      }
      const response = await axiosInstance.post<TAddressItem>("/addresses", {
        ...addressData,
        userId,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actUpdateAddress;
