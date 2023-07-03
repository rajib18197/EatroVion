import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </div>
  );
}
