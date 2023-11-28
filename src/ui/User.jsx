import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  authState,
  getAuthRequestStatus,
  logout,
  logoutUser,
} from "../features/authentication/authSlice";
import { signout } from "../features/authentication/authApi";

function User() {
  const { user, isAuthenticated } = useSelector(authState);
  console.log(user);
  const { inProgress } = useSelector((state) =>
    getAuthRequestStatus(state, "logoutUser")
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function handleClick() {
    try {
      await dispatch(
        logoutUser({ requestName: "logoutUser", requestFn: signout })
      ).unwrap();
      navigate("/");
    } catch (err) {}
  }

  return (
    <div className={styles.user}>
      {user?.avatar_url && <img src={user?.avatar_url} alt={user?.full_name} />}
      <span>Welcome, {user?.fullName || user?.full_name}</span>
      <button onClick={handleClick}>
        {inProgress ? "logging out" : "Logout"}
      </button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
