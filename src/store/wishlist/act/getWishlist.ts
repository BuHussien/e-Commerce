import { createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import type { RootState } from "@store/index";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

type TWishlistItem = {
  id: number;
  userId: number;
  productId: number;
};

export const actGetWishlists = createAsyncThunk<
  number[],
  void,
  { rejectValue: string }
>("wishlist/actGetWishlists", async (_, { rejectWithValue }) => {
  try {
    const response =
      await axiosInstance.get<TWishlistItem[]>("/wishlist?userId=1");
    return response.data.map((item) => item.productId);
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }
});

export default actGetWishlists;

const getTotalWishlistQntSelector = createSelector(
  [(state: RootState) => state.wishlist.itemsIds],
  (items) => items.length,
);

export { getTotalWishlistQntSelector };
