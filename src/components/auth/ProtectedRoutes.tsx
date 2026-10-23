import type { ReactNode } from "react";
import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  if (!accessToken) return <Navigate to="/login" />;
  return <>{children}</>;
};
export default ProtectedRoutes;
