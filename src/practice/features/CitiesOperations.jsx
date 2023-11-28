import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import styles from "./CitiesOperations.module.css";
import { useCities } from "../../contexts/CitiesContext";
import Modal from "../../ui/Modal";
import ConfirmDelete from "./ConfirmDelete";

export default function CitiesOperations({ city }) {
  const navigate = useNavigate();
  const { dispatch } = useCities();

  return (
    <div className={styles.opeartions}>
      <Button
        type={"primary"}
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "city/update", payload: city });
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
