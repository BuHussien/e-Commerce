import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@services/axios-global";

type TLikeToggleResponse = {
  type: "add" | "remove";
  id: number;
};

const actLikeToggle = createAsyncThunk< TLikeToggleResponse, number, { rejectValue: string }
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
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }

    return rejectWithValue("An unexpected error");
  }
});

export default actLikeToggle;
