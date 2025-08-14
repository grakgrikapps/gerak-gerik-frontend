import { createAppSlice } from "@/lib/rtk/createAppSlice";
import { getYouTubeIdFromEmbedUrl } from "@/utils/helper";

// Initial state
const initialState = {
  // V2
  list: [],
  current: null,
  content: {
    type: null,
    value: null,
    thumbnail: null,
    status: "empty", // 'empty', 'idle', 'loading', 'playing', 'loading', 'error', 'draging'
  },
  vote: null, // grak, grik
  status: "loading", // 'empty', 'idle', 'loading', 'playing', 'loading', 'error
};

// Slice definition
export const postsSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: (create) => ({
    // initiationPost: create.reducer((state, action) => {
    //   state.initiation = action.payload;
    // }),
    setListPost: create.reducer((state, action) => {
      state.list = action.payload;
    }),
    setCurrentPost: create.reducer((state, action) => {
      state.current = action.payload;
    }),
    setStatusPost: create.reducer((state, action) => {
      state.status = action.payload;
    }),
    setPauseContent: create.reducer((state, action) => {
      state.content = {
        ...state.content,
        status: "pause",
      };
    }),
    setDragingContent: create.reducer((state, action) => {
      state.content = {
        ...state.content,
        status: "draging",
      };
    }),
    setPlayContent: create.reducer((state, action) => {
      state.content = {
        ...state.content,
        status: "playing",
      };
    }),
    setIdleContent: create.reducer((state, action) => {
      state.content = {
        ...state.content,
        status: "idle",
      };
    }),

    setInitiationPost: create.reducer((state, action) => {
      state.list = action.payload.list;
      state.current = action.payload.current;
      state.status = action.payload.status;
      state.content = {
        type: "youtube",
        value: action.payload.current?.videos?.[0]?.url,
        thumbnail: `https://i.ytimg.com/vi/${getYouTubeIdFromEmbedUrl(
          action.payload.current?.videos?.[0]?.url
        )}/maxresdefault.jpg`,
        status: "idle",
      };
    }),

    setHasVotePost: create.reducer((state, action) => {
      state.list[action.payload.index].has_voted = action.payload.hasVote;
    }),

    // setPauseVideo: create.reducer((state, action) => {
    //   state.pause = action.payload;
    // }),
    // setPlayVideo: create.reducer((state, action) => {
    //   state.playing = action.payload;
    // }),
    // setCurrentAddToBookmark: create.reducer((state, action) => {
    //   state.current = {
    //     ...state.current,
    //     bookmarks: [{ profile_id: action.payload }],
    //   };
    // }),
    // setCurrentRemoveToBookmark: create.reducer((state) => {
    //   state.current = { ...state.current, bookmarks: [] };
    // }),
    // setComment: create.reducer((state, action) => {
    //   state.comments = action.payload;
    // }),
    // setCommentReplies: create.reducer((state, action) => {
    //   state.replies = {
    //     ...state.replies,
    //     [action.payload.id]: action.payload.replies,
    //   };
    // }),
    // clearCommentReplies: create.reducer((state) => {
    //   state.replies = {};
    // }),
    // setOpenComment: create.reducer((state, action) => {
    //   state.openComment = action.payload;
    // }),
    // setShouldNext: create.reducer((state, action) => {
    //   state.shouldNext = action.payload;
    // }),
  }),
});

// Action creators
export const {
  // initiationPost,
  setCurrentPost,
  setListPost,
  setStatusPost,
  setInitiationPost,
  setPauseContent,
  setPlayContent,
  setIdleContent,
  setDragingContent,
  setHasVotePost,
  // setComment,
  // setCommentReplies,
  // clearCommentReplies,
  // setCurrentAddToBookmark,
  // setCurrentRemoveToBookmark,
  // setPauseVideo,
  // setPlayVideo,
  // setOpenComment,
  // setShouldNext,
} = postsSlice.actions;
