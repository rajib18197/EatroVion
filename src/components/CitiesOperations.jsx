import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./CitiesOperations.module.css";
import { useCities } from "../contexts/CitiesContext";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";

export default function CitiesOperations({ city }) {
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
      {/* <Button
            type={"back"}
            onClick={(e) => {
              e.preventDefault();
              removeCity(city.id);
              console.log(111);
            }}
          >
            delete
          </Button> */}

      <Modal>
        <Modal.Open opens="confirmation">
          <Button type={"back"}>delete</Button>
        </Modal.Open>

        <Modal.Window opens="confirmation">
          <ConfirmDelete city={city} resourceName={city.restaurantName} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
