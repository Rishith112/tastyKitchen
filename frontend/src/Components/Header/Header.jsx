
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    document.cookie = "jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    navigate('/', { replace: true });
  };

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-10 py-4 bg-[#f8fafc] border-b border-[#ececec] relative">
      <div className="flex items-center">
        <Link to="/home" className="flex items-center text-[#1e293b] font-bold text-2xl">
          <img
            src="https://res.cloudinary.com/dbwnoheep/image/upload/v1750759230/Frame_274_gavlyp.png"
            alt="logo"
            className="w-10 h-10 mr-2"
          />
          <span className="text-xl font-semibold italic text-[#f59e0b]">Tasty Kitchens</span>
        </Link>
      </div>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/home"
          className="text-[#f59e0b] font-medium text-base"
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="text-[#1e293b] font-medium text-base"
        >
          Cart
        </Link>
        <button
          className="ml-2 bg-[#f59e0b] text-white px-4 py-1.5 rounded-md font-medium text-base"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </nav>
      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
        aria-label="Open Menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className="block w-6 h-0.5 bg-[#1e293b] mb-1"></span>
        <span className="block w-6 h-0.5 bg-[#1e293b] mb-1"></span>
        <span className="block w-6 h-0.5 bg-[#1e293b]"></span>
      </button>
      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg flex flex-col items-start z-50 border border-gray-200 md:hidden animate-fade-in">
          <Link
            to="/home"
            className="w-full px-6 py-3 text-[#f59e0b] font-medium text-base hover:bg-gray-100 border-b border-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="w-full px-6 py-3 text-[#1e293b] font-medium text-base hover:bg-gray-100 border-b border-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
          <button
            className="w-full px-6 py-3 text-white bg-[#f59e0b] rounded-b-lg font-medium text-base text-left hover:bg-[#fbbf24]"
            onClick={() => { setMenuOpen(false); handleLogOut(); }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header
