import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  ShoppingCartIcon,
  CubeIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ mobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, href: '/dashboard', role: ['admin', 'user'] },
    { name: 'POS', icon: ShoppingCartIcon, href: '/dashboard/pos', role: ['admin', 'user'] },
    { name: 'Inventory', icon: CubeIcon, href: '/dashboard/inventory', role: ['admin'] },
    { name: 'Products', icon: CubeIcon, href: '/dashboard/products', role: ['admin'] },
    { name: 'Sales', icon: ChartBarIcon, href: '/dashboard/sales', role: ['admin'] },
    { name: 'Customers', icon: UsersIcon, href: '/dashboard/customers', role: ['admin'] },
    { name: 'Analytics', icon: ChartBarIcon, href: '/dashboard/analytics', role: ['admin'] },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`flex flex-col h-full w-64 bg-gradient-to-b from-blue-700 to-blue-900 ${mobile ? 'rounded-r-xl' : ''}`}>
      {/* Logo */}
      <div className="flex items-center justify-start h-16 px-4">
        <img
          src="/path-to-your-logo.png"
          alt="Logo"
          className="h-8 w-8 rounded-full"
        />
        <span className="ml-2 text-white text-lg font-semibold">Milk Dairy</span>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-t border-blue-600">
        <div className="flex items-center">
          <UserCircleIcon className="h-8 w-8 text-white" />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user?.name || 'User Name'}</p>
            <p className="text-xs text-blue-200">{user?.role || 'Role'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-800/50'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-600">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm text-blue-100 rounded-lg hover:bg-blue-800/50 transition-colors duration-200"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 