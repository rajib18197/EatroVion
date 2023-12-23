import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import styles from "./Login.module.css";
import { signup } from "./authApi";

export default function AuthProvider({ type = "Sign up" }) {
  async function handleSubmit(provider) {
    signup(provider);
  }

  return (
    <div className={styles.authProviders}>
      <div className={styles.auth}>
        <button onClick={() => handleSubmit("google")}>
          <FaGoogle />
          {type} with Google
        </button>
      </div>
    </div>
  );
}
