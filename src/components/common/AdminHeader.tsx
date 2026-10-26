const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5 h-10">
      <h2 className="text-xl font-semibold text-gray-800">
        Admin Dashboard
      </h2>

      <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
        Admin
      </span>
    </header>
  );
};

export default AdminHeader;