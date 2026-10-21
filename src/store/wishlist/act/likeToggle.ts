import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";

type TLikeToggleResponse = {
  type: "add" | "remove";
  id: number;
};

const actLikeToggle = createAsyncThunk<
  TLikeToggleResponse,
  number,
  { rejectValue: string }
>("wishlist/actLikeToggle", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `/wishlist?userId=1&productId=${id}`,
    );

    if (response.data.length > 0) {
      await axiosInstance.delete(`/wishlist/${response.data[0].id}`);
      return { type: "remove", id };
    }

    await axiosInstance.post("/wishlist", {
      userId: 1,
      productId: id,
    });

    return { type: "add", id };
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }
});

export default actLikeToggle;
