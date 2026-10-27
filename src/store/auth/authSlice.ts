import type { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import actUpdateUser from "./act/actUpdateUser";

interface IAuthState {
  loading: TLoading;
  error: string | null;
  accessToken: string | null;
  user: {
    email: string;
    firstname: string;
    lastname: string;
    confirmPassword: string;
    role: string;
    id: number;
  } | null;
}

const initialState: IAuthState = {
  error: null,
  loading: "idle",
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(actAuthRegister.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAuthRegister.fulfilled, (state) => {
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(actAuthRegister.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
      });
    // Login
    builder
      .addCase(actAuthLogin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAuthLogin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        state.accessToken = action.payload.data.accessToken;
        state.user = action.payload.data.user;
      })
      .addCase(actAuthLogin.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
      });
    // Update User
    builder
      .addCase(actUpdateUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdateUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.error = null;
        if (state.user && action.payload?.firstname !== undefined)
          state.user.firstname = action.payload.firstname;
        if (state.user && action.payload?.lastname !== undefined)
          state.user.lastname = action.payload.lastname;
      })
      .addCase(actUpdateUser.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string")
          state.error = action.payload;
      });
  },
});
export const { resetUI, logout } = authSlice.actions;
export { actAuthRegister, actAuthLogin };
export default authSlice.reducer;
