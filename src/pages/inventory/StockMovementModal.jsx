import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';

const StockMovementModal = ({ isOpen, onClose, onSubmit, inventory, selectedItem }) => {
  const [formData, setFormData] = useState({
    itemId: '',
    type: 'in',
    quantity: '',
    reason: '',
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData(prev => ({
        ...prev,
        itemId: selectedItem.id,
      }));
    }
  }, [selectedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      itemId: '',
      type: 'in',
      quantity: '',
      reason: '',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Stock Movement">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product
          </label>
          <select
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.itemId}
            onChange={(e) => setFormData({ ...formData, itemId: Number(e.target.value) })}
          >
            <option value="">Select Product</option>
            {inventory.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} - Current Stock: {item.quantity} {item.unit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Movement Type
          </label>
          <select
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="in">Stock In</option>
            <option value="out">Stock Out</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            required
            min="1"
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <textarea
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            rows="3"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          ></textarea>
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
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StockMovementModal; 