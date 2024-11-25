import React from 'react';
import Modal from '../../components/Modal';

const CustomerDetails = ({ isOpen, onClose, customer }) => {
  if (!customer) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer Details">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Name</h3>
          <p className="mt-1">{customer.name}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="mt-1">{customer.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Phone</h3>
          <p className="mt-1">{customer.phone}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Address</h3>
          <p className="mt-1">{customer.address}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Purchases</h3>
          <p className="mt-1">₹{customer.totalPurchases?.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Last Purchase</h3>
          <p className="mt-1">{customer.lastPurchase}</p>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetails; 