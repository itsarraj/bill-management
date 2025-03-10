import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';
import billReducer from './slices/billSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    bill: billReducer,
  },
});


export default store;