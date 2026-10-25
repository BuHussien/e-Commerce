import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@customTypes/shared";
import { logout } from "@store/auth/authSlice";
import actGetAddress from "./act/actGetAddress";
import actUpdateAddress from "./act/actUpdateAddress";

interface IAddressState {
  id: number | null;
  country: string;
  government: string;
  city: string;
  detailedAddress: string;
  loading: TLoading;
  error: string | null;
}

const initialState: IAddressState = {
  id: null,
  country: "",
  government: "",
  city: "",
  detailedAddress: "",
  loading: "idle",
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddress: (state) => {
      state.id = null;
      state.country = "";
      state.government = "";
      state.city = "";
      state.detailedAddress = "";
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Address
    builder.addCase(actGetAddress.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetAddress.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.id = action.payload.id || null;
      state.country = action.payload.country;
      state.government = action.payload.government;
      state.city = action.payload.city;
      state.detailedAddress = action.payload.detailedAddress;
    });
    builder.addCase(actGetAddress.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // Update Address
    builder.addCase(actUpdateAddress.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actUpdateAddress.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.id = action.payload.id || null;
      state.country = action.payload.country;
      state.government = action.payload.government;
      state.city = action.payload.city;
      state.detailedAddress = action.payload.detailedAddress;
    });
    builder.addCase(actUpdateAddress.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // Logout reset
    builder.addCase(logout, (state) => {
      state.id = null;
      state.country = "";
      state.government = "";
      state.city = "";
      state.detailedAddress = "";
      state.loading = "idle";
      state.error = null;
    });
  },
});

export default addressSlice.reducer;
export { actGetAddress, actUpdateAddress };
export const { clearAddress } = addressSlice.actions;
