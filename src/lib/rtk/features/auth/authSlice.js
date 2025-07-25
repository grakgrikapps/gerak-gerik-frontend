import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  token: null,
  profile: null,
  register: {
    phone: "",
    birthdate: {
      day: "",
      month: "",
      year: "",
    },
  },
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
    setPhone: create.reducer((state, action) => {
      state.register = {
        ...state.register,
        phone: action.payload,
      };
    }),
    setBirthdate: create.reducer((state, action) => {
      state.register = {
        ...state.register,
        birthdate: action.payload,
      };
    }),
  }),
});

// Action creators
export const { setToken, setProfile, cleanAuth, setPhone, setBirthdate } =
  authSlice.actions;
