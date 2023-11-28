import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import styles from "./Login.module.css";
import { signup } from "./authApi";

export default function AuthProvider() {
  async function handleSubmit(provider) {
    signup(provider);
    //   navigate("/app");
  }

  return (
    <div className={styles.authProviders}>
      <button onClick={() => handleSubmit("google")}>
        <FaGoogle />
      </button>
      <button onClick={() => handleSubmit("facebook")}>
        <FaFacebook />
      </button>
      <button onClick={() => handleSubmit("github")}>
        <FaGithub />
      </button>
      {/* <button onClick={handleSigout}>Sign out</button> */}
    </div>
  );
}
