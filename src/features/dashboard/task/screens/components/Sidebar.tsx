// Sidebar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaCog } from 'react-icons/fa'; // Importing icons

const navItems = [
  { name: 'Overview', path: '/', icon: <FaHome /> },
  { name: 'Meeting', path: '/meeting', icon: <FaUser /> },
  { name: 'Message', path: '/message', icon: <FaCog /> },
  { name: 'Project', path: '/project', icon: <FaCog /> },
  { name: 'Ticket', path: '/ticket', icon: <FaCog /> },
  { name: 'Employee', path: '/employee', icon: <FaCog /> },
  { name: 'Attendance', path: '/attendance', icon: <FaCog /> },
  { name: 'Notice', path: '/notice', icon: <FaCog /> },
  { name: 'HR Tab', path: '/hrtab', icon: <FaCog /> },
  { name: 'Organization', path: '/organization', icon: <FaCog /> },
  { name: 'Account', path: '/account', icon: <FaCog /> },
  { name: 'Settings', path: '/settings', icon: <FaCog /> },
];

const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string>('');

  const handleSetActive = (name: string) => {
    setActive(name);
  };

  return (
    <div className="w-[12wv] h-full text-slate-600 shadow-md">
      <nav className="mt-10 ml-4 flex flex-col justify-center items-start">
        <section className='flex flex-row items-center justify-items-start'>
          <img src="" alt="logo" className="w-20 h-20 rounded-full" />
          <span className='text-2xl text-black font-extrabold italic'>Floopyinn</span>
        </section>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`w-full flex items-center py-2.5 px-4 rounded transition duration-200 ${
              active === item.name ? 'bg-gray-700' : 'hover:bg-black rounded-2xl hover:text-slate-50'
            }`}
            onClick={() => handleSetActive(item.name)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
