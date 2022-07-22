import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    login: {
      data: null,
    },
  },
  reducers: {
    //login:
    loginSuccess: (state, action) => {
      state.login.data = action.payload;
    },

    logout: (state) => {
      state.login.data = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
