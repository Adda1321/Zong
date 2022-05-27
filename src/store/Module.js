import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Destination_id :'',
  Destination: false,
  Destination_type :'',
};

const Dest_Reducers = createSlice({
  name: "Module",
  initialState,
  // Reducer methods
  reducers: {
    handleModal : (state, { payload }) => {
      state.Destination = payload;
    },
    addDestinationType : (state, { payload }) => {
      state.Destination_type = payload;
    },
    
    addDestinationID : (state, { payload }) => {
      state.Destination_id = payload;
    },
  },
});

// Action creators for each reducer method
export const { handleModal , addDestinationType , addDestinationID } = Dest_Reducers.actions;

export default Dest_Reducers.reducer;
