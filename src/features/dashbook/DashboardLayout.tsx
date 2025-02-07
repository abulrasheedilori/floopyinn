// DashboardLayout.tsx
import React from 'react';
import Sidebar from './task/screens/components/SideBar';
import Topbar from './task/screens/components/Topbar';

const DashboardLayout: React.FC = ({ children }: any) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
