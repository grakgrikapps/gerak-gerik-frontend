import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  initiation: [],
  current: null,
  comments: [],
  replies: {},
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
    setCurrentAddToBookmark: create.reducer((state, action) => {
      state.current = {
        ...state.current,
        bookmarks: [{ profile_id: action.payload }],
      };
    }),
    setCurrentRemoveToBookmark: create.reducer((state) => {
      state.current = { ...state.current, bookmarks: [] };
    }),
    setComment: create.reducer((state, action) => {
      state.comments = action.payload;
    }),
    setCommentReplies: create.reducer((state, action) => {
      state.replies = {
        ...state.replies,
        [action.payload.id]: action.payload.replies,
      };
    }),
    clearCommentReplies: create.reducer((state) => {
      state.replies = {};
    }),
  }),
});

// Action creators
export const {
  initiationPost,
  setCurrentPost,
  setComment,
  setCommentReplies,
  clearCommentReplies,
  setCurrentAddToBookmark,
  setCurrentRemoveToBookmark,
} = postsSlice.actions;
