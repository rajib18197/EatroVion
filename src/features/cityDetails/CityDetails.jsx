import { useParams } from "react-router-dom";
import styles from "./CityDetails.module.css";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import ButtonBack from "../../ui/ButtonBack";
import StarRating from "../../ui/StarRating";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCities,
  fetchCity,
  getCurrentCityState,
  requestStatus,
  updateCity,
} from "../cities/citiesSlice";
import { getCity, updateCity as updateCityApi } from "../../services/apiCities";
import Button from "../../ui/Button";
import FavDishes from "./FavDishes";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function CityDetails() {
  const { cityId } = useParams();
  const currentCity = useSelector(getCurrentCityState);
  const [userRating, setUserRating] = useState();

  const status = useSelector((state) =>
    requestStatus(state, "fetchCityDetails")
  );

  const ratingStatus = useSelector((state) =>
    requestStatus(state, "updateRating")
  );
  const { inProgress: ratingInProgress } = ratingStatus || {};

  const { inProgress } = status || {};
  console.log(status, "---------------");
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(
        fetchCity({
          requestName: "fetchCityDetails",
          requestFn: getCity,
          id: cityId,
        })
      );
    },
    [cityId]
  );

  if (inProgress) return <Spinner />;

  if (Object.keys(currentCity).length === 0) return <Spinner />;
  console.log(currentCity);

  const {
    id,
    cityName,
    emoji,
    date,
    notes,
    restaurantName,
    speciality,
    favouriteDishes,
    country,
    rating,
  } = currentCity;

  function handleRating() {
    dispatch(
      updateCity({
        requestName: "updateRating",
        requestFn: updateCityApi,
        id: id,
        updatedCityData: {
          rating: userRating,
        },
      })
    );
  }

  return (
    <div className={styles.city}>
      <div className={styles.cityIntro}>
        <div className={styles.name}>
          <h3>
            {restaurantName} <span>({emoji})</span>
          </h3>
        </div>
        <div className={styles.country}>
          <h3>
            {cityName}, {country}
          </h3>
        </div>
        <div className={styles.speciality}>
          <h3>
            Special dish we've tried <span>{speciality}</span>
          </h3>
        </div>
      </div>

      <div className={styles.rating}>
        <div className={styles.rate}>
          {rating === 0 ? (
            <>
              <StarRating onSetRating={setUserRating} />
              <Button onClick={handleRating}>
                {ratingInProgress ? "adding rating" : "Add rating"}
              </Button>
            </>
          ) : (
            <p className={styles.text}>
              You rated this restaurant {rating} stars
            </p>
          )}
        </div>
      </div>

      <div className={styles.favDishes}>
        <h6>
          {favouriteDishes?.length > 0
            ? "Your 3 Favourite Dishes"
            : "Drop your 3 Favourite Dishes"}
        </h6>
        {favouriteDishes?.length === 0 && <FavDishes id={id} />}
        {favouriteDishes?.length > 0 && (
          <h3 className={styles.tags}>
            {favouriteDishes.split(",").map((dish) => (
              <span key={dish}>{dish}</span>
            ))}
          </h3>
        )}
      </div>
      {notes && (
        <div className={styles.notes}>
          <span>{notes}</span>
        </div>
      )}

      <div className={styles.date}>
        <h6>You went to the restaurant on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      <div className={styles.other}>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          Details about {cityName}
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}
