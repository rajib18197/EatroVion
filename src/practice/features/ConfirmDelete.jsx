import { useCities } from "../../contexts/CitiesContext";
import Button from "../../ui/Button";
import styles from "./ConfirmDelete.module.css";

export default function ConfirmWindow({
  city,
  onClose,
  resourceName = "city",
}) {
  const { removeCity } = useCities();

  return (
    <div className={styles.confirm}>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>
      <div>
        <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          cancel
        </Button>
        <Button
          type={"primary"}
          onClick={(e) => {
            e.preventDefault();
            removeCity(city.id);
            console.log(111);
          }}
        >
          ok
        </Button>
      </div>
    </div>
  );
}
