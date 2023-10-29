import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/storage/auth";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const loggedIn = useAuthStore((state) => state.isLoggedIn)();
  const location = useLocation();
  return loggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
