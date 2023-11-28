import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../hooks/useUser";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useUser();
  console.log(isAuthenticated, user);

  useEffect(
    function () {
      if (isAuthenticated === "not-authorized-user") {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated === true && children;
}
