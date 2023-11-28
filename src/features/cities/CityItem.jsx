import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCity,
  getCurrentCityState,
  requestStatus,
  resetCurrentCity,
  updatingCity,
} from "./citiesSlice";
import { deleteCity as deleteCityApi } from "../../services/apiCities";
import { FaEdit, FaTimes } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const {
    cityName,
    restaurantName,
    countryCode,
    date,
    favouriteDishes,
    expense,
    rating,
    speciality,
    masterpiece,
    notes,
    position,
  } = city;
  const [lat, lng] = position.split(",");

  const navigate = useNavigate();
  const currentCity = useSelector(getCurrentCityState);
  const dispatch = useDispatch();

  const { name, inProgress, error } =
    useSelector((state) => requestStatus(state, `deleteCity-${city.id}`)) || {};
  console.log(name, inProgress, error);

  const deleteId = name ? name.split("-").at(-1) : undefined;
  console.log(deleteId);
  const isDeleting = deleteId ? true : false;

  function handleUpdate(e) {
    e.preventDefault();
    dispatch(updatingCity(city));
    console.log(city.id);
    dispatch(resetCurrentCity());
    navigate(`${city.id}/update?lat=${lat}&lng=${lng}`);
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(
      deleteCity({
        requestName: `deleteCity-${city.id}`,
        requestFn: deleteCityApi,
        id: city.id,
      })
    );
  }

  return (
    <ul>
      <li>
        <Link
          className={`${styles.cityItem} ${
            city.id === currentCity?.id ? styles["cityItem--active"] : ""
          }`}
          to={`${city.id}?lat=${lat}&lng=${lng}`}
        >
          {/* <img src="/hero.jpg" alt="image-1" className={styles.image} /> */}
          <div className={styles.desc}>
            <h2 className={styles.name}>
              {restaurantName}, {cityName}
            </h2>
            <h3 className={styles.expense}>Total expenses - ${expense}</h3>
            <div className={styles.tags}>
              <p className={styles.speciality}>Speciality: </p>
              <span>{speciality}</span>
            </div>
          </div>
          <div className={styles.other}>
            <p className={styles.rating}>
              <span>{rating}</span>
              <span>Stars</span>
            </p>
            <p>
              <span className={styles.experience}>
                {masterpiece ? "Experience: Masterpiece" : ""}
              </span>
            </p>
            <time className={styles.date}>
              Visited - ({formatDate(city.date)})
            </time>
          </div>
          <div className={styles.operationsPanel}>
            <button className={styles.btn} onClick={handleUpdate}>
              <FaEdit />
            </button>
            <button className={styles.btn} onClick={handleDelete}>
              {isDeleting ? <LuLoader /> : <FaTimes />}
            </button>
          </div>
        </Link>
      </li>
    </ul>
  );
}
