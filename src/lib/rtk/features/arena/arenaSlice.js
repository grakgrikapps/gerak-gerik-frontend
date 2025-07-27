import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  list: [],
};

// Slice definition
export const arenaSlice = createAppSlice({
  name: "arena",
  initialState,
  reducers: (create) => ({
    setArena: create.reducer((state, action) => {
      state.list = action.payload;
    }),
  }),
});

// Action creators
export const { setArena } = arenaSlice.actions;
