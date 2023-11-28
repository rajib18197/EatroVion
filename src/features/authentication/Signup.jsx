import { useEffect, useState } from "react";
import styles from "./Login.module.css";
// import PageNav from "../ui/PageNav";
import PageNav from "../../ui/PageNav";
// import { useAuth } from "../contexts/AuthContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { signup as signUpApi, signout, signupWithPassword } from "./authApi";
import supabase from "../../services/supabase";

import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAuthRequestStatus, signUpUser } from "./authSlice";
import AuthProvider from "./AuthProvider";
import { useUser } from "../../hooks/useUser";

export default function Signup() {
  // PRE-FILL FOR DEV PURPOSES
  const { isAuthenticated } = useUser();

  const [name, setName] = useState("harley");
  const [email, setEmail] = useState("harley@example.com");
  const [password, setPassword] = useState("luxury1234");
  const navigate = useNavigate();
  const {
    name: requestName,
    inProgress,
    error,
  } = useSelector((state) => getAuthRequestStatus(state, "authSignInUser"));
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await dispatch(
        signUpUser({
          requestName: "authSignInUser",
          requestFn: signupWithPassword,
          data: { email, password, fullName: name },
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

          <div className={styles.btns}>
            <Button>{inProgress ? "Signing up" : "Sign up"}</Button>
            <Button onClick={() => navigate(`/login`)}>
              Already have an account? Log in
            </Button>
          </div>
        </form>

        <AuthProvider />
      </div>
    </main>
  );
}
