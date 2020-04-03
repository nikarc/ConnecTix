import { configureStore } from '@reduxjs/toolkit';
import pickerReducer from '../store/pickerSlice';

export default configureStore({
  reducer: {
    counter: pickerReducer,
  },
});
