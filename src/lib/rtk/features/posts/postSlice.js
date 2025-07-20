// Initial state
const initialState = {
  initiation: [],
  current: null,
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
  }),
});

// Action creators
export const { initiationPost, setCurrentPost } = postsSlice.actions;
