import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Your existing Navbar component

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout; 