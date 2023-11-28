import { Link } from "react-router-dom";
import PageNav from "../ui/PageNav";
import styles from "./Homepage.module.css";
import { useUser } from "../hooks/useUser";
import Spinner from "../ui/Spinner";

export default function Homepage() {
  const { isAuthenticated, user, inProgress } = useUser();
  console.log(isAuthenticated, user, inProgress);
  // if (inProgress) return <Spinner />;

  return (
    <header className={styles.showcase}>
      <PageNav />
      <div className={styles.hero}>
        <h1 className={styles.showcaseTitle}>
          Discover. Track. Delight. <br /> EatroVion keeps chart of your
          flavorful Odyssey.
        </h1>
        <p className={styles.showcaseParagraph}>
          A world map that tracks your experiences into every city you can think
          of. Never Miss a Memorable Note with Our Cafe Companion, and show your
          friends how you have wandered the world."
        </p>
        <Link
          to={isAuthenticated ? "/app" : "login"}
          href="#"
          className={styles.showcaseLink}
        >
          start tracking now
        </Link>
      </div>
    </header>
  );
}
