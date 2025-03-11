import { Dispatch } from 'redux';
import { initializeCustomers } from '../store/slices/customerSlice';
import { initializeBills } from '../store/slices/billSlice';

export const loadInitialData = async (dispatch: Dispatch) => {
  try {
    // First, try to load from data.json
    try {
      const response = await fetch('/src/data/data.json');
      if (response.ok) {
        const data = await response.json();
        dispatch(initializeCustomers(data.customers || []));
        dispatch(initializeBills(data.bills || []));
        return;
      }
    } catch (error) {
      console.warn('Could not load from data.json, using fallback data');
    }

    // Fallback data if the file fetch fails
    const fallbackData = {
      customers: [
        {
          id: "1",
          name: "John Doe",
          quantity: 5,
          billingDate: "2023-10-01",
          contact: "john.doe@example.com",
          address: "123 Main St, City, Country",
          price: 500
        },
        {
          id: "2",
          name: "Jane Smith",
          quantity: 3,
          billingDate: "2023-10-02",
          contact: "jane.smith@example.com",
          address: "456 Elm St, City, Country",
          price: 300
        }
      ],
      bills: [
        {
          id: "1",
          customerName: "John Doe",
          customerMobile: "123-456-7890",
          customerAddress: "123 Main St, City, Country",
          billingDate: "2023-10-01",
          products: [
            {
              name: "Product A",
              quantity: 2,
              price: 100
            },
            {
              name: "Product B",
              quantity: 3,
              price: 200
            }
          ],
          totalPrice: 500
        }
      ]
    };

    dispatch(initializeCustomers(fallbackData.customers));
    dispatch(initializeBills(fallbackData.bills));
  } catch (error) {
    console.error('Failed to load initial data:', error);
  }
};