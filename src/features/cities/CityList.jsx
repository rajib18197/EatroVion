import styles from "./CityList.module.css";
import Spinner from "../../ui/Spinner";
import Toast from "../../ui/Toast";
import CityItem from "./CityItem";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, getCitiesState, requestStatus } from "./citiesSlice";
import { useEffect } from "react";
import { fetchAllCities } from "../../services/apiCities";

export default function CityList() {
  const cities = useSelector(getCitiesState);
  console.log(cities);
  const { name, inProgress, error } =
    useSelector((state) => requestStatus(state, "fetchAllCities")) || {};
  console.log(name, inProgress, error, "******");

  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(
      fetchCities({ requestName: "fetchAllCities", requestFn: fetchAllCities })
    );
  }, []);

  const [searchParams] = useSearchParams();

  if (inProgress) return <Spinner />;
  if (!inProgress && error)
    return (
      <h2>{`${error.message} ${error.code}` || "Error happened here!"}</h2>
    );
  if (!inProgress && cities.length === 0) return <h2>Load</h2>;

  const filter = searchParams.get("experience") || "all";
  let sortedCities;

  if (filter === "all") sortedCities = cities;

  if (filter === "masterpiece")
    sortedCities = cities.filter((city) => city.masterpiece);
  if (filter === "non-masterpiece")
    sortedCities = cities.filter((city) => !city.masterpiece);

  const sortedValue = searchParams.get("sortBy") || "date-asc";

  if (!sortedValue) sortedCities = sortedCities;
  const [field, direction] = sortedValue.split("-");

  if (sortedValue) {
    const modifier = direction === "asc" ? 1 : -1;
    if (field === "date") {
      sortedCities = sortedCities.slice().sort((a, b) => {
        return (new Date(b[field]) - new Date(a[field])) * modifier;
      });
    }

    if (field !== "date") {
      sortedCities = sortedCities.slice().sort((a, b) => {
        return (a[field] - b[field]) * modifier;
      });
    }
  }

  return (
    <div className={styles.cityList}>
      <div className={styles.cities}>
        {sortedCities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}
