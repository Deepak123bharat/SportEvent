import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      console.log(response);
      toast.success("Login successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
      return response.data;
    } catch (error) {
      toast.error("Credentials error", {
        position: toast.POSITION.TOP_CENTER,
      });
      return rejectWithValue(error.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Signup successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
      console.log("response", response);
      return response.data;
    } catch (error) {
      toast.error("User already registered", {
        position: toast.POSITION.TOP_CENTER,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, userId, toast, navigate }, { rejectWithValue }) => {
    try {
      console.log(userId, "kjdlsfjsdlkfjsdkjkf");
      const response = await api.updateUser(id, userId);
      toast.success("Event updated successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      //   navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

let user = "";
if (localStorage.getItem("profile") != "") {
  user = JSON.parse(localStorage.getItem("profile"));
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", state.user);
    },
    setLogout: (state, action) => {
      state.user = null;
      localStorage.setItem("profile", "");
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
  },
});
export const { setLogout, setUser } = authSlice.actions;

export default authSlice.reducer;
