import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import {
  CalendarIcon,
  ChartBarIcon,
  TruckIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';

const Inventory = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [inventoryData, setInventoryData] = useState([]);
  const [activeTab, setActiveTab] = useState('load');

  // Product categories with prices
  const productCategories = {
    milk: [
      { id: 'milk_1500', label: '1500 ML MILK', price: 75 },
      { id: 'milk_1000', label: '1000 ML MILK', price: 50 },
      { id: 'milk_500', label: '500 ML MILK', price: 25 },
      { id: 'milk_130', label: '130 ML MILK', price: 10 },
    ],
    curd: [
      { id: 'curd_500', label: '500 ML CURD', price: 30 },
      { id: 'curd_110', label: '110 ML CURD', price: 10 },
      { id: 'curd_1000', label: '1000 ML CURD', price: 60 },
      { id: 'curd_5kg', label: '5 KG CURD', price: 250 },
    ],
    other: [
      { id: 'butter_milk', label: 'BUTTER MILK', price: 15 },
      { id: 'lassi', label: 'LASSI', price: 20 },
      { id: 'pannir', label: 'PANNIR', price: 300 },
    ]
  };

  useEffect(() => {
    const storedData = localStorage.getItem('dairyInventory');
    if (storedData) {
      setInventoryData(JSON.parse(storedData));
    }
  }, []);

  const handleValueChange = (id, field, value) => {
    setInventoryData(prevData => {
      const updatedData = prevData.map(item => {
        if (item.id === id) {
          const updates = { ...item };
          
          if (field === 'productId') {
            const product = Object.values(productCategories)
              .flat()
              .find(p => p.id === value);
            updates.productId = value;
            updates.product = product?.label || '';
            updates.amount = (updates.quantity || 0) * (product?.price || 0);
          } else if (field === 'quantity') {
            const quantity = parseInt(value) || 0;
            const product = Object.values(productCategories)
              .flat()
              .find(p => p.id === item.productId);
            updates.quantity = quantity;
            updates.amount = quantity * (product?.price || 0);
          }

          return updates;
        }
        return item;
      });

      localStorage.setItem('dairyInventory', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const transferProduct = (fromEntry, toType) => {
    if (!fromEntry.productId || !fromEntry.quantity) {
      alert('Please select a product and enter quantity first');
      return;
    }

    if (!validateTransfer(fromEntry)) {
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      type: toType,
      productId: fromEntry.productId,
      product: fromEntry.product,
      quantity: Number(fromEntry.quantity),
      amount: Number(fromEntry.amount)
    };

    setInventoryData(prevData => {
      const updatedData = [...prevData, newEntry];
      localStorage.setItem('dairyInventory', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const addNewEntry = (type) => {
    const newEntry = {
      id: Date.now(),
      date: selectedDate,
      type: type,
      productId: '',
      product: '',
      quantity: 0,
      amount: 0
    };

    setInventoryData([...inventoryData, newEntry]);
    localStorage.setItem('dairyInventory', JSON.stringify([...inventoryData, newEntry]));
  };

  const deleteEntry = (id) => {
    const updatedData = inventoryData.filter(item => item.id !== id);
    setInventoryData(updatedData);
    localStorage.setItem('dairyInventory', JSON.stringify(updatedData));
  };

  const DataTable = ({ type }) => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {type === 'LOAD' ? 'Loading Stock' : type === 'ROOT' ? 'Root Distribution' : 'Shop Stock'}
        </h2>
        <button
          onClick={() => addNewEntry(type)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add New Entry
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryData
              .filter(entry => entry.date === selectedDate && entry.type === type)
              .map(entry => (
                <tr key={entry.id}>
                  <td className="px-4 py-2">
                    <select
                      value={entry.productId || ''}
                      onChange={(e) => handleValueChange(entry.id, 'productId', e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="">Select Product</option>
                      {Object.entries(productCategories).map(([category, products]) => (
                        <optgroup key={category} label={category.toUpperCase()}>
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.label} 
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={entry.quantity || ''}
                      onChange={(e) => handleValueChange(entry.id, 'quantity', e.target.value)}
                      className="w-24 px-2 py-1 border rounded"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={entry.amount || 0}
                      className="w-24 px-2 py-1 border rounded bg-gray-50"
                      readOnly
                    />
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {type === 'LOAD' && (
                      <>
                        <button
                          onClick={() => transferProduct(entry, 'ROOT')}
                          className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded border border-blue-500 hover:bg-blue-50"
                          disabled={!entry.productId || !entry.quantity}
                        >
                          To Root
                        </button>
                        <button
                          onClick={() => transferProduct(entry, 'SHOP')}
                          className="text-green-500 hover:text-green-700 px-2 py-1 rounded border border-green-500 hover:bg-green-50"
                          disabled={!entry.productId || !entry.quantity}
                        >
                          To Shop
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 px-2 py-1 rounded border border-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
        isActive 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  const SummaryView = () => {
    // Calculate summaries for each type
    const calculateSummary = () => {
      const summary = {
        load: {},
        root: {},
        shop: {},
        balance: {}
      };

      // Filter today's entries
      const todayEntries = inventoryData.filter(entry => entry.date === selectedDate);

      // Process each entry
      todayEntries.forEach(entry => {
        const type = entry.type.toLowerCase();
        if (!summary[type][entry.productId]) {
          summary[type][entry.productId] = {
            quantity: 0,
            amount: 0,
            product: entry.product
          };
        }
        summary[type][entry.productId].quantity += Number(entry.quantity) || 0;
        summary[type][entry.productId].amount += Number(entry.amount) || 0;
      });

      // Calculate balances
      Object.keys(summary.load).forEach(productId => {
        summary.balance[productId] = {
          product: summary.load[productId].product,
          quantity: (summary.load[productId].quantity || 0) - 
                   (summary.root[productId]?.quantity || 0) - 
                   (summary.shop[productId]?.quantity || 0),
          amount: (summary.load[productId].amount || 0) - 
                  (summary.root[productId]?.amount || 0) - 
                  (summary.shop[productId]?.amount || 0)
        };
      });

      return summary;
    };

    const summary = calculateSummary();

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Daily Summary - {selectedDate}</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Load Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Root Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Shop Qty</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(summary.load).map(([productId, loadData]) => (
                  <tr key={productId}>
                    <td className="px-4 py-2">{loadData.product}</td>
                    <td className="px-4 py-2 text-right">{loadData.quantity}</td>
                    <td className="px-4 py-2 text-right">{summary.root[productId]?.quantity || 0}</td>
                    <td className="px-4 py-2 text-right">{summary.shop[productId]?.quantity || 0}</td>
                    <td className="px-4 py-2 text-right">{summary.balance[productId]?.quantity || 0}</td>
                    <td className="px-4 py-2 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        summary.balance[productId]?.quantity === 0 
                          ? 'bg-green-100 text-green-800' 
                          : summary.balance[productId]?.quantity > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {summary.balance[productId]?.quantity === 0 
                          ? 'Balanced' 
                          : summary.balance[productId]?.quantity > 0
                            ? 'Excess'
                            : 'Short'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Summary */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-green-800">Total Load Value</h4>
                <p className="text-2xl font-bold text-green-900">
                  ₹{Object.values(summary.load).reduce((sum, item) => sum + (item.amount || 0), 0)}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800">Total Root Value</h4>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{Object.values(summary.root).reduce((sum, item) => sum + (item.amount || 0), 0)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-purple-800">Total Shop Value</h4>
                <p className="text-2xl font-bold text-purple-900">
                  ₹{Object.values(summary.shop).reduce((sum, item) => sum + (item.amount || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add this function to check available quantity
  const getAvailableQuantity = (productId) => {
    const todayEntries = inventoryData.filter(entry => entry.date === selectedDate);
    
    const loadQty = todayEntries
      .filter(entry => entry.type === 'LOAD' && entry.productId === productId)
      .reduce((sum, entry) => sum + (Number(entry.quantity) || 0), 0);
      
    const usedQty = todayEntries
      .filter(entry => (entry.type === 'ROOT' || entry.type === 'SHOP') && entry.productId === productId)
      .reduce((sum, entry) => sum + (Number(entry.quantity) || 0), 0);
      
    return loadQty - usedQty;
  };

  // Add this function to validate transfers
  const validateTransfer = (fromEntry) => {
    const availableQty = getAvailableQuantity(fromEntry.productId);
    if (availableQty < fromEntry.quantity) {
      alert(`Only ${availableQty} units available for transfer`);
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dairy Inventory Management</h1>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 flex space-x-4">
        <TabButton
          icon={TruckIcon}
          label="Load"
          isActive={activeTab === 'LOAD'}
          onClick={() => setActiveTab('LOAD')}
        />
        <TabButton
          icon={ShoppingBagIcon}
          label="Root"
          isActive={activeTab === 'ROOT'}
          onClick={() => setActiveTab('ROOT')}
        />
        <TabButton
          icon={BuildingStorefrontIcon}
          label="Shop"
          isActive={activeTab === 'SHOP'}
          onClick={() => setActiveTab('SHOP')}
        />
        <TabButton
          icon={ChartBarIcon}
          label="Summary"
          isActive={activeTab === 'summary'}
          onClick={() => setActiveTab('summary')}
        />
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {activeTab === 'summary' ? (
          <SummaryView />
        ) : (
          <DataTable type={activeTab} />
        )}
      </div>
    </div>
  );
};

export default Inventory;