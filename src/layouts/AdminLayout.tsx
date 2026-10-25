import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

interface IProps {
  
}

const AdminLayout = ({}: IProps) => {
  return (
    <div>
        {/* Not Implemented yet => */} 
        <AdminHeader />
         <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AdminLayout;