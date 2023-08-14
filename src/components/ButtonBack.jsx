import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useCities } from "../contexts/CitiesContext";

export default function ButtonBack() {
  const { dispatch } = useCities();
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        // setCityToUpdate({});
        navigate(-1);
      }}
    >
      Go Back
    </Button>
  );
}
