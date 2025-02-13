// DashboardLayout.tsx
import React from 'react';
import Topbar from './task/views/components/Topbar';
import Sidebar from './task/views/components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../common/reduxtk/hooks';

const DashboardLayout: React.FC = () => {
  const darkMode = useAppSelector(state => state.auth.darkMode);

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-300" : "bg-slate-50"}`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
