import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useCities } from "../contexts/CitiesContext";

export default function ButtonBack() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      Go Back
    </Button>
  );
}
