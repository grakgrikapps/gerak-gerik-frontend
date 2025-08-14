import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  // V2
  list: [],
  replies: [],
  value: "",
  status: "idle", // idle, loading, ready
};

// Slice definition
export const commentsSlice = createAppSlice({
  name: "comments",
  initialState,
  reducers: (create) => ({
    setStatusComment: create.reducer((state, action) => {
      state.status = action.payload;
    }),
    setListComment: create.reducer((state, action) => {
      state.list = action.payload;
    }),
    setRepliesComment: create.reducer((state, action) => {
      state.replies = action.payload;
    }),
    setInitiationComment: create.reducer((state, action) => {
      state.list = action.payload.list;
      state.status = action.payload.status;
      state.value = "";
      state.replies = [];
    }),
  }),
});

// Action creators
export const {
  setStatusComment,
  setListComment,
  setRepliesComment,
  setInitiationComment,
} = commentsSlice.actions;
