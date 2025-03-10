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
          {products.map((product, index) => (
            <div key={index} className={style.productGroup}>
              <label>Product Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  handleProductChange(index, 'name', e.target.value)
                }
              />
              <label>Quantity</label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(index, 'quantity', +e.target.value)
                }
              />
              <label>Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  handleProductChange(index, 'price', +e.target.value)
                }
              />
              <button type="button" onClick={() => handleRemoveProduct(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
          <div className={style.total}>
            <strong>Total Price:</strong> ${calculateTotal()}
          </div>
          <button type="submit">Generate Bill</button>
        </form>
      </div>
      <div id="invoice">
        <h2>Invoice</h2>
        <p>Customer: {customerName}</p>
        <p>Total: ${calculateTotal()}</p>
        <button onClick={downloadInvoice}>Download Invoice</button>
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
