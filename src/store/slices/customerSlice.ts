import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer, CustomerState } from '../../types';

const initialState: CustomerState = {
  customers: [],
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
      // Save to localStorage whenever a customer is added
      localStorage.setItem('customers', JSON.stringify(state.customers));
    },
    initializeCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
  },
});

export const { addCustomer, initializeCustomers } = customerSlice.actions;
export default customerSlice.reducer;