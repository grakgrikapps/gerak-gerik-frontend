import { createAppSlice } from "@/lib/rtk/createAppSlice";

// Initial state
const initialState = {
  version: '1.0.0',
};

// Slice definition
export const metaDataSlice = createAppSlice({
  name: "metadata",
  initialState,
});

