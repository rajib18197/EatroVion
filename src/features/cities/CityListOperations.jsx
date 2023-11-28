import Filters from "../../ui/Filters";
import SortBy from "../../ui/SortBy";
import styles from "./CityList.module.css";

export default function CityListOperations() {
  return (
    <div className={styles.operations}>
      <Filters
        filterField="experience"
        options={[
          { value: "all", label: "All" },
          { value: "masterpiece", label: "Masterpiece" },
          { value: "non-masterpiece", label: "Non masterpiece" },
        ]}
      />
      <SortBy
        options={[
          { value: "date-asc", label: "Sort by date (recent first)" },
          { value: "date-desc", label: "Sort by date (earlier first)" },
          {
            value: "rating-asc",
            label: "Sort by rating (low first)",
          },
          {
            value: "rating-desc",
            label: "Sort by rating (high first)",
          },
          { value: "expense-asc", label: "Sort by expense (low first)" },
          { value: "expense-desc", label: "Sort by expense (high first)" },
        ]}
      />
    </div>
  );
}
