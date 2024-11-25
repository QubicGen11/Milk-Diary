import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';

const SupplierModal = ({ isOpen, onClose, onSave, supplier }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    products: '',
    status: 'active'
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        ...supplier,
        products: supplier.products.join(', ')
      });
    } else {
      setFormData({
        name: '',
        contact: '',
        phone: '',
        email: '',
        address: '',
        products: '',
        status: 'active'
      });
    }
  }, [supplier]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const supplierData = {
      ...formData,
      products: formData.products.split(',').map(product => product.trim())
    };
    onSave(supplierData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={supplier ? 'Edit Supplier' : 'Add Supplier'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Person</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            rows="3"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Products (comma-separated)</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.products}
            onChange={(e) => setFormData({ ...formData, products: e.target.value })}
            placeholder="e.g., Fresh Milk, Yogurt, Butter"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
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
            {supplier ? 'Update' : 'Add'} Supplier
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SupplierModal; 