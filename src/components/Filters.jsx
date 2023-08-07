import Button from "./Button";
import styles from "./Filters.module.css";

export default function Filters({ onFilter, filter, options }) {
  return (
    <div className={styles.filters}>
      {options.map((option) => (
        <Button
          key={option.value}
          type={filter === option.value ? "primary" : ""}
          onClick={() => onFilter(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
