import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useSelector } from "react-redux";
import { authState } from "../features/authentication/authSlice";

export default function PageNav() {
  const { isAuthenticated } = useSelector(authState);

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
            to={`${isAuthenticated === true ? "/app" : "/login"}`}
            data-text={`${isAuthenticated === true ? "app" : "login"}`}
            className={styles["header__navigation--link"]}
          >
            {isAuthenticated === true ? "app" : "login"}
          </NavLink>
        </li>

        {(!isAuthenticated || isAuthenticated === "not-authorized-user") && (
          <li>
            <NavLink
              to={"/signup"}
              data-text="signup"
              className={styles["header__navigation--link"]}
            >
              signup
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
