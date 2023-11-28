import { useState } from "react";
import InputRow from "../../ui/InputRow";
import styles from "../../ui/InputRow.module.css";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateCity as updateCityApi } from "../../services/apiCities";
import { requestStatus, updateCity } from "../cities/citiesSlice";

export default function FavDishes({ id }) {
  const [dishes, setDishes] = useState([]);
  const { name, inProgress, error } =
    useSelector((state) => requestStatus(state, "saveToFavDishes")) || {};

  const dispatch = useDispatch();
  console.log(dishes);

  function handleChange(e) {
    if (e.target.value === "") {
      setDishes([]);
      return;
    }
    setDishes(e.target.value.split(","));
  }

  function handleFav(e) {
    if (e.key === "Enter") {
      const favDishes = dishes
        .filter((el) => el.trim() !== " ")
        .map((el) => el.trim());

      console.log(favDishes);

      dispatch(
        updateCity({
          requestName: "saveToFavDishes",
          requestFn: updateCityApi,
          id: id,
          updatedCityData: { favouriteDishes: favDishes.join(",") },
        })
      );
    }
  }
  return (
    <div>
      <div className={styles.row}>
        <input
          id="dishes"
          value={dishes.join(",")}
          onChange={handleChange}
          onKeyUp={handleFav}
        />
      </div>
      {dishes.length > 0 && (
        <Button>{inProgress ? "saving" : "Save to Fav"}</Button>
      )}
    </div>
  );
}

// totalRestaurants, numOfmostMemorableRestaurants, totalExpenses, yearWiseCount: 2023 - (2), 2022-(8) etc.
