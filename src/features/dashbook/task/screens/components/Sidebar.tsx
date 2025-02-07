// Sidebar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/profile' },
  { name: 'Settings', path: '/settings' },
  // Add more items as needed
];

const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string>('');

  const handleSetActive = (name: string) => {
    setActive(name);
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <nav className="mt-10">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              active === item.name ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleSetActive(item.name)}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
