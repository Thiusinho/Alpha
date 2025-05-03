import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Trophy, User, Swords, Home, History, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!isLoggedIn) {
    return (
      <header className="bg-black py-4 border-b border-red-800">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="text-xl md:text-2xl font-bold text-white">
            <span className="text-red-600">AS</span> LENDAS
          </Link>
        </div>
      </header>
    );
  }
  
  const navItems = [
    { path: '/', label: 'Início', icon: <Home size={20} /> },
    { path: '/profile', label: 'Perfil', icon: <User size={20} /> },
    { path: '/fight', label: 'Lutar', icon: <Swords size={20} /> },
    { path: '/ranking', label: 'Ranking', icon: <Trophy size={20} /> },
    { path: '/history', label: 'Histórico', icon: <History size={20} /> },
  ];

  return (
    <header className="bg-black py-4 border-b border-red-800 sticky top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <Link to="/" className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-0">
          <span className="text-red-600">AS</span> LENDAS
        </Link>
        
        <nav className="flex items-center space-x-1 md:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative group px-3 py-2 rounded-md text-sm flex items-center"
            >
              {location.pathname === item.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-red-900/40 rounded-md"
                  initial={false}
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <span className="relative flex items-center space-x-1">
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </span>
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="px-3 py-2 rounded-md text-sm flex items-center hover:bg-red-900/40"
          >
            <LogOut size={20} />
            <span className="hidden md:inline ml-1">Sair</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;