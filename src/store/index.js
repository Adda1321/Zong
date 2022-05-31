import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from 'redux-devtools-extension';

import ModalReducers from "./Modal";
import Dest_Reducers from "./Module";
import UserSlice from "./UserCall";
const store = configureStore({
  reducer: {
    Modal: ModalReducers,
    Dest: Dest_Reducers,
    Login: UserSlice,
  },
});

export default store;
