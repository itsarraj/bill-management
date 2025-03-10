import { initializeCustomers } from '../store/slices/customerSlice';
import { initializeBills } from '../store/slices/billSlice';

export const loadInitialData = async (dispatch) => {
  try {
    const response = await fetch('/data/data.json'); // Adjust the path as needed
    const data = await response.json();

    // Dispatch actions to initialize state
    dispatch(initializeCustomers(data.customers));
    dispatch(initializeBills(data.bills));
  } catch (error) {
    console.error('Failed to load initial data:', error);
  }
};