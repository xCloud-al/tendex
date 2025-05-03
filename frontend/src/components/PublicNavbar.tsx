import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const PublicNavbar: React.FC = () => {
  return (
    <header className="bg-white/60 backdrop-blur-xl border-b border-neutral-200/30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/vendors/tenders" className="flex items-center">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center">
          <Link 
            to="/login" 
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar; 