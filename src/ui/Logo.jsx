import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to={"/"} className={styles.logoLink}>
      <img
        src="/public/icon.png"
        alt="WorldWise logo"
        className={styles.logo}
      />
      <span className={styles.logoText}>EatroVion</span>
    </Link>
  );
}

export default Logo;
