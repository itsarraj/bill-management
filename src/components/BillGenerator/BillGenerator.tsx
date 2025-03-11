import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBill } from '../../store/slices/billSlice';
import { addCustomer } from '../../store/slices/customerSlice';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';

import style from './BillGenerator.module.scss';
import SuccessModal from '../SuccessModal/SuccessModal';
import { Product } from '../../types';

const BillGenerator = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [products, setProducts] = useState<Product[]>([
    { name: '', quantity: 0, price: 0 },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAddProduct = () => {
    setProducts([...products, { name: '', quantity: 0, price: 0 }]);
  };

  const handleProductChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: field === 'name' ? value : Number(value)
    };
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that we have at least one valid product
    const validProducts = products.filter(p => p.name && p.quantity > 0 && p.price > 0);
    if (validProducts.length === 0) {
      alert("Please add at least one valid product with name, quantity, and price.");
      return;
    }

    const totalPrice = calculateTotal();
    const timestamp = Date.now();
    const billId = timestamp.toString();

    const newBill = {
      id: billId,
      customerName,
      customerMobile,
      customerAddress,
      billingDate,
      products: validProducts,
      totalPrice
    };

    const newCustomer = {
      id: billId,
      name: customerName,
      quantity: validProducts.reduce((total, product) => total + product.quantity, 0),
      billingDate,
      contact: customerMobile,
      address: customerAddress,
      price: totalPrice
    };

    // Dispatch actions to update store
    dispatch(addBill(newBill));
    dispatch(addCustomer(newCustomer));

    setModalOpen(true);
  };

  const handleRemoveProduct = (index: number) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    } else {
      // If it's the last product, just clear it rather than removing
      setProducts([{ name: '', quantity: 0, price: 0 }]);
    }
  };

  const downloadInvoice = () => {
    const element = document.getElementById('invoice');
    if (element) {
      const opt = {
        margin: 1,
        filename: `invoice-${customerName}-${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);

    // Reset form after successful submission
    setCustomerName('');
    setCustomerMobile('');
    setCustomerAddress('');
    setBillingDate('');
    setProducts([{ name: '', quantity: 0, price: 0 }]);

    // Optionally navigate to customer list
    navigate('/customers');
  };

  return (
    <>
      <div className={style.billGenerator}>
        <h2>Bill Generator</h2>
        <form onSubmit={handleSubmit}>
          {/* Customer fields */}
          <div className={style.formGroup}>
            <label>Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Customer Mobile</label>
            <input
              type="text"
              value={customerMobile}
              onChange={(e) => setCustomerMobile(e.target.value)}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Customer Address</label>
            <textarea
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label>Billing Date</label>
            <input
              type="date"
              value={billingDate}
              onChange={(e) => setBillingDate(e.target.value)}
              required
            />
          </div>

          <h3>Products</h3>
          {products.map((product, index) => (
            <div key={index} className={style.productGroup}>
              <label>Product Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  handleProductChange(index, 'name', e.target.value)
                }
                required
              />
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={product.quantity || ''}
                onChange={(e) =>
                  handleProductChange(index, 'quantity', e.target.value)
                }
                required
              />
              <label>Price</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={product.price || ''}
                onChange={(e) =>
                  handleProductChange(index, 'price', e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveProduct(index)}
                className={style.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddProduct} className={style.addButton}>
            Add Product
          </button>
          <div className={style.total}>
            <strong>Total Price:</strong> ${calculateTotal().toFixed(2)}
          </div>
          <button type="submit" className={style.submitButton}>Generate Bill</button>
        </form>
      </div>

      {customerName && (
        <div id="invoice" className={style.invoice}>
          <h2>Invoice</h2>
          <div className={style.invoiceDetails}>
            <p><strong>Customer:</strong> {customerName}</p>
            <p><strong>Mobile:</strong> {customerMobile}</p>
            <p><strong>Address:</strong> {customerAddress}</p>
            <p><strong>Date:</strong> {billingDate}</p>
          </div>

          <table className={style.invoiceTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.filter(p => p.name).map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>${(product.quantity * product.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr className={style.totalRow}>
                <td colSpan={3}>Total</td>
                <td>${calculateTotal().toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <button onClick={downloadInvoice} className={style.downloadButton}>
            Download Invoice
          </button>
        </div>
      )}

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message="Bill generated successfully!"
      />
    </>
  );
};

export default BillGenerator;