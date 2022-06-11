import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Destination_id: "",
  Destination: false,
  Destination_type: "",
  selected: "false",
  //For New Timing Condition
  TimeMatches: false,
  TM_Destination_id: "", // Time Matches Destination
  TM_Destination_Type: "",

  TimeNotMatches: false,
  TNM_Destination_id: "", // Time Not Matches Destination
  TNM_Destination_Type: "",

  PreCallSettingData:false
};

const Dest_Reducers = createSlice({
  name: "Module",
  initialState,
  // Reducer methods
  reducers: {
    handleModal: (state, { payload }) => {
      state.Destination = payload;
    },
    addDestinationType: (state, { payload }) => {
      state.Destination_type = payload;
    },

    addDestinationID: (state, { payload }) => {
      state.Destination_id = payload;
    },
    selectDestination: (state, { payload }) => {
      state.selected = payload;
    },

select_CallSetting :(state,{payload})=>{
state.PreCallSettingData = payload;
},
//                        For New Timing Condition
select_TimeMatch : (state, {payload})=>{
  state.TimeMatches = payload
},
    add_TM_DestinationID: (state, { payload }) => {
      state.TM_Destination_id = payload;
    },

    add_TM_DestinationType: (state, { payload }) => {
      state.TM_Destination_Type = payload;
    },
    select_TimeNotMatch : (state, {payload})=>{
      state.TimeNotMatches = payload
    },
    add_TNM_DestinationID: (state, { payload }) => {
      state.TNM_Destination_id = payload;
    },

    add_TNM_DestinationType: (state, { payload }) => {
      state.TNM_Destination_Type = payload;
    },
  },
});

// Action creators for each reducer method
export const {
  handleModal,
  addDestinationType,
  selectDestination,
  addDestinationID,

  select_TimeMatch,
  add_TM_DestinationID,
  add_TM_DestinationType,
  
  select_TimeNotMatch,
  add_TNM_DestinationID,
  add_TNM_DestinationType,

  select_CallSetting
  
} = Dest_Reducers.actions;

export default Dest_Reducers.reducer;
