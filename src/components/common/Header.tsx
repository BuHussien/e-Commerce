import { useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderBasket from "@components/eCommerce/HeaderBasket";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-rose-600 font-bold transition-colors !no-underline"
      : "text-gray-600 hover:text-rose-600 font-medium transition-colors !no-underline";

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "block px-3 py-2 text-base font-bold text-rose-600 bg-rose-50 rounded-md border-l-4 border-rose-600 !no-underline"
      : "block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-600 hover:bg-gray-50 rounded-md transition-colors !no-underline";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 1. Logo */}
          <div className="shrink-0 flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-extrabold text-gray-800 flex items-center gap-1 tracking-wider uppercase no-underline!"
            >
              <span>NOUR</span>
              <span className="bg-rose-600 text-white text-sm px-2 py-1 rounded-sm shadow-sm">
                LIGHT
              </span>
            </NavLink>
            
            {/* 2. Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 mt-1 ml-6 border-l border-gray-200 pl-5 ">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="categories" className={navLinkClass}>
                Categories
              </NavLink>
              <NavLink to="about-us" className={navLinkClass}>
                About Us
              </NavLink>
            </nav>
          </div>

          {/* 3. Desktop Auth & Cart */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-6 border-r border-gray-200 pr-6">
              <NavLink
                to="login"
                className="text-gray-600 hover:text-rose-600 text-sm font-semibold transition-colors no-underline!"
              >
                Login
              </NavLink>
              <NavLink
                to="register"
                className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-md hover:shadow-lg no-underline!"
              >
                Register
              </NavLink>
            </div>

            {/* CART */}
            <NavLink 
              to="cart"
              className="text-gray-700 hover:text-rose-600 transition-colors cursor-pointer">
              <HeaderBasket />
            </NavLink>
          </div>

          {/* 4. Mobile Cart & Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-5">
            <div className="text-gray-700 hover:text-rose-600 transition-colors">
              <HeaderBasket />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-rose-600 focus:outline-none"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0">
          <div className="px-4 pt-4 pb-3 space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="categories"
              onClick={() => setIsMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Categories
            </NavLink>
            <NavLink
              to="about-us"
              onClick={() => setIsMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              About Us
            </NavLink>
          </div>
          <div className="px-4 pt-4 pb-6 border-t border-gray-100 flex flex-col space-y-3">
            <NavLink
              to="login"
              onClick={() => setIsMenuOpen(false)}
              className="text-center text-gray-600 hover:text-rose-600 font-semibold py-2 no-underline!"
            >
              Login
            </NavLink>
            <NavLink
              to="register"
              onClick={() => setIsMenuOpen(false)}
              className="text-center bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 rounded-md shadow-md no-underline!"
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
