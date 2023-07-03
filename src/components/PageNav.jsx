import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "../contexts/AuthContext";

export default function PageNav() {
  const { currentUser } = useAuth();

  return (
    <nav className={styles.header__navigation}>
      <Logo />
      <ul className={styles["header__navigation--lists"]}>
        <li className={styles[".header__navigation--list"]}>
          <NavLink
            to={"/product"}
            data-text="Product"
            className={styles["header__navigation--link"]}
          >
            Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/pricing"}
            data-text="Pricing"
            className={styles["header__navigation--link"]}
          >
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${currentUser ? "/login" : "/signup"}`}
            data-text={`${currentUser ? "login" : "signup"}`}
            className={styles["header__navigation--link"]}
          >
            {currentUser ? "login" : "signup"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
