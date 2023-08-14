// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";

import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

import ButtonBack from "./ButtonBack";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import InputRow from "./InputRow";
import Message from "./Message";
import Spinner from "./Spinner";

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
  const [searchParams] = useSearchParams();

  const { isLoading, createUpdateCity, cityToUpdate } = useCities();

  const isUpdateSession = Boolean(cityToUpdate.id);

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");

  const [cityName, setCityName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [rating, setRating] = useState("");
  const [memorable, setMemorable] = useState("");
  const [favouriteDishes, setFavouriteDishes] = useState("");
  const [expense, setExpense] = useState(0);
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // console.log(isUpdateSession);

  async function submitHandler(e) {
    e.preventDefault();
    if (!cityName && !isUpdateSession) return;
    console.log(memorable);
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
      memorable: memorable !== "" ? memorable : cityToUpdate.memorable,
      date: date || cityToUpdate.date,
      notes: notes || cityToUpdate.notes,
      position: { lat, lng },
    };

    console.log(newCity);
    await createUpdateCity(newCity);
    // setHasCityCreated(true);
    navigate("/app/cities");
  }

  useEffect(
    function () {
      if (isUpdateSession) return;

      async function getCityDetails() {
        try {
          setIsLoadingGeoCoding(true);
          const res = await fetch(`${url}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();
          console.log(data);

          if (!data.countryCode) {
            throw new Error(
              "That does not seem to be a city. Click somewhere else"
            );
          }

          setCityName(data.city);
          setEmoji(data.countryCode);
          setCountry(data.countryName);
        } catch (err) {
          console.error(err);
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }

      getCityDetails();
    },
    [lat, lng]
  );

  console.log(cityToUpdate, isUpdateSession);

  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map"} />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={submitHandler}
    >
      <InputRow
        htmlFor={"cityName"}
        onChange={setCityName}
        value={isUpdateSession ? cityToUpdate.cityName : cityName}
        textLabel={"City name"}
      >
        <span className={styles.flag}>{emoji}</span>
      </InputRow>

      <InputRow
        htmlFor={"restaurantName"}
        onChange={setRestaurantName}
        textLabel={"Restaurant Name"}
        value={isUpdateSession ? cityToUpdate.restaurantName : restaurantName}
      />
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={
            isUpdateSession && date === null
              ? new Date(cityToUpdate.date)
              : date
          }
          onChange={(date) => {
            setDate(date);
          }}
        />
      </div>

      <InputRow
        htmlFor={"speciality"}
        onChange={setSpeciality}
        textLabel={"Speciality"}
        value={isUpdateSession ? cityToUpdate.speciality : speciality}
      />

      <InputRow
        htmlFor={"favouriteDishes"}
        onChange={setFavouriteDishes}
        textLabel={"Favourite Dishes"}
        value={isUpdateSession ? cityToUpdate.favouriteDishes : favouriteDishes}
      />

      <InputRow
        htmlFor={"rating"}
        onChange={setRating}
        textLabel={"Your Rating"}
        value={isUpdateSession ? cityToUpdate.rating : rating}
      />

      <InputRow
        htmlFor={"expense"}
        onChange={setExpense}
        textLabel={"Total expense"}
        value={isUpdateSession ? cityToUpdate.expense : expense}
        isTransformToNum={true}
      />

      <InputRow
        htmlFor={"notes"}
        onChange={setNotes}
        textLabel={`Notes about your trip to ${cityName}`}
        value={isUpdateSession ? cityToUpdate.notes : notes}
      />

      <div className={styles.checked}>
        <input
          type="checkbox"
          name=""
          id="memorable"
          defaultChecked={isUpdateSession ? cityToUpdate.memorable : memorable}
          onChange={(e) => {
            if (isUpdateSession) {
              console.log(cityToUpdate.memorable);
              setMemorable(cityToUpdate.memorable ? false : true);
              return;
            }
            setMemorable((memorable) => !memorable);
          }}
        />
        <label htmlFor="memorable">Mind blowing experience</label>
      </div>

      <div className={styles.buttons}>
        <Button type="primary">{isUpdateSession ? "Update" : "Add"}</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;

/**
 
 Important Projects in terms of various groups 

 * Social blogging app (medium clone)
 * Task management app (trello clone)
 * Q&A platform (stackoverflow clone)
 * Social media platform (twitter clone)
 * E-commerce platform (amazon clone)
 * Booking app (airbnb clone)
 * Personal finance app (mint clone)
 * Messaging app (whatsapp clone)

*/

// The code you write makes you a programmer. The code you delete makes you a good one. The code you don't have to write makes you a great one.

// If you can get today’s work done today, but you do it in such a way that you can’t possibly get tomorrow’s work done tomorrow, then you lose.

// The purpose of software engineering is to control complexity, not to create it.

// Simplicity is prerequisite for reliability.
