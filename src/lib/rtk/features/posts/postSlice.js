import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  initiation: [],
  current: null,
  comments: []
};

// Slice definition
export const postsSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: (create) => ({
    initiationPost: create.reducer((state, action) => {
      state.initiation = action.payload;
    }),
    setCurrentPost: create.reducer((state, action) => {
      state.current = action.payload;
    }),
    setComment: create.reducer((state, action) => {
      state.comments = action.payload;
    }),
  }),
});

// Action creators
export const { initiationPost, setCurrentPost, setComment } = postsSlice.actions;
