import { createSlice } from "@reduxjs/toolkit";
import type { TUser } from "@customTypes/user";
import type { TLoading } from "@customTypes/shared";
import actGetUsers from "./act/actGetUsers";
import actUpdateUserRole from "./act/actUpdateUserRole";
interface IUsersState {
  users: TUser[];
  loading: TLoading;
  error: string | null;
}

const initialState: IUsersState = {
  users: [],
  loading: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetUsers.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetUsers.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.users = action.payload;
      })
      .addCase(actGetUsers.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          (action.payload as string | undefined) ??
          action.error.message ??
          "An unknown error occurred";
      });
    builder
      .addCase(actUpdateUserRole.pending, (state) => {
        state.error = null;
      })
      .addCase(actUpdateUserRole.fulfilled, (state, action) => {
        const updatedUser = action.payload;

        state.users = state.users.map((user) =>
          user.id === updatedUser.id
            ? { ...user, role: updatedUser.role }
            : user,
        );
      })
      .addCase(actUpdateUserRole.rejected, (state, action) => {
        state.error =
          action.payload ??
          action.error.message ??
          "Failed to update user role";
      });
  },
});

export default usersSlice.reducer;
export const { clearUsers } = usersSlice.actions;
