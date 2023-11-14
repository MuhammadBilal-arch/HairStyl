import React, { useEffect, useRef, useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import Logo from '../images/logo/logo.svg';
// import SidebarLinkGroup from './SidebarLinkGroup';
import { ASSETS } from '../images/path';
import ModalContext from '../utils/context/modalContext';
import { HiHome, HiUsers } from 'react-icons/hi';
import { HiSquares2X2 } from 'react-icons/hi2';
import { BsBox } from 'react-icons/bs';
import { BiBarChartSquare } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { MdAdminPanelSettings, MdOutlineLogout } from 'react-icons/md';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const { modalStatus } = useContext<any>(ModalContext);
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 ${
        modalStatus ? 'z-0' : 'z-10'
      } flex h-screen w-72.5 flex-col overflow-y-hidden bg-black-primary duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-12 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={ASSETS.LOGO} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex h-full flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="my-5 h-full px-4 lg:my-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div className="flex h-full flex-col justify-between ">
            <div>
              <ul className="mb-6 flex flex-col gap-1">
                {/* <!-- Menu Item Calendar --> */}
                <li>
                  <NavLink
                    to="/home"
                    className={`sidebar-item-inactive ${
                      pathname.includes('home') && 'sidebar-item-active'
                    }`}
                  >
                    <HiHome /> <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/clients"
                    className={`sidebar-item-inactive ${
                      pathname.includes('client') && 'sidebar-item-active'
                    }`}
                  >
                    <HiUsers /> <span>Clients</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/services"
                    className={`sidebar-item-inactive ${
                      pathname.includes('services') && 'sidebar-item-active'
                    }`}
                  >
                    <HiSquares2X2 /> <span>Services</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/customers"
                    className={`sidebar-item-inactive ${
                      pathname.includes('customers') && 'sidebar-item-active'
                    }`}
                  >
                    <HiUsers /> <span>Customers</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className={`sidebar-item-inactive ${
                      pathname.includes('product') && 'sidebar-item-active'
                    }`}
                  >
                    <BsBox /> <span>Products</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/sales"
                    className={`sidebar-item-inactive ${
                      pathname.includes('sales') && 'sidebar-item-active'
                    }`}
                  >
                    <BiBarChartSquare /> <span>Sales</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/staff"
                    className={`sidebar-item-inactive ${
                      pathname.includes('staff') && 'sidebar-item-active'
                    }`}
                  >
                    <FaUserAlt className="text-sm" /> <span>Staff</span>
                  </NavLink>
                </li>
              </ul>

              <div className="border-t border-white pt-2">
                <NavLink
                  to="/account"
                  className={`sidebar-item-inactive ${
                    pathname.includes('account') && 'sidebar-item-active'
                  }`}
                >
                  <MdAdminPanelSettings className="text-lg" />{' '}
                  <span>Accounts & settings</span>
                </NavLink>
              </div>
            </div>
            <div className="grid grid-cols-6 items-center space-x-4 w-full  border-t border-white px-4 py-2 text-white">
              <div className="h-8 w-8 object-contain">
                <img
                  src={ASSETS.AUTH.SIGN_IN_COVER}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />{' '}
              </div>
              <div className="flex col-span-4 flex-col ">
                <div className="text-sm">Olivia Rhye</div>
                <div className="text-xs">olivia@untitledui.com</div>
              </div>
              <div className=''>
                <MdOutlineLogout className="text-sm md:text-xl" />
              </div>
            </div>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
