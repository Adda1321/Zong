import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetLogin, BaseURL, Logout } from "../Constants";
import axios from "axios";
// LOGIN
export const getUser = createAsyncThunk(
  "getUser",
  async (body, { getState, rejectWithValue }) => {
    console.log("BODY", body);
    try {
      const config = {
        headers: { Accept: "application/json" },
      };

      const { data } = await axios.post(
        `${BaseURL}${GetLogin}`,
        body.bodyFormData,
        config
      );
      body.navigate("/home", { replace: true });
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);
// LOGOUT

export const LogoutUser = createAsyncThunk(
  "LogoutUser",
  async (body, { getState, rejectWithValue }) => {
    // console.log("BODY", body);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };

      const { data } = await axios.post(`${BaseURL}${Logout}`, body, config);
      //   body.navigate("/home", { replace: true });
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const UserSlice = createSlice({
  name: "User",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
    isLoggedIn: "",
  },
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
      state.isLoggedIn = payload.token;
      localStorage.setItem("token", payload.token);
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },

    [LogoutUser.pending]: (state, action) => {
      state.loading = true;
    },
    [LogoutUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = true;
      state.message = payload.message;
      //   state.isLoggedIn = payload.token;
      localStorage.removeItem("token");
      //   localStorage.setItem("token", payload.token);
    },
    [LogoutUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

// export const { removeToken } = UserSlice.actions;

export default UserSlice.reducer;
