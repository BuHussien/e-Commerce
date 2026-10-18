import type { TCategory } from "@customTypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const actGetCategories = createAsyncThunk("Categories/getCategories", async(_, thunkApi) => {
    const {rejectWithValue} = thunkApi;
    try{
        const response = await axios.get<TCategory[]>("http://localhost:5005/categories");
        console.info(response);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error))
            return rejectWithValue(error.response?.data.message || error.message);
        else
            return rejectWithValue("An Unexpected Error");
    }
})

export default actGetCategories;