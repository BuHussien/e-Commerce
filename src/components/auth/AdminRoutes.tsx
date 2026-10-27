import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "@store/hooks";

interface IProps {
  children: ReactNode;
}

const AdminRoutes = ({ children }: IProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (user.role !== "admin" && user.role !== "greatAdmin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoutes;