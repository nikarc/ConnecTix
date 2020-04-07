import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import orderReducer from '../store/orderSlice';

export default configureStore({
    reducer: {
        order: orderReducer,
    },
    middleware: [thunk]
});
