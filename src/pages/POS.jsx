import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  // Update any icon imports here
} from '@heroicons/react/24/outline';

const POS = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [total, setTotal] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [dailyPayments, setDailyPayments] = useState({ cash: 0, online: 0 });

  // Initialize with mock products
  useEffect(() => {
    const mockProducts = [
      { id: 1, name: 'Milk 1L', price: 60, category: 'Milk' },
      { id: 2, name: 'Milk 500ml', price: 30, category: 'Milk' },
      { id: 3, name: 'Yogurt 400g', price: 40, category: 'Yogurt' },
      { id: 4, name: 'Cheese 200g', price: 120, category: 'Cheese' },
      { id: 5, name: 'Butter 100g', price: 50, category: 'Butter' },
    ];
    setProducts(mockProducts);
  }, []);

  // Add this new useEffect to watch cart changes
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  // Add this useEffect to calculate daily payments
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    
    const todayTransactions = transactions.filter(t => 
      t.date.split('T')[0] === today
    );

    const summary = todayTransactions.reduce((acc, t) => ({
      cash: acc.cash + (t.paymentMethod === 'cash' ? t.total : 0),
      online: acc.online + (t.paymentMethod === 'online' ? t.total : 0)
    }), { cash: 0, online: 0 });

    setDailyPayments(summary);
  }, [showPaymentSummary]); // Recalculate when summary is toggled

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleCheckout = () => {
    const transaction = {
      id: Date.now(),
      items: cart,
      total: total,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
    };

    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    localStorage.setItem('transactions', JSON.stringify([...transactions, transaction]));

    // Set current invoice and show it
    setCurrentInvoice(transaction);
    setShowInvoice(true);

    // Clear cart
    setCart([]);
    setTotal(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products Section */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products
            .filter(product => 
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(product => (
              <div
                key={product.id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => addToCart(product)}
              >
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Current Order</h2>
        
        {/* Cart Items */}
        <div className="space-y-4 mb-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="text-red-600 ml-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">₹{total}</span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="online">Online</option>
       
            </select>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Complete Transaction
          </button>
        </div>
      </div>

      {/* Add Payment Summary Toggle */}
      <div className="lg:col-span-3">
        <button
          className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
          onClick={() => setShowPaymentSummary(!showPaymentSummary)}
        >
          {showPaymentSummary ? 'Hide' : 'Show'} Today's Payment Summary
        </button>

       
        {showPaymentSummary && (
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Cash Payments</h3>
              <div className="text-center">
                <span className="text-2xl font-bold">₹{dailyPayments.cash}</span>
              </div>
            </div>
            <div className=" rounded-lg  p-6 flex justify-center items-center">
              <h3 className=" font-semibold mb-4 text-3xl">+</h3>
           
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Online Payments</h3>
              <div className="text-center">
                <span className="text-2xl font-bold">₹{dailyPayments.online}</span>
              </div>
            </div>
             <div className=" rounded-lg  p-6 flex justify-center items-center">
              <h3 className=" font-semibold mb-4 text-3xl">=</h3>
           
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Total Payments</h3>
              <div className="text-center">
                <span className="text-2xl font-bold">₹{dailyPayments.cash + dailyPayments.online}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Invoice Modal */}
      {showInvoice && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">KAM AGENCIES</h2>
              <p className="text-sm text-gray-600">Court Road, Opposite to Gospel Asseembly, Anantapur</p>
              <p className="text-sm text-gray-600">Contact: 9876543210</p>
              <p className="text-sm text-gray-600">E-mail: kamagencies@gmail.com</p>
              <p className="text-sm text-gray-600">GSTIN: 2142x10xxxx</p>
            </div>

            {/* Invoice Details */}
            <div className="text-sm mb-4">
              <div className="flex justify-between">
                <span>Bill No: {currentInvoice.id}</span>
                <span>Date: {new Date(currentInvoice.date).toLocaleString()}</span>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b">
                  <th className="text-left">HSN</th>
                  <th className="text-left">Description</th>
                  <th className="text-right">MRP</th>
                  <th className="text-right">GST</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentInvoice.items.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td>2142x10xxxx</td>
                    <td>{item.name}</td>
                    <td className="text-right">₹{item.price}</td>
                    <td className="text-right">18%</td>
                    <td className="text-right">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="border-t pt-2 mb-4">
              <div className="flex justify-between">
                <span>Grand Total:</span>
                <span>₹{currentInvoice.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Additional Discount:</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Net Amount:</span>
                <span>₹{currentInvoice.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Received Amount:</span>
                <span>₹{currentInvoice.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Change Due:</span>
                <span>₹0.00</span>
              </div>
            </div>

            {/* GST Summary */}
            <div className="border-t pt-2 mb-4">
              <h3 className="font-bold mb-2">GST Summary</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left">Taxable</th>
                    <th className="text-right">CGST</th>
                    <th className="text-right">SGST</th>
                    <th className="text-right">Total Tax</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{(currentInvoice.total * 100 / 118).toFixed(2)}</td>
                    <td className="text-right">{(currentInvoice.total * 9 / 118).toFixed(2)}</td>
                    <td className="text-right">{(currentInvoice.total * 9 / 118).toFixed(2)}</td>
                    <td className="text-right">{(currentInvoice.total * 18 / 118).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="text-center text-sm">
              <p>In Words: {/* Add function to convert number to words */}</p>
              <p>Counter: 1</p>
              <p className="font-bold mt-2">THANK YOU, VISIT AGAIN</p>
            </div>

            <button
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setShowInvoice(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS; 