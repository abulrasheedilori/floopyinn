import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { navItems } from '../../../../navigation/navItems';
import { useAppSelector } from '../../../../../common/reduxtk/hooks';
import floopyinn from "../../../../../assets/floopyinn.png";

const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const darkMode = useAppSelector(state => state.auth.darkMode);

  const handleSetActive = (name: string) => {
    setActive(name);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className={`w-auto h-full text-slate-600 ${darkMode ? "bg-gray-300" : "bg-slate-50"} shadow-md relative`}>
      <nav className="mt-4 ml-4 flex flex-col justify-center items-start">
        <section className='flex flex-row items-center justify-start mb-8'>
          <img src={floopyinn} alt="logo" className="w-36 h-10 rounded-full bg-inherit" />
        </section>
        {navItems.map((item) => (
          <div key={item.name} className="w-full">
            <section className='flex flex-row justify-between items-center'>
              <NavLink
                to={item.nestedItem.length > 0 ? "#" : item.path}
                className={`w-full flex items-center py-2.5 px-4 rounded-2xl transition duration-200 ${active === item.name ? 'bg-black text-slate-50' : 'hover:bg-black hover:text-slate-50'}`}
                onClick={() => {
                  handleSetActive(item.name);
                  if (item.nestedItem.length > 0) toggleDropdown(item.name);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
              {item.nestedItem.length > 0 && (
                <button onClick={() => toggleDropdown(item.name)} className="focus:outline-none">
                  {openDropdown === item.name ? <RiArrowDropUpLine size={24} /> : <RiArrowDropDownLine size={24} />}
                </button>
              )}
            </section>
            {item.nestedItem.length > 0 && openDropdown === item.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-6 overflow-hidden"
              >
                {item.nestedItem.map((nested) => (
                  <NavLink
                    key={nested.name}
                    to={nested.path}
                    onClick={() => {
                      handleSetActive(item.name);
                      if (item.nestedItem.length > 0) toggleDropdown(item.name);
                    }}
                    className="block py-2 px-4 text-sm hover:bg-gray-200 rounded-lg"
                  >
                    {nested.name}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
