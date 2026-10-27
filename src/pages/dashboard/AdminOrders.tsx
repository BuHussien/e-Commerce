import { useEffect } from "react";
import DashboardOrdersTable from "@components/eCommerce/dashboard/DashboardOrdersTable";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetAllOrders from "@store/orders/act/actGetAllOrders";

interface IProps {}

const AdminOrders = ({}: IProps) => {
  const dispatch = useAppDispatch();
  const { loading, error, allOrders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(actGetAllOrders());
  }, [dispatch]);

  if (loading === "pending") return <p className="p-6 text-center text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-xs text-gray-500">View and track store orders</p>
        </div>
      </div>

      <DashboardOrdersTable orders={allOrders || []} />
    </div>
  );
};

export default AdminOrders;
