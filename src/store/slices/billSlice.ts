import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bill } from '../../types'; // Define your types

interface BillState {
  bills: Bill[];
}

const initialState: BillState = {
  bills: [],
};

const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
    },
    initializeBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
    },
  },
});

export const { addBill, initializeBills } = billSlice.actions;
export default billSlice.reducer;