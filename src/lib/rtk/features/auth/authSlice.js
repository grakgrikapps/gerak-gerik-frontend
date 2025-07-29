import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  token: null,
  profile: null,
  register: {
    email: "",
    username: "",
    fullname: "",
    password: "",
    phone: "",
    birthdate: {
      day: "",
      month: "",
      year: "",
    },
  },
  myArena: []
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
    setRegister: create.reducer((state, action) => {
      state.register = {
        ...state.register,
        email: action.payload.email,
        username: action.payload.username,
        fullname: action.payload.fullname,
        password: action.payload.password,
      };
    }),
    setMyArena: create.reducer((state, action) => {
      state.myArena = action.payload;
    }),
  }),
});

// Action creators
export const {
  setToken,
  setProfile,
  cleanAuth,
  setPhone,
  setBirthdate,
  setRegister,
  setMyArena,
} = authSlice.actions;
