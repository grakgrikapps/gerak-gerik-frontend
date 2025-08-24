import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  modal: {
    enabled: false,
    title: "",
    body: "Your vote can't be counted because you're not logged in. Please login first.",
    buttonAccept: "Submit",
    buttonCancel: "Cancel",
  }
};

// Slice definition
export const globalSlice = createAppSlice({
  name: "globals",
  initialState,
  reducers: (create) => ({
    setModal: create.reducer((state, action) => {
      state.modal = { ...state.modal, ...action.payload };
    }),
  }),
});

// Action creators
export const { setModal } = globalSlice.actions;
