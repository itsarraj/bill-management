import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';
import billReducer from './slices/billSlice';
// import { RootState } from '../types';

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    bill: billReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;