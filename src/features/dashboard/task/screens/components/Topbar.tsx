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
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-[60vw] px-4 py-2 border border-slate-300 rounded-2xl focus:outline-slate-400"
        />
      </div>
      <div className="flex items-center space-x-4">
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
            <a href="/profile" className="block px-4 py-2 hover:bg-black hover:text-slate-50 hover:rounded-lg">
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
