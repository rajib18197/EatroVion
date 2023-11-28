import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../../ui/PageNav";
// import { useAuth } from "../contexts/AuthContext";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { authState, getAuthRequestStatus, loginUser } from "./authSlice";
import { signInWithPassword } from "./authApi";
import AuthProvider from "./AuthProvider";
import { useUser } from "../../hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("harley@example.com");
  const [password, setPassword] = useState("luxury1234");
  const navigate = useNavigate();

  const { isAuthenticated } = useUser();

  const { inProgress } = useSelector((state) =>
    getAuthRequestStatus(state, "loginUser")
  );

  console.log(isAuthenticated);

  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      await dispatch(
        loginUser({
          requestName: "loginUser",
          requestFn: signInWithPassword,
          data: { email, password },
        })
      ).unwrap();
      navigate("/app");
    } catch (err) {}
  }

  if (isAuthenticated === true) return <Navigate to="/app" />;

  return (
    <main className={styles.login}>
      <PageNav />
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div>
            <Button type="primary">
              {inProgress ? "Logging in" : "Login"}
            </Button>
          </div>
        </form>

        <AuthProvider />
      </div>
    </main>
  );
}
