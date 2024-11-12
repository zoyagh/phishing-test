import { createAsyncThunk } from "@reduxjs/toolkit";

import { setCookie } from "libraries/cookie";
import axiosInstance from "libraries/axios";
import { TLogInProps, TRegisterProps } from "types/";


export const clearSignIn = createAsyncThunk("clear/google/sign-in/data", () => {
  return null;
});

export const signIn = createAsyncThunk(
  "auth/login",
  async (body: TLogInProps, { rejectWithValue }) => {
    try {
      const { data } = (await axiosInstance.post("/auth/login", body)) as any;

      setCookie("token", data.access_token);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/registration",
  async (body: TRegisterProps, { rejectWithValue }) => {
    try {
      const { data } = (await axiosInstance.post("/auth/registration", body)) as any;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userProfile = createAsyncThunk(
  "user/profile/data",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/user/profile");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
