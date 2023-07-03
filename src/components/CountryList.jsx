import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";

export default function CountryList() {
  const { cities } = useCities();
  const countries = cities.reduce((arr, cur) => {
    if (!arr.map((el) => el.country).includes(cur.country)) {
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    }
    return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
