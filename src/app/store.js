import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from '../store/ticketsSlice';

export default configureStore({
  reducer: {
    counter: ticketsReducer,
  },
});
