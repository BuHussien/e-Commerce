import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetUsers from "@store/users/act/actGetUsers";
import DashboardUsersTable from "@components/eCommerce/dashboard/DashboardUsersTable";

const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(actGetUsers());
  }, [dispatch]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Users
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage users and their permissions.
        </p>
      </div>

      <DashboardUsersTable
        canManageRoles={currentUser?.role === "greatAdmin"}
      />
    </section>
  );
};

export default AdminUsers;