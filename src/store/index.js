import { configureStore } from "@reduxjs/toolkit";

import ModalReducers from "./Modal";
import Dest_Reducers from './Module'

const store = configureStore({
  reducer: {
    Modal: ModalReducers,
    Dest: Dest_Reducers,
  },
});

export default store;
