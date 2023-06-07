import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedAuth = ({ children }) => {
  const location = useLocation();
  const {
    userState: { isLoggedIn },
  } = useAuthContext();
  return (
    <>
      {isLoggedIn ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location.pathname }} />
      )}
    </>
  );
};

export default ProtectedAuth;
