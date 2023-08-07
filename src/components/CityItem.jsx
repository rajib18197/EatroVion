import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
import CitiesOperations from "./CitiesOperations";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city, isOperationsOpen, onOperations }) {
  // const [isOperationsOpen, setIsOperationsOpen] = useState(false);

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
              {city.restaurantName}, {city.cityName}
            </h2>
            <h3 className={styles.expense}>Total expenses - ${city.expense}</h3>
            <div className={styles.tags}>
              <p className={styles.speciality}>Speciality: </p>
              <span>{city.speciality}</span>
            </div>
          </div>
          <div className={styles.other}>
            <p className={styles.rating}>
              <span>{city.rating}</span>
              <span>Stars</span>
            </p>
            <p>
              <span className={styles.experience}>
                {city.memorable ? "Experience: memorable" : ""}
              </span>
            </p>
            <time className={styles.date}>
              Visited - ({formatDate(city.date)})
            </time>
          </div>
          <div className={styles.operationsPanel}>
            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                e.preventDefault();
                onOperations((id) => (id === city.id ? null : city.id));
              }}
            >
              ⫶
            </button>
            {isOperationsOpen === city.id && (
              <CitiesOperations city={city} removeCity={removeCity} />
            )}
          </div>
        </Link>
      </li>
    </ul>
  );
}
