import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const navigate = useNavigate();
  const { currentCity, removeCity } = useCities();

  return (
    <ul>
      <li>
        <Link
          className={`${styles.cityItem} ${
            city.id === currentCity?.id ? styles["cityItem--active"] : ""
          }`}
          to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        >
          <img src="/hero.jpg" alt="image-1" className={styles.image} />
          <div className={styles.desc}>
            <h2 className={styles.name}>
              Expensive Pizzarean, {city.cityName}
            </h2>
            <h3 className={styles.note}>
              The Best restaurant I have ever seen!
            </h3>
            <div className={styles.tags}>
              <p className={styles.speciality}>Speciality: </p>
              <span>Organic and heathy Fruits</span>
            </div>
          </div>
          <div className={styles.other}>
            <p className={styles.rating}>
              <span>4.6</span>
              <span>Stars</span>
            </p>
            <p>
              contact: <span>+88087264</span>
            </p>
            <time className={styles.date}>({formatDate(city.date)})</time>
          </div>
          <button
            className={styles.deleteBtn}
            onClick={(e) => {
              e.preventDefault();
              removeCity(city.id);
            }}
          >
            &times;
          </button>
        </Link>
      </li>
    </ul>
  );
}
