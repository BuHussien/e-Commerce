import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import type { RootState } from "@store/index";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

export type TAddressItem = {
  id?: number;
  userId: number;
  country: string;
  government: string;
  city: string;
  detailedAddress: string;
};

export const actGetAddress = createAsyncThunk<
  TAddressItem,
  void,
  { rejectValue: string }
>("address/actGetAddress", async (_, { rejectWithValue, getState }) => {
  try {
    const { auth } = getState() as RootState;
    const response = await axiosInstance.get<TAddressItem[]>(`/addresses?userId=${auth.user?.id}`);

    return response.data[0] || {
      userId: auth.user?.id || 0,
      country: "",
      government: "",
      city: "",
      detailedAddress: "",
    };
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }
});

export default actGetAddress;
