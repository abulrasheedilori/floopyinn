import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegMoon, FaMoon } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import React, { useState } from 'react';

const Topbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div className="relative w-[40vw]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {/* Search Icon */}
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search here ..."
          className="w-full px-10 py-2 border border-slate-300 rounded-2xl focus:outline-slate-400"
        />
      </div>

      <div className="flex items-center space-x-4 bg-slate-50 py-4 px-2">
        <button className="relative">
          <IoNotificationsOutline size={32}/>
        <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-xs text-slate-50 rounded-full">12</span>
        </button>

          {isDarkMode ?  <FaRegMoon size={24} onClick={toggleTheme}/> : <FaMoon size={24} onClick={toggleTheme}/>}

        <div className="relative">
          <button className="flex items-center space-x-2">
            {/* <img
              src="path-to-avatar.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            /> */}
            <RxAvatar size={24}/>
            <span className="text-lg">Masum Khan</span>
            {showDropdown ?  <RiArrowDropUpLine size={24} onClick={()=>setShowDropdown(false)}/> : <RiArrowDropDownLine size={24} onClick={()=>setShowDropdown(true)} />}
            </button>
          {/* Dropdown menu */}
          {showDropdown && <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg">
            <a href="/account" className="block px-4 py-2 hover:bg-black hover:text-slate-50 hover:rounded-lg">
              Profile
            </a>
            <a href="/settings" className="block px-4 py-2 hover:bg-black hover:text-slate-50 hover:rounded-lg">
              Settings
            </a>
            <a href="/logout" className="block px-4 py-2 hover:bg-red-700 hover:text-red-50 hover:rounded-lg">
              Logout
            </a>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
