import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  token: null,
  profile: null,
};

// Slice definition
export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    setToken: create.reducer((state, action) => {
      state.token = action.payload;
    }),
    setProfile: create.reducer((state, action) => {
      state.profile = action.payload;
    }),
    cleanAuth: create.reducer((state) => {
      state.token = null;
      state.profile = null;
    }),
  }),
});

// Action creators
export const { setToken, setProfile, cleanAuth } = authSlice.actions;
