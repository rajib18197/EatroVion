import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authState,
  getAuthRequestStatus,
  getUser,
} from "../features/authentication/authSlice";
import { getCurrentUser } from "../features/authentication/authApi";
import { useUser } from "../hooks/useUser";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useUser();
  console.log(isAuthenticated, user);
  // const { isAuthenticated, user } = useSelector(authState);
  // const { name, inProgress, error } = useSelector((state) =>
  //   getAuthRequestStatus(state, "getUser")
  // );

  // const dispatch = useDispatch();

  // useEffect(function () {
  //   async function getUserData() {
  //     try {
  //       await dispatch(
  //         getUser({ requestName: "getUser", requestFn: getCurrentUser })
  //       ).unwrap();
  //     } catch (err) {}
  //   }

  //   getUserData();
  // }, []);

  useEffect(
    function () {
      if (isAuthenticated === "not-authorized-user") {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate]
  );

  // console.log(isAuthenticated !== "not-authorized-user");
  // console.log(isAuthenticated === true);
  // console.log(
  //   isAuthenticated !== "not-authorized-user" || isAuthenticated === true
  // );

  return isAuthenticated === true && children;
}
