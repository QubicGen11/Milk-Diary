import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  CalendarIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import SalesFilter from './SalesFilter';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    startDate: '',
    endDate: '',
    paymentMethod: 'all',
    minAmount: '',
    maxAmount: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Load sales from localStorage
    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    if (storedSales.length === 0) {
      // Initialize with mock data
      const mockSales = generateMockSales();
      localStorage.setItem('sales', JSON.stringify(mockSales));
      setSales(mockSales);
    } else {
      setSales(storedSales);
    }
  }, []);

  const generateMockSales = () => {
    const mockSales = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    for (let i = 0; i < 50; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      mockSales.push({
        id: i + 1,
        date: date.toISOString(),
        customer: `Customer ${i + 1}`,
        items: [
          { name: 'Milk 1L', quantity: 2, price: 60 },
          { name: 'Yogurt', quantity: 1, price: 40 },
        ],
        total: 160,
        paymentMethod: ['cash', 'card', 'upi'][Math.floor(Math.random() * 3)],
        status: 'completed',
      });
    }
    return mockSales;
  };

  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    const startDate = filterOptions.startDate ? new Date(filterOptions.startDate) : null;
    const endDate = filterOptions.endDate ? new Date(filterOptions.endDate) : null;

    return (
      (!startDate || saleDate >= startDate) &&
      (!endDate || saleDate <= endDate) &&
      (filterOptions.paymentMethod === 'all' || sale.paymentMethod === filterOptions.paymentMethod) &&
      (!filterOptions.minAmount || sale.total >= Number(filterOptions.minAmount)) &&
      (!filterOptions.maxAmount || sale.total <= Number(filterOptions.maxAmount))
    );
  });

  // Prepare data for charts
  const dailySales = filteredSales.reduce((acc, sale) => {
    const date = sale.date.split('T')[0];
    acc[date] = (acc[date] || 0) + sale.total;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(dailySales),
    datasets: [
      {
        label: 'Daily Sales',
        data: Object.values(dailySales),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const paymentMethodData = {
    labels: ['Cash', 'Card', 'UPI'],
    datasets: [
      {
        label: 'Payment Methods',
        data: [
          filteredSales.filter(s => s.paymentMethod === 'cash').length,
          filteredSales.filter(s => s.paymentMethod === 'card').length,
          filteredSales.filter(s => s.paymentMethod === 'upi').length,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
      },
    ],
  };

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const averageOrderValue = totalSales / filteredSales.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Sales Management</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter
          </button>
          <button
            onClick={() => {/* Handle export */}}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
          <p className="mt-2 text-3xl font-bold">₹{totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="mt-2 text-3xl font-bold">{filteredSales.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium">Average Order Value</h3>
          <p className="mt-2 text-3xl font-bold">₹{averageOrderValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
          <Bar data={paymentMethodData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSales.slice(0, 10).map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(sale.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {sale.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{sale.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sale.paymentMethod.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <SalesFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterOptions={filterOptions}
        onApplyFilter={(filters) => {
          setFilterOptions(filters);
          setIsFilterOpen(false);
        }}
      />
    </div>
  );
};

export default Sales; 