import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  initiation: [],
  current: null,
  comments: [],
  replies: {},
  pause: false,
  playing: false,
  openComment: false,
  shouldNext: false
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
    setPauseVideo: create.reducer((state, action) => {
      state.pause = action.payload;
    }),
    setPlayVideo: create.reducer((state, action) => {
      state.playing = action.payload;
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
    setOpenComment: create.reducer((state, action) => {
      state.openComment = action.payload;
    }),
    setShouldNext: create.reducer((state, action) => {
      state.shouldNext = action.payload;
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
  setPauseVideo,
  setPlayVideo,
  setOpenComment,
  setShouldNext,
} = postsSlice.actions;
