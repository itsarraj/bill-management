import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../types';
import styles from './CustomerTable.module.scss';

const CustomerTable: React.FC = () => {
  // Use the properly typed RootState
  const customers = useSelector((state: RootState) => state.customer.customers);

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString || 'N/A';
    }
  };

  // Format price with currency
  const formatPrice = (price: number): string => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Customers List</h1>
        <Link to="/bill-generator" className={styles.newBillButton}>
          Create New Bill
        </Link>
      </div>

      {customers.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No customers found. Start by creating a new bill.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Product Quantity</th>
                <th>Billing Date</th>
                <th>Contact Details</th>
                <th>Address</th>
                <th>Billing Price</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.quantity}</td>
                  <td>{formatDate(customer.billingDate)}</td>
                  <td>{customer.contact}</td>
                  <td className={styles.addressCell}>{customer.address}</td>
                  <td>{formatPrice(customer.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;