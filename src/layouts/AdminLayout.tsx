import AdminHeader from "@components/common/AdminHeader";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@components/common/AdminSidebar";

interface IProps {}

const AdminLayout = ({}: IProps) => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50 text-gray-800">
        <AdminSidebar />

        <main className="min-w-0 flex-1">
          <AdminHeader />

          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
