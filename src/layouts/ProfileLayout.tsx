import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  const profileLinks = [
    { title: "Account", to: "", end: true },
    { title: "Orders", to: "orders", end: false },

  ];

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/5">
        <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
          {profileLinks.map((link) => (
            <NavLink key={link.title} to={link.to} end={link.end} className={({ isActive }) =>
                `block border-b border-l-4 border-gray-200 px-4 py-3 text-sm font-medium transition-colors no-underline! ${
                  isActive
                    ? "bg-rose-50 text-rose-600!"
                    : "text-gray-700! hover:bg-gray-50"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;