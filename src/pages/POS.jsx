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
    updateTotal();
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    updateTotal();
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
    updateTotal();
  };

  const updateTotal = () => {
    const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  };

  const handleCheckout = () => {
    // Save transaction to local storage
    const transaction = {
      id: Date.now(),
      items: cart,
      total: total,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
    };

    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    localStorage.setItem('transactions', JSON.stringify([...transactions, transaction]));

    // Clear cart
    setCart([]);
    setTotal(0);
    alert('Transaction completed successfully!');
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
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="wallet">Wallet</option>
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
    </div>
  );
};

export default POS; 