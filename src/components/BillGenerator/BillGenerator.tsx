import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBill } from '../../store/slices/billSlice';
import { addCustomer } from '../../store/slices/customerSlice';
import html2pdf from 'html2pdf.js';

import style from './BillGenerator.module.scss';
import SuccessModal from '../SuccessModal/SuccessModal';

const BillGenerator = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [products, setProducts] = useState([
    { name: '', quantity: 0, price: 0 },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);

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
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
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
    const newBill = {
      id: Date.now().toString(),
      customerName,
      customerMobile,
      customerAddress,
      billingDate,
      products,
      totalPrice: calculateTotal(),
    };
    dispatch(addBill(newBill));
    dispatch(
      addCustomer({
        id: Date.now().toString(),
        name: customerName,
        quantity: products.reduce(
          (total, product) => total + product.quantity,
          0
        ),
        billingDate,
        contact: customerMobile,
        address: customerAddress,
        price: calculateTotal(),
      })
    );
    setModalOpen(true); // Open success modal
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const downloadInvoice = () => {
    const element = document.getElementById('invoice');
    html2pdf().from(element).save();
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
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(index, 'quantity', +e.target.value)
                }
                required
              />
              <label>Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  handleProductChange(index, 'price', +e.target.value)
                }
                required
              />
              <button type="button" onClick={() => handleRemoveProduct(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddProduct} className={style.addButton}>
            Add Product
          </button>
          <div className={style.total}>
            <strong>Total Price:</strong> ${calculateTotal()}
          </div>
          <button type="submit" className={style.submitButton}>Generate Bill</button>
        </form>
      </div>

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
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.quantity * product.price}</td>
              </tr>
            ))}
            <tr className={style.totalRow}>
              <td colSpan={3}>Total</td>
              <td>${calculateTotal()}</td>
            </tr>
          </tbody>
        </table>

        <button onClick={downloadInvoice} className={style.downloadButton}>
          Download Invoice
        </button>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        message="Bill generated successfully!"
      />
    </>
  );
};

export default BillGenerator;