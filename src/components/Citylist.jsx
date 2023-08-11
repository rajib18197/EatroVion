import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import SortBy from "./SortBy";
import { useSearchParams } from "react-router-dom";
import Filters from "./Filters";
import Toast from "./Toast";
// ambience
export default function CityList() {
  const { cities, isLoading, hasCityCreated } = useCities();
  console.log(hasCityCreated);

  const [isOperationsOpen, setIsOperationsOpen] = useState(null);
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState("all");
  // console.log(filter);
  const sortedValue = searchParams.get("sortBy") || "date-asc";
  let sortedCities;

  if (filter === "all") sortedCities = cities;

  if (filter === "memorable")
    sortedCities = cities.filter((city) => city.memorable);
  if (filter === "no-memorable")
    sortedCities = cities.filter((city) => !city.memorable);

  if (!sortedValue) sortedCities = sortedCities;
  const [field, direction] = sortedValue.split("-");
  // console.log(field, direction);

  if (sortedValue) {
    const modifier = direction === "asc" ? 1 : -1;
    if (field === "date") {
      sortedCities = sortedCities.sort((a, b) => {
        return (new Date(b[field]) - new Date(a[field])) * modifier;
      });
    }

    if (field !== "date") {
      sortedCities = sortedCities.sort((a, b) => {
        // console.log(a[field]);
        return (a[field] - b[field]) * modifier;
      });
    }
  }

  // console.log(sortedCities);
  // console.log(cities);
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.cityList}>
      {hasCityCreated && <Toast />}
      <div className={styles.operations}>
        <Filters
          onFilter={setFilter}
          filter={filter}
          filterField="experience"
          options={[
            { value: "all", label: "All" },
            { value: "memorable", label: "Memorable" },
            { value: "no-memorable", label: "No Memorable" },
          ]}
        />
        <SortBy
          options={[
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
            { value: "date-asc", label: "Sort by date (recent first)" },
            { value: "date-desc", label: "Sort by date (earlier first)" },
          ]}
          value={sortedValue}
        />
      </div>
      <div className={styles.cities}>
        {sortedCities.map((city) => (
          <CityItem
            key={city.id}
            city={city}
            isOperationsOpen={isOperationsOpen}
            onOperations={setIsOperationsOpen}
          />
        ))}
      </div>
    </div>
  );
}
