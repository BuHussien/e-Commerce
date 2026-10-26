import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Dashboard", to: "/dashboard" },
  { title: "Products", to: "/dashboard/products" },
  { title: "Categories", to: "/dashboard/categories" },
  { title: "Orders", to: "/dashboard/orders" },
  { title: "Users", to: "/dashboard/users" },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
        aria-expanded={isOpen}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-xl text-gray-700 shadow-sm md:hidden"
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white p-5 transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:translate-x-0 lg:w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-4">
          <h1 className="text-xl! font-bold text-pink-600!">
            Noor<span className="text-gray-800"> Dashboard</span>
          </h1>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            className="text-2xl text-gray-500 hover:text-gray-800 md:hidden"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-sm font-medium no-underline! transition-colors ${
                  isActive
                    ? "bg-pink-50 text-pink-600!"
                    : "text-gray-600! hover:bg-pink-50 hover:text-pink-600!"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          type="button"
          className="mt-auto rounded-lg px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50"
        >
          Log Out
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;
