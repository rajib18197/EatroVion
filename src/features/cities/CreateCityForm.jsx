// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../ui/Form.module.css";

import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

import ButtonBack from "../../ui/ButtonBack";
import Button from "../../ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import InputRow from "../../ui/InputRow";
import Message from "../../ui/Message";
import Spinner from "../../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewCity,
  requestStatus,
  selectCityToUpdate,
  updateCity,
} from "./citiesSlice";
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

  const [cityName, setCityName] = useState(cityToUpdate.cityName || "");
  const [restaurantName, setRestaurantName] = useState(
    cityToUpdate.restaurantName || ""
  );
  const [country, setCountry] = useState(cityToUpdate.country || "");
  const [date, setDate] = useState(
    cityToUpdate.date ? new Date(cityToUpdate.date) : null
  );
  const [speciality, setSpeciality] = useState(cityToUpdate.speciality || "");
  const [masterpiece, setMasterpiece] = useState(
    cityToUpdate.masterpiece || false
  );
  const [expense, setExpense] = useState(cityToUpdate.expense || 0);
  const [notes, setNotes] = useState(cityToUpdate.notes || "");
  const [emoji, setEmoji] = useState(cityToUpdate.emoji);

  const { isLoadingGeoCoding, geoCodingError, lat, lng } = useGeoCoding({
    isUpdateSession,
    setCityName,
    setCountry,
    setEmoji,
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
        onChange={setCityName}
        value={cityName}
        textLabel={"City name"}
      >
        <span className={styles.flag}>{emoji}</span>
      </InputRow>

      <InputRow
        htmlFor={"restaurantName"}
        onChange={setRestaurantName}
        textLabel={"Restaurant Name"}
        value={restaurantName}
      />
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => {
            setDate(date);
          }}
        />
      </div>

      <InputRow
        htmlFor={"speciality"}
        onChange={setSpeciality}
        textLabel={"Speciality"}
        value={speciality}
      />

      <InputRow
        htmlFor={"expense"}
        onChange={setExpense}
        textLabel={"Total expense"}
        value={expense}
        isTransformToNum={true}
      />

      <InputRow
        htmlFor={"notes"}
        onChange={setNotes}
        textLabel={`Notes about your trip to ${cityName}`}
        value={notes}
      />

      <div className={styles.checked}>
        <input
          type="checkbox"
          name=""
          id="masterpiece"
          checked={masterpiece}
          onChange={() => {
            setMasterpiece((masterpiece) => !masterpiece);
          }}
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
