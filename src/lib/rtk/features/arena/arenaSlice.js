import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  list: [],
  following: [],
  filter: { id: null, keyword: "" },
  status: "empty", // 'empty', 'loading', 'playing', 'loading', 'error
};

// Slice definition
export const arenaSlice = createAppSlice({
  name: "arena",
  initialState,
  reducers: (create) => ({
    // setArena: create.reducer((state, action) => {
    //   state.list = action.payload;
    // }),
    // setCurrentArena: create.reducer((state, action) => {
    //   state.current = action.payload;
    // }),
  }),
});

// Action creators
export const {  } = arenaSlice.actions;
