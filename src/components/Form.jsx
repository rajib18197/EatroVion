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
  // const { formData, dispatch } = useForm();
  // const [isEditSession, setIsEditSession] = useState(
  //   () => Object.keys(formData).length > 0
  // );
  const { isLoading, createUpdateCity, cityToUpdate } = useCities();
  const isEditSession = Object.keys(cityToUpdate).length > 0;

  const [searchParams] = useSearchParams();
  const [cityName, setCityName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState();
  const [speciality, setSpeciality] = useState("");
  const [rating, setRating] = useState("");
  const [memorable, setMemorable] = useState(false);
  const [favouriteDishes, setFavouriteDishes] = useState("");
  const [expense, setExpense] = useState(0);
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState();
  const [summary, setSummary] = useState();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(isEditSession);
  // console.log(formData);

  async function submitHandler(e) {
    e.preventDefault();
    if (!cityName) return;

    console.log(cityToUpdate.favouriteDishes, favouriteDishes);

    const newCity = {
      cityName: cityName || cityToUpdate.cityName,
      country: country || cityToUpdate.country,
      emoji: emoji || cityToUpdate.emoji,
      restaurantName: restaurantName || cityToUpdate.restaurantName,
      favouriteDishes: favouriteDishes
        ? favouriteDishes.split(",")
        : cityToUpdate.favouriteDishes,
      speciality: speciality || cityToUpdate.speciality,
      contact: {
        phone: 88123461,
        email: "pizza.co@gmail.com",
      },
      rating: rating || cityToUpdate.rating,
      expense: expense || cityToUpdate.expense,
      memorable: memorable || cityToUpdate.memorable,
      date: date || cityToUpdate.date,
      notes: notes || cityToUpdate.notes,
      position: { lat, lng },
    };
    console.log(newCity);

    console.log(isEditSession);

    // if (isEditSession) dispatch({ type: "finishedUpdate" });

    await createUpdateCity(newCity);
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
          onChange={(e) => {
            setCityName(e.target.value);
          }}
          value={!cityName ? cityToUpdate.cityName : cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="restaurantName">Restaurant name</label>
        <input
          id="restaurantName"
          onChange={(e) => {
            setRestaurantName(e.target.value);
          }}
          value={!restaurantName ? cityToUpdate.restaurantName : restaurantName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={cityToUpdate.date ? new Date(cityToUpdate.date) : date}
          onChange={(date) => {
            cityToUpdate.date = date;
            setDate(date);
          }}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="speciality">Speciality</label>
        <input
          id="speciality"
          onChange={(e) => {
            setSpeciality(e.target.value);
          }}
          value={!speciality ? cityToUpdate.speciality : speciality}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="favouriteDishes">Favourite Dishes</label>
        <input
          id="favouriteDishes"
          onChange={(e) => {
            setFavouriteDishes(e.target.value);
          }}
          value={
            !favouriteDishes ? cityToUpdate.favouriteDishes : favouriteDishes
          }
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="rating">Your Rating</label>
        <input
          id="rating"
          onChange={(e) => {
            setRating(e.target.value);
          }}
          value={!rating ? cityToUpdate.rating : rating}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="expense">Total expense</label>
        <input
          id="expense"
          onChange={(e) => {
            setExpense(Number(e.target.value));
          }}
          value={!expense ? cityToUpdate.expense : expense}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          value={!notes ? cityToUpdate.notes : notes}
        />
      </div>

      <div className={styles.checked}>
        <input
          type="checkbox"
          name=""
          id="memorable"
          checked={!memorable ? cityToUpdate.memorable : memorable}
          onChange={(e) => setMemorable((memorable) => !memorable)}
        />
        <label htmlFor="memorable">Mind blowing experience</label>
      </div>
      <div className={styles.buttons}>
        <Button type="primary">{isEditSession ? "Update" : "Add"}</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
