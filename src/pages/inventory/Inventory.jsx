import React, { useState, useEffect } from 'react';
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import AddStockModal from './AddStockModal';
import StockMovementModal from './StockMovementModal';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    // Load inventory from localStorage
    const storedInventory = JSON.parse(localStorage.getItem('inventory')) || [];
    if (storedInventory.length === 0) {
      // Initialize with mock data if empty
      const mockInventory = [
        {
          id: 1,
          name: 'Fresh Milk',
          category: 'Milk',
          quantity: 100,
          unit: 'Liters',
          minStock: 20,
          expiryDate: '2024-04-01',
          lastUpdated: '2024-03-20',
        },
        // Add more mock items...
      ];
      localStorage.setItem('inventory', JSON.stringify(mockInventory));
      setInventory(mockInventory);
    } else {
      setInventory(storedInventory);
    }
  }, []);

  const handleAddStock = (newStock) => {
    const updatedInventory = [...inventory, { ...newStock, id: Date.now() }];
    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    setIsAddModalOpen(false);
  };

  const handleStockMovement = (movement) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === movement.itemId) {
        return {
          ...item,
          quantity: movement.type === 'in' 
            ? item.quantity + movement.quantity 
            : item.quantity - movement.quantity,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });
    setInventory(updatedInventory);
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    setIsMovementModalOpen(false);
  };

  const categories = ['all', 'Milk', 'Yogurt', 'Cheese', 'Butter', 'Cream'];

  const filteredInventory = filterCategory === 'all'
    ? inventory
    : inventory.filter(item => item.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Inventory Management</h1>
          <select
            className="border rounded-md px-3 py-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsMovementModalOpen(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Stock Movement
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Item
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${
                    item.quantity <= item.minStock ? 'text-red-600 font-medium' : 'text-gray-900'
                  }`}>
                    {item.quantity} {item.unit}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.minStock} {item.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.expiryDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.lastUpdated}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsMovementModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Update Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddStockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStock}
      />
      <StockMovementModal
        isOpen={isMovementModalOpen}
        onClose={() => {
          setIsMovementModalOpen(false);
          setSelectedItem(null);
        }}
        onSubmit={handleStockMovement}
        inventory={inventory}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Inventory; 