import { useSearchParams } from "react-router-dom";
import styles from "./SortBy.module.css";

export default function SortBy({ options, value }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortedValue = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <select
        className={styles.sort}
        value={sortedValue}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
