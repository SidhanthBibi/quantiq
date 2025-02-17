import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    } shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold">AlgoTrader</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.path}
                className={`font-medium transition-colors duration-200 ${
                  darkMode 
                    ? 'hover:text-blue-400' 
                    : 'hover:text-blue-600'
                } transform hover:scale-105 transition-transform`}
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-700 text-yellow-300 hover:text-yellow-200' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className={`px-4 py-2 space-y-2 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.path}
              className={`block py-2 px-4 rounded-md transition-colors duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-700 hover:text-blue-400' 
                  : 'hover:bg-gray-100 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;