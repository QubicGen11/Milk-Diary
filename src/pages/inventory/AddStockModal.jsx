import React, { useState } from 'react';
import Modal from '../../components/Modal';

const AddStockModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Milk',
    quantity: '',
    unit: 'Liters',
    minStock: '',
    expiryDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
    setFormData({
      name: '',
      category: 'Milk',
      quantity: '',
      unit: 'Liters',
      minStock: '',
      expiryDate: '',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Stock Item">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Milk">Milk</option>
            <option value="Yogurt">Yogurt</option>
            <option value="Cheese">Cheese</option>
            <option value="Butter">Butter</option>
            <option value="Cream">Cream</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <select
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            >
              <option value="Liters">Liters</option>
              <option value="Kilograms">Kilograms</option>
              <option value="Units">Units</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Stock Level
          </label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.minStock}
            onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Item
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStockModal; 