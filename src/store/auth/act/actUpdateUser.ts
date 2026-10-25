import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@services/axios-global";
import type { RootState } from "@store/index";
import AxiosErrorHandler from "@utilities/AxiosErrorHandler";
import { type SecurityFormData } from "@customTypes/shared"

const actUpdateUser = createAsyncThunk<
  RootState["auth"]["user"],
  SecurityFormData,
  {
    state: RootState;
    rejectValue: string;
  }
>("auth/actUpdateUser", async (formData, { rejectWithValue, getState }) => {
  try {
    const { auth } = getState();
    const userId = auth.user?.id;
    if (!userId || !auth.accessToken)
      return rejectWithValue("User is not authenticated");

    const { ...userData } = formData;
    if(formData.password === "")
        userData.password = undefined;

    const response = await axiosInstance.patch(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }
});

export default actUpdateUser;
