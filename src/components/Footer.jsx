import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.copyright}>
        &copy; EatroVion {new Date().getFullYear()}
      </p>
    </div>
  );
}
