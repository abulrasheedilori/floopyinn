// DashboardLayout.tsx
import React from 'react';
import Topbar from './task/views/components/Topbar';
import Sidebar from './task/views/components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
