// Topbar.tsx
import React, { useState } from 'react';

const Topbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Implement theme toggling logic here
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <span className="material-icons">notifications</span>
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </button>
        <button onClick={toggleTheme}>
          <span className="material-icons">
            {isDarkMode ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
        <div className="relative">
          <button className="flex items-center space-x-2">
            <img
              src="path-to-avatar.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>Username</span>
            <span className="material-icons">arrow_drop_down</span>
          </button>
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
              Settings
            </a>
            <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
