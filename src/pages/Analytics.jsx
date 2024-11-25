import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState('week'); // week, month, year

  useEffect(() => {
    // Load sales data from localStorage
    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    setSalesData(storedSales);
  }, []);

  // Generate labels for the chart based on time range
  const getLabels = () => {
    switch (timeRange) {
      case 'week':
        return Array.from({ length: 7 }, (_, i) => 
          format(subDays(new Date(), 6 - i), 'MMM dd')
        );
      case 'month':
        return Array.from({ length: 30 }, (_, i) => 
          format(subDays(new Date(), 29 - i), 'MMM dd')
        );
      default:
        return Array.from({ length: 12 }, (_, i) => 
          format(new Date(2024, i, 1), 'MMM')
        );
    }
  };

  // Sales Overview Chart Data
  const salesChartData = {
    labels: getLabels(),
    datasets: [
      {
        label: 'Sales',
        data: getLabels().map(() => Math.floor(Math.random() * 10000)),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Product Distribution Chart Data
  const productChartData = {
    labels: ['Fresh Milk', 'Yogurt', 'Butter', 'Cheese', 'Other'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded-md py-2 px-4"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Sales</h3>
          <p className="text-2xl font-semibold">₹45,678</p>
          <span className="text-green-500 text-sm">+12% from last period</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-2xl font-semibold">234</p>
          <span className="text-green-500 text-sm">+5% from last period</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Average Order Value</h3>
          <p className="text-2xl font-semibold">₹195</p>
          <span className="text-red-500 text-sm">-2% from last period</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Active Customers</h3>
          <p className="text-2xl font-semibold">89</p>
          <span className="text-green-500 text-sm">+8% from last period</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <Line data={salesChartData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Product Distribution</h2>
          <Doughnut data={productChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics; 