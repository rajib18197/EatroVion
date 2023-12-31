// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../ui/Form.module.css";

import DatePicker from "react-datepicker";
import { useState } from "react";

import ButtonBack from "../../ui/ButtonBack";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import InputRow from "../../ui/InputRow";
import Message from "../../ui/Message";
import Spinner from "../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { createNewCity, requestStatus, updateCity } from "./citiesSlice";
import {
  createCity,
  updateCity as updateCityApi,
} from "../../services/apiCities";
import { authState } from "../authentication/authSlice";
import { useGeoCoding } from "../../hooks/useGeoCoding";

function CreateCityForm({ cityToUpdate = {} }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user: { user_id },
  } = useSelector(authState);

  const {
    name,
    inProgress: isCreating,
    error,
  } = useSelector((state) => requestStatus(state, "createNewCity")) || {};
  console.log(name, isCreating, error, "result here");

  const {
    name: updateName,
    inProgress: isUpdating,
    error: isUpdateError,
  } = useSelector((state) => requestStatus(state, "updateCity")) || {};

  const isUpdateSession = Boolean(cityToUpdate?.id);

  const [enteredValues, setEnteredValues] = useState({
    cityName: cityToUpdate.cityName || "",
    restaurantName: cityToUpdate.restaurantName || "",
    country: cityToUpdate.country || "",
    date: cityToUpdate?.date ? new Date(cityToUpdate.date) : null,
    speciality: cityToUpdate.speciality || "",
    masterpiece: cityToUpdate.masterpiece || false,
    expense: cityToUpdate.expense || 0,
    notes: cityToUpdate.notes || "",
    emoji: cityToUpdate.emoji || null,
  });

  const {
    cityName,
    restaurantName,
    country,
    date,
    speciality,
    masterpiece,
    expense,
    notes,
    emoji,
  } = enteredValues;

  const [didEdit, setDidEdit] = useState({
    cityName: false,
    restaurantName: false,
    date: false,
    speciality: false,
    expense: false,
    notes: false,
  });

  const restaurantNameIsInvalid =
    didEdit.restaurantName && restaurantName === "";

  const dateIsInvalid = didEdit.date && date === null;
  const specialityIsInvalid = didEdit.speciality && speciality === "";
  const expenseIsInvalid = didEdit.expense && expense <= 0;
  const notesIsInvalid = didEdit.notes && notes.length <= 20;

  console.log(restaurantNameIsInvalid);

  function handleBlur(identifier) {
    setDidEdit((cur) => ({ ...cur, [identifier]: true }));
  }

  function handleChange(identifier, value) {
    setEnteredValues((cur) => ({ ...cur, [identifier]: value }));

    setDidEdit((cur) => ({ ...cur, [identifier]: false }));
  }

  const { isLoadingGeoCoding, geoCodingError, lat, lng } = useGeoCoding({
    isUpdateSession,
    setEnteredValues,
  });

  async function submitHandler(e) {
    e.preventDefault();
    if (!cityName && !isUpdateSession) return;

    const newCity = {
      cityName,
      country,
      emoji,
      restaurantName,
      favouriteDishes: isUpdateSession ? cityToUpdate.favouriteDishes : "",
      speciality: speciality || cityToUpdate.speciality,
      rating: isUpdateSession ? cityToUpdate.rating : 0,
      expense,
      masterpiece,
      date,
      notes,
      position: `${lat},${lng}`,
      user_id,
    };

    if (isUpdateSession) {
      await dispatch(
        updateCity({
          requestName: "updateCity",
          requestFn: updateCityApi,
          id: cityToUpdate.id,
          updatedCityData: newCity,
        })
      ).unwrap();

      navigate("/app/cities");
      return;
    }

    console.log(newCity);

    await dispatch(
      createNewCity({
        requestName: "createNewCity",
        requestFn: createCity,
        newCity: newCity,
      })
    ).unwrap();

    navigate("/app/cities");
  }

  console.log(cityToUpdate, isUpdateSession);

  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message={"Start by clicking somewhere on the map"} />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  const isWorking = isCreating || isUpdating;

  return (
    <form
      className={`${styles.form} ${isWorking ? styles.loading : ""}`}
      onSubmit={submitHandler}
    >
      <InputRow
        htmlFor={"cityName"}
        textLabel={"City name"}
        value={cityName}
        onChange={(e) => handleChange("cityName", e.target.value)}
        onBlur={() => handleBlur("cityName")}
      >
        <span className={styles.flag}>{emoji}</span>
      </InputRow>

      <InputRow
        htmlFor={"restaurantName"}
        textLabel={"RestaurantName"}
        value={restaurantName}
        onChange={(e) => handleChange("restaurantName", e.target.value)}
        onBlur={() => handleBlur("restaurantName")}
        error={restaurantNameIsInvalid && "Restaurant Name must be included"}
      />
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => handleChange("date", date)}
          onBlur={() => handleBlur("date")}
          error={dateIsInvalid && "Date must be included"}
        />
      </div>

      <InputRow
        htmlFor={"speciality"}
        textLabel={"Speciality"}
        value={speciality}
        onChange={(e) => handleChange("speciality", e.target.value)}
        onBlur={() => handleBlur("speciality")}
        error={specialityIsInvalid && "Speciality must be included"}
      />

      <InputRow
        htmlFor={"expense"}
        textLabel={"Total expense"}
        value={expense}
        onChange={(e) => handleChange("expense", Number(e.target.value))}
        onBlur={() => handleBlur("expense")}
        error={expenseIsInvalid && "Expense must be greater than 0"}
      />

      <InputRow
        htmlFor={"notes"}
        textLabel={`Notes about your trip to ${cityName}`}
        value={notes}
        onChange={(e) => handleChange("notes", e.target.value)}
        onBlur={() => handleBlur("notes")}
        error={notesIsInvalid && "Notes must be more than 20 chars"}
      />

      <div className={styles.checked}>
        <input
          type="checkbox"
          name=""
          id="masterpiece"
          checked={masterpiece}
          onChange={() =>
            setEnteredValues((cur) => ({
              ...cur,
              masterpiece: !cur.masterpiece,
            }))
          }
        />
        <label htmlFor="memorable">Masterpiece</label>
      </div>

      <div className={styles.buttons}>
        <Button type="primary">
          {isUpdateSession
            ? `${isUpdating ? "Updating" : "update"}`
            : `${isCreating ? "creating" : "create"}`}
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default CreateCityForm;

// new method of delivering content => podcast
