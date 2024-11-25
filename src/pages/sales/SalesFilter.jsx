import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';

const SalesFilter = ({ isOpen, onClose, filterOptions, onApplyFilter }) => {
  const [filters, setFilters] = useState(filterOptions);

  useEffect(() => {
    setFilters(filterOptions);
  }, [filterOptions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilter(filters);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Sales">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
            value={filters.paymentMethod}
            onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
          >
            <option value="all">All Methods</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Amount
            </label>
            <input
              type="number"
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              value={filters.minAmount}
              onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Amount
            </label>
            <input
              type="number"
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
              value={filters.maxAmount}
              onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => {
              setFilters({
                startDate: '',
                endDate: '',
                paymentMethod: 'all',
                minAmount: '',
                maxAmount: '',
              });
            }}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SalesFilter; 