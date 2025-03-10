import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../types'; // Define your types

interface CustomerState {
  customers: Customer[];
}

const initialState: CustomerState = {
  customers: [],
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    initializeCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
  },
});

export const { addCustomer, initializeCustomers } = customerSlice.actions;
export default customerSlice.reducer;