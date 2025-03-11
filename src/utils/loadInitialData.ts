import { Dispatch } from 'redux';
import { initializeCustomers } from '../store/slices/customerSlice';
import { initializeBills } from '../store/slices/billSlice';
import { Customer, Bill } from '../types';

export const loadInitialData = async (dispatch: Dispatch) => {
  try {
    // Try to load data from localStorage first
    const storedCustomers = localStorage.getItem('customers');
    const storedBills = localStorage.getItem('bills');

    if (storedCustomers && storedBills) {
      try {
        const customers = JSON.parse(storedCustomers) as Customer[];
        const bills = JSON.parse(storedBills) as Bill[];
        dispatch(initializeCustomers(customers));
        dispatch(initializeBills(bills));
        console.log('Loaded data from localStorage');
        return;
      } catch (e) {
        console.warn('Error parsing localStorage data, falling back to data.json');
      }
    }

    // Then try to load from data.json
    try {
      const response = await fetch('/src/data/data.json');
      if (response.ok) {
        const data = await response.json();
        const customers = data.customers || [];
        const bills = data.bills || [];
        dispatch(initializeCustomers(customers));
        dispatch(initializeBills(bills));

        // Save to localStorage for future use
        localStorage.setItem('customers', JSON.stringify(customers));
        localStorage.setItem('bills', JSON.stringify(bills));
        console.log('Loaded data from data.json');
        return;
      }
    } catch (error) {
      console.warn('Could not load from data.json, using fallback data');
    }

    // Fallback data if both methods fail
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

    // Save fallback data to localStorage
    localStorage.setItem('customers', JSON.stringify(fallbackData.customers));
    localStorage.setItem('bills', JSON.stringify(fallbackData.bills));
    console.log('Loaded fallback data');
  } catch (error) {
    console.error('Failed to load initial data:', error);
  }
};