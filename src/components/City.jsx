import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";
import StarRating from "./StarRating";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function City() {
  const { cityId } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  console.log(currentCity);
  useEffect(
    function () {
      getCity(cityId);
    },
    [cityId]
  );

  if (isLoading) return <Spinner />;

  if (Object.keys(currentCity).length === 0) return <Spinner />;

  const {
    cityName,
    emoji,
    date,
    notes,
    restaurantName,
    speciality,
    favouriteDishes,
    country,
    contact,
    rating,
  } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.cityIntro}>
        <div className={styles.name}>
          {/* <h6>Restaurant name</h6> */}
          <h3>
            {restaurantName} <span>({emoji})</span>
          </h3>
        </div>
        <div className={styles.country}>
          {/* <h6>City name</h6> */}
          <h3>
            {cityName}, {country}
          </h3>
        </div>
        <div className={styles.speciality}>
          <h3>{speciality} is their special food in my opinion.</h3>
        </div>
        <div className={styles.worldRating}>
          <h3>4.6 worldwide Rating</h3>
        </div>
      </div>

      <div className={styles.rating}>
        <div className={styles.rate}>
          {/* <div> */}
          {/* </div> */}
          <p className={styles.text}>
            You rated this restaurant {rating} stars
          </p>
        </div>
      </div>

      <div className={styles.favDishes}>
        <h6>Favourite Dishes</h6>
        <h3 className={styles.tags}>
          {favouriteDishes.map((dish) => (
            <span key={dish}>{dish}</span>
          ))}
        </h3>
      </div>
      {notes && (
        <div className={styles.notes}>
          <h6>Your notes</h6>
          <p>
            <span>{notes}</span>
          </p>
        </div>
      )}

      <div className={styles.date}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      <div className={styles.other}>
        <h6>Call for reservations: </h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          go to url
        </a>
        <span>email: {contact.email} &rarr;</span>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
