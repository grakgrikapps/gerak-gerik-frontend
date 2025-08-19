import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  list: [],
  following: [],
  filter: { id: 0, keyword: "" },
  status: "empty", // 'empty', 'loading', 'playing', 'loading', 'error', 'idle'
};

// Slice definition
export const arenaSlice = createAppSlice({
  name: "arena",
  initialState,
  reducers: (create) => ({
    setFollowingArena: create.reducer((state, action) => {
      state.following = action.payload;
      state.status = "idle";
    }),
    setSelectedArena: create.reducer((state, action) => {
      state.filter.id = action?.payload;
    }),
    setArena: create.reducer((state, action) => {
      state.list = action.payload;
    }),
    // setCurrentArena: create.reducer((state, action) => {
    //   state.current = action.payload;
    // }),
  }),
});

// Action creators
export const { setFollowingArena, setSelectedArena, setArena } = arenaSlice.actions;
