import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("harley@example.com");
  const [password, setPassword] = useState("luxury");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
    navigate("/app");
  }

  // useEffect(
  //   function () {
  //     if (isAuthenticated) navigate("/app");
  //   },
  //   [isAuthenticated]
  // );

  if (isAuthenticated) return <Navigate to="/app" />;

  return (
    <main className={styles.login}>
      <PageNav />
      <section className={styles.sectionForm}>
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
            <Button type="primary">Login</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
