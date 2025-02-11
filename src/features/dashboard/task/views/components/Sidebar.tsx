// Sidebar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { navItems } from '../../../../navigation/navItems';
import { useAppSelector } from '../../../../../common/reduxtk/hooks';


const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const darkMode = useAppSelector(state => state.auth.darkMode);


  const handleSetActive = (name: string) => {
    setActive(name);
  };

  return (
    <div className={`w-[12wv] h-full text-slate-600 ${darkMode ? "bg-gray-300" : "bg-slate-50"} shadow-md relative`}>
      <nav className="mt-4 ml-4 flex flex-col justify-center items-start">
        <section className='flex flex-row items-center justify-items-start mb-8'>
          <img src="../../../../../assets/floopyinn.png" alt="" className="w-36 h-10 rounded-full border border-gray-400" />
        </section>
        {navItems.map((item) => {
          if (item.nestedItem.length > 0) {
            return (
              <section className='flex flex-row justify-between items-center' key={item.name}>
                <NavLink
                  to={item.path}
                  className={`w-full flex items-center py-2.5 px-4 rounded-2xl transition duration-200 ${active === item.name ? 'bg-black text-slate-50' : 'hover:bg-black  hover:text-slate-50'
                    }`}
                  onClick={() => handleSetActive(item.name)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
                {item.nestedItem.length > 0 && (<BiDownArrow className="ml-auto" size={8} onClick={() => setShowDropdown(true)} />)}
                {/* {showDropdown && <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <a href="/profile" className="block px-4 py-2 hover:bg-black hover:text-slate-50 hover:rounded-lg">
                    Profile
                  </a>
                  <a href="/settings" className="block px-4 py-2 hover:bg-black hover:text-slate-50 hover:rounded-lg">
                    Settings
                  </a>
                  <a href="/logout" className="block px-4 py-2 hover:bg-red-700 hover:text-red-50 hover:rounded-lg">
                    Logout
                  </a>
                </div>} */}
              </section>
            )
          } else {
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`w-full flex items-center py-2.5 px-4 rounded-2xl transition duration-200 ${active === item.name ? 'bg-black text-slate-50' : 'hover:bg-black  hover:text-slate-50'
                  }`}
                onClick={() => handleSetActive(item.name)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            )
          }
        })}
      </nav>

    </div>
  );
};

export default Sidebar;
