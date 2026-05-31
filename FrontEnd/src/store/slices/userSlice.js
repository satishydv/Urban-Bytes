import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  isEmailVerified: false,
  profile: "",
  role: "user",
  name: "",
  email: "",
  phone: "",
  address: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile = action.payload.profile;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.clear("")
      state.isLogged = false;
      state.isEmailVerified = false;
      state.profile = "";
      state.role = "user";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.token = ""
    },
    updateProfile: (state, action) => {
      state.isEmailVerified = action.payload.isEmailVerified;
      state.profile = action.payload.profile;
      state.role = action.payload.role
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
