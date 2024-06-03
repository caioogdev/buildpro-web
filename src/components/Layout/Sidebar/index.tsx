// src/components/sidebar/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center space-y-6 p-4 bg-gray-800 text-white">
      <Link to="/" className="flex items-center space-x-2">
        <Home />
        <span>Home</span>
      </Link>
      <Link to="/profile" className="flex items-center space-x-2">
        <User />
        <span>Profile</span>
      </Link>
      <Link to="/settings" className="flex items-center space-x-2">
        <Settings />
        <span>Settings</span>
      </Link>
    </div>
  );
};

export default Sidebar;
