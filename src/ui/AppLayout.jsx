import Map from "../features/cities/Map";
import Sidebar from "./Sidebar";
import User from "./User";

import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
