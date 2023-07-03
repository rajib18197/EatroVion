import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [name, setName] = useState("harley");
  const [email, setEmail] = useState("harley@example.com");
  const [password, setPassword] = useState("luxury");
  const navigate = useNavigate();

  const { signup } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    signup("https://i.pravatar.cc/100?u=zz", name, email, password);
    navigate(`/login`);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="text">Name</label>
          <input
            type="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
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
          <Button>Sign up</Button>
        </div>
      </form>
    </main>
  );
}
