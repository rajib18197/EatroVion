import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.navigation}>
        <Logo />
        <AppNav />
      </div>
      <Outlet />

      <Footer />
    </div>
  );
}
