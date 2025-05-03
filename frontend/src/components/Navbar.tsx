import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell, User as UserIcon, LogOut } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/60 backdrop-blur-xl border-b border-neutral-200/30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-4 text-neutral-600 hover:text-neutral-900 focus:outline-none transition-all duration-200 hover:scale-105"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/" className="ml-1 flex items-center">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none transition-all duration-200 hover:scale-105">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-error-500 rounded-full shadow-sm">
                3
              </span>
            </button>
          </div>

          <div className="relative group">
            <button className="flex items-center focus:outline-none">
              <img 
                src={user?.avatar || 'https://i.pravatar.cc/150'} 
                alt="Profile" 
                className="h-8 w-8 rounded-full object-cover border-2 border-primary-100/30 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] transition-all duration-200 group-hover:scale-105"
              />
              <span className="ml-2 text-sm font-medium text-neutral-700 hidden sm:inline-block">
                {user?.name || 'User'}
              </span>
            </button>
            
            <div className="absolute right-0 pt-2 w-48 bg-white rounded-md shadow-sm py-1 z-20 hidden group-hover:block">
              <Link 
                to="/settings" 
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-gray-50"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Profile
              </Link>
              <a 
                href="#" 
                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-gray-50"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;