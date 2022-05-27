import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  
};

const ModalReducers = createSlice({
  name: "modal",
  initialState,
  // Reducer methods
  reducers: {
    Modal_OpenClose : (state, { payload }) => {
      state.open = payload;
    },
  },
});

// Action creators for each reducer method
export const { Modal_OpenClose } = ModalReducers.actions;

export default ModalReducers.reducer;
