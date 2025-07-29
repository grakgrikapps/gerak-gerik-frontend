import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  list: [],
  current: "For You",
};

// Slice definition
export const arenaSlice = createAppSlice({
  name: "arena",
  initialState,
  reducers: (create) => ({
    setArena: create.reducer((state, action) => {
      state.list = action.payload;
    }),
    setCurrentArena: create.reducer((state, action) => {
      state.current = action.payload;
    }),
  }),
});

// Action creators
export const { setArena, setCurrentArena } = arenaSlice.actions;
