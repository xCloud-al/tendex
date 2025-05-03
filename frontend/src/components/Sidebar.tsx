import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, FileText, FileCheck, BarChart, Settings,
  Users, Send, Award
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { path: '/tenders', label: 'Tenders', icon: <FileText className="h-5 w-5" /> },
    // { path: '/evaluation', label: 'Evaluation', icon: <FileCheck className="h-5 w-5" /> },
    { path: '/reports', label: 'Reports', icon: <BarChart className="h-5 w-5" /> },
    // { path: '/vendors', label: 'Vendors', icon: <Users className="h-5 w-5" /> },
    // { path: '/submissions', label: 'Submissions', icon: <Send className="h-5 w-5" /> },
    // { path: '/awards', label: 'Awards', icon: <Award className="h-5 w-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside 
      className={`
        bg-white border-r border-neutral-200 fixed h-full left-0 top-[72px] z-10 overflow-y-auto
        w-64 transition-transform duration-300 transform shadow-md
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'}
      `}
    >
      <nav className="px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 text-sm rounded-md transition-colors duration-150
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }
                  ${isOpen ? '' : 'justify-center'}`
                }
                end={item.path === '/'}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;