import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import styles from "./Filters.module.css";

export default function Filters({ filterField, options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const filterValue = searchParam.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParam.set(filterField, value);
    setSearchParam(searchParam);
  }

  return (
    <div className={styles.filters}>
      {options.map((option) => (
        <Button
          key={option.value}
          type={filterValue === option.value ? "filter" : "back"}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
