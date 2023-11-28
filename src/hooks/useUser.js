import { useDispatch, useSelector } from "react-redux";
import {
  authState,
  getAuthRequestStatus,
  getUser,
} from "../features/authentication/authSlice";
import { useEffect } from "react";
import { getCurrentUser } from "../features/authentication/authApi";

export function useUser() {
  const { user, isAuthenticated } = useSelector(authState);
  const dispatch = useDispatch();
  const { inProgress } = useSelector((state) =>
    getAuthRequestStatus(state, "getUser")
  );

  useEffect(
    function () {
      async function getUserData() {
        try {
          await dispatch(
            getUser({ requestName: "getUser", requestFn: getCurrentUser })
          ).unwrap();
        } catch (err) {}
      }

      getUserData();
    },
    [dispatch]
  );

  return { isAuthenticated, user, inProgress };
}
