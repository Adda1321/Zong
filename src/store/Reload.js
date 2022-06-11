import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Reload:''
}
const ReloadReducer = createSlice({
    name:'reload',
    initialState,
    reducers:{
        isReloading:(state,{payload})=>{
            state.Reload=payload;
        }
    }
})

export const {isReloading} = ReloadReducer.actions
export default ReloadReducer.reducer;