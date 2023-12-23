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
      <div className={styles.auth}>
        <button onClick={() => handleSubmit("google")}>
          <FaGoogle />
          Sign up with Google
        </button>
        {/* <h3>Sign up with Google</h3> */}
      </div>
      {/* <button onClick={() => handleSubmit("facebook")}>
        <FaFacebook />
      </button>
      <button onClick={() => handleSubmit("github")}>
        <FaGithub />
      </button> */}
      {/* <button onClick={handleSigout}>Sign out</button> */}
    </div>
  );
}
