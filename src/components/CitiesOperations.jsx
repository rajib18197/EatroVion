import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./CitiesOperations.module.css";
import { useCities } from "../contexts/CitiesContext";

export default function CitiesOperations({ city, removeCity }) {
  const navigate = useNavigate();
  const { setCityToUpdate } = useCities();

  return (
    <div className={styles.opeartions}>
      <Button
        type={"primary"}
        onClick={(e) => {
          e.preventDefault();
          setCityToUpdate({ ...city });
          navigate(
            `/app/form?lat=${city.position.lat}&lng=${city.position.lng}`
          );
        }}
      >
        update
      </Button>
      <Button
        type={"back"}
        onClick={(e) => {
          e.preventDefault();
          removeCity(city.id);
          console.log(111);
        }}
      >
        delete
      </Button>
    </div>
  );
}
