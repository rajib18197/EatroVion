// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import ButtonBack from "./ButtonBack";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const { isLoading, createCity } = useCities();
  const [searchParams] = useSearchParams();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState();
  const [summary, setSummary] = useState();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  async function submitHandler(e) {
    e.preventDefault();

    if (!cityName) return;
    const newCity = {
      cityName,
      date,
      notes,
      emoji,
      country,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  useEffect(
    function () {
      async function getCityDetails() {
        try {
          const res = await fetch(`${url}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();
          console.log(data);
          setCityName(data.city);
          setEmoji(data.countryCode);
          setCountry(data.countryName);
        } catch (err) {
          console.error(err);
        }
      }

      getCityDetails();
    },
    [lat, lng]
  );
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={submitHandler}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="summary">Summary {summary}</label>
        <textarea
          id="summary"
          onChange={(e) => setSummary(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
