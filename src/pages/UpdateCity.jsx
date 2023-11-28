import { useParams } from "react-router-dom";
import CreateCityForm from "../features/cities/CreateCityForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCity,
  getCurrentCityState,
  requestStatus,
} from "../features/cities/citiesSlice";
import { useEffect } from "react";
import { getCity } from "../services/apiCities";
import Spinner from "../ui/Spinner";

export default function UpdateCity() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

  const { name, inProgress, error } =
    useSelector((state) => requestStatus(state, "updateCityLoaded")) || {};

  const currentCity = useSelector(getCurrentCityState);
  console.log(currentCity);
  useEffect(
    function () {
      dispatch(
        fetchCity({
          requestName: "updateCityLoaded",
          requestFn: getCity,
          id: id,
        })
      );
    },
    [id]
  );

  if (inProgress) return <Spinner />;
  if (!inProgress && error) return <h2>{error}</h2>;
  if (!currentCity) return <h2>No city found</h2>;

  console.log(currentCity);

  return (
    <>
      <CreateCityForm cityToUpdate={currentCity} />
    </>
  );
}
