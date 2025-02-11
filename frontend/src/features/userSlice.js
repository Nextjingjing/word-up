import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  email: "",
  isAdmin: false,
  expiresAt: null, // เก็บ timestamp ที่ state ควรหมดอายุ
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.expiresAt = Date.now() + 3600 * 1000; // ตั้งค่าให้หมดอายุใน 1 ชั่วโมง
    },
    clearUser: (state) => {
      state.id = "";
      state.username = "";
      state.email = "";
      state.isAdmin = false;
      state.expiresAt = null;
    },
    checkExpiration: (state) => {
      if (state.expiresAt && Date.now() > state.expiresAt) {
        state.id = "";
        state.username = "";
        state.email = "";
        state.isAdmin = false;
        state.expiresAt = null;
      }
    },
  },
});

export const { setUser, clearUser, checkExpiration } = userSlice.actions;
export default userSlice.reducer;
